import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Pencil,
  Save,
  X,
  CheckCircle2,
  Camera,
} from 'lucide-react';
import { setUser } from '../../redux/store';

// One labeled input, shared by view + edit states so styling never drifts apart.
const Field = ({
  icon: Icon,
  label,
  name,
  value,
  editing,
  onChange,
  type = 'text',
}) => (
  <div>
    <label className="mb-1.5 flex items-center gap-1.5 font-inter text-xs font-medium text-[#2C3E50]/50">
      <Icon size={13} />
      {label}
    </label>
    {editing ? (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-[#E0E0E0] bg-white px-4 py-2.5 font-inter text-sm text-[#2C3E50] outline-none transition-colors focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/15"
      />
    ) : (
      <p className="rounded-xl bg-[#F5F5F5] px-4 py-2.5 font-inter text-sm text-[#2C3E50]">
        {value || '—'}
      </p>
    )}
  </div>
);

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+92 3XX XXXXXXX',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zip: user?.address?.zip || '',
    country: user?.address?.country || 'Pakistan',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Replace with PUT /api/users/profile once the backend route is live.
    dispatch(
      setUser({
        ...user,
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: {
          street: form.street,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: form.country,
        },
      })
    );
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header card with avatar */}
      <div className="rounded-card bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <div className="relative">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#A5D6A7] font-poppins text-2xl font-semibold text-[#2E7D32]">
              {form.name ? form.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <button
              className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#2E7D32] text-white shadow-md transition-transform hover:scale-105"
              aria-label="Change profile photo"
            >
              <Camera size={13} />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h2 className="font-poppins text-xl font-semibold text-[#2C3E50]">
              {form.name || 'Your Name'}
            </h2>
            <p className="font-inter text-sm text-[#2C3E50]/60">{form.email}</p>
          </div>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {saved && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1 rounded-full bg-[#E8F5E9] px-3 py-1.5 font-inter text-xs font-medium text-[#2E7D32]"
                >
                  <CheckCircle2 size={14} />
                  Saved
                </motion.span>
              )}
            </AnimatePresence>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 rounded-xl bg-[#2E7D32] px-4 py-2 font-inter text-sm font-medium text-white transition-colors hover:bg-[#1B5E20]"
              >
                <Pencil size={14} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditing(false)}
                  className="flex items-center gap-1.5 rounded-xl border border-[#E0E0E0] px-4 py-2 font-inter text-sm font-medium text-[#2C3E50]/70 transition-colors hover:bg-[#F5F5F5]"
                >
                  <X size={14} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 rounded-xl bg-[#2E7D32] px-4 py-2 font-inter text-sm font-medium text-white transition-colors hover:bg-[#1B5E20]"
                >
                  <Save size={14} />
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Personal info */}
      <div className="rounded-card bg-white p-6 shadow-card sm:p-8">
        <h3 className="mb-5 font-poppins text-base font-semibold text-[#2C3E50]">
          Personal Information
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            icon={Pencil}
            label="Full Name"
            name="name"
            value={form.name}
            editing={editing}
            onChange={handleChange}
          />
          <Field
            icon={Mail}
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            editing={editing}
            onChange={handleChange}
          />
          <Field
            icon={Phone}
            label="Phone Number"
            name="phone"
            value={form.phone}
            editing={editing}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Address */}
      <div className="rounded-card bg-white p-6 shadow-card sm:p-8">
        <h3 className="mb-5 flex items-center gap-2 font-poppins text-base font-semibold text-[#2C3E50]">
          <MapPin size={17} className="text-[#2E7D32]" />
          Delivery Address
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            icon={MapPin}
            label="Street"
            name="street"
            value={form.street}
            editing={editing}
            onChange={handleChange}
          />
          <Field
            icon={MapPin}
            label="City"
            name="city"
            value={form.city}
            editing={editing}
            onChange={handleChange}
          />
          <Field
            icon={MapPin}
            label="State / Province"
            name="state"
            value={form.state}
            editing={editing}
            onChange={handleChange}
          />
          <Field
            icon={MapPin}
            label="ZIP / Postal Code"
            name="zip"
            value={form.zip}
            editing={editing}
            onChange={handleChange}
          />
          <Field
            icon={MapPin}
            label="Country"
            name="country"
            value={form.country}
            editing={editing}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}
