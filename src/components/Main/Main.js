import React from 'react'
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import StudentInfo from '../StudentInfo/StudentInfo';

function Main() {
	return (
		<div className="main">
			<Header />
			<Promo />
			<AboutProject />
			<Techs />
			<StudentInfo />
		</div >
	)
}

export default Main;