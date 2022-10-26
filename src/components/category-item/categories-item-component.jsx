import './category-item.styles.scss'
import CategoryItem from "./category-item-component"; 
const CategoriesItem = ( {categories}) => {
  
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
};
export default CategoriesItem;
