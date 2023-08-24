import "../globals.css";
export interface IChildren {
  children: React.ReactNode;
}

const AuthRootLayout: React.FC<IChildren> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default AuthRootLayout;
