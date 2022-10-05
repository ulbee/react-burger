import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCategory from '../IngredientCategory/IngredientCategory';
import BurgerIngredientsStyles from './BurgerIngredients.module.css';

function BurgerIngredients({ data }) {

  let categories = [
    {
      title: 'Булки',
      titleId: 'bun'  ,
      data: []    
    },
    {
      title: 'Начинки',
      titleId: 'main',
      data: []   
    },
    {
      title: 'Соусы',
      titleId: 'sauce',
      data: []
    }
  ]
  
  data.forEach((item) => {
    categories.find((el) => {
      return el.titleId === item.type;
    }).data.push(item);
  });

  return (
    <section className={BurgerIngredientsStyles.section}>
      <h1 className={BurgerIngredientsStyles.title + ' pt-10 pb-5 text text_type_main-large'}>
        Соберите бургер
      </h1>
      <div className={BurgerIngredientsStyles.tabs + ' pb-10'}>
        <Tab value='bun' active={true} onClick={() => {console.log('tab')}}>
          Булки
        </Tab>
        <Tab value='sauce' onClick={() => {console.log('tab')}}>
          Соусы
        </Tab>
        <Tab value='main' onClick={() => {console.log('tab')}}>
          Начинки
        </Tab>
      </div>
      <div className={BurgerIngredientsStyles.categories}>
        {categories.map((el) => {
          return <IngredientCategory title={el.title} titleId={el.titleId} data={el.data} key={el.titleId}/>
        })}
      </div>
    </section>
  );
}

export default BurgerIngredients;
