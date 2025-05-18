import { useCallback, useState } from "react";
import useOrderStore from "../../utils/useOrderStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL, TOKEN } from "../../utils/constants";

export default function ShoppingCart() {
  const { cart, changeQuantity, removeFromCart, addToCart, clearCart } =
    useOrderStore();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 15.0;
  const tax = subtotal * 0.0325; // Example tax rate
  const total = subtotal + shipping + tax;
  const orderNumber = 123;
  const orderDate = "5 May 2025";

  const placeTheOrder = useCallback(async () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/orders`,
        {
          products: cart?.map(({ id, quantity }) => ({ id, quantity })),
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        }
      );

      if (response.data.status) {
        alert(response.data.message);
        clearCart();
        navigate("/products");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Order failed. Please try again."
      );
      console.error("Order error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [cart, navigate, clearCart]);

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-6xl mx-auto">
      {/* Cart Items */}
      <div className="md:w-2/3 space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col"
          >
            <div className="flex items-start">
              {/* Product Image */}
              <div className="w-1/4 md:w-1/5 flex-shrink-0">
                <img
                  src={item?.image_url || "/Dress.png"}
                  alt={item.name}
                  className="w-full object-cover"
                />
              </div>

              {/* Product Details & Controls */}
              <div className="flex-grow px-4">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <h3 className="text-lg font-bold">{item.name}</h3>
                    <span className="bg-gray-100 text-xs px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>

                <p className="mt-1 text-gray-600">Stock: {item.stock}</p>
                <div className="text-xl font-bold mt-2">${item.price}</div>

                {/* Quantity Controls */}
                <div className="mt-4 flex items-center">
                  <div className="flex border border-gray-300 rounded">
                    <button
                      onClick={() =>
                        changeQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-3 py-1 border-r border-gray-300"
                    >
                      −
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1 border-l border-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="md:w-1/3">
        <div className="bg-white rounded-lg shadow p-6 sticky top-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              Order Summary ( #{orderNumber} )
            </h2>
            <span className="text-gray-600 text-sm">{orderDate}</span>
          </div>

          <div className="space-y-4 divide-y">
            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal}</span>
            </div>

            <div className="flex justify-between py-2">
              <span>Shipping</span>
              <span className="font-semibold">${shipping.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-2">
              <span>Tax</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-4 font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={placeTheOrder}
            className="mt-6 w-full bg-black text-white py-3 px-4 rounded hover:bg-gray-800 transition-colors"
          >
            Place the order
          </button>
        </div>
      </div>
    </div>
  );
}
