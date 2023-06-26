import React from 'react'
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import StudentInfo from '../StudentInfo/StudentInfo';

function Main({ setCurrentPath }) {

	React.useEffect(() => {
		setCurrentPath('/');
	}, [setCurrentPath])

	return (
		<main className="main">
			<Promo />
			<AboutProject />
			<Techs />
			<StudentInfo />
		</main>
	)
}

export default Main;