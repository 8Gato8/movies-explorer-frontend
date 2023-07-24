export const convertMinutes = (minutes) => {
	return `${Math.trunc(minutes / 60)}ч ${(minutes % 60)}м`;
}