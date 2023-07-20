import express, { Request, Response } from 'express'
import { logger } from './logger'
import jsonfile from 'jsonfile'
import formidable from 'formidable'
import { Record } from './model'
import { form, parse } from './utils'
import { isLoggedInAPI } from './guard'

export const memoRoutes = express.Router()

memoRoutes.get('/', getMemos)
memoRoutes.post('/', postMemos)
memoRoutes.put('/:id', isLoggedInAPI, updateMemos)
memoRoutes.delete('/:id', isLoggedInAPI, deleteMemos)

export async function getMemos(req: Request, res: Response) {
	try {
		const memo: Record[] = await jsonfile.readFile('memos.json')
		res.json(memo)
	} catch (e) {
		logger.error(e)
		res.status(500).json({ msg: 'Failed' })
	}
}

export async function postMemos(req: Request, res: Response) {
	const [fields, files] = await parse(form, req)
	const memo: Record[] = await jsonfile.readFile('memos.json')

	memo.push({
		text: fields.text,
		image: (files.image as formidable.File)?.newFilename,
		like_by: []
	})

	await jsonfile.writeFile('memos.json', memo, { spaces: 4 })
	res.json(memo)
}

export async function updateMemos(req: Request, res: Response) {
	const memoIndex: any = req.params.id
	const newContent = req.body.text
	const memo: Record[] = await jsonfile.readFile('memos.json')

	memo[memoIndex].text = newContent
	console.log(memo)

	await jsonfile.writeFile('memos.json', memo, { spaces: 4 })
	res.json({ status: 'OK' })
}

export async function deleteMemos(req: Request, res: Response) {
	const memoIndex: number = Number(req.params.id)
	const memo: Record[] = await jsonfile.readFile('memos.json')

	memo.splice(memoIndex, 1)

	await jsonfile.writeFile('memos.json', memo, { spaces: 4 })
	res.json({ status: 'OK' })
}
