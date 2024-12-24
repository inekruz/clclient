import React, { useEffect, useState } from 'react';
import './Routes.css';
import EditClient from './Components/EditClient';
import Trash from './RoutesIcons/trash.svg';

function AllClients() {
   const [clients, setClients] = useState([]);
   const [error, setError] = useState('');
   const [showError, setShowError] = useState(false);
   const [modal, setModal] = useState(false);
   const [selectedClient, setSelectedClient] = useState([]);

   useEffect(() => {
      const fetchClients = async () => {
         try {
            const response = await fetch('https://api.glimshop.ru/getclients', {
               method: 'GET',
               headers: {
                  'Content-Type': 'application/json',
               },
            });
            
            if (!response.ok) {
               alert('Ошибка при отправке запроса');
            }

            const data = await response.json();
            setClients(data);
         } catch (error) {
            console.error('Ошибка:', error);
            setError(error.message);
            setShowError(true);
         }
      };

      fetchClients();
   }, []);

   const clientHandleDelete = async (id) => {
      const message = `Удалить пользователя с id ${id}?`;
      const confirm = window.confirm(message);
      
      if (!confirm) {
         return;
      }
      
      try {
         const response = await fetch('https://api.glimshop.ru/delclients_id', {
            method: 'DELETE',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
         });
         
         if (!response.ok) {
            alert('Ошибка при отправке запроса');
         } else {
            setClients(clients.filter(client => client.client_id !== id));
         }
      } catch (error) {
         console.error('Ошибка:', error);
      }
   };

   const handleEditClick = (client) => {
      setSelectedClient(client);
      setModal(true);
   };

   return (
      <div>
         <h3>Список клиентов</h3>

         <ul className='list'>
            {clients.map(client => (
               <li key={client.client_id} className='list_item'>
                  <p>{client.client_id}</p>
                  <p className='list_item_name'>{client.last_name} {client.first_name}</p>
                  <p>{client.email}</p>
                  <p>{client.phone}</p>
                  <p>{client.birth_date}</p>
                  <p>{client.created_at}</p>
                  <p>{client.update_at}</p>
                  <div className='list_item_footer'>
                     <button className='list_button' onClick={() => handleEditClick(client)}>Изменить</button>
                     <img src={Trash} alt='Корзина' onClick={() => clientHandleDelete(client.client_id)} />
                  </div>
               </li>
            ))}
         </ul>

         {showError && <p className='error_message'>{error}</p>}

         <EditClient
            modal={modal}
            setModal={setModal}
            selectedClient={selectedClient}
         />
      </div>
   );
}

export default AllClients;