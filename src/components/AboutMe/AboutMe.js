import React from 'react'

import authorPhotoSrc from '../../images/photo.jpg';

function AboutMe() {
	return (
		<section className="about-me">
			<h2 className="about-me__section-heading section-heading">Студент</h2>

			<div className="about-me__info-block">

				<h3 className="about-me__name">Сергей</h3>
				<h3 className="about-me__occupation">Фронтенд-разработчик, 25 лет</h3>

				<p className="about-me__biography">Я&nbsp;родился и&nbsp;живу в&nbsp;Иркутске, закончил юридический факультет РГУП. Холост. Я&nbsp;люблю слушать музыку, играть в&nbsp;видео-игры, изучать историю, а&nbsp;еще с&nbsp;16&nbsp;лет увлекаюсь спортом. Неплохо знаю английский. Кодить начал около года назад. С&nbsp;2018 года работал в&nbsp;сфере продаж в&nbsp;нескольких крупных компаниях. После того, как подобрал себе курс по&nbsp;веб-разработке, решил уйти с&nbsp;постоянной работы, чтобы полностью сконцентрироваться на&nbsp;учёбе. Стремлюсь начать карьеру в&nbsp;IT.</p>

				<a href="https://github.com/8Gato8" className="about-me__link" rel="noreferrer" target="_blank">Github</a>
			</div>

			<img src={authorPhotoSrc} alt="фотография автора проекта" className="about-me__photo" />
		</section>
	)
}

export default AboutMe;