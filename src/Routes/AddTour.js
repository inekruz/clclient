import React from 'react';
import './Routes.css';

import Cross from './RoutesIcons/white_cross.svg';

function AddTour() {
  return (
    <div className='control_panel'>
      <h4>Добавить тур</h4>
      
      <form>
        
        <div>
          <label>Название тура</label>
          <input
            placeholder='Название тура'
            type='text'
            className='modal_input'
          />
        </div>
        
        <div>
          <label>id страны</label>
          <input
            placeholder='id страны'
            type='text'
            className='modal_input'
          />
        </div>

        <div>
          <label>Стоимость тура</label>
          <input
            placeholder='Стоимость тура'
            type='email'
            className='modal_input'
          />
        </div>

        <div>
          <label>Длительность тура (в днях)</label>
          <input
            placeholder='Длительность тура (в днях)'
            type='text'
            className='modal_input'
          />
        </div>

        <div>
          <label>Дата начала тура</label>
          <input
            placeholder='Дата начала тура'
            type='text'
            className='modal_input'
          />
        </div>

        <div>
          <label>Дата окончания тура</label>
          <input
            placeholder='Дата окончания тура'
            type='text'
            className='modal_input'
          />
        </div>

        <button className='list_button'>Добавить</button>

      </form>

      {/* <div className={`good_message ${goodMessage ? 'active' : ''}`}>
        <div className='good_message_header'>
          <img src={Cross} alt='Крестик' className='white_cross' onClick={() => setGoodMessage(false)} />
        </div>
        <div className='good_message_content'>
          <p>Успешно</p>
        </div>
      </div> */}

    </div>
  );
}

export default AddTour;