import React, { useEffect } from 'react';
import UserOrdersPageStyles from './userOrdersPage.module.css';

import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { wsConnect, wsDisconnect } from '../services/actions/ws';
import { GET_USER_ORDERS_URL } from '../utils/constants';

import OrderSnippet from '../components/OrderSnippet/OrderSnippet';
import { getCookie } from '../utils/cookie';

const active = UserOrdersPageStyles.active + ' ' + UserOrdersPageStyles.link + ' pt-4 pb-4 text text_type_main-medium';
const link = UserOrdersPageStyles.link + ' pt-4 pb-4 text text_type_main-medium text_color_inactive';

export function UserOrdersPage() {
  const dispatch = useDispatch();
  const token = getCookie('accessToken');

  useEffect(() => {
    dispatch(wsConnect(`${GET_USER_ORDERS_URL}?token=${token}`));

    return () => dispatch(wsDisconnect());
  }, [dispatch]);

  const { orders } = useSelector(state => state.ws.feed);

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
      <section className={UserOrdersPageStyles.section}>
        {!orders && <div>Заказов пока нет</div>}
        {orders && orders.map((item, index) => {
          return (<OrderSnippet key={index} order={item} needDetails link='/profile/orders'/>)
        })}
      </section>


    </div>
  );
}
