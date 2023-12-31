import React from 'react';
import { CurrentPathContext } from "../../contexts/CurrentPathContext";

import './Footer.css';

function Footer() {

	const currentPath = React.useContext(CurrentPathContext);

	return (
		<footer className={
			`footer 
			${currentPath === '/signup'
				|| currentPath === '/signin'
				|| currentPath === '/profile'
				|| currentPath === '*'
				? 'footer_type_hidden'
				: ''
			}`
		}>
			<div className="footer__container">

				<h3 className="footer__caption">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</h3>

				<p className="footer__copyright">©{new Date().getFullYear()}</p>

				<nav className="footer__nav">

					<ul className="footer__nav-list">

						<li className="footer__nav-item"><a href="https://practicum.yandex.ru/" className="footer__nav-link" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
						<li className="footer__nav-item"><a href="https://github.com/8Gato8" className="footer__nav-link" target="_blank" rel="noreferrer">Github</a></li>

					</ul>
				</nav>
			</div>
		</footer>
	)
}

export default Footer;