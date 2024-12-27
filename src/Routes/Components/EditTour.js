import React, { useEffect, useState } from 'react';
import '../Routes.css';
import Cross from '../RoutesIcons/cross.svg';

function EditTour({ modal, setModal, selectedTour }) {
   const [id, setId] = useState(null);
   const [tourName, setTourName] = useState('');
   const [countryId, setCountryId] = useState('');
   const [price, setPrice] = useState('');
   const [duration, setDuration] = useState('');
   const [desc, setDesc] = useState('');
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');

   useEffect(() => {
      if (selectedTour) {
         setId(selectedTour.tour_id);
         setTourName(selectedTour.tour_name);
         setCountryId(selectedTour.country_id);
         setPrice(selectedTour.price);
         setDuration(selectedTour.duration);
         setDesc(selectedTour.description);
         setStartDate(selectedTour.start_date);
         setEndDate(selectedTour.end_date);
      }
   }, [selectedTour]);

   const clientHandleUpdate = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch('https://api.glimshop.ru/uptour_id', {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               id: id,
               tour_name: tourName,
               country_id: countryId,
               price: price,
               duration: duration,
               description: desc,
               start_date: startDate,
               end_date: endDate,
            }),
         });

         if (!response.ok) {
            alert('Ошибка при отправке запроса');
         } else {
            setModal(false);
            window.location.reload();
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

            <form className='modal_form' onSubmit={clientHandleUpdate}>
               <div>
                  <label>Название тура</label>
                  <input
                     placeholder='Название'
                     className='modal_input'
                     value={tourName}
                     onChange={(e) => setTourName(e.target.value)}
                  />
               </div>

               <div>
                  <label>id страны</label>
                  <input
                    type='number'
                     placeholder='id страны'
                     className='modal_input'
                     value={countryId}
                     onChange={(e) => setCountryId(e.target.value)}
                  />
               </div>

               <div>
                  <label>Цена</label>
                  <input
                     type='number'
                     placeholder='Цена'
                     className='modal_input'
                     value={price}
                     onChange={(e) => setPrice(e.target.value)}
                  />
               </div>

               <div>
                  <label>Кол-во дней в туре</label>
                  <input
                     type='number'
                     placeholder='Дней в туре'
                     className='modal_input'
                     value={duration}
                     onChange={(e) => setDuration(e.target.value)}
                  />
               </div>

               <div>
                  <label>Описание</label>
                  <input
                     type='text'
                     className='modal_input'
                     value={desc}
                     onChange={(e) => setDesc(e.target.value)}
                  />
               </div>

               <button type='submit' className='list_button form_button'>Изменить</button>
            </form>
         </div>
      </div>
   );
}

export default EditTour;