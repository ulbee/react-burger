import { FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import ResetPasswordPageStyles from './login.module.css';

import { Link, Navigate } from 'react-router-dom';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword, setRegisterFormValue } from '../services/actions/user';

export function ResetPasswordPage() {
  const dispatch = useDispatch();

  const {password, code, resetPasswordSuccess} = useSelector(state => state.user);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(resetPassword(password, code));
  }

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setRegisterFormValue(e.target.name, e.target.value));
  }

  if (resetPasswordSuccess) {
    return <Navigate to='/login' replace />
  }

  return (
    <div className={ResetPasswordPageStyles.container}>
      <form className={ResetPasswordPageStyles.form} onSubmit={onFormSubmit}>
        <h1 className='text text_type_main-medium'>
          Восстановление пароля
        </h1>
        <PasswordInput placeholder='Введите новый пароль' name='password' value={password} onChange={onFormChange} extraClass='mt-6'/>
        <Input placeholder='Введите код из письма' name='code' value={code} onChange={onFormChange} extraClass='mt-6' />
        <Button type='primary' htmlType='submit' size='medium' extraClass='mt-6'>
          Сохранить
        </Button>
        <p className='text text_type_main-default text_color_inactive mt-20'>
          Вспомнили пароль?&nbsp;
          <Link to='/login' replace className={ResetPasswordPageStyles.link}>Войти</Link>
        </p>
      </form>
    </div>
  );
}
