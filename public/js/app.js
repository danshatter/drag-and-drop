(function() {
	'use strict';

	const dropzone = document.getElementById('drop-zone');
	const message = document.getElementById('message');

	dropzone.addEventListener('dragenter', e => e.target.style.backgroundColor = '#ddd');

	dropzone.addEventListener('dragleave', e => e.target.style.backgroundColor = null);

	dropzone.addEventListener('dragover', e => e.preventDefault());

	dropzone.addEventListener('drop', async e => {
		e.preventDefault();

		// Remove the grey background after dropping items
		e.target.style.backgroundColor = null;

		// The dropped files
		const files = e.dataTransfer.files;

		// Since files can only be uploaded with multipart/form-data, we have to make a form
		const body = new FormData();

		// Append the files to the form
		Array.from(files).forEach(file => body.append('files[]', file));

		const res = await fetch('/api/upload.php', {
			method: 'POST',
			body
		});

		const data = await res.json();

		// Display the message from the backend to the DOM and add the appropriate class
		message.textContent = data.message;
		message.classList.add(data.type);

		// Remove the message from the DOM and clear the class attribute
		setTimeout(() => {
			message.textContent = null;
			message.classList.remove(data.type);
		}, 3000);
	});
})();