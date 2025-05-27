import Sidebar from "./components/Sidebar";
import Styles from "../../styles/dashboard.module.scss";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={Styles.dashboardContainer}>
      <Sidebar />
      {children}
    </div>
  );
}
