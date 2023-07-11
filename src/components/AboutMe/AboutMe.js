import React from 'react';

import './AboutMe.css';

import authorPhotoSrc from '../../images/photo.jpg';

function AboutMe() {
	return (
		<section className="about-me">
			<h2 className="about-me__section-heading section-heading">Студент</h2>

			<div className="about-me__info-block">

				<h3 className="about-me__name">Виталий</h3>
				<h3 className="about-me__occupation">Фронтенд-разработчик, 30 лет</h3>

				<p className="about-me__biography">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить.
					С 2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами и ушёл с&nbsp;постоянной работы.</p>

				<a href="https://github.com/8Gato8" className="about-me__link" rel="noreferrer" target="_blank">Github</a>
			</div>

			<img src={authorPhotoSrc} alt="фотография автора проекта" className="about-me__photo" />
		</section>
	)
}

export default AboutMe;