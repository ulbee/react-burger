import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCardStyles from './IngredientCard.module.css';

function IngredientCard({ data }) {

  console.log('IngredientCard ', data);
  return (
    <div className={IngredientCardStyles.card}>
      <img src={data.image} alt={data.name} className={IngredientCardStyles.image}/>
      <p className={IngredientCardStyles.price}>
        {data.price}
        <CurrencyIcon type="secondary"/>
      </p>
      <p className={IngredientCardStyles.title + ' text '}>
        {data.name}
      </p>
    </div>
  );
}

export default IngredientCard;