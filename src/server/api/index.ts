import Secret from './secret';
import * as express from 'express';

const api = express();
var apis = {Secret};
for(let i in apis)
	api.use(`/api/${i.toLowerCase()}`, apis[i]);

export default api;
