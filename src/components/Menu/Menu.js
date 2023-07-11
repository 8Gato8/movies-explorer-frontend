import React from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

function Menu({ toggleSidebar }) {

	return (
		<>
			<button type="button" onClick={toggleSidebar} className="nav__burger-button"></button>

			<ul className="nav__list nav__list_type_logged-in nav__list_hidden">

				<li className="nav__item nav__item_type_movies"><Link className="nav__link nav__link_type_movies" to="/movies">Фильмы</Link></li>

				<li className="nav__item nav__item_type_saved-movies"><Link className="nav__link nav__link_type_saved-movies" to="/saved-movies">Сохранённые фильмы</Link></li>

				<li className="nav__item nav__item_type_account">

					<Link className="nav__link nav__link_type_account" to="/profile">Аккаунт</Link>

					<div className="nav__account-icon"></div>
				</li>
			</ul>
		</>
	)
}

export default Menu;