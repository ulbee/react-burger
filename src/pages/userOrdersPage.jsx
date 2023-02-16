import React from 'react';
import UserOrdersPageStyles from './userOrdersPage.module.css';

import { NavLink } from 'react-router-dom';

const active = UserOrdersPageStyles.active + ' ' + UserOrdersPageStyles.link + ' pt-4 pb-4 text text_type_main-medium';
const link = UserOrdersPageStyles.link + ' pt-4 pb-4 text text_type_main-medium text_color_inactive';

export function UserOrdersPage() {
  return (
    <div className={UserOrdersPageStyles.container + ' mt-30'}>
      <div className={UserOrdersPageStyles.menu}>
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
      <div>Скоро здесь появятся заказы</div>
    </div>
  );
}
