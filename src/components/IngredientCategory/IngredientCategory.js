import IngredientCard from '../IngredientCard/IngredientCard';
import IngredientCategoryStyles from './IngredientCategory.module.css';

function IngredientCategory({ title, titleId, data }) {

  return (    
    // TODO нужна ли обертка? Может просто id в h2 перенести?
    <div id={titleId} className={IngredientCategoryStyles.category}>
      <h2 className={IngredientCategoryStyles.title}>
        {title}
      </h2>
      <div className={IngredientCategoryStyles.container + ' pt-6 pb-10 pr-4 pl-4'}>
        {data.map((item) => {
          return <IngredientCard data={item} key={item._id}/>
        })}
      </div>        
    </div>    
  );
}

export default IngredientCategory;
