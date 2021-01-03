import { BaseModel } from './BaseModel';
import { Item as User } from './user';

export class Item extends BaseModel {
	constructor ({token, active, userId, user}) {
		super();
		this.token = token;
		this.active = active;
		this.userId = userId;
		if (user) this.user = new User(user);
	}
}
