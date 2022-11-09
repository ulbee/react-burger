import React, { useEffect, useState } from 'react';
import AppStyles from './App.module.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { OrderContext } from '../../utils/OrderContext';
import { getIngredients } from '../../utils/api';

import { ORDER } from '../../utils/order';

function App() {
  const orderState = useState({...ORDER, id: undefined});

  const [state, setState] = React.useState({ingredientsById: undefined, ingredientsByType: undefined, loading: false});
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
  const [ingredientDetails, setIngredientDetails] = React.useState({isOpened: false, id: null});

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIngredientDetails({isOpened: false, id: null})
  };
  
  const openOrderDetailsModal = () => {
    setIsOrderDetailsOpened(true);
  }

  const openIngredientModal = (e) => {
    setIngredientDetails({isOpened: true, id: e.currentTarget.id});
  }

  useEffect(() => {
    setState({...state, loading: true});
    getIngredients().then((res) => {
      const ingredientsById = {};
      const ingredientsByType = {};

      res.data.forEach((item) => {
        ingredientsById[item._id] = item;
        (ingredientsByType[item.type] || (ingredientsByType[item.type] = [])).push(item);
      });

      setState({
        ...state,
        ingredientsById,
        ingredientsByType,
        loading: false
      });
    })
    .catch((err) => {
      console.log('Ошибка при получении данных: ' + err);
    })
  }, []);

  return (
    <div className={AppStyles.main + ' m-10'}>
      <AppHeader />
      <main className={AppStyles.container}>
        <ErrorBoundary>
          {
            state.loading ? 
              'Загружаем данные' :
              state.ingredientsByType &&
              <>
                <OrderContext.Provider value={orderState}>
                  <BurgerIngredients data={state.ingredientsByType} openIngredientModal={openIngredientModal}/>
                  <BurgerConstructor openOrderDetailsModal={openOrderDetailsModal}/>
                </OrderContext.Provider>
              </>
          }
        </ErrorBoundary>
      </main>
      {
        isOrderDetailsOpened &&
        <Modal title='' onClose={closeAllModals}>
          <OrderContext.Provider value={orderState}>
            <OrderDetails/>
          </OrderContext.Provider>
        </Modal>
      }
      {
        ingredientDetails.isOpened &&
        <Modal title='Детали ингридиента' onClose={closeAllModals}>
          <IngredientDetails data={state.ingredientsById[ingredientDetails.id]}/>
        </Modal>
      }
    </div>
  );
}

export default App;
