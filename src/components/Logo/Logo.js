import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.css';

import logoSrc from '../../images/logo.svg';


function Logo({ additionalLinkStyles, additionalImgStyles }) {
	return (
		<Link className={additionalLinkStyles} to="/"><img className={`logo ${additionalImgStyles}`} src={logoSrc} alt="Лого проекта" /></Link>
	)
}

export default Logo;