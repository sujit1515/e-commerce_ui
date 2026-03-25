"use client";
import { useState, useEffect } from "react";
import {
  MapPin, Plus, Pencil, Trash2, ChevronDown, ChevronUp,
  Home, Briefcase, Building2, Check, X, Phone, User,
  Globe, Map, Hash, Navigation, ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";
import {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddresses,
  setDefaultAddress,
} from "../../api/address";
import { buyNowApi } from "../../api/buynow"; 

// ── Types 
interface Address {
  id: string;
  label: "Home" | "Office" | "Other";
  fullName: string;
  phone: string;
  street: string;
  apt: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

const COUNTRIES = [
  "United States", "United Kingdom", "Canada", "Australia",
  "France", "Germany", "Japan", "India", "UAE", "Singapore",
];

const LABEL_ICONS: Record<string, React.ElementType> = {
  Home: Home, Office: Briefcase, Other: Building2,
};
const LABEL_COLORS: Record<string, string> = {
  Home:   "bg-red-50    text-red-600    border-red-200",
  Office: "bg-gray-100  text-gray-700   border-gray-200",
  Other:  "bg-gray-100  text-gray-700   border-gray-200",
};

const EMPTY: Omit<Address, "id"> = {
  label: "Home",
  fullName: "",
  phone: "",
  street: "",
  apt: "",
  city: "",
  state: "",
  zip: "",
  country: "India",
  isDefault: false,
};

// ── Input field ───────────────────────────────────────────────────────────────
function Field({
  label, name, value, onChange, placeholder, error, icon: Icon, required, type = "text",
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string; error?: string; icon: React.ElementType;
  required?: boolean; type?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-black tracking-[0.22em] uppercase text-gray-500">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className={`relative rounded-xl border transition-all duration-200 bg-white
        ${error ? "border-red-400 ring-2 ring-red-50" : focused ? "border-red-500 ring-2 ring-red-50" : "border-gray-200 hover:border-gray-300"}`}>
        <Icon className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none
          ${error ? "text-red-400" : focused ? "text-red-500" : "text-gray-300"}`} />
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent pl-10 pr-4 py-3 text-sm text-black placeholder-gray-300
            outline-none rounded-xl"
        />
      </div>
      {error && <p className="text-[11px] text-red-500 font-semibold">{error}</p>}
    </div>
  );
}

// ── Address card ──────────────────────────────────────────────────────────────
function AddressCard({
  address, onEdit, onDelete, onSetDefault,
}: {
  address: Address;
  onEdit: (a: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}) {
  const Icon = LABEL_ICONS[address.label];
  const labelCls = LABEL_COLORS[address.label];

  return (
    <div className={`relative rounded-2xl border-2 p-5 sm:p-6 transition-all duration-300 bg-white
      ${address.isDefault ? "border-black shadow-lg" : "border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-md"}`}>

      {/* Default badge */}
      {address.isDefault && (
        <div className="absolute -top-3 left-5">
          <span className="flex items-center gap-1 bg-black text-white text-[9px] font-black
            tracking-[0.18em] uppercase px-3 py-1 rounded-full shadow-md">
            <Check className="w-2.5 h-2.5" /> Default
          </span>
        </div>
      )}

      {/* Card header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <span className={`flex items-center gap-1.5 text-[10px] font-bold tracking-wider border px-2.5 py-1 rounded-full ${labelCls}`}>
            <Icon className="w-3 h-3" /> {address.label}
          </span>
        </div>
        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onEdit(address)}
            className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center
              text-gray-400 hover:text-red-600 transition-all"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(address.id)}
            className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center
              text-gray-400 hover:text-red-500 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Address details */}
      <div className="space-y-1.5 mb-5">
        <p className="font-bold text-black text-sm">{address.fullName}</p>
        <p className="text-gray-400 text-sm">{address.phone}</p>
        <div className="flex items-start gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-gray-300 flex-shrink-0 mt-0.5" />
          <p className="text-gray-500 text-sm leading-snug">
            {address.street}{address.apt && `, ${address.apt}`}<br />
            {address.city}, {address.state} {address.zip}<br />
            {address.country}
          </p>
        </div>
      </div>

      {/* Set default toggle */}
      {!address.isDefault && (
        <button
          onClick={() => onSetDefault(address.id)}
          className="flex items-center gap-2 text-[11px] font-bold text-gray-400
            hover:text-black transition-colors group"
        >
          <span className="w-4 h-4 rounded-full border-2 border-gray-300 group-hover:border-black
            flex items-center justify-center transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-black transition-colors" />
          </span>
          Set as Default Address
        </button>
      )}
    </div>
  );
}

// ── Address form modal ────────────────────────────────────────────────────────
function AddressForm({
  initial, onSave, onCancel,
}: {
  initial: Omit<Address, "id"> & { id?: string };
  onSave: (data: Omit<Address, "id"> & { id?: string }) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [defaultToggle, setDefault] = useState(initial.isDefault);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => { const n = { ...p }; delete n[name]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.phone.trim())    e.phone    = "Phone number is required";
    if (!form.street.trim())   e.street   = "Street address is required";
    if (!form.city.trim())     e.city     = "City is required";
    if (!form.state.trim())    e.state    = "State is required";
    if (!form.zip.trim())      e.zip      = "ZIP code is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSave({ ...form, isDefault: defaultToggle });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />

      {/* Panel */}
      <div className="relative w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-2xl
        shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">

        {/* Top accent */}
        <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 flex-shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="font-display font-bold text-black text-2xl">
              {form.id ? "Edit Address" : "Add New Address"}
            </h2>
            <p className="text-gray-400 text-xs mt-0.5">
              Please provide your shipping details for a seamless delivery experience.
            </p>
          </div>
          <button onClick={onCancel} className="w-9 h-9 rounded-xl hover:bg-gray-100 flex items-center justify-center text-gray-400 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable form body */}
        <div className="overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} noValidate className="px-6 py-6 space-y-5">

            {/* Label selector */}
            <div>
              <label className="text-[10px] font-black tracking-[0.22em] uppercase text-gray-500 block mb-2">
                Address Type
              </label>
              <div className="flex gap-2">
                {(["Home", "Office", "Other"] as const).map(lbl => {
                  const LIcon = LABEL_ICONS[lbl];
                  const active = form.label === lbl;
                  return (
                    <button
                      key={lbl}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, label: lbl }))}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border-2 text-xs font-bold transition-all
                        ${active ? "border-black bg-black text-white" : "border-gray-200 text-gray-500 hover:border-gray-400"}`}
                    >
                      <LIcon className="w-3.5 h-3.5" /> {lbl}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Full Name"     name="fullName" value={form.fullName} onChange={handleChange} placeholder="e.g. Alexander McQueen"  icon={User}  error={errors.fullName} required />
              <Field label="Phone Number"  name="phone"    value={form.phone}    onChange={handleChange} placeholder="+1 (555) 000-0000"         icon={Phone} error={errors.phone}    required type="tel" />
            </div>

            {/* Street */}
            <Field label="Street Address" name="street" value={form.street} onChange={handleChange} placeholder="123 Luxury Avenue" icon={MapPin} error={errors.street} required />

            {/* Apt */}
            <Field label="Apartment, Suite, Unit, etc. (Optional)" name="apt" value={form.apt} onChange={handleChange} placeholder="Suite 405" icon={Building2} />

            {/* City + State + ZIP */}
            <div className="grid grid-cols-3 gap-3">
              <Field label="City"           name="city"  value={form.city}  onChange={handleChange} placeholder="New York" icon={Map}  error={errors.city}  required />
              <Field label="State / Province" name="state" value={form.state} onChange={handleChange} placeholder="NY"       icon={Navigation} error={errors.state} required />
              <Field label="ZIP / Postal Code" name="zip" value={form.zip}   onChange={handleChange} placeholder="10001"    icon={Hash} error={errors.zip}   required />
            </div>

            {/* Country */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black tracking-[0.22em] uppercase text-gray-500">
                Country <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 pointer-events-none" />
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full appearance-none bg-white border border-gray-200 hover:border-gray-300
                    focus:border-red-500 focus:ring-2 focus:ring-red-50 rounded-xl
                    pl-10 pr-10 py-3 text-sm text-black outline-none cursor-pointer transition-all"
                >
                  {COUNTRIES.map(c => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Default toggle */}
            <div className="flex items-start justify-between gap-4 py-4 px-4 bg-gray-50 rounded-xl">
              <div>
                <p className="font-bold text-black text-sm">Set as Default Address</p>
                <p className="text-gray-400 text-xs mt-0.5">This will be used for all future orders.</p>
              </div>
              <button
                type="button"
                onClick={() => setDefault(!defaultToggle)}
                className={`w-12 h-6 rounded-full relative flex-shrink-0 transition-all duration-300
                  ${defaultToggle ? "bg-red-600" : "bg-gray-200"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300
                  ${defaultToggle ? "left-6" : "left-0.5"}`} />
              </button>
            </div>

            {/* Map preview */}
            <div className="relative rounded-xl overflow-hidden h-28 bg-gray-100 border border-gray-200">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&q=60"
                alt="Map preview"
                className="w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-red-600 flex-shrink-0" />
                  <span className="text-[11px] font-semibold text-gray-600">
                    {form.street && form.city
                      ? `${form.street}, ${form.city}`
                      : "Your address location preview will appear here"}
                  </span>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer CTA */}
        <div className="px-6 pb-6 pt-4 border-t border-gray-100 space-y-3 flex-shrink-0">
          <button
            onClick={handleSubmit}
            className="w-full bg-black hover:bg-red-700 text-white font-black text-[11px]
              tracking-[0.25em] uppercase py-4 rounded-xl transition-all shadow-md
              hover:shadow-xl active:scale-[0.98]"
          >
            {form.id ? "Update Address" : "Save Address"}
          </button>
          <button
            onClick={onCancel}
            className="w-full text-gray-400 hover:text-black text-xs font-semibold
              tracking-wider uppercase py-2 transition-colors"
          >
            Cancel and Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function AddressPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [formData, setFormData] = useState<(Omit<Address, "id"> & { id?: string }) | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const displayed = showAll ? addresses : addresses.slice(0, 2);

  // ✅ FETCH ADDRESSES FROM BACKEND
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        setLoading(true);
        const res = await getAddresses();
        
        const formatted: Address[] = res.addresses.map((a: any) => ({
          id: a._id,
          label: a.label || "Home",
          fullName: a.fullName,
          phone: a.phone,
          street: a.street,
          apt: a.apt || "",
          city: a.city,
          state: a.state,
          zip: a.postalCode,
          country: a.country,
          isDefault: a.isDefault,
        }));

        setAddresses(formatted);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  // ✅ SAVE (ADD + UPDATE)
  const handleSave = async (data: Omit<Address, "id"> & { id?: string }) => {
    try {
      if (data.id) {
        // Update existing address
        const res = await updateAddress(data.id, {
          label: data.label,
          fullName: data.fullName,
          phone: data.phone,
          street: data.street,
          apt: data.apt,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
          isDefault: data.isDefault,
        });

        setAddresses((prev) =>
          prev.map((a) =>
            a.id === data.id
              ? {
                  ...res.address,
                  id: res.address._id,
                  zip: res.address.postalCode,
                  label: res.address.label || "Home",
                }
              : a
          )
        );
      } else {
        // Add new address
        const res = await addAddress({
          label: data.label,
          fullName: data.fullName,
          phone: data.phone,
          street: data.street,
          apt: data.apt,
          city: data.city,
          state: data.state,
          zip: data.zip,
          country: data.country,
          isDefault: data.isDefault,
        });

        const newAddress: Address = {
          ...res.address,
          id: res.address._id,
          zip: res.address.postalCode,
          label: res.address.label || "Home",
        };

        setAddresses((prev) => [...prev, newAddress]);
      }

      setFormData(null);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };

  // ✅ DELETE
  const handleDelete = async (id: string) => {
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // ✅ SET DEFAULT
  const handleSetDefault = async (id: string) => {
    try {
      await setDefaultAddress(id);
      setAddresses((prev) =>
        prev.map((a) => ({
          ...a,
          isDefault: a.id === id,
        }))
      );
    } catch (error) {
      console.error("Error setting default address:", error);
    }
  };

  // ✅ NEXT BUTTON HANDLER - Redirect to Payment Page
  const handleNext = async () => {
  try {
    if (addresses.length === 0) {
      alert("Please add address");
      return;
    }

    const defaultAddress = addresses.find(addr => addr.isDefault);

    if (!defaultAddress) {
      alert("Select default address");
      return;
    }

    // ✅ Get product data from URL
    const params = new URLSearchParams(window.location.search);

    const productId = params.get("productId");
    const size = params.get("size");
    const color = params.get("color");
    const quantity = Number(params.get("quantity"));

    if (!productId || !quantity) {
      alert("Invalid product data");
      return;
    }

    // ✅ CALL BUY NOW API
    const res = await buyNowApi({
      productId,
      quantity,
      size: size || undefined,
      color: color || undefined,
      addressId: defaultAddress.id,
    });

    console.log("Order Created:", res);

    // ✅ Save orderId
    localStorage.setItem("orderId", res.order._id);

    // ✅ Go to payment page
    router.push("/payment");

  } catch (error) {
    console.error(error);
    alert("Failed to create order");
  }
};

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600;1,700&family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
        .font-display { font-family:'Cormorant Garamond',serif; }
        * { font-family:'DM Sans',sans-serif; }
      `}</style>

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="min-h-screen bg-gray-50 py-10 sm:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">

          {/* ── Page header ── */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-black mb-4 shadow-lg">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-display font-bold text-black text-3xl sm:text-4xl mb-2">
              My Addresses
            </h1>
            <p className="text-gray-400 text-sm">
              Manage your saved delivery addresses
            </p>
          </div>

          {/* ── Add new address button ── */}
          <button
            onClick={() => setFormData({ ...EMPTY })}
            className="w-full flex items-center justify-center gap-2.5 border-2 border-dashed border-gray-300
              hover:border-red-400 hover:bg-red-50/50 text-gray-400 hover:text-red-600
              font-bold text-sm tracking-wide rounded-2xl py-4 mb-6 transition-all duration-200 group"
          >
            <div className="w-8 h-8 rounded-xl bg-gray-100 group-hover:bg-red-100 flex items-center justify-center transition-colors">
              <Plus className="w-4 h-4" />
            </div>
            Add New Address
          </button>

          {/* ── Loading State ── */}
          {loading ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
              <p className="text-gray-400 text-sm mt-4">Loading your addresses...</p>
            </div>
          ) : addresses.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <MapPin className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="font-bold text-gray-400 text-base">No saved addresses yet</p>
              <p className="text-gray-300 text-sm mt-1">Add an address to get started</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {displayed.map(addr => (
                  <AddressCard
                    key={addr.id}
                    address={addr}
                    onEdit={a => setFormData({ ...a })}
                    onDelete={id => setDeleteConfirm(id)}
                    onSetDefault={handleSetDefault}
                  />
                ))}

                {/* View All / Show Less */}
                {addresses.length > 2 && (
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="w-full flex items-center justify-center gap-2 text-[11px] font-black
                      tracking-[0.2em] uppercase text-gray-400 hover:text-black py-3.5
                      border border-gray-200 rounded-2xl hover:border-gray-300 hover:bg-white
                      transition-all duration-200 bg-white/60 shadow-sm"
                  >
                    {showAll ? (
                      <><ChevronUp className="w-3.5 h-3.5" /> Show Less</>
                    ) : (
                      <><ChevronDown className="w-3.5 h-3.5" /> View All {addresses.length} Addresses</>
                    )}
                  </button>
                )}
              </div>

              {/* Summary bar */}
              <p className="text-center text-xs text-gray-300 font-medium mt-6">
                {addresses.length} address{addresses.length !== 1 ? "es" : ""} saved ·{" "}
                {addresses.find(a => a.isDefault)?.city || "—"} is your default
              </p>

              {/* ── Next Button (Inline) ── */}
              <div className="mt-8 pt-4 border-t border-gray-200">
                <button
                  onClick={handleNext}
                  className="w-full flex items-center justify-center gap-3 bg-black hover:bg-red-700 
                    text-white font-bold text-sm tracking-wide py-4 rounded-xl 
                    transition-all duration-300 shadow-md hover:shadow-lg group"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* ── Add / Edit form modal ── */}
      {formData !== null && (
        <AddressForm
          initial={formData}
          onSave={handleSave}
          onCancel={() => setFormData(null)}
        />
      )}

      {/* ── Delete confirmation modal ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl p-7 max-w-sm w-full">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4 mx-auto">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="font-bold text-black text-lg text-center mb-2">Remove Address?</h3>
            <p className="text-gray-400 text-sm text-center mb-6">
              This address will be permanently removed from your account.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 border border-gray-200 text-gray-600 font-bold text-sm
                  py-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-sm
                  py-3 rounded-xl transition-colors shadow-md"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}