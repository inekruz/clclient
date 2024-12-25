import React from 'react';
import './App.css';

import { Link, Route, Routes, useLocation } from 'react-router-dom';

import AllClients from './Routes/AllClients';
import Control from './Routes/Control';
import Countries from './Routes/Countries';

function App() {

  const location = useLocation();

  return (
    <div className="App">
        <header>
          <ul className='header_nav'>
            <Link to='/'>
              <li className={`header_nav_item ${location.pathname === '/' ? 'active' : ''}`}>Все клиенты</li>
            </Link>
            <Link to='/countries'>
              <li className={`header_nav_item ${location.pathname === '/countries' ? 'active' : ''}`}>Все страны</li>
            </Link>
            <Link to='/control'>
              <li className={`header_nav_item ${location.pathname === '/control' ? 'active' : ''}`}>Управление</li>
            </Link>
          </ul>
        </header>

        <div className='content'>
          <Routes>
            <Route path='/' element={<AllClients />} />
            <Route path='/control' element={<Control />} />
            <Route path='/countries' element={<Countries />} />
          </Routes>
        </div>
    </div>
  );
}

export default App;
