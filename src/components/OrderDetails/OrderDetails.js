import OrderDetailsStyles from './OrderDetails.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useLocation, useParams } from 'react-router-dom';
import IngredientPreview from '../IngredientPreview/IngredientPreview';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ORDER_STATUSES, GET_ALL_ORDERS_URL } from '../../utils/constants';
import { wsConnect } from '../../services/actions/ws';
import { getFormattedDate } from '../../utils/date';

function OrderDetails() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { orders } = useSelector(state => state.ws.feed);
  const { ingredientsById } = useSelector(state => state.menu);
  const { orderId } = useParams();
  let fullPageClass = location.state ? '' : 'fullPage';

  const currentOrder = orders?.find((el) => {
    return el._id === orderId;
  });

  const ingredientCounts = currentOrder?.ingredients.reduce((res, item) => {
    if (!res[item]) {
      res[item] = 0
    }
    res[item]++;
    res.total += ingredientsById[item].price;

    return res;
  }, {total: 0});

  useEffect(() => {
    if (!location.state) {
      dispatch(wsConnect(GET_ALL_ORDERS_URL));
    }
  }, [dispatch])
  
  return (
    <>
      { !currentOrder && <p>Обрабатываем запрос</p> }
      { currentOrder &&
        <div className={OrderDetailsStyles.container + ' ' + OrderDetailsStyles[fullPageClass]}>
          <p className={OrderDetailsStyles.orderNumber + ' text text_type_digits-default mb-10'}>#{currentOrder.number}</p>
          <h2 className='text text_type_main-medium'>{currentOrder.name}</h2>
          <p className={OrderDetailsStyles.status + ' ' + OrderDetailsStyles[currentOrder.status] + ' text text_type_main-default mt-3'}>{ORDER_STATUSES[currentOrder.status]}</p>
          <p className='text text_type_main-medium mt-15'>Статус:</p>
          <ul className={OrderDetailsStyles.list + ' mt-6'}>
            {currentOrder.ingredients.map((item, index) => {
              return (
                <li className='mr-6' key={index}>
                  <IngredientPreview id={item} />
                  <p className={OrderDetailsStyles.name + ' pl-8 text text_type_main-default'}>{ingredientsById[item].name}</p>
                  <div className={OrderDetailsStyles.price + ' ml-4 text text_type_digits-default'}>
                    {ingredientCounts[item]} x {ingredientsById[item].price}
                    <CurrencyIcon type="primary" />
                  </div>
                </li>
              )
            })}
          </ul>
          <div className={OrderDetailsStyles.info + ' mt-10'}>
            <p className='text text_type_main-default text_color_inactive'>{getFormattedDate(currentOrder.createdAt)}</p>
            <div className={OrderDetailsStyles.price + ' text text_type_digits-default'}>
              {ingredientCounts.total}
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      }
    </>
  )
};

export default OrderDetails;
