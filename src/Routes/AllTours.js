import React, { useEffect, useState } from 'react';
import './Routes.css';
import EditTour from './Components/EditTour'; // Добавить Обновление тура
import Trash from './RoutesIcons/trash.svg';

function AllTours() {
   const [tours, setTours] = useState([]);
   const [error, setError] = useState('');
   const [showError, setShowError] = useState(false);
   const [modal, setModal] = useState(false);
   const [selectedTour, setSelectedTour] = useState(null);

   useEffect(() => {
      const fetchTours = async () => {
         try {
            const response = await fetch('https://api.glimshop.ru/gettours', {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               },
            });
            
            if (!response.ok) {
               throw new Error('Ошибка при получении туров');
            }

            const data = await response.json();
            setTours(data);
         } catch (error) {
            console.error('Ошибка:', error);
            setError(error.message);
            setShowError(true);
         }
      };

      fetchTours();
   }, []);

   const handleDelete = async (id) => {
      const message = `Удалить тур с id ${id}?`;
      const confirm = window.confirm(message);
      
      if (!confirm) {
         return;
      }
      
      try {
         const response = await fetch(`https://api.glimshop.ru/deltour_id`, {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
         });
         
         if (!response.ok) {
            throw new Error('Ошибка при удалении тура');
         } else {
            setTours(tours.filter(tour => tour.tour_id !== id));
         }
      } catch (error) {
         console.error('Ошибка:', error);
      }
   };

   const handleEditClick = (tour) => {
      setSelectedTour(tour);
      setModal(true);
   };

   return (
      <div className='list_container'>
         <h3>Список туров</h3>

         <ul className='list'>
            {tours.map(tour => (
               <li key={tour.tour_id} className='list_item'>
                  <p>{tour.tour_id}</p>
                  <p className='list_item_name'>{tour.tour_name}</p>
                  <p>{tour.price}</p>
                  <p>Начало: {tour.start_date}</p>
                  <p>Конец: {tour.end_date}</p>
                  <p>{tour.description}</p>
                  <div className='list_item_footer'>
                     <button className='list_button' onClick={() => handleEditClick(tour)}>Изменить</button>
                     <img src={Trash} alt='Корзина' onClick={() => handleDelete(tour.tour_id)} />
                  </div>
               </li>
            ))}
         </ul>

         {showError && <p className='error_message'>{error}</p>}
   
         <EditTour
            modal={modal}
            setModal={setModal}
            selectedTour={selectedTour}
         />
      </div>
   );
}

export default AllTours;