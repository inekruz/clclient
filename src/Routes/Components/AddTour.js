import React, { useState } from 'react';
import '../Routes.css';

import Cross from '../RoutesIcons/white_cross.svg';

function AddTour() {
  const [tourName, setTourName] = useState('');
  const [countryId, setCountryId] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [goodMessage, setGoodMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('https://api.glimshop.ru/addtour', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, 
        body: JSON.stringify({
          tour_name: tourName,
          country_id: countryId,
          price: parseFloat(price),
          duration: parseInt(duration),
          start_date: startDate,
          end_date: endDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при добавлении тура');
      }
      setGoodMessage(true);

      setTourName('');
      setCountryId('');
      setPrice('');
      setDuration('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Ошибка:', error);
      alert(error.message);
    }
  };

  return (
    <div className='control_panel'>
      <h4>Добавить тур</h4>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Название тура</label>
          <input
            value={tourName}
            onChange={(e) => setTourName(e.target.value)}
            placeholder='Название тура'
            type='text'
            className='modal_input'
            required
          />
        </div>
        
        <div>
          <label>id страны</label>
          <input
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            placeholder='id страны'
            type='text'
            className='modal_input'
            required
          />
        </div>

        <div>
          <label>Стоимость тура</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder='Стоимость тура'
            type='number'
            className='modal_input'
            required
          />
        </div>

        <div>
          <label>Длительность тура (в днях)</label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder='Длительность тура (в днях)'
            type='number'
            className='modal_input'
            required
          />
        </div>

        <div>
          <label>Дата начала тура</label>
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            placeholder='Дата начала тура (YYYY-MM-DD)'
            type='date'
            className='modal_input'
            required
          />
        </div>

        <div>
          <label>Дата окончания тура</label>
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            placeholder='Дата окончания тура (YYYY-MM-DD)'
            type='date'
            className='modal_input'
            required
          />
        </div>

        <button type='submit' className='list_button'>Добавить</button>
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

export default AddTour;