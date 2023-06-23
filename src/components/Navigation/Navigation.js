import React from "react"
import { IsLoggedInContext } from "../../contexts/isLoggedInContext"
import { Link } from "react-router-dom";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import Menu from "../Menu/Menu";

function Navigation() {
	const [sidebar, setSidebar] = React.useState(false);
	const isLoggedIn = React.useContext(IsLoggedInContext);

	const toggleSidebar = () => setSidebar(!sidebar);

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
					(!sidebar)
						?
						<Menu toggleSidebar={toggleSidebar} />
						:
						<SidebarMenu toggleSidebar={toggleSidebar} />
			}

		</nav >
	)
}

export default Navigation;