import { BsSearch, BsX } from 'react-icons/bs';

const Search = ({ value, onChange }) => {
  return (
    <div className="relative flex-1 min-w-[200px]">
      <BsSearch
        size={16}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        placeholder="Search vegetables..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-10 py-3 rounded-full border-2 border-gray-200 focus:border-green-primary outline-none text-[14px] font-inter bg-white transition-colors duration-200"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-text-dark transition-colors"
        >
          <BsX size={20} />
        </button>
      )}
    </div>
  );
};

export default Search;
