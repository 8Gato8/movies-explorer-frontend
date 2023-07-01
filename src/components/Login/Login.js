import React from 'react'

function Login({ setCurrentPath, currentPath }) {

	React.useEffect(() => {
		setCurrentPath(currentPath);
	}, [setCurrentPath, currentPath])

	return (
		<main className="login"></main>
	)
}

export default Login;