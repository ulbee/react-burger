import React from 'react';
import RegisterPageStyles from './login.module.css';

import { Link } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export function RegisterPage() {
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
    <div className={RegisterPageStyles.container}>
      <form className={RegisterPageStyles.form}>
        <h1 className='text text_type_main-medium'>
          Регистрация
        </h1>
        <Input placeholder='Имя' value={nameValue} onChange={onNameChange} extraClass='mt-6' />
        <EmailInput placeholder='E-mail' value={emailValue} onChange={onEmailChange} extraClass='mt-6'/>
        <PasswordInput placeholder='Пароль' value={passwordValue} onChange={onPasswordChange} extraClass='mt-6'/>
        <Button type='primary' size='medium' extraClass='mt-6'>
          Зарегистрироваться
        </Button>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Уже зарегистрированы?&nbsp;
          <Link to='/login' style={{color: '#4C4CFF'}}>Войти</Link>
        </p>
      </form>
    </div>
  );
}