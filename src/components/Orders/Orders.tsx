import OrdersStyles from './Orders.module.css';
import { GET_ALL_ORDERS_URL, WS_STATUS_ONLINE } from '../../utils/constants';
import { wsConnect, wsDisconnect } from '../../services/actions/ws';
import { useEffect, FC } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import OrderSnippet from '../OrderSnippet/OrderSnippet';
import { TFeedData, TOrder } from '../../services/types/order';

type TOrdersByStatus = {
  done: Array<TOrder>; 
  progress: Array<TOrder>; 
  created: Array<TOrder>;
  cancelled: Array<TOrder>;
};

const Orders: FC = () => {
  const dispatch = useDispatch();
  const { total, totalToday, orders } = useSelector((state) => (
    state.ws.status === WS_STATUS_ONLINE && state.ws.feed?.success ? state.ws.feed as TFeedData : {orders: [], total: 0, totalToday: 0}
  ));

  const ordersByStatus: TOrdersByStatus | undefined = orders?.length ? (orders as Array<TOrder>).reduce((res: TOrdersByStatus, item) => {
    if (res[item.status].length < 20) {
      res[item.status].push(item);
    }

    return res;
  }, {done: [], progress: [], created: [], cancelled: []}) : undefined;

  const columnCountDone = (ordersByStatus && ordersByStatus.done.length > 10 )? Math.floor(ordersByStatus.done.length / 10) : 1;
  const columnCountProgress =  (ordersByStatus && ordersByStatus.progress.length > 10 )? Math.floor(ordersByStatus.progress.length / 10) : 1;

  useEffect(() => {
    dispatch(wsConnect(GET_ALL_ORDERS_URL));

    return () => { dispatch(wsDisconnect()); }
  }, [dispatch])

  return (
    <section className={OrdersStyles.container}>
      <h2 className={OrdersStyles.title + ' text text_type_main-large mt-10 mb-5'}>Лента заказов</h2>
      <section className={OrdersStyles.feed + ' pr-2'}>
        {orders &&
          orders.map((item, index) => {
            return <OrderSnippet key={item._id} order={item} link='/feed' />
          })
        }
      </section>
      <section className={OrdersStyles.board}>
        <div className={OrdersStyles.done}>
          <h3 className='mb-6'>Готовы:</h3>
       
          <ul className={OrdersStyles.ordersList} style={{ columnCount: columnCountDone}}>
            {ordersByStatus && ordersByStatus.done.map((item, index) => {
              return (
                <li key={index} className='text text_type_digits-default mb-2'>{item.number}</li>
              )
            })}
          </ul>
        </div>
        <div className={OrdersStyles.inProgress}>
          <h3 className='mb-6'>В работе:</h3>
          <ul className={OrdersStyles.ordersList} style={{ columnCount: columnCountProgress}}>
            {ordersByStatus && ordersByStatus.progress.map((item, index) => {
              return (
              <li key={index} className='text text_type_digits-default mb-2'>{item.number}</li>
              )
            })}
          </ul>
        </div>
        <div className={OrdersStyles.statistics}>
          <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
          <p className={OrdersStyles.ordersNumber + ' text text_type_digits-large'}>{total}</p>
        </div>
        <div className={OrdersStyles.statistics}>
          <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
          <p className={OrdersStyles.ordersNumber + ' text text_type_digits-large'}>{totalToday}</p>
        </div>
      </section>
    </section>
  );
}

export default Orders;
