const request = require('request-promise');
const issueToken = require('./issueToken');

module.exports = function speakerRecognition() {
	const token = await issueToken();
	const createIdentificationProfile = await request(`${process.env.AZURE_SPEAKER_RECOGNITION_ENDPOINT}/identificationProfiles`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-type': 'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify({
			locale: 'en-us',
		}),
	});
	const { identificationProfileId } = JSON.parse(createIdentificationProfile)
	const enrollIdentificationProfile = await request(`${process.env.AZURE_SPEAKER_RECOGNITION_ENDPOINT}/identificationProfiles/${identificationProfileId}/enroll?shortAudio`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-type': 'audio/ogg; codecs=opus',
			'Accept': 'application/json',
		},
		body: file,
	});
	const body = JSON.parse(enrollIdentificationProfile);
	const identify = await request(`${process.env.AZURE_SPEAKER_RECOGNITION_ENDPOINT}/identify?identificationProfileIds=${identificationProfileId}&shortAudio`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${token}`,
			'Content-type': 'audio/ogg; codecs=opus',
			'Accept': 'application/json',
		},
		body: file,
	});
	return body;
}
