const request = require('request-promise');
const issueToken = require('./issueToken');

/**
 * @param {File|Blob} file mime must be "audio/ogg; codecs=opus"
 */
async function speechToText(file) {
	const token = await issueToken();
	const res = await request(`${process.env.AZURE_SPEECH_RECOGNITION_ENDPOINT}?language=en-US&profanity=raw`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-type': 'audio/ogg; codecs=opus',
			'Accept': 'application/json',
		},
		body: file,
	});
	const body = JSON.parse(res);
	if (body.RecognitionStatus === "Success") {
		return body.DisplayText;
	} else {
		console.error(body);
		throw new Error('Azure Speech-To-Text failed with status ' + body.RecognitionStatus);
	}
}

module.exports = speechToText
