import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import './App.css';

/* components */

import ProtectedRoute from '../ProtectedRoute';

import Header from '../Header/Header';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import Footer from '../Footer/Footer';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

import PageNotFound from '../PageNotFound/PageNotFound';

/* api */

import * as api from '../../utils/api/MainApi';
import * as bestFilmsApi from '../../utils/api/MoviesApi';

/* contexts */

import { useMediaQuery } from '../../utils/functions/useMediaQuery';
import { IsLoggedInContext } from '../../contexts/IsLoggedInContext';
import { CurrentPathContext } from '../../contexts/CurrentPathContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';

/* functions */

import { findMovieById } from '../../utils/functions/findMovieById';
import { searchMovies } from '../../utils/functions/searchMovies';

/* constants */

import {
  LARGE_DISPLAY_LENGTH,
  LARGE_DISPLAY_ADDITIONAL_LENGTH,
  MEDIUM_DISPLAY_LENGTH,
  MEDIUM_DISPLAY_ADDITIONAL_LENGTH,
  SMALL_DISPLAY_LENGTH,
  SMALL_DISPLAY_ADDITIONAL_LENGTH
} from '../../utils/constants/requiredLengthNumbers';

import {
  LARGE_DISPLAY_REQUIREMENT,
  MEDIUM_DISPLAY_REQUIREMENT,
  SMALL_DISPLAY_REQUIREMENT
} from '../../utils/constants/displayWidthProps';

