import IngredientPreviewStyles from './IngredientPreview.module.css';

import { FC } from 'react';
import { useSelector } from '../../services/hooks';

const IngredientPreview: FC<{id: string; hidedLength?: number}> = ({ id, hidedLength }) => {
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
