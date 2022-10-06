import React from 'react';
import AppStyles from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';

import { INGREDIENTS } from './utils/data';
import { ORDER } from './utils/order';

function App() {
  return (
    <div className={AppStyles.main + ' m-10'}>
      <AppHeader />
      <main className={AppStyles.container}>
        <BurgerIngredients data={INGREDIENTS} order={ORDER} />
        <BurgerConstructor data={ORDER} />
      </main>
    </div>
  );
}

export default App;
