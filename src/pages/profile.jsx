import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfilePageStyles from './profile.module.css';

import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { editUser, setEditUserForm } from '../services/actions/user';

export function ProfilePage() {
  const dispatch = useDispatch();
  const {name, email, isUserEdited} = useSelector(state => state.user);

  const onFormChange = (e) => {
    dispatch(setEditUserForm(e.target.name, e.target.value));
  }

  useEffect(() => {
    if (isUserEdited) {
      dispatch(editUser({name, email, password: ''}));
    }
  }, [name, email]);

  return (
    <div className={ProfilePageStyles.container + ' mt-30'}>
      <div className={ProfilePageStyles.menu}>
        <p className={ProfilePageStyles.activeLink + ' pt-4 pb-4'}>
          <span className='text text_type_main-medium'>Профиль</span>
        </p>
        <Link to='/profile/orders' className={ProfilePageStyles.link + ' pt-4 pb-4'}>
          <span className='text text_type_main-medium text_color_inactive'>История заказов</span>
        </Link>
        <Link to='/logout' className={ProfilePageStyles.link + ' pt-4 pb-4'}>
          <span className='text text_type_main-medium text_color_inactive'>Выход</span>
        </Link>
        <p className='text text_type_main-small text_color_inactive mt-20'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={ProfilePageStyles.form}>        
        <Input placeholder='Имя' value={name} name='name' onChange={onFormChange} icon='EditIcon'/>
        <EmailInput placeholder='E-mail' value={email} name='email' onChange={onFormChange} extraClass='mt-6' icon='EditIcon'/>
        <PasswordInput placeholder='Пароль' value='' name='password' onChange={onFormChange} extraClass='mt-6' icon='EditIcon'/>
      </form>
    </div>
  );
}