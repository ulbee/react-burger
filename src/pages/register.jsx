import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RegisterPageStyles from './login.module.css';

import { Link, Navigate } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { setRegisterFormValue, addUser } from '../services/actions/user';

export function RegisterPage() {
  const dispatch = useDispatch();

  const {name, email, password, isAuthSuccess} = useSelector(state => state.user);

  const addUserHandler = (e) => {
    e.preventDefault();

    dispatch(addUser({name, email, password}));
  }

  const onFormChange = (e) => {
    dispatch(setRegisterFormValue(e.target.name, e.target.value));    
  }

  if (isAuthSuccess) {
    return <Navigate to='/' replace/>
  }

  return (
    <div className={RegisterPageStyles.container}>
      <form className={RegisterPageStyles.form} onSubmit={addUserHandler}>
        <h1 className='text text_type_main-medium'>
          Регистрация
        </h1>
        <Input placeholder='Имя' value={name} name='name' onChange={onFormChange} extraClass='mt-6' required/>
        <EmailInput placeholder='E-mail' value={email} name='email' onChange={onFormChange} extraClass='mt-6' required/>
        <PasswordInput placeholder='Пароль' value={password} name='password' onChange={onFormChange} extraClass='mt-6' required/>
        <Button type='primary' htmlType='submit' size='medium' extraClass='mt-6'>
          Зарегистрироваться
        </Button>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Уже зарегистрированы?&nbsp;
          <Link to='/login' className={RegisterPageStyles.link}>Войти</Link>
        </p>
      </form>
    </div>
  );
}