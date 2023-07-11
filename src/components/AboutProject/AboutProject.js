import React from 'react';

import './AboutProject.css';

function AboutProject() {
	return (
		<section id="about-project" className="about-project">
			<h2 className="about-project__section-heading section-heading">О проекте</h2>

			<div className="about-project__info-block">
				<h3 className="about-project__sub-heading">Дипломный проект включал 5 этапов</h3>
				<p className="about-project__info">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.</p>
			</div>

			<div className="about-project__info-block">
				<h3 className="about-project__sub-heading">На&nbsp;выполнение диплома ушло 5 недель</h3>
				<p className="about-project__info">У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
			</div>

			<div className="about-project__time-investment-bars">
				<div className="about-project__bar about-project__bar_type_backend">1 неделя</div>
				<p className="about-project__caption">Back-end</p>
				<div className="about-project__bar about-project__bar_type_frontend">4 недели</div>
				<p className="about-project__caption">Front-end</p>
			</div>
		</section>
	)
}

export default AboutProject;