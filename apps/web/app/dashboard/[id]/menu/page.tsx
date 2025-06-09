import { useRestaurant } from "../../../../contexts/RestaurantContext";

export default function MenuPage() {
  const { restaurant } = useRestaurant();
  if (!restaurant) {
    return <div>Error: No restaurant selected.</div>;
  }
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <h1 className="text-2xl font-bold">{restaurant.name}&#39;s Menu</h1>
        <p>Manage your restaurant&#39;s menu here.</p>
      </div>
    </div>
  );
}
