import { Routes, Route } from 'react-router-dom';
import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardOverview from '../components/dashboard/DashboardOverview';
import ProfileSection from '../components/dashboard/ProfileSection';
// Placeholder components for now
const ProfilePage = () => <ProfileSection />;

const OrderHistoryPage = () => (
  <div className="p-6 font-heading text-primary text-xl">
    Order History — Coming soon!
  </div>
);
const TrackOrderPage = () => (
  <div className="p-6 font-heading text-primary text-xl">
    Track Order — Coming soon!
  </div>
);
const FavoritesPage = () => (
  <div className="p-6 font-heading text-primary text-xl">
    Favorites — Coming soon!
  </div>
);
const SubscriptionsPage = () => (
  <div className="p-6 font-heading text-primary text-xl">
    Subscriptions — Coming soon!
  </div>
);

const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-bg-light">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Routes>
          <Route index element={<DashboardOverview />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="orders" element={<OrderHistoryPage />} />
          <Route path="track" element={<TrackOrderPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="subscriptions" element={<SubscriptionsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardPage;
