import IngredientCategoryStyles from './IngredientCategory.module.css';

import { useMemo } from 'react';

import PropTypes from 'prop-types';
import IngredientsPropTypes from '../../utils/propTypes';

import IngredientCard from '../IngredientCard/IngredientCard';
import { useSelector } from 'react-redux';

function IngredientCategory({ id, title, data, openIngredientModal }) {

  const { addedIngredients } = useSelector(store => store.menu);

  const ingredientsCount = useMemo(() => {
    return data.reduce((res, item) => {
      res[item._id] = {};
      if (item.type === 'bun' && item._id === addedIngredients.bun?._id) {
        res[item._id].count = 1;
      } else {
        res[item._id].count = addedIngredients.others.filter((el) => el._id === item._id).length;
      }

      return res;
    }, {});
  }, [addedIngredients.bun, addedIngredients.others, data]);

  return (    
    <>
      <h2 id={id} className={IngredientCategoryStyles.title}>
        {title}
      </h2>
      <div className={IngredientCategoryStyles.container + ' pt-6 pb-10 pr-4 pl-4'}>
        {data.map((item) => {
          return <IngredientCard 
            data={item} 
            key={item._id} 
            count={ingredientsCount[item._id].count} 
            openIngredientModal={openIngredientModal}/>
        })}
      </div>        
    </>  
  );
}

IngredientCategory.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(IngredientsPropTypes).isRequired,
  openIngredientModal: PropTypes.func.isRequired
}

export default IngredientCategory;
