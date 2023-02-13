import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginPageStyles from './login.module.css';

import { Link } from 'react-router-dom';
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { setRegisterFormValue, loginUser } from '../services/actions/user';

export function LoginPage() {
  const dispatch = useDispatch();

  const {email, password} = useSelector(state => state.user);

  const loginUserHandler = (e) => {
    e.preventDefault();

    dispatch(loginUser({email, password}));
  }

  const onFormChange = (e) => {
    dispatch(setRegisterFormValue(e.target.name, e.target.value));    
  }

  return (
    <div className={LoginPageStyles.container}>
      <form className={LoginPageStyles.form} onSubmit={loginUserHandler}>
        <h1 className='text text_type_main-medium'>
          Вход
        </h1>
        <EmailInput placeholder='E-mail' value={email} name='email' onChange={onFormChange} extraClass='mt-6' required/>
        <PasswordInput placeholder='Пароль' value={password || ''} name='password' onChange={onFormChange} extraClass='mt-6' required/>
        <Button type='primary' htmlType='submit' size='medium' extraClass='mt-6'>
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