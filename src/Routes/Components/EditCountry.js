import React, { useEffect, useState } from 'react';
import '../Routes.css';
import Cross from '../RoutesIcons/cross.svg';

function EditCountry({ modal, setModal, country }) {
   const [countryName, setCountryName] = useState(country.country_name);
   const [countryCode, setCountryCode] = useState(country.country_code);
   const [description, setDescription] = useState(country.description);

   useEffect(() => {
      setCountryName(country.country_name);
      setCountryCode(country.country_code);
      setDescription(country.description);
   }, [country]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
         const response = await fetch('https://api.glimshop.ru/updatecountry', {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               id: country.country_id,
               country_name: countryName,
               country_code: countryCode,
               description: description
            }),
         });
         
         if (!response.ok) {
            alert('Ошибка при отправке запроса');
         } else {
            setModal(false);
         }
      } catch (error) {
         console.error('Ошибка:', error);
      }
   };

   return (
      <div className={`modal ${modal ? 'active' : ''}`} onClick={() => setModal(false)}>
         <div className='modal_container' onClick={e => e.stopPropagation()}>
            <div className='modal_header'>
               <h2>Обновление информации</h2>
               <img src={Cross} alt='Крестик' onClick={() => setModal(false)} />
            </div>

            <form className='modal_form' onSubmit={handleSubmit}>
               <div>
                  <label>Новое название страны</label>
                  <input
                     placeholder='Название страны'
                     className='modal_input'
                     value={countryName}
                     onChange={(e) => setCountryName(e.target.value)}
                  />
               </div>

               <div>
                  <label>Новый код страны</label>
                  <input
                     placeholder='Код страны'
                     className='modal_input'
                     value={countryCode}
                     onChange={(e) => setCountryCode(e.target.value)}
                  />
               </div>

               <div>
                  <label>Новое описание страны</label>
                  <input
                     type='text'
                     placeholder='Описание страны'
                     className='modal_input'
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  />
               </div>

               <button type='submit' className='list_button form_button'>Изменить</button>
            </form>
         </div>
      </div>
   );
}

export default EditCountry;