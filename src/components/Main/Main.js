import React from 'react'
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import StudentInfo from '../StudentInfo/StudentInfo';

function Main({ setCurrentPath }) {

	const onPathChange = React.useCallback(() => {
		setCurrentPath('/')
	}, [setCurrentPath])

	React.useEffect(() => {
		onPathChange();
	}, [onPathChange])

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