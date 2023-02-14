import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ForgotPasswordPageStyles from './login.module.css';

import { Link, Navigate, useLocation } from 'react-router-dom';
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { setRegisterFormValue, forgotPassword } from '../services/actions/user';

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const {email, canResetPassword} = useSelector(state => state.user);

  const onFormSubmit = (e) => {
    e.preventDefault();

    dispatch(forgotPassword(email));
  }

  const onFormChange = (e) => {
    dispatch(setRegisterFormValue(e.target.name, e.target.value));
  }

  if (canResetPassword) {
    return <Navigate to='/reset-password' state={{from: location}} />
  }

  return (
    <div className={ForgotPasswordPageStyles.container}>
      <form className={ForgotPasswordPageStyles.form} onSubmit={onFormSubmit}>
        <h1 className='text text_type_main-medium'>
          Восстановление пароля
        </h1>
        <EmailInput placeholder='Укажите e-mail' name='email' value={email} onChange={onFormChange} extraClass='mt-6'/>
        <Button type='primary' htmlType='submit' size='medium' extraClass='mt-6'>
          Восстановить
        </Button>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Вспомнили пароль?&nbsp;
          <Link to='/login' replace className={ForgotPasswordPageStyles.link}>Войти</Link>
        </p>
      </form>
    </div>
  );
}