import React from 'react';
import { Routes, Route } from 'react-router-dom';

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

import Preloader from '../Preloader/Preloader';

import PageNotFound from '../PageNotFound/PageNotFound';

/* api */

import * as api from '../../utils/api/MainApi';
import * as bestFilmsApi from '../../utils/api/MoviesApi';

/* contexts */

import { useMediaQuery } from '../../utils/functions/useMediaQuery';

/* functions */

import { IsLoggedInContext } from '../../contexts/IsLoggedInContext';
import { CurrentPathContext } from '../../contexts/CurrentPathContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { ApiMessageContext } from '../../contexts/ApiMessageContext';
import { IsApiMessageShownContext } from '../../contexts/IsApiMessageShownContext';

import { findMovieById } from '../../utils/functions/findMovieById';

import { searchMovies } from '../../utils/functions/searchMovies';

function App() {

  const isDisplayLarge = useMediaQuery("(min-width: 1140px)");

  const isDisplayMedium = useMediaQuery("(max-width: 1140px)");

  const isDisplaySmall = useMediaQuery("(max-width: 480px)");

  const [token, setToken] = React.useState(localStorage.getItem('token'));

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const [currentPath, setCurrentPath] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({ name: '', email: '', password: '' });

  const storedMovies = JSON.parse(localStorage.getItem("storedMovies")).movies;

  const [movies, setMovies] = React.useState(storedMovies);
  const [savedMovies, setSavedMovies] = React.useState([]);

  const [initialMoviesArray, setInitialMoviesArray] = React.useState([]);
  const [initialSavedMoviesArray, setInitialSavedMoviesArray] = React.useState([]);

  const [isApiErrorShown, setIsApiErrorMessageShown] = React.useState(false);
  const [apiMessage, setApiMessage] = React.useState('');

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

      /* setIsLoading(true); */

      const data = await api.login(email, password);

      if (!data) {
        throw new Error('При попытке входа в систему произошла ошибка');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setIsLoggedIn(true);
      }

    } catch (err) {
      console.log(err);
      setApiMessage(err.message);
      setIsApiErrorMessageShown(true);
    }
    /* finally {
      setIsLoading(false);
    } */
  }, [])

  const createUser = React.useCallback(async ({ name, email, password }) => {

    try {

      /* setIsLoading(true); */

      const data = await api.createUser(name, email, password);

      await login({ email, password });

      if (!data) {
        throw new Error('При попытке регистрации произошла ошибка');
      }

    } catch (err) {
      console.log(err);
      setApiMessage(err.message);
      setIsApiErrorMessageShown(true);
    }
    /* finally {
      setIsLoading(false);
    } */

  }, [login])

  const editUserInfo = React.useCallback(async ({ email, name }) => {

    try {

      /* setIsLoading(true); */

      const newUserInfo = await api.editUserInfo(email, name, token);

      setApiMessage('Данные профиля успешно изменены');
      setIsApiErrorMessageShown(true);

      setCurrentUser(newUserInfo);


    } catch (err) {
      console.log(err);
      setApiMessage('При обновлении профиля произошла ошибка');
      setIsApiErrorMessageShown(true);

    } /* finally {
      setIsLoading(false);
    } */
  }, [token])

  const checkIfTokenExists = React.useCallback(async (token) => {

    try {
      /* setIsLoading(true); */
      const user = token ? await api.getUserInfo(token) : null;

      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
      }

    } catch (err) {
      console.log(err);
    } /* finally {
      setIsLoading(false);
    } */
  }, [])

  const logout = React.useCallback(() => {

    setIsLoggedIn(false);
    setCurrentUser({ name: '', email: '', password: '' });
    localStorage.removeItem('token');
    setToken(localStorage.getItem('token'));
  }, [])

  const handleCardLikeClick = React.useCallback(async (movie, isLiked) => {

    try {

      let newMovie;

      if (isLiked) {
        const newMovieId = findMovieById(movie, savedMovies)._id;
        newMovie = await api.deleteMovie(newMovieId, token);
        setSavedMovies((state) => {
          return state.filter((m) => m._id !== newMovie._id)
        });
      } else {
        newMovie = await api.addMovie(movie, token);
        setSavedMovies([...savedMovies, newMovie]);
      }

    } catch (err) {
      console.log(err);
    }
  }, [token, savedMovies])

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

  const getInitialMovies = React.useCallback(async () => {

    try {

      const initialMovies = await bestFilmsApi.getBetFilmApiInfo();
      setInitialMoviesArray(initialMovies);

    } catch (err) {
      console.log(err);
    }
  }, [])

  const getInitialSavedMovies = React.useCallback(async () => {

    try {

      const initialSavedMovies = await api.getSavedMovies(token);
      setInitialSavedMoviesArray(initialSavedMovies);
      setSavedMovies(initialSavedMovies);

    } catch (err) {
      console.log(err);
    }
  }, [token])

  const getSearchedMovies = React.useCallback((moviesArray, movieInput, isChecked) => {

    try {
      const newMovies = searchMovies(moviesArray, movieInput, isChecked);
      setMovies(newMovies);

      const storedMoviesData = {
        movies: newMovies,
        movieInput,
        isChecked
      }

      localStorage.setItem('storedMovies', JSON.stringify(storedMoviesData));

    } catch (err) {
      setApiMessage(err.message);
      setIsApiErrorMessageShown(true);
      console.log(err);
    }
  }, [])

  const getSearchedSavedMovies = React.useCallback((moviesArray, movieInput, isChecked) => {

    try {

      const newSavedMovies = searchMovies(moviesArray, movieInput, isChecked);
      setSavedMovies(newSavedMovies);

    } catch (err) {
      console.log(err);
    }
  }, [])

  React.useEffect(() => {
    checkIfTokenExists(token);
  }, [token, checkIfTokenExists])

  React.useEffect(() => {
    getInitialMovies()
    getInitialSavedMovies();
    setCalculatedLength();
  }, [getInitialMovies, getInitialSavedMovies, setCalculatedLength])

  if (isLoading) {
    return (
      <Preloader />
    )
  }

  return (
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <CurrentPathContext.Provider value={currentPath}>
          <IsLoggedInContext.Provider value={isLoggedIn}>
            <IsApiMessageShownContext.Provider value={isApiErrorShown}>
              <ApiMessageContext.Provider value={apiMessage}>

                <Header />

                <Routes>

                  <Route path="/movies"
                    element={
                      <ProtectedRoute
                        element={Movies}
                        movies={movies}
                        savedMovies={savedMovies}
                        handleCardLikeClick={handleCardLikeClick}
                        getSearchedMovies={getSearchedMovies}
                        initialMoviesArray={initialMoviesArray}
                        moviesLength={moviesLength}
                        handleMoreButtonClick={handleMoreButtonClick}
                      />
                    }
                  />

                  <Route path="/saved-movies"
                    element={
                      <ProtectedRoute
                        element={SavedMovies}
                        movies={savedMovies}
                        savedMovies={savedMovies}
                        handleCardDeleteClick={handleCardDeleteClick}
                        getSearchedMovies={getSearchedSavedMovies}
                        initialSavedMoviesArray={initialSavedMoviesArray}
                        moviesLength={moviesLength}

                        handleMoreButtonClick={handleMoreButtonClick}
                      />
                    }
                  />

                  <Route path="/profile"
                    element={
                      <ProtectedRoute
                        element={Profile}
                        editUserInfo={editUserInfo}
                        logout={logout}
                      />
                    }
                  />

                  <Route path="/" element={<Main />} />

                  <Route
                    path="/signup"
                    element={
                      <Register
                        setCurrentPath={setCurrentPath}
                        path={'/signup'}
                        createUser={createUser}
                      />} />

                  <Route
                    path="/signin"
                    element={
                      <Login
                        setCurrentPath={setCurrentPath}
                        path={'/signin'}
                        setCurrentUser={setCurrentUser}
                        login={login}
                      />} />

                  <Route path="*" element={<PageNotFound setCurrentPath={setCurrentPath} path={'*'} />} />

                </Routes>

                <Footer />

              </ApiMessageContext.Provider>
            </IsApiMessageShownContext.Provider>
          </IsLoggedInContext.Provider >
        </CurrentPathContext.Provider>
      </CurrentUserContext.Provider>
    </div >
  );
}

export default App;
