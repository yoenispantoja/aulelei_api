import MStorage from './storage';

export class BaseService {
	constructor () {
		this.mstorage = new MStorage();
	}
}
