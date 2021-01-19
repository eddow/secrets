import config from '../config'
import * as Cryptr from 'cryptr'

// Encryption is optional to avoid it while testing
const cryptr = config.encryptionKey ? new Cryptr(config.encryptionKey) : null;

export function encrypt(text: string) {
	return cryptr?cryptr.encrypt(text):text;
}

export function decrypt(text: string) {
	return cryptr?cryptr.decrypt(text):text;
}