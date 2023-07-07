import React from "react";
import { IsLoggedInContext } from "../../contexts/IsLoggedInContext";
import { CurrentPathContext } from "../../contexts/CurrentPathContext";
import Logo from "../Logo/Logo";

import './Header.css';

import Navigation from '../Navigation/Navigation';

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
				<Logo additionalLinkStyles={''} additionalImgStyles={'header__logo'} />
				<Navigation />
			</div>

		</header>
	)
}

export default Header;