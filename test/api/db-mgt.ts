import {readYaml} from '../../src/server/lib/utils';
import Secret from '../../src/server/models/secret'

import * as mongoose from 'mongoose';
import {exec, ChildProcess} from 'child_process';

const config = readYaml('srv-test');
var mongo, serverProcess: ChildProcess;

async function emptyDB() {
	let collection = mongoose.connection.collection('secrets');
	if(collection)
		return new Promise((resolve, reject) => {
			collection.drop(function(err) {
				console.log('test collection dropped');
				resolve();
			});
		});
}

beforeAll(async () => {
	jest.setTimeout(10000);	// To wait the server to start
	/// Prepare a fresh DB
	mongo = mongoose.connect(config.mongo.connect, {useNewUrlParser: true, useUnifiedTopology: true});
	await emptyDB();	//just in case something went wrong in the last execution
	let seed = readYaml('seed', './test');
	await Secret.create(seed.secrets);
	
	/* Start the test-server
	serverProcess = exec('node dist/server -c srv-test', {
		cwd: '.'
	});
	serverProcess.stdout.on('data', (data) => {
		console.log(`[SRVR] ${data}`);
	});
	await new Promise((resolve, reject) => {
		const triggerListen = (data: string)=> {
				if(~data.indexOf('Listening on port')) {
					serverProcess.stdout.off('data', triggerListen);
					serverProcess.off('exit', triggerFail);
					resolve();
				}
			}, triggerFail = ()=> {
				serverProcess.stdout.off('data', triggerListen);
				serverProcess.off('exit', triggerFail);
				reject();
			}
		serverProcess.stdout.on('data', triggerListen);
		serverProcess.on('exit', triggerFail);
	});*/
});

afterAll(async () => {
	await emptyDB();
	/*await serverProcess.kill('SIGINT');
	serverProcess.stdout.removeAllListeners("data");
	serverProcess.stderr.removeAllListeners("data");
	serverProcess.stdout.pipe(process.stdout);
	serverProcess.stderr.pipe(process.stderr);*/
	await mongoose.connection.close();
});