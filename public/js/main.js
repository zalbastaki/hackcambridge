let mimeDb = null;

fetch('https://unpkg.com/mime-db@1.37.0/db.json')
	.then(function (res) {
		return res.json();
	})
	.then((_mimeDb) => { mimeDb = _mimeDb })

$(document).ready(function() {
	let mediaRecorder;
	let audioChunks;


	$('#record[data-active=""]').on('touchstart', function(event) {
		event.preventDefault();
		$(this).addClass('recording')

		navigator.mediaDevices.getUserMedia({ audio: true })
			.then(stream => {
				mediaRecorder = new MediaRecorder(stream);
				mediaRecorder.start();

				audioChunks = [];

				mediaRecorder.addEventListener("dataavailable", event => {
				  audioChunks.push(event.data);
				});

				mediaRecorder.addEventListener("stop", () => {
					const blob = new Blob(audioChunks);
					const extensions = mimeDb[mediaRecorder.mimeType.split(';')[0]].extensions
					if (extensions && extensions.length) {
						const fileName = 'recording.' + extensions[0];
						const file = new File([blob], fileName, {
							type: mediaRecorder.mimeType,
						});
						const formData = new FormData();
						formData.append('recording', file, fileName);
						fetch('/api/recording', {
							method: 'POST',
							body: formData,
						});
					} else {
						throw new Error('Unsupported mime type ' + mediaRecorder.mimeType);
					}
				});
			});
	})

	$('#record[data-active=""]').on('touchend', function(event) {
		event.preventDefault();
		$(this).removeClass('recording')
		mediaRecorder.stop();
	})
});
