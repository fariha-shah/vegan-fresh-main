import { useDispatch, useSelector } from 'react-redux';
import { Heart, ShoppingCart } from 'lucide-react';
import { toggleFavorite } from '../../store/slices/favoritesSlice';
import { addToCart } from '../../store/slices/cartSlice';

export default function Favorites() {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const handleAddToCart = (product) => {
    dispatch(
      addToCart({ ...product, id: product._id || product.id, quantity: 1 })
    );
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center">
        <Heart size={40} className="text-gray-300 mb-3" />
        <p className="text-gray-500">No favorites yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {favorites.map((p) => {
        const discountPercent = p.oldPrice
          ? Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)
          : null;

        return (
          <div
            key={p._id || p.id}
            className="group w-full max-w-[240px] bg-[#FBF0D9] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            {/* IMAGE SECTION */}
            <div className="relative bg-white h-[150px] flex items-center justify-center p-4">
              <span className="absolute top-3 right-3 text-[10px] text-gray-400">
                Fresh
              </span>

              {discountPercent && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] px-2 py-1 rounded">
                  -{discountPercent}%
                </span>
              )}

              <img
                src={p.image}
                alt={p.name}
                className="max-h-[105px] object-contain transition duration-300 group-hover:scale-110"
              />

              <span
                className="absolute bottom-3 left-0 bg-green-600 text-white text-[9px] font-semibold uppercase py-1 pl-3 pr-5"
                style={{
                  clipPath: 'polygon(0 0,100% 0,85% 50%,100% 100%,0 100%)',
                }}
              >
                Natural
              </span>
            </div>

            {/* BODY */}
            <div className="p-4">
              <h3 className="font-semibold text-[15px] text-gray-800 truncate">
                {p.name}
              </h3>

              <p className="text-[11px] text-gray-400 mt-1">
                Fresh organic vegetable
              </p>

              <div className="flex justify-between items-end mt-4">
                <div>
                  <p className="text-lg font-bold text-green-700">${p.price}</p>
                  {p.oldPrice && (
                    <p className="text-[11px] line-through text-gray-400">
                      ${p.oldPrice}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleAddToCart(p)}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-3 py-2 flex items-center gap-1 text-[12px] font-semibold transition"
                >
                  <ShoppingCart size={14} />
                  Add
                </button>
              </div>

              {/* HEART REMOVE BUTTON */}
              <button
                onClick={() => dispatch(toggleFavorite(p))}
                className="mt-3 w-full flex items-center justify-center gap-2 text-red-500 text-[12px] font-semibold"
              >
                <Heart size={14} className="fill-red-500" />
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
