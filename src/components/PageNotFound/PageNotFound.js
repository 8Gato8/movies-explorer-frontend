import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound({ setCurrentPath, currentPath }) {

	React.useEffect(() => {
		setCurrentPath(currentPath);
	}, [setCurrentPath, currentPath])

	return (
		<div className="not-found">
			<div className="not-found__container">
				<p className="not-found__code">404</p>
				<h3 className="not-found__title">
					Страница не найдена
				</h3>
				<Link className="not-found__button" to="/">Назад</Link>
			</div>
		</div>
	)
}

export default PageNotFound;