import React from 'react'

function Register({ setCurrentPath, currentPath }) {

	React.useEffect(() => {
		setCurrentPath(currentPath);
	}, [setCurrentPath, currentPath])

	return (
		<main className="register"></main>
	)
}

export default Register;