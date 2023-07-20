import { makeApiRequest } from "./makeApiRequest";
import { BASE_URL_BEAT_FILM_API } from "../constants/baseUrls";

export function getBetFilmApiInfo() {
	return makeApiRequest(BASE_URL_BEAT_FILM_API, '', 'GET');
}