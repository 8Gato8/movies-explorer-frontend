import { makeApiRequest } from "./makeApiRequest";
import { baseUrlBeatfilmApi } from "../constants/baseUrls";

export function getBetFilmApiInfo() {
	return makeApiRequest(baseUrlBeatfilmApi, '', 'GET');
}