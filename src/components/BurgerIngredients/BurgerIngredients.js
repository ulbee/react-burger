import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../IngredientCard/IngredientCard';
import BurgerIngredientsStyles from './BurgerIngredients.module.css';

function BurgerIngredients({ data }) {

  
  const bun = data.filter((item) => {
    return item.type === 'bun';
  });
  const main = data.filter((item) => {
    return item.type === 'main';
  });

  const souce = data.filter((item) => {
    return item.type === 'souce';
  });

  return (
    <section className={BurgerIngredientsStyles.section}>
      <h1 className={BurgerIngredientsStyles.title + ' pt-10 pb-5 text text_type_main-large'}>
        Соберите бургер
      </h1>
      <div style={{ display: 'flex' }} className='pb-10'>
        <Tab value='bun' active={true} onClick={() => {console.log('tab')}}>
          Булки
        </Tab>
        <Tab value='souce' onClick={() => {console.log('tab')}}>
          Соусы
        </Tab>
        <Tab value='main' onClick={() => {console.log('tab')}}>
          Начинки
        </Tab>
      </div>
      <div id='bun' className={BurgerIngredientsStyles.container}>
        <h2 className={BurgerIngredientsStyles.title}>
          Булки
        </h2>
        {bun.map((item) => {
            return <IngredientCard data={item} key={item._id}/>
          })}
      </div>
      <div id='main' className={BurgerIngredientsStyles.container}>
        <h2 className={BurgerIngredientsStyles.title}>
          Начинки
        </h2>
        {main.map((item) => {
            return <IngredientCard data={item} key={item._id}/>
        })}
      </div>
      <div id='souce' className={BurgerIngredientsStyles.container}>
        <h2 className={BurgerIngredientsStyles.title}>
          Соусы
        </h2>
        {souce.map((item) => {
            return <IngredientCard data={item} key={item._id}/>
        })}
      </div>
    </section>
  );
}

export default BurgerIngredients;