import { IChildren } from "@/app/(auth)/layout";
import Sidebar from "@/componenets/Sidebar";

const DashboardRootLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <>
      {/* <body className="h-screen w-screen candy-mesh p-6"> */}
        <div className="w-full h-full p-6 flex align-center container mx-auto">
          <Sidebar />
          <main className="w-full pl-6 h-full">{children}</main>
        </div>
      {/* </body> */}
    </>
  );
};

export default DashboardRootLayout;
