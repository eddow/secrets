import * as crypto from 'crypto';
import * as yaml from 'yaml';
import {readFileSync} from 'fs';
import {join} from 'path';

export function md5(s: string) {
	return crypto.createHash('md5').update(s).digest('hex');
}

export function readYaml(file: string, path?: string) {
	const liop = file.lastIndexOf('.');
	if(liop <= file.lastIndexOf('/') && liop <= file.lastIndexOf('\\'))
		file += '.yaml';
	file = readFileSync(join(process.cwd(), path || './dist/server/', file), 'utf8');
	return yaml.parse(file);
}

export function encrypt(text: string) {
	// TODO
	return text;
}

export function decrypt(text: string) {
	// TODO
	return text;
}
