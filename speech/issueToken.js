const request = require('request-promise');
let token;
let expiry;

module.exports = async function issueToken() {
	if (!token || Date.now() > expiry) {
		token = await request(process.env.AZURE_ISSUE_TOKEN_ENDPOINT, {
			method: 'POST',
			headers: {
				'Ocp-Apim-Subscription-Key': process.env.AZURE_SPEECH_SUBSCRIPTION_KEY,
				'Content-type': 'application/x-www-form-urlencoded',
				'Content-Length': 0,
			},
		});
		expiry = Date.now() + (9 * 60 * 1e3);
	}
	return token;
}
