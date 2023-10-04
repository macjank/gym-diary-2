import Navigation from '../navigation/Navigation';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default MainLayout;
