import * as express from 'express';
import {md5, encrypt, decrypt} from '@/lib/utils'
import {Secret} from '@/lib/mongo'

var api = express();
api.get('/:hash', (req, res)=> {
	const filter: any = {hash: req.params.hash};
	try {
		var rv = await Secret.findOne(filter);
		// TODO: decrement views, check TTL

		if(!rv) {
			res.status(404);
			res.send('No such secret');
		} else {
			rv.secret = decrypt(rv.secret);
			res.send(rv);
		}
	} catch(err) {
		res.status(500);
		res.send(err.message);
	}
});
api.post('/', async (req, res)=> {
	let secret = new Secret({
		hash: md5(req.params.hash),
		secretText: encrypt(req.fields.secret),
		createdAt: new Date(),
		expiresAt: null,
		remainingViews: req.fields.expireAfterViews
	});
	if(req.fields.expireAfter) {
		let expiration = new Date();
		expiration.setTime(expiration.getTime()+req.fields.expireAfter*60*1000)
		secret.expiresAt = expiration;
	}
	try {
		Secret.insertOne(secret);
	} catch(err) {
		res.status(500);
		res.send(err.message);
	};
});

export default api;