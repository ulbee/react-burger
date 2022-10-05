import React from 'react';
import AppStyles from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';

import { INGREDIENTS } from './utils/data';

function App() {
  console.log('app');
  return (
    <div className={AppStyles.main + ' m-10'}>
      <AppHeader />
      <main>
        <BurgerIngredients data={INGREDIENTS}/>
      </main>
    </div>
  );
}

export default App;
