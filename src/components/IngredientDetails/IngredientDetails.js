import React from 'react';
import PropTypes from 'prop-types';
import IngredientDetailsStyles from './IngredientDetails.module.css';
import ingredientsPropTypes from '../../utils/propTypes';

function IngredientDetails({ data }) {
  
  return (
    <div className={IngredientDetailsStyles.container}>
      <img src={data.image_large} alt='Фото ингридиента'/>
      <p className={IngredientDetailsStyles.title + ' text text_type_main-medium pt-4'}>{data.name}</p>
      <div className={IngredientDetailsStyles.details + ' pt-8'}>
        <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
        <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
        <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
        <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
        <p className='text text_type_main-default text_color_inactive'>{data.calories}</p>
        <p className='text text_type_main-default text_color_inactive'>{data.proteins}</p>
        <p className='text text_type_main-default text_color_inactive'>{data.fat}</p>
        <p className='text text_type_main-default text_color_inactive'>{data.carbohydrates}</p>
      </div>
    </div>
  )
};

IngredientDetails.propTypes = {
  data: ingredientsPropTypes.isRequired
}

export default IngredientDetails;
