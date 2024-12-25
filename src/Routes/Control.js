import React, { useState } from 'react';
import './Routes.css';

import AddClient from './Components/AddClient';
import AddCountry from './Components/AddCountry';

function Control() {
  const [clientPage, setIsClientPage] = useState(true);

  return (
    <div className='control'>
      <h3>Управление</h3>

      <div className='control_nav_container'>
        <ul className='control_nav'>
          <li className={`header_nav_item ${clientPage ? 'active' : ''}`} onClick={() => setIsClientPage(true)}>Добавить клиента</li>
          <li className={`header_nav_item ${clientPage ? '' : 'active'}`} onClick={() => setIsClientPage(false)}>Добавить страну</li>
        </ul>
      </div>

      <div className={`control_content_client ${clientPage ? '' : 'hidden'}`}>
        <AddClient />
      </div>

      <div className={`control_content_country ${clientPage ? 'hidden' : ''}`}>
        <AddCountry />
      </div>
    </div>
  );
}

export default Control;