"use client";
import { useState } from "react";
import {
  ShieldCheck, CreditCard, Smartphone, Landmark, Package,
  ChevronDown, ChevronUp, ArrowRight, Check, Lock, Wifi,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
//  PaymentPage.tsx — Payment Method + Order Summary
//  Methods: UPI · Credit/Debit Card · Netbanking · Cash on Delivery
//  Fully reusable — swap ORDER_ITEMS / SUMMARY for real cart data
// ─────────────────────────────────────────────────────────────────────────────

// ── Order data (swap with real cart) ─────────────────────────────────────────
const ORDER_ITEMS = [
  { name: "Signature Wool Overcoat", size: "M", qty: 1, price: 89 },
  { name: "Linen Oxford Shirt",      size: "L", qty: 1, price: 39 },
];
const SUMMARY = { subtotal: 128, shipping: 0, tax: 10.24 };

// ── UPI apps ──────────────────────────────────────────────────────────────────
const UPI_APPS = ["Google Pay", "PhonePe", "BHIM", "Paytm", "Amazon Pay"];

// ── Banks ─────────────────────────────────────────────────────────────────────
const BANKS = [
  "HDFC Bank", "ICICI Bank", "SBI", "Axis Bank",
  "Kotak Bank", "Yes Bank", "HSBC", "Citibank",
];

type Method = "upi" | "card" | "netbanking" | "cod";

// ── Small input ───────────────────────────────────────────────────────────────
function Input({
  label, placeholder, value, onChange, maxLength, className = "", type = "text", icon,
}: {
  label?: string; placeholder: string; value: string;
  onChange: (v: string) => void; maxLength?: number;
  className?: string; type?: string; icon?: React.ReactNode;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className={className}>
      {label && (
        <label className="block text-[11px] font-black tracking-[0.18em] uppercase text-gray-500 mb-1.5">
          {label}
        </label>
      )}
      <div className={`relative rounded-xl border transition-all duration-200 bg-white
        ${focused ? "border-blue-500 ring-2 ring-blue-50" : "border-gray-200 hover:border-gray-300"}`}>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-4 py-3 text-sm text-[#0f172a] placeholder-gray-300
            outline-none rounded-xl pr-10"
        />
        {icon && (
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Accordion method wrapper ──────────────────────────────────────────────────
function MethodBlock({
  id, active, onToggle, icon: Icon, title, subtitle, iconBg, children,
}: {
  id: Method; active: boolean; onToggle: () => void;
  icon: React.ElementType; title: string; subtitle: string;
  iconBg: string; children?: React.ReactNode;
}) {
  return (
    <div className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-white
      ${active ? "border-blue-500 shadow-md shadow-blue-100" : "border-gray-100 hover:border-gray-200 shadow-sm"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-[#0f172a] text-sm">{title}</p>
            <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>
          </div>
        </div>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors
          ${active ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}>
          {active ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Expanded content */}
      {active && children && (
        <div className="px-5 pb-5 pt-1 border-t border-blue-100 animate-slideDown">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function PaymentPage() {
  const [activeMethod, setActiveMethod] = useState<Method>("card");

  // Card form state
  const [cardNum,   setCardNum]   = useState("");
  const [cardName,  setCardName]  = useState("");
  const [expiry,    setExpiry]    = useState("");
  const [cvv,       setCvv]       = useState("");
  const [saveCard,  setSaveCard]  = useState(false);

  // UPI state
  const [upiId,     setUpiId]     = useState("");
  const [upiApp,    setUpiApp]    = useState("");

  // Netbanking
  const [bank,      setBank]      = useState("");

  // Processing
  const [loading,   setLoading]   = useState(false);
  const [success,   setSuccess]   = useState(false);

  const total = SUMMARY.subtotal + SUMMARY.shipping + SUMMARY.tax;

  const formatCard = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
  };

  const toggle = (m: Method) => setActiveMethod(prev => (prev === m ? m : m));

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 2200);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full text-center">
          <div className="relative inline-flex mb-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
              <Check className="w-8 h-8 text-emerald-500" />
            </div>
            <div className="absolute -inset-2 rounded-3xl bg-emerald-500/5 animate-ping" style={{ animationDuration: "2s" }} />
          </div>
          <h2 className="font-display font-bold text-[#0f172a] text-3xl mb-2">Payment Successful!</h2>
          <p className="text-gray-400 text-sm mb-1">Order confirmed</p>
          <p className="font-black text-blue-600 text-xl mb-7">${total.toFixed(2)}</p>
          <a href="/" className="block w-full bg-[#0f172a] text-white font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl hover:bg-blue-700 transition-colors">
            Continue Shopping
          </a>
        </div>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;700;900&display=swap');
          .font-display{font-family:'Cormorant Garamond',serif;}
        `}</style>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
        .font-display{font-family:'Cormorant Garamond',serif;}
        *{font-family:'DM Sans',sans-serif;}
        @keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .animate-slideDown{animation:slideDown 0.22s ease;}
      `}</style>

      <div className="min-h-screen bg-[#f8f9fb] py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Page title + SSL badge ── */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-black text-[#0f172a] text-2xl sm:text-3xl tracking-tight">
              Payment Method
            </h1>
            <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700
              text-[10px] font-black tracking-[0.18em] uppercase px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure SSL
            </div>
          </div>

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start">

            {/* ── LEFT: payment methods ── */}
            <div className="space-y-3">

              {/* UPI */}
              <MethodBlock
                id="upi" active={activeMethod === "upi"} onToggle={() => setActiveMethod("upi")}
                icon={Smartphone} title="UPI (Google Pay, PhonePe, BHIM)"
                subtitle="Pay directly from your bank account"
                iconBg="bg-indigo-50 text-indigo-600"
              >
                <div className="space-y-4 pt-3">
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {UPI_APPS.map(app => (
                      <button
                        key={app}
                        onClick={() => setUpiApp(app)}
                        className={`py-2 px-2 text-[10px] font-bold rounded-xl border transition-all
                          ${upiApp === app
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                      >
                        {app}
                      </button>
                    ))}
                  </div>
                  <Input
                    label="UPI ID"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={setUpiId}
                  />
                </div>
              </MethodBlock>

              {/* Credit / Debit Card */}
              <MethodBlock
                id="card" active={activeMethod === "card"} onToggle={() => setActiveMethod("card")}
                icon={CreditCard} title="Credit / Debit / ATM Card"
                subtitle="Visa, Mastercard, RuPay & More"
                iconBg="bg-blue-50 text-blue-600"
              >
                <div className="space-y-4 pt-3">
                  <Input
                    label="Card Number"
                    placeholder="0000 0000 0000 0000"
                    value={cardNum}
                    onChange={v => setCardNum(formatCard(v))}
                    maxLength={19}
                    icon={<CreditCard className="w-4 h-4" />}
                  />
                  <Input
                    label="Name on Card"
                    placeholder="JOHN DOE"
                    value={cardName}
                    onChange={v => setCardName(v.toUpperCase())}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={v => setExpiry(formatExpiry(v))}
                      maxLength={7}
                    />
                    <Input
                      label="CVV"
                      placeholder="• • •"
                      value={cvv}
                      onChange={v => setCvv(v.replace(/\D/g, "").slice(0, 4))}
                      type="password"
                      maxLength={4}
                      icon={<Lock className="w-3.5 h-3.5" />}
                    />
                  </div>
                  {/* Save card */}
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      onClick={() => setSaveCard(!saveCard)}
                      className={`w-4.5 h-4.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0
                        ${saveCard ? "bg-blue-600 border-blue-600" : "border-gray-300 group-hover:border-blue-400"}`}
                    >
                      {saveCard && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      Save card securely for future payments
                    </span>
                  </label>
                </div>
              </MethodBlock>

              {/* Netbanking */}
              <MethodBlock
                id="netbanking" active={activeMethod === "netbanking"} onToggle={() => setActiveMethod("netbanking")}
                icon={Landmark} title="Netbanking"
                subtitle="Login to your bank portal"
                iconBg="bg-amber-50 text-amber-600"
              >
                <div className="pt-3 space-y-3">
                  <p className="text-[11px] font-black tracking-[0.18em] uppercase text-gray-500">
                    Select Your Bank
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BANKS.map(b => (
                      <button
                        key={b}
                        onClick={() => setBank(b)}
                        className={`py-2.5 px-2 text-[11px] font-bold rounded-xl border transition-all text-center
                          ${bank === b
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  {bank && (
                    <p className="text-xs text-emerald-600 font-semibold">
                      ✓ You'll be redirected to {bank}'s secure portal
                    </p>
                  )}
                </div>
              </MethodBlock>

              {/* Cash on Delivery */}
              <MethodBlock
                id="cod" active={activeMethod === "cod"} onToggle={() => setActiveMethod("cod")}
                icon={Package} title="Cash on Delivery (COD)"
                subtitle="Pay when you receive the order"
                iconBg="bg-rose-50 text-rose-500"
              >
                <div className="pt-3">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700 font-medium leading-relaxed">
                    ⚠️ An additional handling fee of <strong>$2.00</strong> applies for Cash on Delivery orders.
                    Payment must be made in exact change to the delivery agent.
                  </div>
                </div>
              </MethodBlock>
            </div>

            {/* ── RIGHT: Order Summary ── */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden lg:sticky lg:top-6">
              <div className="h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />
              <div className="p-6">
                <h2 className="font-bold text-[#0f172a] text-lg mb-5">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-5 pb-5 border-b border-gray-100">
                  {ORDER_ITEMS.map((item, i) => (
                    <div key={i} className="flex justify-between items-start gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#0f172a] leading-snug">{item.name}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">Size: {item.size} · Qty: {item.qty}</p>
                      </div>
                      <span className="text-sm font-bold text-[#0f172a] flex-shrink-0">${item.price}.00</span>
                    </div>
                  ))}
                </div>

                {/* Breakdown */}
                <div className="space-y-3 mb-5 pb-5 border-b border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-[#0f172a]">${SUMMARY.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-500">Shipping</span>
                    {SUMMARY.shipping === 0
                      ? <span className="text-[10px] font-black tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">FREE</span>
                      : <span className="font-semibold text-[#0f172a]">${SUMMARY.shipping.toFixed(2)}</span>
                    }
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span className="font-semibold text-[#0f172a]">${SUMMARY.tax.toFixed(2)}</span>
                  </div>
                  {activeMethod === "cod" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-600">COD Fee</span>
                      <span className="font-semibold text-amber-600">$2.00</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-[#0f172a] text-base">Total Amount</span>
                  <span className="font-black text-blue-600 text-2xl">
                    ${(total + (activeMethod === "cod" ? 2 : 0)).toFixed(2)}
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={handlePay}
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-black
                    text-sm tracking-wide py-4 rounded-xl transition-all shadow-md shadow-blue-200
                    hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                      </svg>
                      Processing…
                    </span>
                  ) : (
                    <>Complete Purchase <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>

                {/* Security note */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-2.5 mb-4">
                    <ShieldCheck className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Your data is encrypted and secure. We do not store sensitive card information.
                    </p>
                  </div>
                  {/* Payment icons */}
                  <div className="flex items-center justify-center gap-4">
                    <CreditCard className="w-6 h-6 text-gray-300" />
                    <Wifi      className="w-6 h-6 text-gray-300" />
                    <Landmark  className="w-6 h-6 text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
