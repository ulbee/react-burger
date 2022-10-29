import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from '../IngredientCategory/IngredientCategory';
import BurgerIngredientsStyles from './BurgerIngredients.module.css';
import IngredientsPropTypes from '../../utils/propTypes';

function BurgerIngredients({ data, openIngredientModal }) {

  const categoriesTitles = {
    'bun': 'Булки',
    'main': 'Начинки',
    'sauce': 'Соусы'
  }
  
  const categoriesOrder = ['bun', 'main', 'sauce'];
      
  const [activeTab, setActiveTab] = useState('bun');

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
            data={data[categoryId]}
            openIngredientModal={openIngredientModal} />
        ))}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.objectOf(PropTypes.arrayOf(IngredientsPropTypes)).isRequired,
  openIngredientModal: PropTypes.func.isRequired
};

export default BurgerIngredients;
