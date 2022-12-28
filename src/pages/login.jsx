import React from 'react';
import LoginPageStyles from './login.module.css';

import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export function LoginPage() {
  const [passwordValue, setPasswordValue] = React.useState();
  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  }

  const [emailValue, setEmailValue] = React.useState();
  const onEmailChange = e => {
    setEmailValue(e.target.value)
  }

  return (
    <div className={LoginPageStyles.container}>
      <form className={LoginPageStyles.form}>
        <h1 className='text text_type_main-medium'>
          Вход
        </h1>
        <EmailInput placeholder='E-mail' value={emailValue} onChange={onEmailChange} extraClass='mt-6'/>
        <PasswordInput placeholder='Пароль' value={passwordValue} onChange={onPasswordChange} extraClass='mt-6'/>
        <Button type='primary' size='medium' extraClass='mt-6'>
          Войти
        </Button>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Вы&nbsp;—&nbsp;новый пользователь?&nbsp;
          <Link to='/register' className={LoginPageStyles.link}>Зарегистрироваться</Link>
        </p>
        <p className='text text_type_main-default text_color_inactive mt-4'>
        Забыли пароль?&nbsp;
          <Link to='/forgot-password' className={LoginPageStyles.link}>Восстановить пароль</Link>
        </p>
      </form>
    </div>
  );
}