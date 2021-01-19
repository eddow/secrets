import {readYaml} from '../../src/server/lib';
import * as mongoose from 'mongoose';

const config = readYaml('srv-test');
var mongo;

beforeAll(() => {
	mongo = mongoose.connect(config.mongo.connect, {useNewUrlParser: true, useUnifiedTopology: true});
	// import from db-test.yaml
	// cfr https://www.npmjs.com/package/seedgoose
});

afterAll(() => {
	mongoose.connection.db.dropDatabase();
});