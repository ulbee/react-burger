import React from 'react';
import ResetPasswordPageStyles from './login.module.css';

import { Link } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';

export function ResetPasswordPage() {
  const [codeValue, setCodeValue] = React.useState();
  const onCodeChange = e => {
    setCodeValue(e.target.value)
  }

  const [passwordValue, setPasswordValue] = React.useState();
  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
  }

  return (
    <div className={ResetPasswordPageStyles.container}>
      <form className={ResetPasswordPageStyles.form}>
        <h1 className='text text_type_main-medium'>
          Восстановление пароля
        </h1>
        <PasswordInput placeholder='Введите новый пароль' value={passwordValue} onChange={onPasswordChange} extraClass='mt-6'/>
        <Input placeholder='Введите код из письма' value={codeValue} onChange={onCodeChange} extraClass='mt-6' />
        <Button type='primary' size='medium' extraClass='mt-6'>
          Сохранить
        </Button>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Вспомнили пароль?&nbsp;
          <Link to='/login' className={ResetPasswordPageStyles.link}>Войти</Link>
        </p>
      </form>
    </div>
  );
}