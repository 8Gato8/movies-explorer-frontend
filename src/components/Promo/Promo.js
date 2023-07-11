import React from 'react'
import logoLandingSrc from '../../images/landing-logo.svg';

import './Promo.css';

function Promo() {
	return (
		<div className="promo-wrapper">
			<section className="promo">
				<h1 className="promo__heading">
					Учебный проект <span className="promo__nowrap-first-line">студента факультета</span> <span className="promo__nowrap-second-line">Веб-разработки.</span>
				</h1>

				<p className="promo__hint">Листайте ниже, чтобы узнать больше про этот проект и&nbsp;его создателя.</p>

				<img src={logoLandingSrc} alt="Лого страницы о проекте" className="promo__logo" />
				<button type="button" className="promo__nav-button"><a href="#about-project" className="promo__link">Узнать больше</a></button>

			</section>
		</div>
	)
}

export default Promo