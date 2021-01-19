import {post, get} from '@/lib/ajax'

export class Secret {
	private constructor() {}
	static async create(secret: string, expireAfterViews: number, expireAfter: number) {
		return await post('secret', {secret, expireAfterViews, expireAfter});
	}
	static async read(hash: string): Promise<Secret> {
		return await get<Secret>(`secret/${hash}`);
	}
}

export default Secret;