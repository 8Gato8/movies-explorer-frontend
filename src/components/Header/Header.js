import React from "react";
import { IsLoggedInContext } from '../../contexts/isLoggedInContext';

import Navigation from '../Navigation/Navigation';

import logoSrc from '../../images/logo.svg';

function Header() {

	const isLoggedIn = React.useContext(IsLoggedInContext);

	return (
		<header className={`${isLoggedIn ? 'header' : 'header_theme_landing'} app__header`}>

			<div className={`${isLoggedIn ? 'header__container_type_logged_in' : 'header__container_type_not_logged_in'} header__container`}>
				<img className="header__logo" src={logoSrc} alt="Лого проекта" />

				<Navigation />
			</div>

		</header>
	)
}

export default Header;