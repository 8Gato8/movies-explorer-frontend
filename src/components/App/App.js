import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import PageNotFound from '../PageNotFound/PageNotFound';

import { IsLoggedInContext } from '../../contexts/isLoggedInContext';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <div className='app'>
      <IsLoggedInContext.Provider value={isLoggedIn}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </IsLoggedInContext.Provider >
    </div>
  );
}

export default App;
