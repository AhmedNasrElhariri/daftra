import { X, ChevronLeft } from "lucide-react";
const FilterComponent = ({
  filtersOpen,
  setFiltersOpen,
  priceRange,
  setPriceRange,
  categories,
  selectedCategory,
  setSelectedCategory,
  applyFilters,
  clearFilters,
}) => {
  return (
    <>
      {filtersOpen && (
        <div className="fixed top-0 left-0 z-30 h-full max-w-xs w-full bg-white shadow-lg overflow-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Filters</h2>
              <button onClick={() => setFiltersOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Price</h3>
                <ChevronLeft size={20} className="transform rotate-90" />
              </div>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span>$0</span>
                  <span>${priceRange}</span>
                </div>
              </div>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium">Category</h3>
                <ChevronLeft size={20} className="transform rotate-90" />
              </div>
              <div className="space-y-2">
                {categories?.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={category}
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <label htmlFor={category} className="ml-2">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                className="w-full bg-black text-white py-3 rounded-md font-medium"
                onClick={applyFilters}
              >
                Apply Filter
              </button>
              <button
                className="w-full text-gray-500 py-2"
                onClick={clearFilters}
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterComponent;
