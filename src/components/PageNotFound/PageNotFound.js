import React from 'react';
import { useNavigate } from 'react-router-dom';

import './PageNotFound.css';

function PageNotFound({ setCurrentPath, currentPath }) {

	React.useEffect(() => {
		setCurrentPath(currentPath);
	}, [setCurrentPath, currentPath])

	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1)
	}

	return (
		<section className="not-found">
			<main className="not-found__container">
				<p className="not-found__code">404</p>
				<h1 className="not-found__title">
					Страница не найдена
				</h1>
				<button className="not-found__redirection-link redirection-link" onClick={goBack}>Назад</button>
			</main>
		</section>
	)
}

export default PageNotFound;