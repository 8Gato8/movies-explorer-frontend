import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.css';

import logoSrc from '../../images/logo.svg';


function Logo({ additionalLinkStyles }) {
	return (
		<Link className={additionalLinkStyles} to="/"><img className="logo" src={logoSrc} alt="Лого проекта" /></Link>
	)
}

export default Logo;