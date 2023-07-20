import express, {Request, Response} from 'express';
import jsonfile from 'jsonfile';
import path from 'path';
import { isLoggedInAPI } from './guard';
import { Record, User } from './model'

export const likeMemosRoutes = express.Router()

declare module 'express-session' {
    interface SessionData {
        counter?: number
        user?: string
    }
}

likeMemosRoutes.get('/', getLikeMemo)
likeMemosRoutes.put('/:index', isLoggedInAPI, updateLikeMemo)

export async function getLikeMemo(req: Request, res: Response){
	const userId = parseInt(req.query.user_id as string);
	// Read from json files
	const memoList: Record[] = await jsonfile.readFile('./memos.json')
	const likeMemos = memoList.filter(memo => memo.like_by.includes(userId))

	res.json(likeMemos);
};

export async function updateLikeMemo(req: Request, res: Response){
	const targetMemoIndex = parseInt(req.params.index)
	const username = req.session.user
	const userList: User[] = await jsonfile.readFile('./users.json')

	const userID = userList.find(user => user.username === username)?.id

	const memoList: Record[] = await jsonfile.readFile('./memos.json')

	if(userID){
		memoList[targetMemoIndex].like_by.push(userID)
		await jsonfile.writeFile(path.resolve('memos.json'), memoList, { spaces: 4 })
		res.json({msg:'success'})
	}else{
		res.status(500).json({msg:'server error'})
	}
}