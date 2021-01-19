import {readYaml} from './lib/utils';
import * as argv from 'argv';

var options = argv.option([{
    name: 'config',
    short: 'c',
    type: 'string'
}]).run().options;

const server = readYaml(options.config || 'srv-prod');
export default server;