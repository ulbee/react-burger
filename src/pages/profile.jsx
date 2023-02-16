import { useDispatch, useSelector } from 'react-redux';
import ProfilePageStyles from './profile.module.css';

import { NavLink } from 'react-router-dom';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { editUser, setEditUserForm } from '../services/actions/user';
import { RESET_EDIT_USER_FORM } from '../utils/constants';

export function ProfilePage() {
  const dispatch = useDispatch();
  const {name, email, password, isUserEdited, editUserFailed} = useSelector(state => state.user);

  const onFormChange = (e) => {
    dispatch(setEditUserForm(e.target.name, e.target.value));
  }

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(editUser({name, email, password}));
  }

  const onReset = (e) => {
    dispatch({type: RESET_EDIT_USER_FORM});
  }

  const active = ProfilePageStyles.active + ' ' + ProfilePageStyles.link + ' pt-4 pb-4 text text_type_main-medium';
  const link = ProfilePageStyles.link + ' pt-4 pb-4 text text_type_main-medium text_color_inactive';

  return (
    <div className={ProfilePageStyles.container + ' mt-30'}>
      <div className={ProfilePageStyles.menu}>
      <NavLink end to='/profile' className={({ isActive }) => isActive ? active : link}>
          <span>Профиль</span>
        </NavLink>
        <NavLink to='/profile/orders'  className={({ isActive }) => isActive ? active : link}>
          <span>История заказов</span>
        </NavLink>
        <NavLink to='/logout' className={({ isActive }) => isActive ? active : link}>
          <span>Выход</span>
        </NavLink>
        <p className='text text_type_main-small text_color_inactive mt-20'>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <form className={ProfilePageStyles.form} onSubmit={onFormSubmit} onReset={onReset}>
        <Input placeholder='Имя' value={name} name='name' onChange={onFormChange} icon='EditIcon'/>
        <EmailInput placeholder='E-mail' value={email} name='email' onChange={onFormChange} extraClass='mt-6' icon='EditIcon'/>
        <PasswordInput placeholder='Пароль' value={password} name='password' onChange={onFormChange} extraClass='mt-6' icon='EditIcon'/>
        { isUserEdited &&
          <div className={ProfilePageStyles.formButtons + ' mt-6'}>
            <Button htmlType="reset" type="secondary" size="medium">
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium" extraClass="ml-2">
              Отправить
            </Button>
          </div>
        }
      </form>
      {editUserFailed && <p>Что-то пошло не так. Обновите страницу.</p>}
    </div>
  );
}