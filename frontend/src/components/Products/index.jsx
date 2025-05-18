import { useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import CartSummary from "./CartSummery";
import FilterComponent from "./Filter";
import Items from "./items";
import useOrderStore from "../../utils/useOrderStore";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { Filter } from "lucide-react";

export default function ClothingStore() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(10000);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [page, setPage] = useState(1);
  const { cart, changeQuantity, addToCart, removeFromCart } = useOrderStore();
  const [parms, setParms] = useState({});
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const categories = ["All", "T-shirts", "Polo", "Jeans", "Shirts"];
  const queryParams = useMemo(
    () =>
      qs.stringify({
        ...parms,
        page,
        name,
      }),
    [parms, page, name]
  );

  const { data: products, pagination } = useFetch(`products?${queryParams}`);

  const handleQuantityChange = (id, action) => {
    changeQuantity(id, action);
  };

  const applyFilters = () => {
    setParms({
      category: selectedCategory !== "All" ? selectedCategory : undefined,
      min_price: 0,
      max_price: priceRange,
    });
    setFiltersOpen(false);
  };

  const clearFilters = () => {
    setPriceRange(1000);
    setSelectedCategory("All");
  };

  const proceedOrder = () => {
    navigate("/cart");
  };

  return (
    <div className="min-h-screen  flex flex-col">
      {/* Header Navigation */}
      <div className="hidden lg:block px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <a href="#" className="text-gray-500 hover:text-black">
              Home
            </a>
            <span className="mx-2">/</span>
            <span className="font-medium">Casual</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 relative gap-[20px] lg:mr-[30px]">
        <FilterComponent
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          clearFilters={clearFilters}
          applyFilters={applyFilters}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          categories={categories}
        />

        <div onClick={() => setFiltersOpen(true)}>
          <img src="./icons/filter_icon.png" alt="" />
        </div>

        {cart && (
          <CartSummary
            cartItems={cart}
            removeFromCart={removeFromCart}
            addToCart={addToCart}
            changeQuantity={handleQuantityChange}
            proceedOrder={proceedOrder}
          />
        )}

        <Items
          products={products}
          changeQuantity={handleQuantityChange}
          pagination={pagination}
          setPage={setPage}
          cart={cart}
          addToCart={addToCart}
          setName={setName}
        />
      </div>
    </div>
  );
}
