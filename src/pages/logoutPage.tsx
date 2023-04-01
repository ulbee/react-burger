import { FormEvent } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import LogoutPageStyles from './login.module.css';

import { Navigate } from 'react-router-dom';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { logoutUser } from '../services/actions/user';

export function LogoutPage() {
  const dispatch = useDispatch();

  const {isAuthSuccess} = useSelector(state => state.user);

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(logoutUser({}));
  }

  if (!isAuthSuccess) {
    return <Navigate to='/login' replace/>
  }

  return (
    <div className={LogoutPageStyles.container}>
      <form className={LogoutPageStyles.form} onSubmit={onFormSubmit}>
        <h1 className='text text_type_main-medium'>
          Вы точно хотите выйти?
        </h1>
        <Button type='primary' htmlType='submit' size='medium' extraClass='mt-6'>
          Да
        </Button>        
      </form>
    </div>
  );
}