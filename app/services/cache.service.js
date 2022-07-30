import { CacheModel } from "../models/index.js";
import {getRandomValue} from '../helpers/index.js';

export class CacheService {
  model = CacheModel;
  constructor() {
    if (CacheService._instance) {
      return CacheService._instance
    }
    CacheService._instance = this;
  }

  async getAll(){
    return await this.model.find({});
  }
  async getByKey({key}){
    return await this.model.findOne({key});
  }
  async create({key, value}){
    return await this.model.findOneAndUpdate(
      {key},
      {$set: {key, value: value || getRandomValue()}},
      {upsert: true, new: true}
    );
  }
  async update({key, value}){
    return await this.model.findOneAndUpdate(
      {key},
      {$set: {key, value: value || getRandomValue()}},
      {upsert: true, new: true}
    );
  }
  async deleteAll(){
    await this.model.remove({});
    return {message: 'All data cleared'}
  }
  async deleteOne({key}){
    await this.model.deleteOne({key})
    return {message: `record with key: ${key} deleted`}
  }
}

