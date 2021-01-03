// eslint-disable-next-line import/no-extraneous-dependencies
import * as jwt from 'jsonwebtoken';

const {ExtractJwt} = require('passport-jwt');

export const getJwtToken = (id, role, signOptions = undefined) => {
	const payload = { id, role, timestamp: +new Date() };
	const token = jwt.sign(payload, jwtOptions.secretOrKey, signOptions);
	return token;
};

export const verifyJwtToken = async (token) => {
	try {
		const decoded = jwt.verify(token, jwtOptions.secretOrKey);
		return decoded;
	} catch (err) {
		return null;
	}
};
export const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: '912GWRUO21040RWUOG240CAPICUAG4ROJVDROVJADLAVPKQIRWOS'
};
