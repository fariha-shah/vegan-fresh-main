//Wajeeha Home page,setup
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Routes that should render full-screen, without the site Navbar/Footer
const NO_LAYOUT_ROUTES = ['/login', '/register'];

const Layout = () => {
  const location = useLocation();
  const hideLayout = NO_LAYOUT_ROUTES.includes(location.pathname);

  if (hideLayout) {
    return (
      <main className="min-h-screen">
        <Outlet />
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[70px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
