import OrderSnippetStyles from './OrderSnippet.module.css';

import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientPreview from '../IngredientPreview/IngredientPreview';
import { ORDER_STATUSES } from '../../utils/constants';
import { getFormattedDate } from '../../utils/date';

function OrderSnippet({ order, needDetails, link }) {
  const location = useLocation();
  const { ingredientsById } = useSelector(state => state.menu);

  const totalPrice = order.ingredients.reduce((res, item) => {
    if (item) {
      res  += ingredientsById[item].price;
    }
    return res;
  }, 0);

  const ingredientsPreview = order.ingredients.reduceRight((res, item, index) => {
    if (item && index < res.maxLength) {
      res.ingredients.push(item);
    }
    return res;
  }, {hidedLength: order.ingredients.length - 6, maxLength: 6, ingredients: []});

  return (
    <Link to={`${link}/${order._id}`} state={{modalBackground: location}} className={OrderSnippetStyles.link}>
      <div className={OrderSnippetStyles.snippet + ' p-6 mb-4'}>
        <div className={OrderSnippetStyles.info + ' mb-6'}>
          <span className='text text_type_digits-default'>#{order.number}</span>
          <span className='text text_type_main-default text_color_inactive'>{getFormattedDate(order.createdAt)}</span>
        </div>
        <h2 className={OrderSnippetStyles.title + ' text text_type_main-medium'}>{order.name}</h2>
        {needDetails &&
          <p className={OrderSnippetStyles.status + ' ' + OrderSnippetStyles[order.status] + ' text text_type_main-default mt-2'}>
            {ORDER_STATUSES[order.status]}
          </p>
        }
        <div className={OrderSnippetStyles.info + ' mt-7'}>
          <div className={OrderSnippetStyles.cards + ' '}>
            {ingredientsPreview.ingredients && 
              ingredientsPreview.ingredients.map((item, index) => {
                if (ingredientsPreview.hidedLength > 0 && index === 0) {
                  return <IngredientPreview key={index} id={item} hidedLength={ingredientsPreview.hidedLength}/>
                }
                return <IngredientPreview key={index} id={item}/>
              })
            }
          </div>
          <div className={OrderSnippetStyles.price + ' text text_type_digits-default'}>
            {totalPrice}
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default OrderSnippet;
