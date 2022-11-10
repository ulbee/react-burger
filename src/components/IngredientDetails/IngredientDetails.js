import IngredientDetailsStyles from './IngredientDetails.module.css';

import { useSelector } from 'react-redux';

function IngredientDetails() {

  const {currentIngredient} = useSelector(store => store.menu);
  
  return (
    <div className={IngredientDetailsStyles.container}>
      <img src={currentIngredient.image_large} alt='Фото ингридиента'/>
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
  )
};

export default IngredientDetails;
