import React from 'react'
import { Link } from 'react-router-dom';

function SidebarMenu({ toggleSidebar }) {

	return (
		<>
			<div className="blur"></div>

			<ul className="nav__list nav__list_type_logged-in nav__list_type_sidebar">

				<li onClick={toggleSidebar} className="nav__item nav__item_type_main"><Link className="nav__link nav__link_style_sidebar" to="/">Главная</Link></li>

				<li onClick={toggleSidebar} className="nav__item nav__item_type_movies"><Link className="nav__link nav__link_type_movies nav__link_style_sidebar" to="movies">Фильмы</Link></li>

				<li onClick={toggleSidebar} className="nav__item nav__item_type_saved-movies"><Link className="nav__link nav__link_type_saved-movies nav__link_style_sidebar" to="saved-movies">Сохранённые фильмы</Link></li>

				<div className="nav__account-container nav__account-container_type_sidebar">

					<li onClick={toggleSidebar} className="nav__item"><Link className="nav__link nav__link_type_account" to="/profile">Аккаунт</Link>
					</li>

					<div className="nav__account-icon"></div>
				</div>

				<button type="button" onClick={toggleSidebar} className="nav__close-button"></button>
			</ul>

		</>
	)
}

export default SidebarMenu;