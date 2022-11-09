import PropTypes from 'prop-types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCardStyles from './IngredientCard.module.css';
import IngredientsPropTypes from '../../utils/propTypes';

function IngredientCard({ data, count, openIngredientModal }) {

  return (
    <div id={data._id} className={IngredientCardStyles.card} onClick={openIngredientModal}>

      { count ? <Counter count={count} size="default"/> : '' }

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

IngredientCard.propTypes = {
  data: IngredientsPropTypes.isRequired,
  count: PropTypes.number,
  openIngredientModal: PropTypes.func.isRequired
}

export default IngredientCard;
