export async function loadMemos() {
	const res = await fetch('/memos')
	const memos = await res.json()

	const memosContainer = document.querySelector('#memos-container')

	memosContainer.innerHTML = ''

	for (let memo of memos) {
		memosContainer.innerHTML += ` 
            <div class="memo-item-container">
                <textarea class="memo">${memo.text}</textarea>
                <i class="bi bi-trash-fill"></i>
                <i class="bi bi-pencil-square"></i>
				<i class="bi bi-star-fill"></i>                   
            </div>
             `
	}

	const memoList = document.querySelectorAll('#memos-container .memo')
	const memoEditButton = document.querySelectorAll('.memo-item-container > .bi-pencil-square')
	
	memoEditButton.forEach((memo, index) => {
		memo.addEventListener('click', async () => {
			const res = await fetch(`/memos/${index}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ text: memoList[index].value })
			})
			
			// // Clear the form here
			// form.reset();
		})
	})
	
	//Delete function
	const memoDeleteButton = document.querySelectorAll('.memo-item-container > .bi-trash-fill')
	memoDeleteButton.forEach((memo, index) => {
		memo.addEventListener('click', async () => {
			const res = await fetch(`/memos/${index}`, {
				method: 'Delete'
			})
			loadMemos()
		})
	})

	const memoLikeButton = document.querySelectorAll('.memo-item-container > .bi-star-fill')
	memoLikeButton.forEach((memo, index) => {
		memo.addEventListener('click', async () => {
			const res = await fetch(`/like_memos/${index}`, {
				method: 'Put'
			})
		})
	})

}
