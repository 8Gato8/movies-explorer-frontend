import React from "react";
import { IsLoggedInContext } from "../../contexts/IsLoggedInContext";
import { Link } from "react-router-dom";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import Menu from "../Menu/Menu";

import './Navigation.css';

import { useMediaQuery } from '../../utils/functions/useMediaQuery';

function Navigation() {
	const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
	const isLoggedIn = React.useContext(IsLoggedInContext);

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

	const isSidebarTooWide = useMediaQuery("(min-width: 787px)");

	return (
		<nav className="nav">
			{
				(!isLoggedIn)
					?
					<ul className="nav__list nav__list_type_not-logged-in">

						<li className="nav__item"><Link className="nav__link nav__link_type_signup" to="/signup">Регистрация</Link></li>
						<li className="nav__item"><Link className="nav__link nav__link_type_signin" to="/signin">Войти</Link></li>

					</ul>
					:
					(!isSidebarOpen)
						?
						<Menu toggleSidebar={toggleSidebar} />
						:
						!isSidebarTooWide ? <SidebarMenu toggleSidebar={toggleSidebar} /> : <Menu toggleSidebar={toggleSidebar} />
			}

		</nav >
	)
}

export default Navigation;