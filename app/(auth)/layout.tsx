const AuthLayout = ({ children }) => {
  return (
    <div className="bg-authBg block bg-cover">
      <main className="h-screen w-screen p-6">
        <div className="w-full h-full flex items-center justify-center">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;