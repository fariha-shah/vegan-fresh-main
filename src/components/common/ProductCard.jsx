//Wajeeha Home page,setup
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { BsStarFill, BsStar, BsCartPlus } from 'react-icons/bs';
import toast from '../../utils/toast';
import { useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/slices/favoritesSlice';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const favorites = useSelector((state) => state.favorites.items);

  const isFav = favorites.some(
    (i) => i._id === product._id || i.id === product._id
  );
  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();

    dispatch(
      addToCart({
        ...product,
        id: product._id,
        quantity: 1,
      })
    );

    toast.show(`${product.name} added to cart! 🛒`);
  };

  return (
    <Link
      to={`/products/${product._id}`}
      className="group w-full max-w-[240px] bg-[#FBF0D9] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* IMAGE */}

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
          src={product.image}
          alt={product.name}
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
          {product.name}
        </h3>

        <div className="flex items-center gap-0.5 mt-2">
          {[1, 2, 3, 4, 5].map((n) =>
            n <= (product.rating || 0) ? (
              <BsStarFill key={n} size={11} className="text-yellow-500" />
            ) : (
              <BsStar key={n} size={11} className="text-gray-300" />
            )
          )}

          {product.reviews > 0 && (
            <span className="text-[10px] text-gray-400 ml-1">
              ({product.reviews})
            </span>
          )}
        </div>

        <div className="flex justify-between items-end mt-4">
          <div>
            {product.oldPrice && (
              <p className="text-[11px] line-through text-gray-400">
                ${product.oldPrice.toFixed(2)}
              </p>
            )}

            <p className="text-lg font-bold text-green-700">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-3 py-2 flex items-center gap-1 text-[12px] font-semibold transition"
          >
            <BsCartPlus size={14} />
            Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
