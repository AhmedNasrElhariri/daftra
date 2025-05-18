import { X } from "lucide-react";
import { Minus, Plus } from "lucide-react";
const CartSummary = ({
  cartItems,
  removeFromCart,
  addToCart,
  changeQuantity,
  proceedOrder,
}) => {
  const subtotal = cartItems?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 15;
  const tax = subtotal * 0.0325;
  const total = subtotal + shipping + tax;

  return (
    <aside className="order-1 lg:order-2 w-full lg:w-[320px] bg-white border-l border-gray-200 p-4">
      <div className="flex flex-col h-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Order Summary</h2>
        </div>

        {/* Cart Items */}
        <div className="flex-1">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center pb-4 border-b border-gray-200 mb-4"
            >
              <div className="w-16 h-16 mr-4 flex-shrink-0">
                <img
                  src={item?.image_url || "/Dress.png"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{item.name}</h3>
                  <button
                    className="text-red-500"
                    onClick={() => {
                      removeFromCart(item.id);
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center border rounded-md">
                    <button
                      className="px-2 py-1"
                      onClick={() => changeQuantity(item.id, "decrease")}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      className="px-2 py-1"
                      onClick={() => addToCart(item)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-bold">${item.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Price Summary */}
        <div className="mt-2">
          <div className="flex justify-between py-2">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg py-2 border-t border-gray-200 mt-2">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          className="w-full bg-black text-white py-3 rounded-md mt-4 font-medium"
          onClick={() => proceedOrder()}
        >
          Proceed to Checkout
        </button>
      </div>
    </aside>
  );
};

export default CartSummary;
