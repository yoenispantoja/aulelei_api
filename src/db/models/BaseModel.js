export class BaseModel {
	parse (entity) {
		Object.keys(this).forEach((key) => {
			if (entity[key]) {
				this[key] = entity[key];
			}
		});
		return this;
	}
}
