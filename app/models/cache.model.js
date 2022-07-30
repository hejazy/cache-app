import mongoose from 'mongoose';
import {ttlPlugin} from '../../lib/index.js';

var CacheSchema = new mongoose.Schema({
	key: {
		type : String,
		required: true
	},
	value: {
		type : String,
		required: true
	}
}, { timestamps: true, versionKey: false });

ttlPlugin(CacheSchema);

export const CacheModel = mongoose.model('Cache', CacheSchema);