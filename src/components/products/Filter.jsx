//Wajeeha Home page,setup
import { CATEGORIES } from '../../assets/data';
import { MdFilterList } from 'react-icons/md';

const Filter = ({ filters, onFilterChange, onClearAll }) => {
  return (
    <aside className="bg-white rounded-card p-6 shadow-card sticky top-[90px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-green-pale">
        <div className="flex items-center gap-2">
          <MdFilterList size={20} className="text-green-primary" />
          <h3 className="font-poppins font-bold text-[17px] text-text-dark">
            Filters
          </h3>
        </div>
        <button
          onClick={onClearAll}
          className="text-[12px] text-green-primary font-semibold hover:text-green-dark transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Category */}
      <p className="font-poppins font-semibold text-[12px] text-green-primary uppercase tracking-wider mb-2 mt-4">
        Category
      </p>
      <label className="flex items-center gap-2 mb-2 cursor-pointer text-[13px] text-text-dark">
        <input
          type="radio"
          name="category"
          checked={!filters.category}
          onChange={() => onFilterChange('category', '')}
          className="accent-green-primary w-4 h-4"
        />
        All Categories
      </label>
      {CATEGORIES.map((cat) => (
        <label
          key={cat.slug}
          className="flex items-center gap-2 mb-2 cursor-pointer text-[13px] text-text-dark hover:text-green-primary transition-colors"
        >
          <input
            type="radio"
            name="category"
            checked={filters.category === cat.slug}
            onChange={() => onFilterChange('category', cat.slug)}
            className="accent-green-primary w-4 h-4"
          />
          <img
            src={cat.image}
            alt={cat.name}
            className="w-5 h-5 object-contain rounded"
          />
          {cat.name}
        </label>
      ))}

      {/* Price Range */}
      <p className="font-poppins font-semibold text-[12px] text-green-primary uppercase tracking-wider mb-2 mt-5">
        Price Range
      </p>
      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min"
          value={filters.minPrice}
          onChange={(e) => onFilterChange('minPrice', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-[13px] outline-none focus:border-green-primary transition-colors"
        />
        <input
          type="number"
          placeholder="Max"
          value={filters.maxPrice}
          onChange={(e) => onFilterChange('maxPrice', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 text-[13px] outline-none focus:border-green-primary transition-colors"
        />
      </div>

      {/* Organic */}
      <p className="font-poppins font-semibold text-[12px] text-green-primary uppercase tracking-wider mb-2 mt-5">
        Quality
      </p>
      <label className="flex items-center gap-2 cursor-pointer text-[13px] text-text-dark">
        <input
          type="checkbox"
          checked={filters.isOrganic}
          onChange={(e) => onFilterChange('isOrganic', e.target.checked)}
          className="accent-green-primary w-4 h-4"
        />
        🌱 Organic Only
      </label>
    </aside>
  );
};

export default Filter;
