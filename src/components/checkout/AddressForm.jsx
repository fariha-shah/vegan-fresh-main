// Fareeha client dashboard, cart, checkout system
import { MapPin, Phone, Home } from 'lucide-react';

const Input = ({ label, icon: Icon, ...props }) => (
  <div>
    <label className="mb-1.5 flex items-center gap-1.5 font-inter text-xs font-medium text-[#2C3E50]/50">
      <Icon size={12} />
      {label}
    </label>
    <input
      {...props}
      className="w-full rounded-xl border border-[#E0E0E0] bg-white px-4 py-2.5 font-inter text-sm text-[#2C3E50] outline-none transition-colors focus:border-[#2E7D32] focus:ring-2 focus:ring-[#2E7D32]/15"
    />
  </div>
);

export default function AddressForm({ address, onChange }) {
  const set = (field) => (e) =>
    onChange({ ...address, [field]: e.target.value });

  return (
    <div className="space-y-5">
      <h3 className="flex items-center gap-2 font-poppins text-base font-semibold text-[#2C3E50]">
        <MapPin size={17} className="text-[#2E7D32]" />
        Delivery Address
      </h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Input
            icon={Home}
            label="Street Address"
            placeholder="House 12, Street 5, Bahria Town"
            value={address.street}
            onChange={set('street')}
          />
        </div>
        <Input
          icon={MapPin}
          label="City"
          placeholder="Rawalpindi"
          value={address.city}
          onChange={set('city')}
        />
        <Input
          icon={MapPin}
          label="State / Province"
          placeholder="Punjab"
          value={address.state}
          onChange={set('state')}
        />
        <Input
          icon={MapPin}
          label="ZIP / Postal Code"
          placeholder="46000"
          value={address.zip}
          onChange={set('zip')}
        />
        <Input
          icon={MapPin}
          label="Country"
          placeholder="Pakistan"
          value={address.country}
          onChange={set('country')}
        />
        <div className="sm:col-span-2">
          <Input
            icon={Phone}
            label="Phone Number"
            placeholder="+92 3XX XXXXXXX"
            value={address.phone}
            onChange={set('phone')}
          />
        </div>
      </div>

      <label className="flex items-center gap-2 font-inter text-xs text-[#2C3E50]/60">
        <input
          type="checkbox"
          checked={address.saveAddress || false}
          onChange={(e) =>
            onChange({ ...address, saveAddress: e.target.checked })
          }
          className="h-4 w-4 rounded accent-[#2E7D32]"
        />
        Save this address to my profile for next time
      </label>
    </div>
  );
}
