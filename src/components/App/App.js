import React, { useEffect } from 'react';
import AppStyles from './App.module.css';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';

import { ORDER } from '../../utils/order';

function App() {
  const URL = 'https://norma.nomoreparties.space/api/ingredients';

  const [state, setState] = React.useState({ingredients: [], loading: false});
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(true);
  const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false);

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIsIngredientDetailsOpened(false)
  };

  const handleEscKeydown = (e) => {
    e.key === 'Escape' && closeAllModals();
  };
  
  const openOrderDetailsModal = () => {
    setIsOrderDetailsOpened(true);
  }

  const openIngredientModal = () => {
    setIsIngredientDetailsOpened(true);
  }

  useEffect(() => {
    const getIngredients = async () => {
      try {
        setState({...state, loading: true});
        const res = await fetch(URL);
        const data = await res.json();
        setState({...state, ingredients: data, loading: false});
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
          { state.loading && 'Загружаем данные' }
          { !state.loading && state.ingredients.data &&        
          <>
            <BurgerIngredients data={state.ingredients.data} order={ORDER} openIngredientModal={openIngredientModal}/>
            <BurgerConstructor order={ORDER} openOrderDetailsModal={openOrderDetailsModal}/>
          </>
          }
        </ErrorBoundary>
      </main>
      {
        isOrderDetailsOpened &&
        <Modal title='' onOverlayClick={closeAllModals} onEscKeydown={handleEscKeydown}>          
          <OrderDetails id='034536'/>
        </Modal>
      }
      {
        isIngredientDetailsOpened &&
        <Modal title='Детали ингридиента' onOverlayClick={closeAllModals} onEscKeydown={handleEscKeydown}>

        </Modal>
      }
    </div>
  );
}

export default App;
