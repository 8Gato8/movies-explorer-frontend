import React from 'react'

function Register({ setCurrentPath }) {

	React.useEffect(() => {
		setCurrentPath('/signup');
	}, [setCurrentPath])

	return (
		<div className="register"></div>
	)
}

export default Register;