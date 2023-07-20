import IncomingForm from 'formidable/Formidable'
import { Request } from 'express'
import formidable, { Fields, Files } from 'formidable'

export function parse(form: IncomingForm, req: Request) {
	return new Promise<[Fields, Files]>((resolve, reject) => {
		form.parse(req, async (err, fields, files) => {
			if (err) {
				reject(err)
			} else {
				resolve([fields, files])
			}
		})
	})
}

export const form = formidable({
	uploadDir: 'public/upload',
	keepExtensions: true,
	maxFiles: 1,
	maxFileSize: 200 * 1024 ** 2, // the default limit is 200KB
	filter: (part) => part.mimetype?.startsWith('image/') || false,
	filename: (originalName, originalExt, part) => {
		let timestamp = Date.now()
		let ext = part.mimetype?.split('/').pop()
		return `image-${timestamp}.${ext}`
	}
})
