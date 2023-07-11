import React from 'react';

import './Portfolio.css';

function Portfolio() {
	return (
		<section className="portfolio">
			<h2 className="portfolio__heading">Портфолио</h2>

			<a href="https://github.com/8Gato8/how-to-learn" className="portfolio__link" rel="noreferrer" target="_blank">Статичный сайт</a>

			<a href="https://github.com/8Gato8/russian-travel" className="portfolio__link" rel="noreferrer" target="_blank">Адаптивный сайт</a>

			<a href="https://github.com/8Gato8/react-mesto-api-full-gha" className="portfolio__link" rel="noreferrer" target="_blank">Одностраничное приложение</a>
		</section>
	)
}

export default Portfolio;