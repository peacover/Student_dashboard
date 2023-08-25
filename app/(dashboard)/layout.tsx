// import { IChildren } from "@/app/(auth)/layout";
import Sidebar from "@/components/Sidebar";

const DashboardRootLayout = ({ children }) => {
  return (
    <div className="w-full h-full p-6 flex align-center container mx-auto">
      <Sidebar />
      <main className="w-full pl-6 h-full">{children}</main>
    </div>
  );
};

export default DashboardRootLayout;
