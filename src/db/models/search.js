import { BaseModel } from './BaseModel';

export class Search extends BaseModel {
	constructor (status, message, developerMessage, items) {
		super();
		this.status = status;
		this.message = message;
		this.developerMessage = developerMessage;
		this.items = items;
	}
}
