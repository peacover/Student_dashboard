import GlassPane from "@/componenets/GlassPane";

export interface IChildren {
    children: React.ReactNode;
}

const AuthRootLayout : React.FC<IChildren> = ({ children }) => {
  return (
    <>
      <GlassPane className="w-full h-full flex items-center justify-center">
        {children}
        auth page
      </GlassPane>
    </>
  );
};

export default AuthRootLayout;
