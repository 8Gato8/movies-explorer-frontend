import React from 'react'
import AboutMe from '../AboutMe/AboutMe'
import Portfolio from '../Portfolio/Portfolio'

import './StudentInfo.css';

function StudentInfo() {
	return (
		<section className="student-info">
			<AboutMe />
			<Portfolio />
		</section>
	)
}

export default StudentInfo;