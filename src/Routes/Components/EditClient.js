import React, { useEffect, useState } from 'react';
import '../Routes.css';
import Cross from '../RoutesIcons/cross.svg';

function EditClient({ modal, setModal, selectedClient }) {
   const [id, setId] = useState(null);
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const [email, setEmail] = useState('');
   const [phoneNumber, setPhoneNumber] = useState('');
   const [birthDate, setBirthDate] = useState('');

   useEffect(() => {
      if (selectedClient) {
         setId(selectedClient.client_id);
         setFirstName(selectedClient.first_name);
         setLastName(selectedClient.last_name);
         setEmail(selectedClient.email);
         setPhoneNumber(selectedClient.phone);
         setBirthDate(selectedClient.birth_date);
      }
   }, [selectedClient]);

   const clientHandleUpdate = async (e) => {
      e.preventDefault();
      try {
         const response = await fetch('https://api.glimshop.ru/updclient_id', {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               id: id,
               first_name: firstName,
               last_name: lastName,
               email: email,
               phone: phoneNumber,
               birth_date: birthDate,
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
                  <label>Новое имя</label>
                  <input
                     placeholder='Имя'
                     className='modal_input'
                     value={firstName}
                     onChange={(e) => setFirstName(e.target.value)}
                  />
               </div>

               <div>
                  <label>Новая фамилия</label>
                  <input
                     placeholder='Фамилия'
                     className='modal_input'
                     value={lastName}
                     onChange={(e) => setLastName(e.target.value)}
                  />
               </div>

               <div>
                  <label>Новый Email</label>
                  <input
                     type='email'
                     placeholder='Email'
                     className='modal_input'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
               </div>

               <div>
                  <label>Новый номер телефона</label>
                  <input
                     type='tel'
                     placeholder='Телефон'
                     className='modal_input'
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                  />
               </div>

               <div>
                  <label>Новая дата рождения</label>
                  <input
                     type='date'
                     className='modal_input'
                     value={birthDate}
                     onChange={(e) => setBirthDate(e.target.value)}
                  />
               </div>

               <button type='submit' className='list_button form_button'>Изменить</button>
            </form>
         </div>
      </div>
   );
}

export default EditClient;