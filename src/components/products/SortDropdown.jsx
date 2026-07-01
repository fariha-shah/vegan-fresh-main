//Wajeeha Home page,setup
import { BsChevronDown } from 'react-icons/bs';

const SORT_OPTIONS = [
  { value: 'name', label: 'Name: A to Z' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const SortDropdown = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-4 pr-10 py-3 rounded-full border-2 border-gray-200 focus:border-green-primary outline-none text-[14px] font-inter bg-white text-text-dark cursor-pointer transition-colors duration-200"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <BsChevronDown
        size={14}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  );
};

export default SortDropdown;
