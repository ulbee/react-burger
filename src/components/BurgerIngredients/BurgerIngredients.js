import BurgerIngredientsStyles from './BurgerIngredients.module.css';

import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from '../IngredientCategory/IngredientCategory';

import { SET_ACTIVE_TAB } from '../../utils/constants';


function BurgerIngredients({ openIngredientModal }) {
  const dispatch = useDispatch();

  const { ingredientsByType, activeTab } = useSelector(state => state.menu);
  
  const categoriesTitles = {
    'bun': 'Булки',
    'main': 'Начинки',
    'sauce': 'Соусы'
  }
  
  const [bunsRef, inViewBuns] = useInView({
    threshold: 0.3
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0.3
  });
  const [saucesRef, inViewSauces] = useInView({
    threshold: 0.3
  });

  const categoriesOrder = [
    {name: 'bun', ref: bunsRef, inView: inViewBuns}, 
    {name: 'main', ref: mainsRef, inView: inViewFilling}, 
    {name: 'sauce', ref: saucesRef, inView: inViewSauces}
  ];

  const setActiveTab = (name) => {
    dispatch({type: SET_ACTIVE_TAB, name})
  }

  return (
    <section className={BurgerIngredientsStyles.section}>
      <h1 className={BurgerIngredientsStyles.title + ' pt-10 pb-5 text text_type_main-large'}>
        Соберите бургер
      </h1>
      <div className={BurgerIngredientsStyles.tabs + ' pb-10'}>
        {categoriesOrder.map((category) => {
          console.log('TAB', activeTab, category.name);
          return (
            <Tab
              key={category.name}
              value={category.name} 
              active={activeTab === category.name} 
              onClick={() => {
                window.location.hash = '#' + category.name;
                setActiveTab(category.name);
              }}>
            {categoriesTitles[category.name]}
          </Tab>
          );
        })}          
      </div>
      <div className={BurgerIngredientsStyles.categories}>
        {categoriesOrder.map((category) => ( 
          <IngredientCategory 
            key={category.name}
            id={category.name} 
            title={categoriesTitles[category.name]} 
            data={ingredientsByType[category.name]}
            openIngredientModal={openIngredientModal}
            link={category.ref} 
            inView={category.inView}/>
        ))}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  openIngredientModal: PropTypes.func.isRequired
};

export default BurgerIngredients;
