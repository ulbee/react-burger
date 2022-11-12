import TotalPriceStyles from './TotalPrice.module.css';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function TotalPrice() {

  const {addedIngredients} = useSelector(state => state.menu);

  const total = useMemo(() => {
    let price = addedIngredients.bun ? addedIngredients.bun.price * 2 : 0;

    if (!addedIngredients.others.length) {
      return price;
    }

    return addedIngredients.others.reduce((res, item) => {
      res += item.price;

      return res;
    }, price);
  }, [addedIngredients.bun, addedIngredients.others]);

  return (
    <div className={TotalPriceStyles.info + ' pr-10'}>
      <span className='text text_type_digits-default'>{total}</span>
      <CurrencyIcon type="primary"/>
    </div>
  )
}
export default TotalPrice;