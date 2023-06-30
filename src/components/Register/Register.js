import React from 'react'

function Register({ setCurrentPath, currentPath }) {

	React.useEffect(() => {
		setCurrentPath(currentPath);
	}, [setCurrentPath, currentPath])

	return (
		<div className="register"></div>
	)
}

export default Register;