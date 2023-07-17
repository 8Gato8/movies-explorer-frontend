import React from 'react';
import { Navigate } from "react-router-dom";
import { IsLoggedInContext } from '../contexts/IsLoggedInContext';
import { CurrentPathContext } from '../contexts/CurrentPathContext';

const ProtectedRoute = ({ element: Component, ...props }) => {

	const isLoggedIn = React.useContext(IsLoggedInContext);
	const currentPath = React.useContext(CurrentPathContext);

	return (
		isLoggedIn ? <Component {...props} /> : <Navigate to={currentPath} />
	)
};

export default ProtectedRoute;