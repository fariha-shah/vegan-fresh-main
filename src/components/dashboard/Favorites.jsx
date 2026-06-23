import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ShoppingCart, Star, Leaf, CheckCircle2 } from 'lucide-react';
import { addToCart } from '../../redux/store';

// Replace with: GET /api/users/favorites
// Shaped like the `products` collection, same as the homepage cards.
const MOCK_FAVORITES = [
  {
    _id: 'p1',
    name: 'Fresh Tomato',
    price: 20,
    oldPrice: 26,
    emoji: '🍅',
    isOrganic: true,
    averageRating: 4,
    unit: 'kg',
  },
  {
    _id: 'p2',
    name: 'Fresh Broccoli',
    price: 20,
    oldPrice: 26,
    emoji: '🥦',
    isOrganic: true,
    averageRating: 5,
    unit: 'kg',
  },
  {
    _id: 'p3',
    name: 'Fresh Spinach',
    price: 20,
    oldPrice: 26,
    emoji: '🥬',
    isOrganic: true,
    averageRating: 4,
    unit: 'bunch',
  },
  {
    _id: 'p4',
    name: 'Fresh Carrot',
    price: 20,
    oldPrice: 26,
    emoji: '🥕',
    isOrganic: true,
    averageRating: 5,
    unit: 'kg',
  },
];

const discountPercent = (price, oldPrice) =>
  oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={
            i < rating ? 'fill-[#F57C00] text-[#F57C00]' : 'text-[#E0E0E0]'
          }
        />
      ))}
    </div>
  );
}

function FavoriteCard({ product, onRemove, onAddToCart }) {
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative overflow-hidden rounded-card bg-white p-4 shadow-card"
    >
      {/* Unfavorite */}
      <button
        onClick={() => onRemove(product._id)}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#E53935] shadow-sm transition-transform hover:scale-110"
        aria-label="Remove from favorites"
      >
        <Heart size={15} className="fill-[#E53935]" />
      </button>

      {/* Organic badge */}
      {product.isOrganic && (
        <span className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-[#E8F5E9] px-2.5 py-1 font-inter text-[10px] font-semibold uppercase tracking-wide text-[#2E7D32]">
          <Leaf size={10} />
          Organic
        </span>
      )}

      {/* Image area */}
      <div className="flex h-28 items-center justify-center rounded-xl bg-[#F5F5F5] text-5xl">
        {product.emoji}
      </div>

      <div className="mt-3 space-y-1.5">
        <p className="font-poppins text-sm font-semibold text-[#2C3E50]">
          {product.name}
        </p>
        <StarRating rating={product.averageRating} />

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-baseline gap-1.5">
            <span className="font-poppins text-base font-semibold text-[#2E7D32]">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="font-inter text-xs text-[#2C3E50]/40 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          {product.oldPrice && (
            <span className="rounded-full bg-[#FFF3E0] px-2 py-0.5 font-inter text-[10px] font-semibold text-[#F57C00]">
              -{discountPercent(product.price, product.oldPrice)}%
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          disabled={justAdded}
          className={`mt-2 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 font-inter text-sm font-medium text-white transition-colors ${
            justAdded ? 'bg-[#1B5E20]' : 'bg-[#2E7D32] hover:bg-[#1B5E20]'
          }`}
        >
          {justAdded ? (
            <>
              <CheckCircle2 size={15} />
              Added
            </>
          ) : (
            <>
              <ShoppingCart size={15} />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default function Favorites() {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState(MOCK_FAVORITES);

  const handleRemove = (id) => {
    // Replace with: DELETE /api/users/favorites/:productId
    setFavorites((prev) => prev.filter((p) => p._id !== id));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-card bg-white p-12 text-center shadow-card">
        <Heart size={36} className="mb-3 text-[#2C3E50]/20" />
        <p className="font-poppins text-base font-medium text-[#2C3E50]">
          No favorites yet
        </p>
        <p className="mt-1 font-inter text-sm text-[#2C3E50]/50">
          Tap the heart icon on any product to save it here.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <p className="font-inter text-sm text-[#2C3E50]/50">
          {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      <motion.div
        layout
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence>
          {favorites.map((product) => (
            <FavoriteCard
              key={product._id}
              product={product}
              onRemove={handleRemove}
              onAddToCart={handleAddToCart}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
