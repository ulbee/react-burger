import React, { useEffect } from 'react';
import AppStyles from './App.module.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { OrderContext } from '../../utils/OrderContext';

import { ORDER } from '../../utils/order';

function App() {
  const URL = 'https://norma.nomoreparties.space/api/ingredients';

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
    const getIngredients = async () => {
      try {
        setState({...state, loading: true});
        const data = await fetch(URL);

        if (!data.ok) {
          throw new Error('Произошла ошибка: ' + data.status);
        }
        const res = await data.json();

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
      } catch(err) {
        console.log('Ошибка при получении данных: ' + err);
      }
    }

    getIngredients();
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
                <OrderContext.Provider value={ORDER}>
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
          <OrderDetails id='034536'/>
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
