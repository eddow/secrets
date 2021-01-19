import * as mongoose from 'mongoose';
import config from '@/config';

const mongo = mongoose.connect(config.mongo.connect, {useNewUrlParser: true, useUnifiedTopology: true});
export default mongo;

const Schema = mongoose.Schema;
export const ObjectId = mongoose.ObjectId;

export const schema = {
	secret: new Schema({
		hash: String,
		secretText: String,
		createdAt: Date,
		expiresAt: Date,
		remainingViews: Number
	})
};

export const Secret = mongoose.model('Secret', schema.secret);
