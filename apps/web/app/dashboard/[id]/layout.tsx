"use client";

import RestaurantNavbar from "./components/RestaurantNavbar";
import Styles from "../../../styles/restaurant-dashboard.module.scss";
import { useParams } from "next/navigation";
import Sidebar from "./components/Sidebar";
import { RestaurantProvider } from "../../../contexts/RestaurantContext";
import { useUser } from "../../../contexts/userContext";
import { useRouter } from "next/navigation";

export default function RestaurantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userRestaurants, loading } = useUser();
  const params = useParams();
  const { id } = params;
  const router = useRouter();

  if (!id || Array.isArray(id)) {
    return <div>Error: Restaurant ID is required.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userRestaurants || userRestaurants.length === 0) {
    router.push("/create-restaurant");
    return <div>No restaurants found. Redirecting...</div>;
  }

  return (
    <RestaurantProvider initialRestaurantId={userRestaurants[0].id ?? ""}>
      <div className={Styles.dashboardContainer}>
        {userRestaurants.length > 1 && <Sidebar />}
        <RestaurantNavbar />
        <div className={Styles.childrenContainer}>{children}</div>
      </div>
    </RestaurantProvider>
  );
}
