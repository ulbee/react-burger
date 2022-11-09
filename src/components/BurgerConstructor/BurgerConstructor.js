import React, { useContext, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import { OrderContext } from '../../utils/OrderContext';
import { sendOrderRequest } from '../../utils/api';

function BurgerConstructor({ openOrderDetailsModal }) {
  const [order, setOrder] = useContext(OrderContext);


  const ingredientIds = useRef([]);
  ingredientIds.current.push(order.bun._id);

  const total = useMemo(() => {
    return order.others.reduce((res, item) => {
      res += item.price;
      ingredientIds.current.push(item._id);

      return res;
    }, order.bun.price * 2);
  }, [order.bun, order.others]);
  
  ingredientIds.current.push(order.bun._id);
  
  const sendOrderHandler = () => {
    sendOrderRequest(ingredientIds.current).then((orderDetails) => {
      setOrder({...order, id: orderDetails.order.number});

      openOrderDetailsModal();
    });
  }

  return (
    <section className={BurgerConstructorStyles.section + ' pt-25 pl-4 pr-4 pb-13'}>
      <div className={BurgerConstructorStyles.bun + ' pl-8 pr-4'}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={order.bun.name + ' (верх)'}
          price={order.bun.price}
          thumbnail={order.bun.image}/>
      </div>
      <ul className={BurgerConstructorStyles.list} >
        {
          order.others.map((item, index) => {
            return (
              <li key={index} className={BurgerConstructorStyles.item + ' pb-4 pr-2'} >
                <DragIcon type="primary" />
                <ConstructorElement
                  isLocked={false}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}/>
              </li>
            );
          })
        }
      </ul>
      <div className={BurgerConstructorStyles.bun + ' pl-8 pr-4'}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={order.bun.name + ' (низ)'}
          price={order.bun.price}
          thumbnail={order.bun.image}/>
      </div>
      <div className={BurgerConstructorStyles.total + ' pr-4'}>
        <div className={BurgerConstructorStyles.info + ' pr-10'}>
          <span className='text text_type_digits-default'>{total}</span>
          <CurrencyIcon type="primary"/>
        </div>
        <Button type="primary" size="medium" htmlType="submit" onClick={sendOrderHandler}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}

// BurgerConstructor.propTypes = {
//   openOrderDetailsModal: PropTypes.func.isRequired
// };

export default BurgerConstructor;
