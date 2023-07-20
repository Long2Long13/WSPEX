export interface Record {
	text: string | string[]
	like_by: number[]
	image?: string
}

export interface User {
	username: string
	password: string
	id: number
}
