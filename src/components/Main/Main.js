import React from 'react'
import Header from '../Header/Header';
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';

function Main() {
	return (
		<div className="main">
			<Header />
			<Promo />
			<AboutProject />
		</div>
	)
}

export default Main;