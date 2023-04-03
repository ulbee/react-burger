import TotalPriceStyles from './TotalPrice.module.css';

import { useMemo, FC } from 'react';
import { useSelector } from '../../services/hooks';
import { TRootState } from '../../services/types/index';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../services/types/ingredients';

const TotalPrice: FC = () => {

  const { addedIngredients: { bun, others } } = useSelector((state: TRootState) => state.menu);

  const total = useMemo(() => (
    (others as TIngredient[]).reduce(
      (res: number, {price}: TIngredient) => res += price, 
      bun ? bun.price * 2 : 0
    )), [bun, others]);

  return (
    <div className={TotalPriceStyles.info + ' pr-10'}>
      <span className='text text_type_digits-default'>{total}</span>
      <CurrencyIcon type="primary"/>
    </div>
  )
}

export default TotalPrice;
