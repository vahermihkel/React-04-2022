import { useState } from "react";
import { useTranslation } from 'react-i18next';//

function FilterBar(props) {
  const { t } = useTranslation();//
  const [selectedCategory, setSelectedCategory] = useState('all');

  const productsByCat = (category) => {
    if (category === 'all') {
      props.setProducts(props.originalProducts);
      setSelectedCategory('all');
    } else {
      const newProducts = props.originalProducts.filter(element => element.category === category);
      props.setProducts(newProducts);
      setSelectedCategory(category);
    }
  }

  return (
  <div>
    <div className={selectedCategory === "all" ? "selected" : undefined} 
      onClick={() => productsByCat('all')}>
      {t('filterbar.all-categories')}
      {/*  */}
    </div>
    { props.categories.map(element => 
    <div className={selectedCategory === element ? "selected" : undefined} 
      onClick={() => productsByCat(element)} key={element}>{element}
    </div>) }
  </div>)
}

export default FilterBar;