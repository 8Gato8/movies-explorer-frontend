import React from 'react'

function Techs() {
	return (
		<div className="techs-wrapper">
			<section className="techs">
				<h2 className="techs__section-heading section-heading">Технологии</h2>

				<h3 className="techs__sub-heading">7 технологий</h3>

				<p className="techs__info">На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.</p>

				<ul className="techs__tech-list">
					<li className="techs__tech">HTML</li>
					<li className="techs__tech">CSS</li>
					<li className="techs__tech">JS</li>
					<li className="techs__tech">React</li>
					<li className="techs__tech">Git</li>
					<li className="techs__tech">Express.js</li>
					<li className="techs__tech">mongoDB</li>
				</ul>
			</section>
		</div>
	)
}

export default Techs;