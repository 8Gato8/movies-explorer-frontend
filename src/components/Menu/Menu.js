import React from 'react'
import { Link } from 'react-router-dom'

function Menu({
	toggleSidebar
}) {
	return (
		<>
			<button type="button" onClick={toggleSidebar} className="nav__burger-button"></button>

			<ul className="nav__list nav__list_type_logged-in nav__list_type_hidden">

				<li className="nav__item"><Link className="nav__link nav__link_type_movies" to="пока неизвестный роут">Фильмы</Link></li>

				<li className="nav__item"><Link className="nav__link nav__link_type_saved-movies" to="movies">Сохранённые фильмы</Link></li>

				<div className="nav__account-container">

					<li className="nav__item"><Link className="nav__link nav__link_type_account" to="users/me">Аккаунт</Link>
					</li>

					<div className="nav__account-icon"></div>
				</div>
			</ul>
		</>
	)
}

export default Menu;