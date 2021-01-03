
class AdminService {
	checkHealth () {
		return Promise.resolve(Date.now());
	}

	checkApiVersion () {
		const version = process.env.API_VERSION;
		return Promise.resolve(version);
	}
}

module.exports = AdminService;
