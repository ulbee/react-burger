import React, { useContext } from 'react';
import OrderDetailsStyles from './OrderDetails.module.css';
import done from '../../images/done.svg';
import { OrderContext } from '../../utils/OrderContext';

function OrderDetails() {
  const [order] = useContext(OrderContext);
  
  return (
    <div className={OrderDetailsStyles.container + ' pt-20 pb-15'}>
      <p className={OrderDetailsStyles.title + ' text text_type_digits-large'}>{order.id}</p>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <img className='pt-15 pb-15' src={done} alt='Иконка принятого заказа'/>
      <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
};

export default OrderDetails;
