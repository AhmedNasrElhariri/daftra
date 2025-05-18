import Header from "./header";

const AppLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="bg-gray-50">{children}</div>
    </div>
  );
};

export default AppLayout;
