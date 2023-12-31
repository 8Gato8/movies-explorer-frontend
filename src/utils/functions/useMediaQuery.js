import React from 'react';

export const useMediaQuery = (value) => {

	const mediaQuery = React.useMemo(() => window.matchMedia(value), [value]);
	const [match, setMatch] = React.useState(mediaQuery.matches);

	React.useEffect(() => {
		const onChange = () => setMatch(mediaQuery.matches);
		mediaQuery.addEventListener("change", onChange);

		return () => mediaQuery.removeEventListener("change", onChange);
	}, [mediaQuery]);

	return match;
}