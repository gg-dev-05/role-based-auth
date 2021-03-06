import { Request, Response } from "express";
import * as admin from "firebase-admin"
// import { auth } from "firebase-admin";

export async function test(req: Request, res: Response) {
	res.send("Ok??")
}

// export async function getAllUsers(req: Request, res: Response) {
// 	auth	
// }

export async function create(req: Request, res: Response) {
	try {
		const { displayName, password, email, role } = req.body

		if (!displayName || !password || !email || !role) {
			return res.status(400).send({ message: 'Missing fields' })
		}

		const { uid } = await admin.auth().createUser({
			displayName,
			password,
			email
		})
		if (role === "super-admin") {
			await admin.auth().setCustomUserClaims(uid, {"super-admin":true})
			return res.status(201).send({ uid })
		}
		if (role === "admin") {
			await admin.auth().setCustomUserClaims(uid, {"admin":true})
			return res.status(201).send({ uid })
		}
		else {
			await admin.auth().setCustomUserClaims(uid, {"user":true})
			return res.status(201).send({ uid })
		}

	} catch (err) {
		return handleError(res, err)
	}
}

export async function container1(req: Request, res: Response) {
	res.status(200).send({
		data: 
			"This is container 1",
	})
}

export async function container2(req: Request, res: Response) {
	res.status(200).send({
		data: 
			"This is container 2",
	})
}

export async function container3(req: Request, res: Response) {
	res.status(200).send({
		data: 
			"This is container 3",
	})
}


// function mapUser(user: admin.auth.UserRecord) {
// 	const customClaims = (user.customClaims || { role: '' }) as { role?: string }
// 	const role = customClaims.role ? customClaims.role : ''
// 	return {
// 		uid: user.uid,
// 		email: user.email || '',
// 		displayName: user.displayName || '',
// 		role,
// 		lastSignInTime: user.metadata.lastSignInTime,
// 		creationTime: user.metadata.creationTime
// 	}
// }

function handleError(res: Response, err: any) {
	return res.status(500).send({ message: `${err.code} - ${err.message}` });
}

// export async function all(req: Request, res: Response) {
// 	try {
// 		const listUsers = await admin.auth().listUsers()
// 		const users = listUsers.users.map(mapUser)
// 		return res.status(200).send({ users })
// 	} catch (err) {
// 		return handleError(res, err)
// 	}
// }

// export async function get(req: Request, res: Response) {
// 	try {
// 		const { id } = req.params
// 		const user = await admin.auth().getUser(id)
// 		return res.status(200).send({ user: mapUser(user) })
// 	} catch (err) {
// 		return handleError(res, err)
// 	}
// }

// export async function patch(req: Request, res: Response) {
// 	try {
// 		const { id } = req.params
// 		const { displayName, password, email, role } = req.body

// 		if (!id || !displayName || !password || !email || !role) {
// 			return res.status(400).send({ message: 'Missing fields' })
// 		}

// 		await admin.auth().updateUser(id, { displayName, password, email })
// 		await admin.auth().setCustomUserClaims(id, { role })
// 		const user = await admin.auth().getUser(id)

// 		return res.status(204).send({ user: mapUser(user) })
// 	} catch (err) {
// 		return handleError(res, err)
// 	}
// }

// export async function remove(req: Request, res: Response) {
// 	try {
// 		const { id } = req.params
// 		await admin.auth().deleteUser(id)
// 		return res.status(204).send({})
// 	} catch (err) {
// 		return handleError(res, err)
// 	}
// }
