import * as express from 'express';
import {md5, encrypt, decrypt} from '@/lib/utils'
import Secret from '@/models/secret'

var api = express();
api.get('/:hash', async (req, res)=> {
	const filter: any = {hash: req.params.hash};
	try {
		var rv = await Secret.findOne(filter);

		if(rv) {
			let now = (new Date()).getTime();
			if(rv.expiresAt && now > rv.expiresAt.getTime()) {
				rv.deleteOne();
				rv = null;
			}
			if(--rv.remainingViews)
				rv.save();
			else
				rv.deleteOne();
		}

		if(!rv) {
			res.status(404);
			res.send('No such secret');
		} else {
			res.send({
				hash: rv.hash,
				secretText: decrypt(rv.secretText),
				createdAt: rv.createdAt,
				expiresAt: rv.expiresAt,
				remainingViews: rv.remainingViews
			});
		}
	} catch(err) {
		res.status(500);
		res.send(err.message);
	}
});
api.post('/', async (req, res)=> {
	try {
		let secret = {
			hash: md5(req.body.secret),
			secretText: encrypt(req.body.secret),
			createdAt: new Date(),
			expiresAt: null,
			remainingViews: req.body.expireAfterViews
		};
		if(req.body.expireAfter) {
			let expiration = new Date();
			expiration.setTime(expiration.getTime()+req.body.expireAfter*60*1000)
			secret.expiresAt = expiration;
		}
		await Secret.create(secret);
		res.send(secret);
	} catch(err) {
		res.status(500);
		console.log(err);
		res.send(err.message);
	};
});

export default api;