import { loadMemos } from './load-memos.js'

document
	.querySelector('#memo-form')
	.addEventListener('submit', async function (event) {
		event.preventDefault()

		// Serialize the Form afterwards
		const form = event.target
		const formData = new FormData()

		formData.append('text', form.text.value)
		formData.append('image', form.image.files[0])

		const res = await fetch('/memos', {
			method: 'POST',
			body: formData
		})
		form.reset()

		await loadMemos()
	})
