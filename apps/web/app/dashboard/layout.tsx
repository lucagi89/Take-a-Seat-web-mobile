import Sidebar from "./components/Sidebar";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
