import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound({ setCurrentPath, currentPath }) {

	React.useEffect(() => {
		setCurrentPath(currentPath);
	}, [setCurrentPath, currentPath])

	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1)
	}

	return (
		<div className="not-found">
			<div className="not-found__container">
				<p className="not-found__code">404</p>
				<h3 className="not-found__title">
					Страница не найдена
				</h3>
				<button className="not-found__redirection-link redirection-link" onClick={goBack}>Назад</button>
			</div>
		</div>
	)
}

export default PageNotFound;