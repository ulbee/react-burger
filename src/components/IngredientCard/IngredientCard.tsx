import IngredientCardStyles from './IngredientCard.module.css';

import { TIngredient } from '../../services/types/ingredients';
import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

type TIngredientCardProps = {
  data: TIngredient;
  count?: number;
  openIngredientModal: () => void;
}
const IngredientCard: FC<TIngredientCardProps> = ({ data, count, openIngredientModal }) => {
  const location = useLocation();

  const [{ opacity }, ref] = useDrag({
    type: 'ingredient',
    item: {id: data._id},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  return (
    <Link to={`/ingredients/${data._id}`} state={{modalBackground: location}} className={IngredientCardStyles.link}>
      <div draggable ref={ref}
        id={data._id} className={IngredientCardStyles.card}
        onClick={openIngredientModal}
        style={{ opacity }}>

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
    </Link>
  );
}

export default IngredientCard;
