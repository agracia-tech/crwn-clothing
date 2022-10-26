import { useContext } from "react";

import { ProductsContext } from "../../context/products.context";
import ProductCard from "../../components/product-card/product-card.component";
import './shop.styles.scss'

const Shop = () => {
  const { products } = useContext(ProductsContext);
  return (
    <div className="products-container">
      {products.map((products) => (
        <ProductCard key={products.id} product={products} />
      ))}
    </div>
  );
};

export default Shop;