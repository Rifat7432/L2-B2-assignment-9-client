import HomeLayout from "@/component/homePageComponents/HomeLayout";
import { HomeSidebar } from "@/component/sidebar/homeSidebar";

export default function Home() {
  return (
    <div className="flex relative">
      {/* <HomeSidebar /> */}
      <HomeLayout />
    </div>
  );
}
