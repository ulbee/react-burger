import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from '../IngredientCategory/IngredientCategory';
import BurgerIngredientsStyles from './BurgerIngredients.module.css';
import IngredientsPropTypes from '../../utils/propTypes';

function BurgerIngredients({ data, order, openIngredientModal }) {

  const categoriesTitles = {
    'bun': 'Булки',
    'main': 'Начинки',
    'sauce': 'Соусы'
  }
  
  const categoriesOrder = ['bun', 'main', 'sauce'];
      
  const [activeTab, setActiveTab] = useState('bun');

  const categories = data.reduce((res, item) => {
    (res[item.type] || (res[item.type] = [])).push(item);
    return res;
  }, {});    

  return (
    <section className={BurgerIngredientsStyles.section}>
      <h1 className={BurgerIngredientsStyles.title + ' pt-10 pb-5 text text_type_main-large'}>
        Соберите бургер
      </h1>
      <div className={BurgerIngredientsStyles.tabs + ' pb-10'}>
        {categoriesOrder.map((categoryId) => {
          return (
            <Tab
              key={categoryId}
              value={categoryId} 
              active={activeTab === categoryId} 
              onClick={() => {
                window.location.hash = '#' + categoryId;
                setActiveTab(categoryId);
              }}>
            {categoriesTitles[categoryId]}
          </Tab>
          );
        })}          
      </div>
      <div className={BurgerIngredientsStyles.categories}>
        {categoriesOrder.map((categoryId) => ( 
          <IngredientCategory 
            key={categoryId}
            id={categoryId} 
            title={categoriesTitles[categoryId]} 
            data={categories[categoryId]}
            order={order} 
            openIngredientModal={openIngredientModal} />
        ))}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(IngredientsPropTypes).isRequired,
  order: PropTypes.arrayOf(IngredientsPropTypes).isRequired
};

export default BurgerIngredients;
