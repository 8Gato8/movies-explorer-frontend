import { makeApiRequest } from "./makeApiRequest";
import { baseUrlOwnApi } from "../constants/baseUrls";

/* user */

export function createUser(name, email, password) {
	return makeApiRequest(baseUrlOwnApi, '/signup', 'POST', { name, email, password });
}

export function login(email, password) {
	return makeApiRequest(baseUrlOwnApi, '/signin', 'POST', { email, password });
}

export function editUserInfo(email, name, token) {
	return makeApiRequest(baseUrlOwnApi, '/users/me', 'PATCH', { email, name }, token);
}

export function getUserInfo(token) {
	return makeApiRequest(baseUrlOwnApi, '/users/me', 'GET', undefined, token);
}

/* movie */

export function addMovie(movie, token) {
	return makeApiRequest(baseUrlOwnApi, '/movies', 'POST', movie, token);
}

export function deleteMovie(movieId, token) {
	return makeApiRequest(baseUrlOwnApi, `/movies/${movieId}`, 'DELETE', undefined, token);
}

export function getSavedMovies(token) {
	return makeApiRequest(baseUrlOwnApi, '/movies', 'GET', undefined, token);
}