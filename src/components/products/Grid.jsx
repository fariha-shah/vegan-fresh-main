import ProductCard from '../common/ProductCard';
import { BsEmojiNeutral } from 'react-icons/bs';

const Grid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="h-[260px] rounded-card bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <BsEmojiNeutral size={48} className="text-gray-300 mb-4" />
        <h3 className="font-poppins font-semibold text-[18px] text-text-dark mb-2">
          No products found
        </h3>
        <p className="text-gray-400 text-[14px]">
          Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Grid;
