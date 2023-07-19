import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import EditProfileForm from '../EditProfileForm/EditProfileForm';

import './Profile.css';

function Profile({
	editUserInfo,
	logout,
	isEditProfileApiMessageShown,
	editProfileApiMessage,
	editProfileApiMessageType
}) {

	const currentUser = React.useContext(CurrentUserContext);
	const [isEditFormOpen, setIsEditFormOpen] = React.useState(false);

	const toggleEditForm = () => {
		setIsEditFormOpen(!isEditFormOpen);
	}

	return (
		<div className="profile-wrapper">
			<main className="profile">
				<h1 className="profile__heading heading">{`Привет, ${currentUser.name}!`}</h1>

				{isEditFormOpen
					?
					<EditProfileForm
						toggleEditForm={toggleEditForm}
						editUserInfo={editUserInfo}
						isEditProfileApiMessageShown={isEditProfileApiMessageShown}
						editProfileApiMessage={editProfileApiMessage}
						editProfileApiMessageType={editProfileApiMessageType}
					/>
					:
					<>
						<div className="profile__data">

							<div className="profile__data-block">
								<p className="profile__data-unit">Имя</p>
								<p className="profile__data-unit">{currentUser.name}</p>
							</div>

							<div className="profile__data-block">
								<p className="profile__data-unit">E-mail</p>
								<p className="profile__data-unit">{currentUser.email}</p>
							</div>

						</div>

						<div className="profile__buttons button-section">
							<button className="profile__button profile__button_type_edit" onClick={toggleEditForm}>Редактировать</button>
							<button className="profile__button profile__button_type_logout" onClick={logout}>Выйти из аккаунта</button>
						</div>
					</>
				}

			</main>
		</div>
	)
}

export default Profile;