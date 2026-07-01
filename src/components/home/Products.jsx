//Wajeeha Home page,setup
import { useEffect, useState } from 'react';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../../assets/data';
import ProductCard from '../common/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `${
        import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
      }/products?featured=true&limit=12`
    )
      .then((res) => res.json())
      .then((data) => {
        const list = data?.products || data;

        setProducts(
          Array.isArray(list) && list.length ? list : FALLBACK_PRODUCTS
        );
      })
      .catch(() => setProducts(FALLBACK_PRODUCTS))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-10 lg:px-16">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[300px] rounded-3xl bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
