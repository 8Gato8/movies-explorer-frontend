import React from 'react'

function Login({ setCurrentPath, currentPath }) {

	React.useEffect(() => {
		setCurrentPath(currentPath);
	}, [setCurrentPath, currentPath])

	return (
		<div className="login"></div>
	)
}

export default Login;