import React from 'react';
import '../Routes.css';

function AddCountry() {
  return (
    <div className='control_panel'>
      <h4>Добавить страну</h4>
      
      <form>
        
        <div>
          <label>Название страны</label>
          <input
            placeholder='Имя'
            type='text'
            className='modal_input'
          />
        </div>
        
        <div>
          <label>Код страны</label>
          <input
            placeholder='Фамилия'
            type='text'
            className='modal_input'
          />
        </div>

        <div>
          <label>Описание</label>
          <input
            placeholder='Почта'
            type='email'
            className='modal_input desc_input'
          />
        </div>

        <button className='list_button'>Добавить</button>

      </form>
    </div>
  );
}

export default AddCountry;