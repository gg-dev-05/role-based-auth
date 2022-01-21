import { Application } from "express";
import { container1, container2, container3, create, test} from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

export function routesConfig(app: Application) {
	app.get('/test',
		test
	);	

	app.post('/create',
		create
	);

	app.get('/container1',
		isAuthenticated,
		isAuthorized({ hasRole: ['super-admin', 'admin'] }),
		container1
	);

	app.get('/container2', [
		isAuthenticated,
		isAuthorized({ hasRole: ['super-admin'] }),
		container2
	]);

	app.get('/container3', [
		isAuthenticated,
		isAuthorized({ hasRole: ['super-admin', 'admin', 'user'], allowSameUser: true }),
		container3
	]);
}
