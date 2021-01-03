import { Search } from '../db/models/search';

export const handleError = (resolve, error) => {
	resolve(new Search(500, 'Error', error.message, null));
};

/**
 * convierte la respuesta de sequelize en un objeto JSON
 * usar con findAll
 * @param {*} res objeto a convertir en JSON
 */
export const handleJSONArray = (res) => JSON.parse(JSON.stringify(res));
