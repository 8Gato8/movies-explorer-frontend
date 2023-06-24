import React from 'react'

function Footer() {
	return (
		<footer className="footer">
			<div className="footer__container">

				<p className="footer__caption">Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</p>

				<p className="footer__copyright">&copy; {new Date().getFullYear()}</p>

				<nav className="footer__nav">

					<ul className="footer__nav-list">

						<li className="footer__nav-item"><a href="https://practicum.yandex.ru/" className="footer__nav-link">Яндекс.Практикум</a></li>
						<li className="footer__nav-item"><a href="https://github.com/8Gato8" className="footer__nav-link">Github</a></li>

					</ul>
				</nav>
			</div>
		</footer>
	)
}

export default Footer