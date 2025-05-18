import { Search, Menu, ShoppingCart, Filter, X } from "lucide-react";

const Header = () => {
  return (
    <div className="w-full">
      <div className="bg-black text-white text-center py-2 px-4 relative">
        <p className="text-sm">
          Sign up and get 20% off to your first order.
          <span className="font-bold ml-1">Sign Up Now</span>
        </p>
        <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <X size={16} />
        </button>
      </div>

      <div className="flex justify-between items-center px-4 py-3 bg-white">
        <div className="flex items-center gap-2">
          <button className="lg:hidden">
            <Menu size={24} />
          </button>
          <div className="flex items-center">
            <div className="border border-black p-1">
              <div className="w-5 h-5 bg-white border border-black flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full"></div>
              </div>
            </div>
            <span className="font-bold text-xl ml-1">izam</span>
          </div>
        </div>

        <div className="hidden lg:flex gap-6">
          <button className="font-medium">Products</button>
          <button className="font-medium">Sell Your Product</button>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden lg:block">
            <Search size={20} />
          </button>
          <button>
            <ShoppingCart size={20} />
          </button>
          <button className="bg-black text-white px-4 py-1 rounded">
            Login
          </button>
        </div>
      </div>

      <div className="px-4 py-2 lg:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by product name"
            className="w-full border border-gray-300 rounded px-4 py-2 pl-10"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Filter size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
