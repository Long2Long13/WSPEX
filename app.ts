import express from 'express'
import expressSession from 'express-session'
import path from 'path'
import jsonfile from 'jsonfile'
import { memoRoutes } from './memoRoutes'
import { User } from './model'
import { isLoggedIn } from './guard'
import { likeMemosRoutes } from './likeMemosRoutes'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(
	expressSession({
		secret: 'please include the newFilename of image',
		resave: true,
		saveUninitialized: true
	})
)
app.use('/memos', memoRoutes)
app.use('/like_memos', likeMemosRoutes)

declare module 'express-session' {
    interface SessionData {
        counter?: number
        user?: string
    }
}

app.post('/login', async (req, res) => {
	const userList: User[] = await jsonfile.readFile('users.json')

	if (
		userList.some(
			(user) =>
				user.username === req.body.username &&
				user.password === req.body.password
		)
	) {
		console.log('login ok')
		req.session.user = req.body.username
	}
	res.redirect('/')
})

app.use(express.static('./public'))

// admin.html should be inside protected
app.use(isLoggedIn, express.static('protected'))

app.use((req, res) => {
	res.status(404)
	res.sendFile(path.resolve('./public/404.html'))
})

const PORT = 8060

app.listen(PORT, () => {
	console.log(`listen on Port: ${PORT}`)
})
