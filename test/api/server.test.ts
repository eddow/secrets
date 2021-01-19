import './db-mgt'
import axios from 'axios'
const connection = axios.create({
	baseURL: 'http://localhost:'+global['config'].http.port
})

describe('http api', function() {
  it('reads', async function() {
    let rslt = await connection.get('/api/secret/42');
    expect(rslt.data.secretText).toBe('My little secret');
  });

  it('deletes', async function() {
	  // item 43 has only one view
    await connection.get('/api/secret/43');
	expect(connection.get('/api/secret/43')).rejects.toThrow(); //Request failed with status code 404
  });

  it('creates', async function() {
    var rslt = await connection.post('/api/secret', {
		secret: 'A new secret',
		expireAfterViews: 3,
		expireAfter: 0
	});
	rslt = await connection.get('/api/secret/'+rslt.data.hash);
	expect(rslt.data.secretText).toBe('A new secret')
  });
});