import IngredientPreviewStyles from './IngredientPreview.module.css';

import { useSelector } from 'react-redux';
import { redirect } from 'react-router-dom';

function IngredientPreview({ ingredientId, hidedLength }) {
  const {ingredientsById} = useSelector((state) => state.menu); 
  const id = ingredientId || '60d3b41abdacab0026a733c6';

  console.log('hidedLength', hidedLength);
  

  return (

    <>
      {hidedLength && (
        <div className={IngredientPreviewStyles.preview + ' ' + IngredientPreviewStyles.hasMore}>
        {/* <div className={IngredientPreviewStyles.preview + ' ' + IngredientPreviewStyles.hasMore}> */}
          <span className={IngredientPreviewStyles.count + ' text text_type_main-default'}>+{hidedLength}</span>
          <div className={IngredientPreviewStyles.hasMoreImg}>
            <img src={ingredientsById[id].image_mobile} alt={ingredientsById[id].name}/> 
          </div>
        </div>
      )}
      {!hidedLength && (
        <div className={IngredientPreviewStyles.preview}>
          <img src={ingredientsById[id].image_mobile} alt={ingredientsById[id].name}/> 
        </div>
      )}
    </>
    
  );
}

export default IngredientPreview;
