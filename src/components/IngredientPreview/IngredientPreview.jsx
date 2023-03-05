import IngredientPreviewStyles from './IngredientPreview.module.css';

import { useSelector } from 'react-redux';

function IngredientPreview({ id, hidedLength }) {
  const { ingredientsById } = useSelector((state) => state.menu);
  
  return (
    <>
      {hidedLength && (
        <div className={IngredientPreviewStyles.preview + ' ' + IngredientPreviewStyles.hasMore}>
          <span className={IngredientPreviewStyles.count + ' text text_type_main-default'}>+{hidedLength}</span>
          <div className={IngredientPreviewStyles.hasMoreImg}>
            <img src={ingredientsById[id]?.image_mobile} alt={ingredientsById[id]?.name}/>
          </div>
        </div>
      )}
      {!hidedLength && (
        <div className={IngredientPreviewStyles.preview}>
          <img src={ingredientsById[id]?.image_mobile} alt={ingredientsById[id]?.name}/>
        </div>
      )}
    </>
    
  );
}

export default IngredientPreview;
