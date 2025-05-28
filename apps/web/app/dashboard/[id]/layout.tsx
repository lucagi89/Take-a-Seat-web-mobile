import RestaurantNavbar from "./components/RestaurantNavbar";
import Styles from "../../../styles/restaurant-dashboard.module.scss";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={Styles.dashboardContainer}>
      <div className="overflow-y-auto p-4">{children}</div>
      <RestaurantNavbar />
    </div>
  );
}
