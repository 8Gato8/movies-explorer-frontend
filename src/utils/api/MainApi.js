import { makeApiRequest } from "./makeApiRequest";
import { BASE_URL_OWN_API } from "../constants/baseUrls";

/* user */

export function createUser(name, email, password) {
	return makeApiRequest(BASE_URL_OWN_API, '/signup', 'POST', { name, email, password });
}

export function login(email, password) {
	return makeApiRequest(BASE_URL_OWN_API, '/signin', 'POST', { email, password });
}

export function editUserInfo(email, name, token) {
	return makeApiRequest(BASE_URL_OWN_API, '/users/me', 'PATCH', { email, name }, token);
}

export function getUserInfo(token) {
	return makeApiRequest(BASE_URL_OWN_API, '/users/me', 'GET', undefined, token);
}

/* movie */

export function addMovie(movie, token) {
	return makeApiRequest(BASE_URL_OWN_API, '/movies', 'POST', movie, token);
}

export function deleteMovie(movieId, token) {
	return makeApiRequest(BASE_URL_OWN_API, `/movies/${movieId}`, 'DELETE', undefined, token);
}

export function getSavedMovies(token) {
	return makeApiRequest(BASE_URL_OWN_API, '/movies', 'GET', undefined, token);
}