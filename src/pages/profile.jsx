import React from 'react';
import ProfilePageStyles from './profile.module.css';

import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';

export function ProfilePage() {
  const [nameValue, setNameValue] = React.useState();
  const onNameChange = e => {
    setNameValue(e.target.value)
  }

  const [passwordValue, setPasswordValue] = React.useState();
  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  }

  const [emailValue, setEmailValue] = React.useState();
  const onEmailChange = e => {
    setEmailValue(e.target.value)
  }

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
        <Input placeholder='Имя' value={nameValue} onChange={onNameChange} icon='EditIcon'/>
        <EmailInput placeholder='E-mail' value={emailValue} onChange={onEmailChange} extraClass='mt-6' icon='EditIcon'/>
        <PasswordInput placeholder='Пароль' value={passwordValue} onChange={onPasswordChange} extraClass='mt-6' icon='EditIcon'/>                
      </form>
    </div>
  );
}