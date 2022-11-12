import OrderDetailsStyles from './OrderDetails.module.css';

import { useSelector } from 'react-redux';

import done from '../../images/done.svg';

function OrderDetails() {
  const {orderId, orderRequest, orderFailed} = useSelector(state => state.menu);
  
  return (
    <>
      { orderRequest && <p>Обрабатываем запрос</p> }
      { orderFailed && <p>Произошла ошибка</p> }
      { !orderRequest && !orderFailed &&
        <div className={OrderDetailsStyles.container + ' pt-20 pb-15'}>
          <p className={OrderDetailsStyles.title + ' text text_type_digits-large'}>{orderId}</p>
          <p className='text text_type_main-medium'>идентификатор заказа</p>
          <img className='pt-15 pb-15' src={done} alt='Иконка принятого заказа'/>
          <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
          <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
      }
    </>
  )
};

export default OrderDetails;
