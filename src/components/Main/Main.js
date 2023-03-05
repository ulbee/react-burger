import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderAccepted from '../OrderAccepted/OrderAccepted';

import {SHOW_INGREDIENT, HIDE_INGREDIENT} from '../../utils/constants';

function Main() {
  const dispatch = useDispatch();

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);

  const { ingredientsByType, ingredientsRequest, ingredientsFailed } = useSelector(state => state.menu);
  
  const closeAllModals = () => {
    dispatch({type: HIDE_INGREDIENT});
    setIsOrderDetailsOpened(false);
  };
  
  const openOrderDetailsModal = () => {
    setIsOrderDetailsOpened(true);
  }

  const openIngredientModal = (e) => {
    dispatch({type: SHOW_INGREDIENT, id: e.currentTarget.id});
  }

  return (
    <>
      <ErrorBoundary>
        {ingredientsFailed && <p>Произошла ошибка</p>}
        {ingredientsRequest && <p>Загружаем данные</p>}
        {ingredientsByType && (
          <DndProvider backend={HTML5Backend}>
            <BurgerIngredients openIngredientModal={openIngredientModal}/>
            <BurgerConstructor openOrderDetailsModal={openOrderDetailsModal}/>
          </DndProvider>
        )}
      </ErrorBoundary> 
      {
        isOrderDetailsOpened &&
        <Modal title='' onClose={closeAllModals}>
            <OrderAccepted/>
        </Modal>
      }
    </>
    
  );
}

export default Main;
