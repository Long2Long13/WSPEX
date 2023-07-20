

window.onload = async () => {  // should be inside window.onload
	const searchParams = new URLSearchParams(location.search);
	const userID = searchParams.get('user_id');
	
    // alert( 'userId=' + userID )
    // Use the id to fetch data from 
	const res = await fetch(`/like_memos?user_id=${userID}`);
	const liked_memos = await res.json();
	// Rest of the code 
    const memoContainer = document.querySelector('#memos-container')

	for (let memo of liked_memos) {
		memoContainer.innerHTML += `<textarea class="memo">${memo.text}</textarea>`
	}
}