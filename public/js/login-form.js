document
	.querySelector('#login-form')
	.addEventListener('submit', async (event) => {
		event.preventDefault() // To prevent the form from submitting synchronously
		const form = event.target
		let formObject = {
			username: form.username.value,
			password: form.password.value
		}
		//... create your form object with the form inputs
		const res = await fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formObject)
		})

		// Clear the form here
		form.reset()
	})
