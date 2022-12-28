import React from 'react';
import ForgotPasswordPageStyles from './login.module.css';

import { Link } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export function ForgotPasswordPage() {
  const [emailValue, setEmailValue] = React.useState();
  const onEmailChange = e => {
    setEmailValue(e.target.value)
  }

  return (
    <div className={ForgotPasswordPageStyles.container}>
      <form className={ForgotPasswordPageStyles.form}>
        <h1 className='text text_type_main-medium'>
          Восстановление пароля
        </h1>
        <EmailInput placeholder='Укажите e-mail' value={emailValue} onChange={onEmailChange} extraClass='mt-6'/>
        <Button type='primary' size='medium' extraClass='mt-6'>
          Восстановить
        </Button>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Вспомнили пароль?&nbsp;
          <Link to='/login' className={ForgotPasswordPageStyles.link}>Войти</Link>
        </p>
      </form>
    </div>
  );
}