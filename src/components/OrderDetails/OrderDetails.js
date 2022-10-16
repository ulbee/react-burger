import React from 'react';
import OrderDetailsStyles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails({ id }) {
  
  return (
    <div className={OrderDetailsStyles.container + ' pt-20 pb-15'}>
      <p className={OrderDetailsStyles.title + ' text text_type_digits-large'}>{id}</p>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <CheckMarkIcon type="primary" />
      <p className='text text_type_main-default'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
};

export default OrderDetails;