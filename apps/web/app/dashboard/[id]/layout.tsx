import RestaurantNavbar from "./components/RestaurantNavbar";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <RestaurantNavbar />
      {children}
    </div>
  );
}
