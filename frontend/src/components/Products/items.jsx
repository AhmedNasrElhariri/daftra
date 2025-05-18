import { Search, Minus, Plus, ChevronLeft, ChevronRight } from "lucide-react";

const Items = ({
  pagination,
  products,
  changeQuantity,
  setPage,
  cart,
  addToCart,
  setName,
}) => {
  const handlePrev = () => {
    if (pagination.current_page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (pagination.current_page < pagination.last_page) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <main className="order-2 lg:order-1 flex-1 p-4 bg-white border-l border-gray-200">
      <div className="container mx-auto">
        {/* Category Title */}
        <div className="flex-1 mb-[10px] relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by product name"
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-md py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
        </div>
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Casual</h1>
          <p className="text-sm text-gray-500">
            Showing 1-10 of {pagination?.total} Products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-100"
            >
              <div className="relative">
                <img
                  src={product?.image_url || "Dress.png"}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                {product.quantity > 0 && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full w-7 h-7 text-sm font-semibold flex items-center justify-center shadow">
                    {product.quantity}
                  </div>
                )}
              </div>

              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {product.name}
                  </h3>
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Price & Stock */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-black">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </span>
                </div>

                {/* Quantity Counter */}
                <div className="mt-3 flex items-center justify-between border rounded-lg overflow-hidden bg-gray-50">
                  <button
                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 transition"
                    onClick={() => changeQuantity(product.id, "decrease")}
                  >
                    <Minus size={16} />
                  </button>
                  <input
                    type="text"
                    value={
                      cart.find((item) => item.id === product.id)?.quantity || 0
                    }
                    readOnly
                    className="w-12 text-center bg-transparent text-sm font-medium focus:outline-none"
                  />

                  <button
                    className="px-4 py-2 text-gray-600 hover:bg-gray-200 transition"
                    onClick={() => addToCart(product)}
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handlePrev}
            disabled={!pagination.prev}
            className={`px-4 py-2 border rounded-md flex items-center mr-2 ${
              !pagination.prev
                ? "opacity-50 cursor-not-allowed"
                : "text-gray-500"
            }`}
          >
            <ChevronLeft size={16} className="mr-1" />
            Previous
          </button>

          {[...Array(pagination.last_page || 0)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setPage(index + 1)}
              className={`px-3 py-1 rounded-md mx-1 ${
                pagination.current_page === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={!pagination.next}
            className={`px-4 py-2 border rounded-md flex items-center ml-2 ${
              !pagination.next
                ? "opacity-50 cursor-not-allowed"
                : "text-gray-500"
            }`}
          >
            Next
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </main>
  );
};
export default Items;
