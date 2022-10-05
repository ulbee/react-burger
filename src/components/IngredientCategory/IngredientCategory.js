import IngredientCard from '../IngredientCard/IngredientCard';
import IngredientCategoryStyles from './IngredientCategory.module.css';

function IngredientCategory({ id, title, data }) {  
  return (    
    <>
      <h2 id={id} className={IngredientCategoryStyles.title}>
        {title}
      </h2>
      <div className={IngredientCategoryStyles.container + ' pt-6 pb-10 pr-4 pl-4'}>
        {data.map((item) => {
          return <IngredientCard data={item} key={item._id} count='2'/>
        })}
      </div>        
    </>  
  );
}

export default IngredientCategory;
