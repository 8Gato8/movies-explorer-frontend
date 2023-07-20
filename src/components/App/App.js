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

function App() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = React.useState({});

  const isDisplayLarge = useMediaQuery("(min-width: 1140px)");

  const isDisplayMedium = useMediaQuery("(max-width: 1140px)");

  const isDisplaySmall = useMediaQuery("(max-width: 480px)");

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

  const getUser = React.useCallback(async (token) => {

    try {

      const user = token ? await api.getUserInfo(token) : null;

      if (user) {
        setCurrentUser(user)
        setIsLoggedIn(true);
      }

    } catch (err) {
      console.log(err);
    }
  }, [])

  const calculateRequiredLength = React.useCallback(() => {
    let initialMoviesLength;
    let additionalMoviesLength;

    if (isDisplayMedium) {
      initialMoviesLength = 8;
      additionalMoviesLength = 2;
    }

    if (isDisplaySmall && isDisplayMedium) {
      initialMoviesLength = 5;
      additionalMoviesLength = 1;
    }

    if (isDisplayLarge) {
      initialMoviesLength = 12;
      additionalMoviesLength = 3;
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
      setEditProfileApiMessage('При обновлении профиля произошла ошибка');

      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [token, setIsEditProfileApiMessageShown])

  const logout = React.useCallback(() => {

    setIsLoggedIn(false);
    setCurrentUser({ name: '', email: '', password: '' });

    localStorage.removeItem("token");
    localStorage.removeItem("storedMovies");

    setMovies([]);

    navigate('/');

  }, [navigate])

  const handleCardLikeClick = React.useCallback(async (movie, isLiked) => {

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

    } catch (err) {
      console.log(err);
    }
  }, [token, savedMovies, initialSavedMoviesArray])

  const handleCardDeleteClick = React.useCallback(async (movie) => {

    try {

      const newMovie = await api.deleteMovie(movie._id, token);

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

  }, [token, isLoggedIn])

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
    getUser(token)
  }, [getUser, token])

  React.useEffect(() => {
    getInitialSavedMovies();
    setCalculatedLength();
  }, [getInitialSavedMovies, setCalculatedLength])

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
