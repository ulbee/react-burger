import OrderSnippetStyles from './OrderSnippet.module.css';

import { Link, useLocation } from 'react-router-dom';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientPreview from '../IngredientPreview/IngredientPreview';

function OrderSnippet({ id, name, status, ingredients, createdAt }) {
  const location = useLocation();

  const totalPrice = 9999;

  const ingredientsPreview = ingredients.reduceRight((res, item, index) => {
    if (index < res.maxLength) {
      res.ingredients.push(item);
    }
    return res;
  }, {hidedLength: ingredients.length - 6, maxLength: 6, ingredients: []});

  console.log('ingredientsPreview.ingredients', ingredientsPreview);
  return (
    <Link to={`/ingredients/${id}`} state={{modalBackground: location}} className={OrderSnippetStyles.link}>
      <div className={OrderSnippetStyles.snippet + ' p-6 mb-4'}>
        <div className={OrderSnippetStyles.info + ' mb-6'}>
          <span className='text text_type_digits-default'>#{id}</span>
          <span className='text text_type_main-default text_color_inactive'>{createdAt}</span>
        </div>
        <h2 className={OrderSnippetStyles.title + ' text text_type_main-medium mb-2'}>{name}</h2>
        <p className={OrderSnippetStyles.status + ' text text_type_main-default mb-6'}>
          {status}
        </p>
        <div className={OrderSnippetStyles.info}>
          <div className={OrderSnippetStyles.cards + ' '}>
            {ingredientsPreview.ingredients && 
            ingredientsPreview.ingredients.map((item, index) => {
              if (ingredientsPreview.hidedLength > 0 && index === 0) {
                return <IngredientPreview key={index} id={item} hidedLength={ingredientsPreview.hidedLength}/>  
              }
              return <IngredientPreview key={index} id={item}/>
            })}
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
