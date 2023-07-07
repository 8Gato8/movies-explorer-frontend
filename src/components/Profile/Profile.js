import React from 'react';

import './Profile.css';

function Profile({ setCurrentPath, currentPath }) {

	React.useEffect(() => {
		setCurrentPath(currentPath);
	}, [setCurrentPath, currentPath])

	return (
		<div className="profile-wrapper">
			<main className="profile">
				<h1 className="profile__heading heading">Привет, Сергей!</h1>

				<div className="profile__data">

					<div className="profile__data-block">
						<p className="profile__data-unit">Имя</p>
						<p className="profile__data-unit">Сергей</p>
					</div>

					<div className="profile__data-block">
						<p className="profile__data-unit">E-mail</p>
						<p className="profile__data-unit">sergey.sckotcelias@yandex.ru</p>
					</div>

				</div>

				<button className="profile__button profile__button_type_edit">Редактировать</button>
				<button className="profile__button profile__button_type_logout">Выйти из аккаунта</button>
			</main>
		</div>
	)
}

export default Profile;