import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';

// Placeholder sub-pages — these get replaced in Steps 2 to 6.
const Placeholder = ({ label }) => (
  <div className="rounded-card bg-white p-6 shadow-card font-inter text-[#2C3E50]/70">
    {label} page coming in the next step.
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard/profile" replace />} />
      <Route path="/dashboard" element={<DashboardPage />}>
        <Route path="profile" element={<Placeholder label="Profile" />} />
        <Route path="orders" element={<Placeholder label="Order History" />} />
        <Route path="tracking" element={<Placeholder label="Track Order" />} />
        <Route path="favorites" element={<Placeholder label="Favorites" />} />
        <Route
          path="subscriptions"
          element={<Placeholder label="Subscriptions" />}
        />
      </Route>
    </Routes>
  );
}

export default App;
