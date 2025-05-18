import { useState } from "react";

const ProductCard = ({ name, category, price, stock, image, index }) => {
  const [quantity, setQuantity] = useState(0);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  return (
    <div className="mb-8">
      <div className="relative">
        <img
          src={`/api/placeholder/300/400`}
          alt={name}
          className="w-full object-cover"
        />
        {index && (
          <div className="absolute bottom-2 right-2 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center">
            {index}
          </div>
        )}
      </div>
      <div className="mt-2">
        <h3 className="font-medium">{name}</h3>
        <div className="text-xs text-gray-500">{category}</div>
        <div className="flex justify-between items-center mt-1">
          <span className="font-medium">${price}</span>
          <span className="text-xs text-gray-500">Stock: {stock}</span>
        </div>
        <div className="flex items-center mt-2 border rounded overflow-hidden">
          <button className="px-3 py-1 bg-gray-100" onClick={decrementQuantity}>
            −
          </button>
          <span className="px-3 py-1">{quantity}</span>
          <button className="px-3 py-1 bg-gray-100" onClick={incrementQuantity}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
