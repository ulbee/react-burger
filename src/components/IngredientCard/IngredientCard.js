import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCardStyles from './IngredientCard.module.css';

function IngredientCard({ data }) {

  return (
    <div className={IngredientCardStyles.card}>
      <img src={data.image} alt={data.name} className={IngredientCardStyles.image}/>
      <p className={IngredientCardStyles.price + ' pt-1 pb-1'}>
        <span className='text text_type_digits-default'>{data.price}</span>
        <CurrencyIcon type="primary"/>
      </p>
      <p className={IngredientCardStyles.title + ' text text_type_main-default'}>
        {data.name}
      </p>
    </div>
  );
}

export default IngredientCard;
