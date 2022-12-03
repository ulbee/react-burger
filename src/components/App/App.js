import AppStyles from './App.module.css';

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

import {getIngredients} from '../../services/actions';
import {SHOW_INGREDIENT, HIDE_INGREDIENT} from '../../utils/constants';

import { LoginPage } from '../../pages/login';
import { RegisterPage } from '../../pages/register';

function App() {
  const dispatch = useDispatch();

  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = useState(false);

  const { ingredientsByType, ingredientsRequest, ingredientsFailed } = useSelector(state => state.menu);
  
  const closeAllModals = () => {
    dispatch({type: HIDE_INGREDIENT});
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened({isOpened: false});
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
        <Router>
          <Switch>
            <Route path="/" exact={true}>
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
            </Route>
            <Route path="/login" exact={true}>
              <LoginPage />
            </Route>
            <Route path="/register" exact={true}>
              <RegisterPage />
            </Route>
            <Route path="/forgot-password" exact={true}>
            </Route>
            <Route path="/reset-password" exact={true}>
            </Route>
            <Route path="/profile" exact={true}>
            </Route>
            <Route path="/ingredients/:id" exact={true}>
            </Route>
            <Route>

            </Route>
          </Switch>
        </Router>
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
          <IngredientDetails/>
        </Modal>
      }
    </div>
  );
}

export default App;
