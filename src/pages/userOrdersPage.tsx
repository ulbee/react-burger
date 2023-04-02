import { useEffect } from 'react';
import { useDispatch, useSelector } from '../services/hooks';
import UserOrdersPageStyles from './userOrdersPage.module.css';

import { NavLink } from 'react-router-dom';
import { wsConnect, wsDisconnect } from '../services/actions/ws';
import { GET_USER_ORDERS_URL, WS_STATUS_ONLINE } from '../utils/constants';

import OrderSnippet from '../components/OrderSnippet/OrderSnippet';
import { getCookie } from '../utils/cookie';

const active = UserOrdersPageStyles.active + ' ' + UserOrdersPageStyles.link + ' pt-4 pb-4 text text_type_main-medium';
const link = UserOrdersPageStyles.link + ' pt-4 pb-4 text text_type_main-medium text_color_inactive';

export function UserOrdersPage() {
  const dispatch = useDispatch();
  const token = getCookie('accessToken');

  useEffect(() => {
    dispatch(wsConnect(`${GET_USER_ORDERS_URL}?token=${token}`));

    return () => { dispatch(wsDisconnect()); }
  }, [dispatch]);

  const feed = useSelector(({ ws }) => (
    ws.status === WS_STATUS_ONLINE && ws.feed?.success ? ws.feed : undefined
  ));

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
        {!feed && <div>Заказов пока нет</div>}
        {feed?.orders && feed.orders.map((item, index) => {
          return (<OrderSnippet key={index} order={item} needDetails link='/profile/orders'/>)
        })}
      </section>


    </div>
  );
}
