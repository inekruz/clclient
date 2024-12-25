import React, { useState } from 'react';
import '../Routes.css';

import Cross from '../RoutesIcons/white_cross.svg';

function AddClient() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [goodMessage, setGoodMessage] = useState(false);

  const handleClientAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.glimshop.ru/addclient', {
        method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               first_name: firstName,
               last_name: lastName,
               email: email,
               phone: phoneNumber,
               birth_date: birthDate,
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
      <h4>Добавить клиента</h4>
      
      <form onSubmit={handleClientAdd}>
        
        <div>
          <label>Имя</label>
          <input
            placeholder='Имя'
            type='text'
            className='modal_input'
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        
        <div>
          <label>Фамилия</label>
          <input
            placeholder='Фамилия'
            type='text'
            className='modal_input'
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label>Электронная почта</label>
          <input
            placeholder='Почта'
            type='email'
            className='modal_input'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Телефон</label>
          <input
            placeholder='Телефон'
            type='text'
            className='modal_input'
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div>
          <label>Дата рождения</label>
          <input
            placeholder='Дата рождения'
            type='date'
            className='modal_input'
            onChange={(e) => setBirthDate(e.target.value)}
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

export default AddClient;