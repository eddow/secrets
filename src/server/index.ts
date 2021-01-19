import * as express from 'express';
import * as morgan from 'morgan';
import api from './api';
import {join} from 'path';
import config from './config';
import * as bodyParser from 'body-parser'

const app = express();
app.use(morgan('dev'));
app.use(express.static('./dist/client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); 
app.use('/', api);

app.use(function(req, res) {
	res.sendFile(join(process.cwd(), './dist/client/index.html'));
});

app.listen(config.http.port, ()=> console.log(`Listening on port ${config.http.port}`));
