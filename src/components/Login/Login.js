import React from 'react'

function Login({ setCurrentPath }) {

	React.useEffect(() => {
		setCurrentPath('/signin');
	}, [setCurrentPath])

	return (
		<div className="login"></div>
	)
}

export default Login;