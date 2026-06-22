import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../redux/slices/authSlice';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  Save,
  X,
  CheckCircle,
} from 'lucide-react';

const InputField = ({
  label,
  icon: Icon,
  value,
  name,
  onChange,
  disabled,
  type = 'text',
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="font-body text-sm font-medium text-text-dark">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full pl-10 pr-4 py-3 rounded-xl border font-body text-sm
        text-text-dark outline-none transition-all duration-200
        ${
          disabled
            ? 'bg-bg-light border-gray-200 cursor-not-allowed text-gray-500'
            : 'bg-white border-primary-light focus:border-primary focus:ring-2 focus:ring-green-100'
        }`}
      />
    </div>
  </div>
);

const ProfileSection = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(updateProfile(form));
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="font-heading font-bold text-2xl text-text-dark">
          My Profile
        </h2>
        <p className="font-body text-gray-400 text-sm mt-1">
          Manage your personal information
        </p>
      </div>

      {/* Success Toast */}
      {saved && (
        <div
          className="flex items-center gap-3 bg-green-50 border border-green-200 
        text-primary px-4 py-3 rounded-xl font-body text-sm"
        >
          <CheckCircle className="w-5 h-5" />
          Profile updated successfully!
        </div>
      )}

      {/* Avatar + Name Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-5">
        <div
          className="w-20 h-20 rounded-full bg-gradient-to-br from-primary 
        to-primary-light flex items-center justify-center text-white 
        font-heading font-bold text-3xl shadow-md"
        >
          {user?.name?.charAt(0)}
        </div>
        <div>
          <h3 className="font-heading font-bold text-text-dark text-xl">
            {user?.name}
          </h3>
          <p className="font-body text-gray-400 text-sm mt-0.5">
            {user?.email}
          </p>
          <span
            className="inline-block mt-2 bg-green-50 text-primary text-xs 
          font-body font-medium px-3 py-1 rounded-full"
          >
            ✅ Verified Customer
          </span>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading font-semibold text-text-dark text-lg">
            Personal Information
          </h3>
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-2 bg-primary hover:bg-primary-dark 
              text-white text-sm font-body font-medium px-4 py-2 rounded-lg 
              transition-colors duration-200"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 border border-gray-200 
                hover:bg-bg-light text-text-dark text-sm font-body 
                font-medium px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-primary hover:bg-primary-dark 
                text-white text-sm font-body font-medium px-4 py-2 rounded-lg 
                transition-colors duration-200"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Full Name"
            icon={User}
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!editing}
          />
          <InputField
            label="Email Address"
            icon={Mail}
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={!editing}
            type="email"
          />
          <InputField
            label="Phone Number"
            icon={Phone}
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={!editing}
          />
          <InputField
            label="Address"
            icon={MapPin}
            name="address"
            value={form.address}
            onChange={handleChange}
            disabled={!editing}
          />
        </div>
      </div>

      {/* Account Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            label: 'Member Since',
            value: 'June 2026',
            bg: 'bg-green-50',
            color: 'text-primary',
          },
          {
            label: 'Total Orders',
            value: '3 Orders',
            bg: 'bg-orange-50',
            color: 'text-carrot',
          },
          {
            label: 'Account Status',
            value: 'Active ✅',
            bg: 'bg-blue-50',
            color: 'text-blue-600',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} rounded-2xl p-5 text-center`}
          >
            <p className="font-body text-gray-500 text-xs mb-1">{stat.label}</p>
            <p className={`font-heading font-bold text-lg ${stat.color}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Change Password Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-heading font-semibold text-text-dark text-lg mb-4">
          Security
        </h3>
        <div className="flex items-center justify-between p-4 bg-bg-light rounded-xl">
          <div>
            <p className="font-body font-medium text-text-dark text-sm">
              Password
            </p>
            <p className="font-body text-gray-400 text-xs mt-0.5">
              Last changed 30 days ago
            </p>
          </div>
          <button
            className="text-primary text-sm font-body font-medium 
          hover:underline"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
