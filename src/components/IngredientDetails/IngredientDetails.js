import IngredientDetailsStyles from './IngredientDetails.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { SHOW_INGREDIENT } from '../../utils/constants';
import { useEffect } from 'react';

function IngredientDetails() {
  const dispatch = useDispatch();
  const { ingredientId } = useParams();

  const { currentIngredient } = useSelector(store => store.menu);

  useEffect(() => {
    if (!currentIngredient) {
      dispatch({type: SHOW_INGREDIENT, id: ingredientId});
    };
  }, [dispatch, currentIngredient, ingredientId]);

  return (
    <>
      {!currentIngredient && <p>Загружаем данные</p>}
      {currentIngredient && (
      <div className={IngredientDetailsStyles.container}>
        <img src={currentIngredient.image_large} alt={currentIngredient.name}/>
        <p className={IngredientDetailsStyles.title + ' text text_type_main-medium pt-4'}>{currentIngredient.name}</p>
        <div className={IngredientDetailsStyles.details + ' pt-8'}>
          <p className='text text_type_main-default text_color_inactive'>Калории,ккал</p>
          <p className='text text_type_main-default text_color_inactive'>Белки, г</p>
          <p className='text text_type_main-default text_color_inactive'>Жиры, г</p>
          <p className='text text_type_main-default text_color_inactive'>Углеводы, г</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient.calories}</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient.proteins}</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient.fat}</p>
          <p className='text text_type_main-default text_color_inactive'>{currentIngredient.carbohydrates}</p>
        </div>
      </div>
      )}
    </>
  )
};

export default IngredientDetails;
