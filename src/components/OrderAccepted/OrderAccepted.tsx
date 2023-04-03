import { FC } from 'react';
import OrderAcceptedStyles from './OrderAccepted.module.css';

import { useSelector } from '../../services/hooks';

import done from '../../images/done.svg';

const OrderAccepted: FC = () => {
  const {orderId, orderRequest, orderFailed} = useSelector(state => state.menu);
  
  return (
    <>
      { orderRequest && <p>Обрабатываем запрос</p> }
      { orderFailed && <p>Произошла ошибка</p> }
      { !orderRequest && !orderFailed &&
        <div className={OrderAcceptedStyles.container + ' pt-20 pb-15'}>
          <p className={OrderAcceptedStyles.title + ' text text_type_digits-large'}>{orderId}</p>
          <p className='text text_type_main-medium'>идентификатор заказа</p>
          <img className='pt-15 pb-15' src={done} alt='Иконка принятого заказа'/>
          <p className='text text_type_main-default pb-2'>Ваш заказ начали готовить</p>
          <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
        </div>
      }
    </>
  )
};

export default OrderAccepted;
