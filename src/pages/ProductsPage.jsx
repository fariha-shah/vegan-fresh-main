import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';
import Filter from '../components/products/Filter';
import Grid from '../components/products/Grid';
import Search from '../components/products/Search';
import SortDropdown from '../components/products/SortDropdown';
import { FiFilter, FiX } from 'react-icons/fi';

const Productspage = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: searchParams.get('q') || '',
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    isOrganic: false,
    sort: 'name',
  });

  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory && urlCategory !== filters.category) {
      setFilters((prev) => ({ ...prev, category: urlCategory }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        search: filters.search || undefined,
        category: filters.category || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
        isOrganic: filters.isOrganic || undefined,
        sort: filters.sort,
      })
    );
  }, [filters, dispatch]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      isOrganic: false,
      sort: 'name',
    });
  };

  return (
    <main className="min-h-screen bg-bg-light">
      <div className="max-w-[1280px] mx-auto px-6 py-8 pb-16">
        {/* Page heading */}
        <h1 className="font-poppins font-bold text-[28px] md:text-[36px] text-green-dark mb-1">
          Fresh Vegetables
        </h1>
        <p className="text-gray-500 text-[14px] mb-6">
          {loading ? 'Loading...' : `${items.length} products found`}
        </p>

        {/* Search + Sort + Mobile filter toggle */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <Search
            value={filters.search}
            onChange={(v) => updateFilter('search', v)}
          />
          <SortDropdown
            value={filters.sort}
            onChange={(v) => updateFilter('sort', v)}
          />

          {/* Mobile filter button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden flex items-center gap-2 px-5 py-3 rounded-full border-2 border-green-primary bg-white text-green-primary font-poppins font-semibold text-[14px] transition-colors hover:bg-green-pale"
          >
            <FiFilter size={16} /> Filters
          </button>
        </div>

        <div className="flex gap-7 items-start">
          {/* Desktop Filter Sidebar */}
          <div className="hidden md:block w-[260px] shrink-0">
            <Filter
              filters={filters}
              onFilterChange={updateFilter}
              onClearAll={clearAllFilters}
            />
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <Grid products={items} loading={loading} />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[200] flex justify-end"
          onClick={() => setMobileFilterOpen(false)}
        >
          <div
            className="w-[85%] max-w-[320px] bg-bg-light h-full p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="mb-4 text-green-dark hover:text-green-primary transition-colors"
            >
              <FiX size={24} />
            </button>
            <Filter
              filters={filters}
              onFilterChange={updateFilter}
              onClearAll={clearAllFilters}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default Productspage;
