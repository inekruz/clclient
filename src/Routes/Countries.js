import React, { useState, useEffect } from 'react';
import './Routes.css';

import EditCountry from './Components/EditCountry';

import Trash from './RoutesIcons/trash.svg';

function Countries() {

  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const [modal, setModal] = useState(false);
  const [countryMassive, setCountryMassive] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://api.glimshop.ru/getcountries', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          alert('Ошибка при отправке запроса');
        }

        const data = await response.json();
        setCountries(data);
      }
      catch(error) {
        console.log(error);
        setError(error.message);
        setShowError(true);
      }
    }

    fetchCountries();
  }, []);

  const countriesHandleDelete = async (id, name) => {
    const message = `Удалить страну ${name}?`;
    const confirm = window.confirm(message);

    if (!confirm) {
      return;
    }

    try {
      const response = await fetch('https://api.glimshop.ru/deletecountry', {
        method: 'DELETE',
          headers: {
             'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        alert('Ошибка при отправке запроса');
      } else {
        setCountries(countries.filter(country => country.country_id !== id));
      }
    }
    catch(err) {
      console.log('Ошибка:', err);
    }
  };

  const handleEditClick = async (country_info) => {
    setCountryMassive(country_info);
    setModal(true);
  };

  return (
    <div>
      <h3>Список клиентов</h3>

      <ul className='list'>
         {countries.map(countries => (
            <li key={countries.country_id} className='list_item'>
               <p>{countries.country_id}</p>
               <p className='list_item_name'>{countries.country_name}</p>
               <p>{countries.country_code}</p>
               <p>{countries.description}</p>
               <p>{countries.created_at}</p>
               <p>{countries.update_at}</p>
               <div className='list_item_footer'>
                  <button className='list_button' onClick={() => handleEditClick(countries)}>Изменить</button>
                 <img src={Trash} alt='Корзина' onClick={() => countriesHandleDelete(countries.country_id, countries.country_name)} />
               </div>
            </li>
         ))}
      </ul>

      {showError && <p className='error_message'>{error}</p>}

      <EditCountry
        modal={modal}
        setModal={setModal}
        country={countryMassive}
      />
    </div>
  );
}

export default Countries;
