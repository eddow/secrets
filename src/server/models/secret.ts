import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const schema = {
	secret: new Schema({
		hash: String,
		secretText: String,
		createdAt: Date,
		expiresAt: Date,
		remainingViews: Number
	})
};

const Secret = mongoose.model('Secret', schema.secret);
export default Secret;