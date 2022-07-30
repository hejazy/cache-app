import { CacheModel } from "../models/index.js";
import {getRandomValue} from '../helpers/index.js';

export class CacheService {
  
  constructor() {
    if (CacheService._instance) {
      return CacheService._instance
    }
    CacheService._instance = this;
  }

  async getAll(){
    return await CacheModel.find({});
  }
  async getByKey({key}){
    return await CacheModel.findOne({key});
  }
  async create({key, value}){
    return await CacheModel.findOneAndUpdate(
      {key},
      {$set: {key, value: value || getRandomValue()}},
      {upsert: true, new: true}
    );
  }
  async update({key, value}){
    return await CacheModel.findOneAndUpdate(
      {key},
      {$set: {key, value: value || getRandomValue()}},
      {upsert: true, new: true}
    );
  }
  async deleteAll(){
    await CacheModel.remove({});
    return {message: 'All data cleared'}
  }
  async deleteOne({key}){
    await CacheModel.deleteOne({key})
    return {message: `record with key: ${key} deleted`}
  }
}

