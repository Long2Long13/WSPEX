import express from 'express'
import path from 'path'

declare module 'express-session' {
	interface SessionData {
		counter?: number
		user?: string
	}
}

export const isLoggedIn = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if (req.session?.user) {
		next()
	} else {
		res.status(404)
		res.sendFile(path.resolve('./public/404.html'))
	}
}

export const isLoggedInAPI = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	if (req.session?.user) {
		next()
	} else {
		res.status(400)
		res.json({ error: 'You have No permission!' })
	}
}
