import { describe, it } from 'mocha';

const {assert} = require('chai');

const AdminService = require('./admin');

const adminServices = new AdminService();

describe('Admin Service', () => {
	it('Should return a timestamp grate than the query moment', (done) => {
		const aDate = Date.now();
		setTimeout(() => {
			adminServices.checkHealth()
				.then(time => {
					assert.isTrue(aDate < time);
					done();
				})
				.catch(e => done(e));
		}, 500);
	});
});
