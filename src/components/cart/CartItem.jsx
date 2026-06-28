import { motion } from 'framer-motion';
import { Trash2, Leaf } from 'lucide-react';
import { useDispatch } from 'react-redux';
// SAHI — cartSlice.js se import karo
import { removeFromCart } from '../../store/slices/cartSlice';

import QuantitySelector from './QuantitySelector';

export default function CartItem({ item }) {
  const dispatch = useDispatch();
  const { product, quantity } = item;
  const lineTotal = product.price * quantity;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30, transition: { duration: 0.2 } }}
      className="flex flex-wrap items-center gap-4 rounded-card bg-white p-4 shadow-card sm:flex-nowrap sm:p-5"
    >
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#F5F5F5] text-3xl">
        {product.emoji || '🥦'}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-poppins text-sm font-semibold text-[#2C3E50]">
          {product.name}
        </p>
        {product.isOrganic && (
          <span className="mt-1 flex items-center gap-1 font-inter text-xs text-[#2E7D32]">
            <Leaf size={11} />
            Organic · {product.unit || 'kg'}
          </span>
        )}
        <p className="mt-1 font-inter text-sm text-[#2C3E50]/50">
          ${product.price.toFixed(2)} each
        </p>
      </div>

      <QuantitySelector
        quantity={quantity}
        onChange={(qty) =>
          dispatch(updateQuantity({ productId: product._id, quantity: qty }))
        }
      />

      <p className="w-20 shrink-0 text-right font-poppins text-sm font-semibold text-[#2E7D32]">
        ${lineTotal.toFixed(2)}
      </p>

      <button
        onClick={() => dispatch(removeFromCart(product._id))}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#E53935] transition-colors hover:bg-[#FDECEA]"
        aria-label={`Remove ${product.name} from cart`}
      >
        <Trash2 size={15} />
      </button>
    </motion.div>
  );
}
