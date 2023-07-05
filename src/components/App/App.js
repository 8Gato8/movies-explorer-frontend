import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';

import Footer from '../Footer/Footer';

import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';

import Preloader from '../Preloader/Preloader';

import PageNotFound from '../PageNotFound/PageNotFound';

import { IsLoggedInContext } from '../../contexts/IsLoggedInContext';
import { CurrentPathContext } from '../../contexts/CurrentPathContext';

import { movies } from '../../utils/moviesDataTemp/movies';
import { savedMovies } from '../../utils/moviesDataTemp/savedMovies';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(true);
  const [currentPath, setCurrentPath] = React.useState('');

  return (
    <div className='app'>
      <CurrentPathContext.Provider value={currentPath}>
        <IsLoggedInContext.Provider value={isLoggedIn}>
          <Header />

          <Routes>

            <Route path="/" element={<Main setCurrentPath={setCurrentPath} currentPath={'/'} />} />
            <Route path="/signup" element={<Register setCurrentPath={setCurrentPath} currentPath={'/signup'} />} />
            <Route path="/signin" element={<Login setCurrentPath={setCurrentPath} currentPath={'/signin'} />} />
            <Route path="/movies" element={<Movies setCurrentPath={setCurrentPath} currentPath={'/movies'} movies={movies} />} />
            <Route path="/saved-movies" element={<Movies setCurrentPath={setCurrentPath} currentPath={'/saved-movies'} movies={savedMovies} />} />
            <Route path="/profile" element={<Profile setCurrentPath={setCurrentPath} currentPath={'/profile'} />} />
            <Route path="*" element={<PageNotFound setCurrentPath={setCurrentPath} currentPath={'*'} />} />
          </Routes>

          <Footer />
        </IsLoggedInContext.Provider >
      </CurrentPathContext.Provider>
    </div>
  );
}

export default App;
