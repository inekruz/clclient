import React, { useState } from 'react';
import '../Routes.css';

import Cross from '../RoutesIcons/white_cross.svg';

function AddCountry() {

  const [countryName, setCountryName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [countryDesc, setCountryDesc] = useState('');
  const [goodMessage, setGoodMessage] = useState(false);

  const handleCountryAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.glimshop.ru/addcountry', {
        method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               country_name: countryName,
               country_code: countryCode,
               description: countryDesc,
            }),
      });

      if(!response.ok) {
        alert('Ошибка при отправке запроса');
      } else {
        setGoodMessage(true);
        return;
      }
    }
    catch(err) {
      alert('Ошибка', err)
    }
  }

  return (
    <div className='control_panel'>
      <h4>Добавить страну</h4>
      
      <form onSubmit={handleCountryAdd}>
        
        <div>
          <label>Название страны</label>
          <input
            placeholder='Название страны'
            type='text'
            className='modal_input'
            onChange={(e) => setCountryName(e.target.value)}
          />
        </div>
        
        <div>
          <label>Код страны</label>
          <input
            placeholder='Код страны'
            type='text'
            className='modal_input'
            onChange={(e) => setCountryCode(e.target.value)}
          />
        </div>

        <div>
          <label>Описание</label>
          <input
            placeholder='Описание'
            type='text'
            className='modal_input desc_input'
            onChange={(e) => setCountryDesc(e.target.value)}
          />
        </div>

        <button className='list_button'>Добавить</button>

      </form>

      <div className={`good_message ${goodMessage ? 'active' : ''}`}>
        <div className='good_message_header'>
          <img src={Cross} alt='Крестик' className='white_cross' onClick={() => setGoodMessage(false)} />
        </div>
        <div className='good_message_content'>
          <p>Успешно</p>
        </div>
      </div>
    </div>
  );
}

export default AddCountry;