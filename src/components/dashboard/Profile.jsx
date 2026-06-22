import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pencil,
  X,
  Check,
  Mail,
  Phone,
  MapPin,
  Camera,
  User as UserIcon,
} from 'lucide-react';
import { setUser } from '../../redux/store';

// One field config drives both the read view and the edit form —
// keeps the two states from drifting apart as fields get added later.
const FIELDS = [
  { key: 'name', label: 'Full name', icon: UserIcon, type: 'text' },
  { key: 'email', label: 'Email address', icon: Mail, type: 'email' },
  { key: 'phone', label: 'Phone number', icon: Phone, type: 'tel' },
  { key: 'street', label: 'Street address', icon: MapPin, type: 'text' },
  { key: 'city', label: 'City', icon: MapPin, type: 'text' },
  { key: 'state', label: 'State', icon: MapPin, type: 'text' },
  { key: 'zip', label: 'ZIP code', icon: MapPin, type: 'text' },
];

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zip: user?.address?.zip || '',
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    setForm({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zip: user?.address?.zip || '',
    });
    setIsEditing(false);
  };

  const handleSave = () => {
    // TODO: replace with PUT /api/users/profile once Ayesh's endpoint is live
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
        },
      })
    );
    setIsEditing(false);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2200);
  };

  return (
    <div className="max-w-3xl">
      <div className="overflow-hidden rounded-card bg-white shadow-card">
        {/* Cover strip */}
        <div className="h-24 bg-gradient-to-r from-fresh-green to-light-green" />

        <div className="px-6 pb-6 sm:px-8">
          {/* Avatar + edit toggle */}
          <div className="-mt-10 flex items-end justify-between">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white bg-leaf-green font-poppins text-2xl font-semibold text-fresh-green-dark shadow-card">
                {form.name ? form.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <button
                className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-fresh-green text-white transition-colors hover:bg-fresh-green-dark"
                title="Change photo (hook up to Cloudinary upload)"
              >
                <Camera size={13} />
              </button>
            </div>

            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-xl border border-fresh-green px-4 py-2 font-inter text-sm font-medium text-fresh-green transition-colors hover:bg-fresh-green hover:text-white"
              >
                <Pencil size={15} />
                Edit profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3.5 py-2 font-inter text-sm text-dark-gray/70 transition-colors hover:bg-light-gray"
                >
                  <X size={15} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1.5 rounded-xl bg-fresh-green px-3.5 py-2 font-inter text-sm font-medium text-white transition-colors hover:bg-fresh-green-dark"
                >
                  <Check size={15} />
                  Save
                </button>
              </div>
            )}
          </div>

          <div className="mt-4">
            <h2 className="font-poppins text-lg font-semibold text-dark-gray">
              {form.name || 'Your name'}
            </h2>
            <p className="font-inter text-sm text-dark-gray/50">
              Manage your personal details and delivery address
            </p>
          </div>

          {/* Fields */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FIELDS.map(({ key, label, icon: Icon, type }) => (
              <div
                key={key}
                className={key === 'street' ? 'sm:col-span-2' : ''}
              >
                <label className="mb-1.5 flex items-center gap-1.5 font-inter text-xs font-medium uppercase tracking-wide text-dark-gray/40">
                  <Icon size={12} />
                  {label}
                </label>

                <AnimatePresence mode="wait">
                  {isEditing ? (
                    <motion.input
                      key="input"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      type={type}
                      value={form[key]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 font-inter text-sm text-dark-gray outline-none transition-colors focus:border-fresh-green focus:ring-2 focus:ring-fresh-green/15"
                    />
                  ) : (
                    <motion.p
                      key="text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-xl bg-light-gray px-3.5 py-2.5 font-inter text-sm text-dark-gray"
                    >
                      {form[key] || (
                        <span className="text-dark-gray/35">Not set</span>
                      )}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Saved toast */}
      <AnimatePresence>
        {showSaved && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="fixed bottom-6 right-6 flex items-center gap-2 rounded-xl bg-fresh-green px-4 py-3 font-inter text-sm font-medium text-white shadow-card"
          >
            <Check size={16} />
            Profile updated
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
