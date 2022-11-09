import BurgerConstructorStyles from './BurgerConstructor.module.css';

import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { DragIcon, ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { sendOrder } from '../../services/actions';


function BurgerConstructor({ openOrderDetailsModal }) {
  const dispatch = useDispatch();

  const {addedIngredients} = useSelector(state => state.menu);

  const ingredientIds = useRef([]);
  ingredientIds.current.push(addedIngredients.bun._id);

  const total = useMemo(() => {
    return addedIngredients.others.reduce((res, item) => {
      res += item.price;
      ingredientIds.current.push(item._id);

      return res;
    }, addedIngredients.bun.price * 2);
  }, [addedIngredients.bun, addedIngredients.others]);
  
  ingredientIds.current.push(addedIngredients.bun._id);
  
  const sendOrderHandler = () => {
    dispatch(sendOrder(ingredientIds.current));
    // sendOrderRequest(ingredientIds.current).then((orderDetails) => {
    //   setOrder({...order, id: orderDetails.order.number});

      openOrderDetailsModal();
    // });
  }

  return (
    <section className={BurgerConstructorStyles.section + ' pt-25 pl-4 pr-4 pb-13'}>
      <div className={BurgerConstructorStyles.bun + ' pl-8 pr-4'}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={addedIngredients.bun.name + ' (верх)'}
          price={addedIngredients.bun.price}
          thumbnail={addedIngredients.bun.image}/>
      </div>
      <ul className={BurgerConstructorStyles.list} >
        {
          addedIngredients.others.map((item, index) => {
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
          text={addedIngredients.bun.name + ' (низ)'}
          price={addedIngredients.bun.price}
          thumbnail={addedIngredients.bun.image}/>
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

BurgerConstructor.propTypes = {
  openOrderDetailsModal: PropTypes.func.isRequired
};

export default BurgerConstructor;
