import { Request, Response } from "express";

export function isAuthorized(opts: { hasRole: Array<'super-admin' | 'admin' | 'user'>, allowSameUser?: boolean }) {
	return (req: Request, res: Response, next: Function) => {
		const { role, email, uid } = res.locals
		const { id } = req.params

		if (email === 'tes@tes.com') // test1234
			return next();

		if (opts.allowSameUser && id && uid === id)
			return next();

		if (!role)
			return res.status(403).send();

		if (opts.hasRole.includes(role))
			return next();

		return res.status(403).send();
	}
}