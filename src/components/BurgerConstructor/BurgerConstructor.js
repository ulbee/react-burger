import BurgerConstructorStyles from './BurgerConstructor.module.css';

import React, { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';

import { ConstructorElement, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import TotalPrice from '../TotalPrice/TotalPrice';
import Ingredient from '../Ingredient/Ingredient';

import { sendOrder } from '../../services/actions';
import { ADD_BUN, ADD_INGREDIENT } from '../../utils/constants';


function BurgerConstructor({ openOrderDetailsModal }) {
  const dispatch = useDispatch();

  const {addedIngredients, ingredientsById} = useSelector(state => state.menu);

  const ingredientIds = () => {
    let res = addedIngredients.bun ? [addedIngredients.bun._id] : [];

    addedIngredients.others.map(item => {
      res.push(item._id);
    });

    if (addedIngredients.bun) {
      res.push(addedIngredients.bun._id);
    }
    return res;
  }
  
  const sendOrderHandler = () => {
    dispatch(sendOrder(ingredientIds()));

    openOrderDetailsModal();
  }

  const [{isHover}, dropTarget] = useDrop({
    accept: 'ingredient',
    item: {},
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(item) {
      const type = ingredientsById[item.id].type === 'bun' ? ADD_BUN : ADD_INGREDIENT;
      dispatch({type: type, id: item.id})
  },
  })

  return (
    <section ref={dropTarget} className={BurgerConstructorStyles.section + ' pt-25 pl-4 pr-4 pb-13'}>
      <div className={BurgerConstructorStyles.bun + ' pl-8 pr-4'}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={addedIngredients.bun?.name + ' (верх)'}
          price={addedIngredients.bun?.price}
          thumbnail={addedIngredients.bun?.image}/>
      </div>
      <ul className={BurgerConstructorStyles.list} >
        {(addedIngredients.others.length) ?
            addedIngredients.others.map((item, index) => {
            return (
              <Ingredient key={index} id={item._id} index={index}/>
            );
          })
          : ''
        }
      </ul>
      <div className={BurgerConstructorStyles.bun + ' pl-8 pr-4'}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={addedIngredients.bun?.name + ' (низ)'}
          price={addedIngredients.bun?.price}
          thumbnail={addedIngredients.bun?.image}/>
      </div>
      <div className={BurgerConstructorStyles.total + ' pr-4'}>
        <TotalPrice/>        
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
