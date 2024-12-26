import React, { useState } from 'react';
import './Routes.css';

import AddClient from './Components/AddClient';
import AddCountry from './Components/AddCountry';
import AddTour from './AddTour';

function Control() {
  const [clientPage, setClientPage] = useState('');

  const selectedPage = () => {
    switch (clientPage) {
      case 'AddClient':
        return <AddClient />;
      case 'AddCountry':
        return <AddCountry />;
      case 'AddTour':
        return <AddTour />;
      default:
        return null;
    }
  };

  return (
    <div className='control'>
      <h3>Управление</h3>

      <div className='control_nav_container'>
        <ul className='control_nav'>
          <li className={`header_nav_item ${clientPage === 'AddClient' ? 'active' : ''}`} onClick={() => setClientPage('AddClient')}>Добавить клиента</li>
          <li className={`header_nav_item ${clientPage === 'AddCountry' ? 'active' : ''}`} onClick={() => setClientPage('AddCountry')}>Добавить страну</li>
          <li className={`header_nav_item ${clientPage === 'AddTour' ? 'active' : ''}`} onClick={() => setClientPage('AddTour')}>Добавить тур</li>
        </ul>
      </div>

      <div className='control_content'>
        {selectedPage()}
      </div>
    </div>
  );
}

export default Control;