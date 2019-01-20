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
						fetch('/api/recording' + window.location.search, {
							method: 'POST',
							body: formData,
						}).then(function (res) {
							return res.json();
						}).then(function (body) {
							console.log(body)
							$('.finish-record').addClass('finish-record-start');
							$('.finish-record-container').addClass('finish-record-container-start');
							if (body.success) {
								if (body.isValid) {
									$('.finish-record-container p')
										.text('You pronounced the word "' + body.text + '" correctly! Now encourage other people to learn it.')
										.removeClass('text-danger')
										.addClass('text-success');
									$('.finish-record-container button')
										.text('Continue');
								} else {
									$('.finish-record-container p')
										.text('Your pronounciation of "' + body.text + '" was off, try again, make sure you listen to the correct pronounciation.')
										.removeClass('text-success')
										.addClass('text-danger')
								}
							} else {
								$('.finish-record-container p')
									.text(body.error || 'Please sign in to submit your recording.')
									.removeClass('text-success')
									.addClass('text-danger');
								
							}
						}).catch(function (err) {
							console.error(err)
							$('.finish-record-container p')
								.text(err.message)
								.removeClass('text-success')
								.addClass('text-danger');
							$('.finish-record').addClass('finish-record-start');
							$('.finish-record-container').addClass('finish-record-container-start');
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
