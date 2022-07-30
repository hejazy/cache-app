import mongoose from 'mongoose';
// import {ttlPlugin, autoAddValueForKey} from '../../lib/database/plugins/index.js';

var CacheSchema = new mongoose.Schema({
	key: {
		type : String,
		required: true
	},
	value: {
		type : String,
		required: true
	}
}, { timestamps: true });

// autoAddValueForKey(schema);
// ttlPlugin(schema);

export const CacheModel = mongoose.model('Cache', CacheSchema);