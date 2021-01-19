import * as mongoose from 'mongoose';
import config from '@/config';

const mongo = mongoose.connect(config.mongo.connect, {useNewUrlParser: true, useUnifiedTopology: true});
export default mongo;

