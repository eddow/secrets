import {post, get} from '@/lib/ajax'

export class Secret {
	private constructor() {}
	static async create(secret: string, expireAfterViews: number, expireAfter: number) {
		return post('secret', {secret, expireAfterViews, expireAfter});
		// TODO: return hash
	}
	static async read(hash: string): Promise<Secret> {
		return get<Secret>(`secret/${hash}`);
		// TODO: create secret from answer
	}
}

export default Secret;