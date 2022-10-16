import PropTypes from 'prop-types';
import IngredientCard from '../IngredientCard/IngredientCard';
import IngredientCategoryStyles from './IngredientCategory.module.css';
import IngredientsPropTypes from '../../utils/propTypes';

function IngredientCategory({ id, title, data, order, openIngredientModal }) {
  const ingredientsCount = data.reduce((res, item) => {
    res[item._id] = {};
    res[item._id].count = order.filter((el) => el._id === item._id).length;

    return res;
  }, {});

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
  order: PropTypes.arrayOf(IngredientsPropTypes).isRequired,
  openIngredientModal: PropTypes.func.isRequired
}

export default IngredientCategory;
