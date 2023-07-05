import React from "react";
import { IsLoggedInContext } from "../../contexts/IsLoggedInContext";
import { CurrentPathContext } from "../../contexts/CurrentPathContext";
import { Link } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';

import logoSrc from '../../images/logo.svg';

function Header() {

	const isLoggedIn = React.useContext(IsLoggedInContext);
	const currentPath = React.useContext(CurrentPathContext);

	return (
		<header className={`${isLoggedIn ? 'header' : 'header_theme_landing'} 
		${currentPath === '/signup'
				|| currentPath === '/signin'
				|| currentPath === '*'
				? 'header_type_hidden'
				: ''
			}`
		}>

			<div className={`${isLoggedIn ? 'header__container_type_logged_in' : 'header__container_type_not_logged_in'} header__container`}>
				<Link to="/"><img className="header__logo logo" src={logoSrc} alt="Лого проекта" /></Link>
				<Navigation />
			</div>

		</header>
	)
}

export default Header;