function App() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = React.useState({});

  const isDisplayLarge = useMediaQuery(LARGE_DISPLAY_REQUIREMENT);

  const isDisplayMedium = useMediaQuery(MEDIUM_DISPLAY_REQUIREMENT);

  const isDisplaySmall = useMediaQuery(SMALL_DISPLAY_REQUIREMENT);

  const [token, setToken] = React.useState(localStorage.getItem("token"));

  const [isLoading, setIsLoading] = React.useState(false);

  const [currentPath, setCurrentPath] = React.useState('');

  const storedMovies = JSON.parse(localStorage.getItem("storedMovies"));

  const [initialSavedMoviesArray, setInitialSavedMoviesArray] = React.useState([]);

  const [movies, setMovies] = React.useState(storedMovies ? storedMovies.movies : []);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [isLoginApiErrorShown, setIsLoginApiErrorShown] = React.useState(false);
  const [loginApiErrorMessage, setLoginApiErrorMessage] = React.useState('');

  const [isRegisterApiErrorShown, setIsRegisterApiErrorShown] = React.useState(false);
  const [registerApiErrorMessage, setRegisterApiErrorMessage] = React.useState('');

  const [isEditProfileApiMessageShown, setIsEditProfileApiMessageShown] = React.useState(false);
  const [editProfileApiMessage, setEditProfileApiMessage] = React.useState('');
  const [editProfileApiMessageType, setEditProfileApiMessageType] = React.useState('error');

  const [isMoviesApiErrorShown, setIsMoviesApiErrorShown] = React.useState(false);
  const [moviesApiMessage, setMoviesApiMessage] = React.useState('');

  const [isSavedMoviesApiErrorShown, setIsSavedMoviesApiErrorShown] = React.useState(false);
  const [savedMoviesApiMessage, setSavedMoviesApiMessage] = React.useState('');

  const getUser = React.useCallback(async () => {

    try {

      const user = token ? await api.getUserInfo(token) : null;

      if (user) {
        setCurrentUser(user)
        setIsLoggedIn(true);
      }

    } catch (err) {
      console.log(err);
    }
  }, [token])

  const calculateRequiredLength = React.useCallback(() => {
    let initialMoviesLength;
    let additionalMoviesLength;

    if (isDisplayMedium) {
      initialMoviesLength = MEDIUM_DISPLAY_LENGTH;
      additionalMoviesLength = MEDIUM_DISPLAY_ADDITIONAL_LENGTH;
    }

    if (isDisplaySmall && isDisplayMedium) {
      initialMoviesLength = SMALL_DISPLAY_LENGTH;
      additionalMoviesLength = SMALL_DISPLAY_ADDITIONAL_LENGTH;
    }

    if (isDisplayLarge) {
      initialMoviesLength = LARGE_DISPLAY_LENGTH;
      additionalMoviesLength = LARGE_DISPLAY_ADDITIONAL_LENGTH;
    }

    return { initialMoviesLength, additionalMoviesLength };
  }, [isDisplayLarge, isDisplayMedium, isDisplaySmall])

  const [moviesLength, setMoviesLength] = React.useState(calculateRequiredLength().initialMoviesLength);
  const [additionalMoviesLength, setAdditionalMoviesLength] = React.useState(calculateRequiredLength().additionalMoviesLength);

  const setCalculatedLength = React.useCallback(() => {
    setMoviesLength(calculateRequiredLength().initialMoviesLength);
    setAdditionalMoviesLength(calculateRequiredLength().additionalMoviesLength);

  }, [calculateRequiredLength])

  const login = React.useCallback(async ({ email, password }) => {

    try {
      setIsLoading(true);
      setIsLoginApiErrorShown(false);

      const data = await api.login(email, password);

      if (data.token) {

        localStorage.setItem("token", data.token);
        setToken(data.token);
        setIsLoggedIn(true);
      }

    } catch (err) {
      setLoginApiErrorMessage('При попытке входа в систему произошла ошибка');
      setIsLoginApiErrorShown(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [])

  const createUser = React.useCallback(async ({ name, email, password }) => {

    try {
      setIsLoading(true);

      setIsRegisterApiErrorShown(false);

      await api.createUser(name, email, password);
      await login({ email, password });

      setIsLoggedIn(true);

    } catch (err) {
      setRegisterApiErrorMessage('При попытке регистрации произошла ошибка');
      setIsRegisterApiErrorShown(true);

      console.log(err);
    }
    finally {
      setIsLoading(false);
    }

  }, [login])

  const editUserInfo = React.useCallback(async ({ email, name }) => {

    try {

      setIsLoading(true);

      const newUserInfo = await api.editUserInfo(email, name, token);

      setEditProfileApiMessageType('success')
      setIsEditProfileApiMessageShown(true);

      setEditProfileApiMessage('Данные профиля успешно обновлены');
      setCurrentUser(newUserInfo);

    } catch (err) {
      setEditProfileApiMessageType('error')
      setIsEditProfileApiMessageShown(true);
      setEditProfileApiMessage(`При обновлении профиля произошла ошибка: ${err.message}`);

      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [token, setIsEditProfileApiMessageShown])

  const logout = React.useCallback(() => {

    localStorage.removeItem("token");
    localStorage.removeItem("storedMovies");

    setToken(localStorage.getItem("token"));
    setCurrentUser({ name: '', email: '', password: '' });
    setIsLoggedIn(false);

    setMovies([]);

    navigate('/');

  }, [navigate])

  const handleCardLikeClick = React.useCallback(async (movie, isLiked, setIsLiked) => {

    try {

      let newMovie;

      if (isLiked) {

        const newMovieId = findMovieById(movie, initialSavedMoviesArray)._id;
        newMovie = await api.deleteMovie(newMovieId, token);

        setInitialSavedMoviesArray((state) => {
          return state.filter((m) => m._id !== newMovie._id)
        });

        setSavedMovies((state) => {
          return state.filter((m) => m._id !== newMovie._id)
        });

      } else {
        newMovie = await api.addMovie(movie, token);
        setInitialSavedMoviesArray([...initialSavedMoviesArray, newMovie]);
        setSavedMovies([...savedMovies, newMovie]);
      }

      setIsLiked(!isLiked);
    } catch (err) {
      console.log(err);
    }
  }, [token, initialSavedMoviesArray, savedMovies])

  const handleCardDeleteClick = React.useCallback(async (movie) => {

    try {

      const newMovie = await api.deleteMovie(movie._id, token);

      setInitialSavedMoviesArray((state) => {
        return state.filter((m) => m._id !== newMovie._id)
      });
      setSavedMovies((state) => {
        return state.filter((m) => m._id !== newMovie._id)
      });

    } catch (err) {
      console.log(err);
    }
  }, [token])

  const handleMoreButtonClick = React.useCallback(async () => {

    try {

      setMoviesLength(moviesLength + additionalMoviesLength);

    } catch (err) {
      console.log(err);
    }
  }, [additionalMoviesLength, moviesLength])

  const getInitialSavedMovies = React.useCallback(async () => {

    if (isLoggedIn) {

      try {

        const initialSavedMovies = await api.getSavedMovies(token);

        setInitialSavedMoviesArray(initialSavedMovies);
        setSavedMovies(initialSavedMovies);

      } catch (err) {
        setSavedMoviesApiMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        setIsSavedMoviesApiErrorShown(true);
        console.log(err);
      }
    }

  }, [isLoggedIn, token])

  const getSearchedMovies = React.useCallback(async (movieInput, isChecked) => {

    try {

      setIsLoading(true);

      const initialMovies = await bestFilmsApi.getBetFilmApiInfo();

      const newMovies = searchMovies(initialMovies, movieInput, isChecked);

      setMovies(newMovies);
      if (newMovies.length === 0) {

        setMoviesApiMessage('Ничего не найдено');
        setIsMoviesApiErrorShown(true);
      } else {
        setIsMoviesApiErrorShown(false);

        const storedMoviesData = {
          movies: newMovies,
          movieInput,
          isChecked
        }
        localStorage.setItem('storedMovies', JSON.stringify(storedMoviesData));
      }

    } catch (err) {
      setMoviesApiMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      setIsMoviesApiErrorShown(true);
      console.log(err);

    } finally {
      setIsLoading(false);
    }
  }, [])

  const getSearchedSavedMovies = React.useCallback((movieInput, isChecked) => {

    try {

      setIsLoading(true);

      const newSavedMovies = searchMovies(initialSavedMoviesArray, movieInput, isChecked);
      setSavedMovies(newSavedMovies);

      if (newSavedMovies.length === 0) {
        setSavedMoviesApiMessage('Ничего не найдено');
        setIsSavedMoviesApiErrorShown(true);
      } else {
        setIsSavedMoviesApiErrorShown(false);
      }

    } catch (err) {
      setSavedMoviesApiMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
      setIsSavedMoviesApiErrorShown(true);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [initialSavedMoviesArray])

  React.useEffect(() => {
    getUser();
    getInitialSavedMovies();
    setCalculatedLength();
  }, [getUser, setCalculatedLength, getInitialSavedMovies, currentPath])

  return (
    <div className='app'>
      <IsLoadingContext.Provider value={isLoading}>
        <CurrentUserContext.Provider value={currentUser}>
          <CurrentPathContext.Provider value={currentPath}>
            <IsLoggedInContext.Provider value={isLoggedIn}>
              <Header />

              <Routes>

                <Route path="/movies"
                  element={
                    <ProtectedRoute
                      element={Movies}
                      setCurrentPath={setCurrentPath}
                      movies={movies}
                      savedMovies={initialSavedMoviesArray}
                      handleCardLikeClick={handleCardLikeClick}
                      getSearchedMovies={getSearchedMovies}
                      moviesLength={moviesLength}
                      handleMoreButtonClick={handleMoreButtonClick}
                      isMoviesApiErrorShown={isMoviesApiErrorShown}
                      moviesApiMessage={moviesApiMessage}
                      storedMovies={storedMovies}
                    />
                  }
                />

                <Route path="/saved-movies"
                  element={
                    <ProtectedRoute
                      element={SavedMovies}
                      setCurrentPath={setCurrentPath}
                      movies={savedMovies}
                      savedMovies={initialSavedMoviesArray}
                      handleCardDeleteClick={handleCardDeleteClick}
                      getSearchedMovies={getSearchedSavedMovies}
                      moviesLength={moviesLength}
                      isMoviesApiErrorShown={isSavedMoviesApiErrorShown}
                      moviesApiMessage={savedMoviesApiMessage}
                    />
                  }
                />

                <Route path="/profile"
                  element={
                    <ProtectedRoute
                      element={Profile}
                      editUserInfo={editUserInfo}
                      logout={logout}
                      isEditProfileApiMessageShown={isEditProfileApiMessageShown}
                      editProfileApiMessage={editProfileApiMessage}
                      editProfileApiMessageType={editProfileApiMessageType}
                    />
                  }
                />

                <Route path="/" element={<Main setCurrentPath={setCurrentPath} />} />

                <Route
                  path="/signup"
                  element={
                    <Register
                      setCurrentPath={setCurrentPath}
                      createUser={createUser}
                      isFormApiErrorShown={isRegisterApiErrorShown}
                      formApiMessage={registerApiErrorMessage}
                    />} />

                <Route
                  path="/signin"
                  element={
                    <Login
                      setCurrentPath={setCurrentPath}
                      setCurrentUser={setCurrentUser}
                      login={login}
                      isFormApiErrorShown={isLoginApiErrorShown}
                      formApiMessage={loginApiErrorMessage}
                    />} />

                <Route path="*" element={<PageNotFound setCurrentPath={setCurrentPath} path={'*'} />} />

              </Routes>

              <Footer />
            </IsLoggedInContext.Provider >
          </CurrentPathContext.Provider>
        </CurrentUserContext.Provider>
      </IsLoadingContext.Provider >
    </div >
  );
}

export default App;
