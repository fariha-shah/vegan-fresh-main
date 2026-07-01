//Wajeeha Home page,setup
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../assets/data';
import ProductCard from '../components/common/ProductCard';
import toast from '../utils/toast';
import { useSelector } from 'react-redux';
import { toggleFavorite } from '../store/slices/favoritesSlice';
import { Heart } from 'lucide-react';
import {
  BsCartPlus,
  BsCheckCircle,
  BsTruck,
  BsShieldCheck,
  BsStarFill,
  BsStar,
} from 'react-icons/bs';

const ProductDetail = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const isFav = favorites.some(
    (i) => i._id === product?._id || i.id === product?._id
  );
  useEffect(() => {
    setLoading(true);
    setQty(1);

    const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    fetch(`${BASE}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        return fetch(`${BASE}/products/category/${data.category}`)
          .then((r) => r.json())
          .then((r) => setRelated(r?.products || []));
      })
      .catch(() => {
        const found = FALLBACK_PRODUCTS.find((p) => p._id === id);
        setProduct(found || null);
        if (found) {
          setRelated(
            FALLBACK_PRODUCTS.filter(
              (p) => p.category === found.category && p._id !== found._id
            )
          );
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, id: product._id, quantity: qty }));
    toast.show(`${qty} x ${product.name} added to cart! 🛒`);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-bg-light flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-green-pale border-t-green-primary animate-spin" />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-bg-light flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">🥦</span>
        <h2 className="font-poppins font-bold text-green-dark text-2xl">
          Product not found
        </h2>
        <Link
          to="/products"
          className="text-green-primary font-semibold hover:underline"
        >
          ← Back to products
        </Link>
      </main>
    );
  }

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <main className="min-h-screen bg-bg-light">
      <div className="max-w-[1200px] mx-auto px-6 py-8 pb-16">
        {/* Breadcrumb */}
        <p className="text-[13px] text-gray-400 mb-6">
          <Link to="/" className="hover:text-green-primary transition-colors">
            Home
          </Link>
          {' / '}
          <Link
            to="/products"
            className="hover:text-green-primary transition-colors"
          >
            Products
          </Link>
          {' / '}
          <span className="text-green-primary font-semibold">
            {product.name}
          </span>
        </p>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image gallery */}
          <div>
            <div className="relative bg-gradient-to-br from-green-pale to-white rounded-[24px] flex items-center justify-center min-h-[380px] overflow-hidden">
              {discountPercent && (
                <span className="absolute top-4 left-4 bg-red-badge text-white text-[13px] font-bold px-3 py-1.5 rounded-lg">
                  {discountPercent}% OFF
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                className="w-[75%] h-[75%] object-contain"
              />
            </div>

            {/* Thumbnail row */}
            <div className="flex gap-3 mt-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className={`w-[70px] h-[70px] rounded-xl flex items-center justify-center cursor-pointer border-2 transition-colors bg-gradient-to-br from-green-pale to-white ${n === 1 ? 'border-green-primary' : 'border-transparent hover:border-green-light'}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[80%] h-[80%] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {product.isOrganic && (
              <span className="inline-block bg-leaf/30 text-green-dark text-[12px] font-bold px-4 py-1.5 rounded-full mb-4">
                🌱 100% Organic
              </span>
            )}

            <h1 className="font-poppins font-bold text-[28px] md:text-[34px] text-text-dark mb-2 leading-tight">
              {product.name}
            </h1>

            {/* Stars */}
            <div className="flex items-center gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((n) =>
                n <= (product.rating || 0) ? (
                  <BsStarFill key={n} size={15} className="text-carrot" />
                ) : (
                  <BsStar key={n} size={15} className="text-gray-300" />
                )
              )}
              <span className="text-[13px] text-gray-400 ml-1">
                ({product.reviews || 0} reviews)
              </span>
            </div>

            <p className="text-gray-500 text-[15px] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-2">
              <span className="font-poppins font-bold text-[34px] text-green-primary">
                ${product.price}
              </span>
              {product.oldPrice && (
                <span className="text-[18px] text-gray-400 line-through">
                  ${product.oldPrice}
                </span>
              )}
              <span className="text-[13px] text-gray-400">
                / {product.unit}
              </span>
            </div>

            {/* Stock status */}
            <p
              className={`text-[13px] font-semibold mb-6 ${
                product.stock > 10
                  ? 'text-green-primary'
                  : product.stock > 0
                    ? 'text-carrot'
                    : 'text-tomato'
              }`}
            >
              {product.stock > 10
                ? '✅ In Stock'
                : product.stock > 0
                  ? `⚠️ Only ${product.stock} left`
                  : '❌ Out of Stock'}
            </p>

            {/* Quantity + Actions */}
            <div className="flex gap-4 mb-8 flex-wrap items-center">
              {/* Quantity */}
              <div className="flex items-center gap-3 border-2 border-gray-200 rounded-xl px-4 py-2">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-8 rounded-lg border-2 border-green-primary text-green-primary font-bold text-lg flex items-center justify-center hover:bg-green-primary hover:text-white transition-all"
                >
                  −
                </button>

                <span className="font-poppins font-bold text-[16px] min-w-[24px] text-center">
                  {qty}
                </span>

                <button
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="w-8 h-8 rounded-lg border-2 border-green-primary text-green-primary font-bold text-lg flex items-center justify-center hover:bg-green-primary hover:text-white transition-all"
                >
                  +
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center gap-2 bg-green-primary hover:bg-green-dark text-white font-poppins font-semibold text-[15px] px-6 py-3 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <BsCartPlus size={18} />
                Add to Cart — ${(product.price * qty).toFixed(2)}
              </button>

              {/* ❤️ Wishlist Button */}
              <button
                onClick={() =>
                  dispatch(toggleFavorite({ ...product, _id: product._id }))
                }
                className="w-12 h-12 flex items-center justify-center rounded-xl border-2 border-gray-200 hover:border-red-400 transition"
              >
                <Heart
                  size={18}
                  className={
                    isFav ? 'fill-red-500 text-red-500' : 'text-gray-400'
                  }
                />
              </button>
            </div>

            {/* Trust badges */}
            <div className="flex gap-6 flex-wrap pt-5 border-t border-gray-200">
              <div className="flex items-center gap-2 text-[13px] text-gray-500">
                <BsTruck size={16} className="text-green-primary" />
                Same-day delivery
              </div>
              <div className="flex items-center gap-2 text-[13px] text-gray-500">
                <BsCheckCircle size={16} className="text-green-primary" />
                Quality guaranteed
              </div>
              <div className="flex items-center gap-2 text-[13px] text-gray-500">
                <BsShieldCheck size={16} className="text-green-primary" />
                Secure checkout
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="font-poppins font-bold text-[26px] text-green-dark mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {related.slice(0, 4).map((r) => (
                <ProductCard key={r._id} product={r} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetail;
