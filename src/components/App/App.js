import React from 'react';
import AppStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

import { INGREDIENTS } from '../../utils/data';
import { ORDER } from '../../utils/order';

function App() {
  return (
    <div className={AppStyles.main + ' m-10'}>
      <AppHeader />
      <main className={AppStyles.container}>
        <BurgerIngredients data={INGREDIENTS} order={ORDER} />
        <BurgerConstructor order={ORDER} />
      </main>
    </div>
  );
}

export default App;
