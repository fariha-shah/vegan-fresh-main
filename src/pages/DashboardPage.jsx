import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';

// Swap this for your real auth hook/redux selector, e.g.:
// const user = useSelector((state) => state.auth.user);
const useDashboardUser = () => ({
  name: 'Fareeha Shah',
  email: 'fareeha@veganfresh.com',
});

export default function DashboardPage() {
  const user = useDashboardUser();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#F5F5F5] lg:flex-row flex-col">
      <DashboardSidebar user={user} />

      <main className="flex-1 px-4 py-6 sm:px-8 lg:px-10 lg:py-10">
        {/* Greeting header */}
        <div className="mb-6 flex flex-col gap-1">
          <h1 className="font-poppins text-2xl font-semibold text-[#2C3E50] sm:text-[28px]">
            Welcome back, {user.name.split(' ')[0]} 🌿
          </h1>
          <p className="font-inter text-sm text-[#2C3E50]/60">
            Here's what's happening with your fresh deliveries.
          </p>
        </div>

        {/* Animated page transitions between dashboard sub-routes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
