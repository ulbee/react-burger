import AppStyles from './App.module.css';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import {getIngredients} from '../../services/actions';
import {SHOW_INGREDIENT, HIDE_INGREDIENT} from '../../utils/constants';

function App() {
  const dispatch = useDispatch();

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false);

  const { ingredientsByType, ingredientsById, ingredientsRequest, ingredientsFailed } = useSelector(state => state.menu);
  
  const closeAllModals = () => {
    dispatch({type: HIDE_INGREDIENT});
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened({isOpened: false})
  };
  
  const openOrderDetailsModal = () => {
    setIsOrderDetailsOpened(true);
  }

  const openIngredientModal = (e) => {
    dispatch({type: SHOW_INGREDIENT, id: e.currentTarget.id});
    setIsIngredientDetailsOpened({isOpened: true});
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={AppStyles.main + ' m-10'}>
      <AppHeader />
      <main className={AppStyles.container}>
        <ErrorBoundary>
          {ingredientsFailed && <p>Произошла ошибка</p>}
          {ingredientsRequest && <p>Загружаем данные</p>}
          {ingredientsByType && (
            <>
                <BurgerIngredients openIngredientModal={openIngredientModal}/>
                <BurgerConstructor openOrderDetailsModal={openOrderDetailsModal}/>
            </>
          )}
        </ErrorBoundary>
      </main>
      {
        isOrderDetailsOpened &&
        <Modal title='' onClose={closeAllModals}>
            <OrderDetails/>
        </Modal>
      }
      {
        isIngredientDetailsOpened.isOpened &&
        <Modal title='Детали ингридиента' onClose={closeAllModals}>
          <IngredientDetails data={ingredientsById[isIngredientDetailsOpened.id]}/>
        </Modal>
      }
    </div>
  );
}

export default App;
