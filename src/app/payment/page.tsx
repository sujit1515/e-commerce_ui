// "use client";
// import { useState, useEffect } from "react";
// import {
//   ShieldCheck, CreditCard, Smartphone, Landmark, Package,
//   ChevronDown, ChevronUp, ArrowRight, Check, Lock, Wifi,
// } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// import Navbar from "../../components/Common/Navbar";
// import Footer from "../../components/Common/Footer";
// import { getOrderByIdApi, placeOrderApi } from "../../api/order";

// // ── UPI apps ──────────────────────────────────────────────────────────────────
// const UPI_APPS = ["Google Pay", "PhonePe", "BHIM", "Paytm", "Amazon Pay"];

// // ── Banks ─────────────────────────────────────────────────────────────────────
// const BANKS = [
//   "HDFC Bank", "ICICI Bank", "SBI", "Axis Bank",
//   "Kotak Bank", "Yes Bank", "HSBC", "Citibank",
// ];

// type Method = "upi" | "card" | "netbanking" | "cod";

// // ── Small input ───────────────────────────────────────────────────────────────
// function Input({
//   label, placeholder, value, onChange, maxLength, className = "", type = "text", icon,
// }: {
//   label?: string; placeholder: string; value: string;
//   onChange: (v: string) => void; maxLength?: number;
//   className?: string; type?: string; icon?: React.ReactNode;
// }) {
//   const [focused, setFocused] = useState(false);
//   return (
//     <div className={className}>
//       {label && (
//         <label className="block text-[11px] font-black tracking-[0.18em] uppercase text-gray-500 mb-1.5">
//           {label}
//         </label>
//       )}
//       <div className={`relative rounded-xl border transition-all duration-200 bg-white
//         ${focused ? "border-maroon ring-2 ring-maroon/10" : "border-gray-200 hover:border-gray-300"}`}>
//         <input
//           type={type}
//           value={value}
//           onChange={e => onChange(e.target.value)}
//           placeholder={placeholder}
//           maxLength={maxLength}
//           onFocus={() => setFocused(true)}
//           onBlur={() => setFocused(false)}
//           className="w-full bg-transparent px-4 py-3 text-sm text-black placeholder-gray-300
//             outline-none rounded-xl pr-10"
//         />
//         {icon && (
//           <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
//             {icon}
//           </span>
//         )}
//       </div>
//     </div>
//   );
// }

// // ── Accordion method wrapper ──────────────────────────────────────────────────
// function MethodBlock({
//   id, active, onToggle, icon: Icon, title, subtitle, iconBg, children, disabled = false,
// }: {
//   id: Method; active: boolean; onToggle: () => void;
//   icon: React.ElementType; title: string; subtitle: string;
//   iconBg: string; children?: React.ReactNode; disabled?: boolean;
// }) {
//   if (disabled) {
//     return (
//       <div className="relative">
//         <div className="absolute inset-0 bg-gray-50/80 rounded-2xl z-10 flex items-center justify-center cursor-not-allowed">
//           <span className="text-xs font-bold text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm">Currently Unavailable</span>
//         </div>
//         <div className="rounded-2xl border-2 border-gray-100 bg-white opacity-50">
//           <div className="flex items-center justify-between px-5 py-4">
//             <div className="flex items-center gap-3.5">
//               <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
//                 <Icon className="w-5 h-5" />
//               </div>
//               <div>
//                 <p className="font-bold text-black text-sm">{title}</p>
//                 <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-white
//       ${active ? "border-maroon shadow-md shadow-maroon/10" : "border-gray-100 hover:border-gray-200 shadow-sm"}`}>
//       <button
//         onClick={onToggle}
//         className="w-full flex items-center justify-between px-5 py-4 text-left"
//       >
//         <div className="flex items-center gap-3.5">
//           <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
//             <Icon className="w-5 h-5" />
//           </div>
//           <div>
//             <p className="font-bold text-black text-sm">{title}</p>
//             <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>
//           </div>
//         </div>
//         <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors
//           ${active ? "bg-maroon/10 text-maroon" : "bg-gray-100 text-gray-400"}`}>
//           {active ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
//         </div>
//       </button>

//       {/* Expanded content */}
//       {active && children && (
//         <div className="px-5 pb-5 pt-1 border-t border-maroon/10 animate-slideDown">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// }

// // ── Main page ─────────────────────────────────────────────────────────────────
// export default function PaymentPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const orderId = searchParams.get("orderId"); // ✅ Get orderId from URL
  
//   const [activeMethod, setActiveMethod] = useState<Method>("cod");
  
//   // Order data state
//   const [order, setOrder] = useState<any>(null);
//   const [orderItems, setOrderItems] = useState<any[]>([]);
//   const [orderSummary, setOrderSummary] = useState({ subtotal: 0, shipping: 0, tax: 0 });
//   const [loadingOrder, setLoadingOrder] = useState(true);
  
//   // Card form state
//   const [cardNum,   setCardNum]   = useState("");
//   const [cardName,  setCardName]  = useState("");
//   const [expiry,    setExpiry]    = useState("");
//   const [cvv,       setCvv]       = useState("");
//   const [saveCard,  setSaveCard]  = useState(false);

//   // UPI state
//   const [upiId,     setUpiId]     = useState("");
//   const [upiApp,    setUpiApp]    = useState("");

//   // Netbanking
//   const [bank,      setBank]      = useState("");

//   // Processing
//   const [loading,   setLoading]   = useState(false);
//   const [success,   setSuccess]   = useState(false);
//   const [error,     setError]     = useState("");

//   // Fetch order data on component mount
//   useEffect(() => {
//     const fetchOrderData = async () => {
//       if (!orderId) {
//         setError("Order ID not found. Please go back and select an address.");
//         setLoadingOrder(false);
//         return;
//       }

//       try {
//         setLoadingOrder(true);
//         const response = await getOrderByIdApi(orderId);
        
//         if (response?.success && response?.order) {
//           const orderData = response.order;
//           setOrder(orderData);
          
//           // ✅ Transform order items - accessing nested data correctly
//           const items = orderData.items.map((item: any) => ({
//             name: item.product?.name || "Product",
//             size: item.size || "One Size",
//             color: item.color || "N/A",
//             qty: item.quantity,
//             price: item.price
//           }));
          
//           setOrderItems(items);
          
//           // Calculate summary
//           const subtotal = items.reduce((sum: number, item: any) => sum + (item.price * item.qty), 0);
//           const shipping = 0; // Free shipping
//           const tax = subtotal * 0.08; // 8% tax
          
//           setOrderSummary({
//             subtotal,
//             shipping,
//             tax
//           });
//         } else {
//           setError("Failed to load order details");
//         }
//       } catch (err: any) {
//         console.error("Error fetching order:", err);
//         setError(err.message || "Failed to load order details");
//       } finally {
//         setLoadingOrder(false);
//       }
//     };

//     fetchOrderData();
//   }, [orderId]);

//   const total = orderSummary.subtotal + orderSummary.shipping + orderSummary.tax;

//   const formatCard = (v: string) =>
//     v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

//   const formatExpiry = (v: string) => {
//     const d = v.replace(/\D/g, "").slice(0, 4);
//     return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
//   };

//   const toggle = (m: Method) => setActiveMethod(prev => (prev === m ? m : m));

//   const handlePay = async () => {
//     setError("");
    
//     // Validate based on payment method
//     if (activeMethod !== "cod") {
//       setError("Sorry, only Cash on Delivery (COD) is available at the moment. Please select COD to complete your purchase.");
//       return;
//     }

//     if (!orderId) {
//       setError("Order ID not found. Please go back and try again.");
//       return;
//     }

//     setLoading(true);

//     try {
//       // ✅ Call your place order API
//       const response = await placeOrderApi(orderId);
      
//       if (response?.success) {
//         setSuccess(true);
//         // Redirect to success page after 2 seconds
//         setTimeout(() => {
//           router.push(`/order-success?orderId=${orderId}`);
//         }, 2000);
//       } else {
//         setError(response?.message || "Payment failed. Please try again.");
//       }
//     } catch (err: any) {
//       console.error("Payment error:", err);
//       setError(err.message || "Payment failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Loading state
//   if (loadingOrder) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#F8F4F0] flex items-center justify-center">
//           <div className="text-center">
//             <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-maroon border-t-transparent"></div>
//             <p className="mt-4 text-gray-500">Loading order details...</p>
//           </div>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   if (success) {
//     return (
//       <>
//         <Navbar />
//         <div className="min-h-screen bg-[#F8F4F0] flex items-center justify-center p-4">
//           <div className="bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full text-center">
//             <div className="relative inline-flex mb-6">
//               <div className="w-16 h-16 rounded-2xl bg-maroon/5 border border-maroon/10 flex items-center justify-center">
//                 <Check className="w-8 h-8 text-maroon" />
//               </div>
//               <div className="absolute -inset-2 rounded-3xl bg-maroon/5 animate-ping" style={{ animationDuration: "2s" }} />
//             </div>
//             <h2 className="font-display font-bold text-black text-3xl mb-2">Order Placed!</h2>
//             <p className="text-gray-400 text-sm mb-1">Your order has been confirmed</p>
//             <p className="font-black text-maroon text-xl mb-7">₹{(total + (activeMethod === "cod" ? 2 : 0)).toFixed(2)}</p>
//             <button 
//               onClick={() => router.push("/orders")} 
//               className="w-full bg-maroon text-white font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl hover:bg-maroon/80 transition-colors"
//             >
//               View My Orders
//             </button>
//           </div>
//           <style>{`
//             @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;700;900&display=swap');
//             .font-display{font-family:'Cormorant Garamond',serif;}
//           `}</style>
//         </div>
//         <Footer />
//       </>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
//         .font-display{font-family:'Cormorant Garamond',serif;}
//         *{font-family:'DM Sans',sans-serif;}
//         @keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
//         .animate-slideDown{animation:slideDown 0.22s ease;}
//       `}</style>

//       <Navbar />

//       <div className="min-h-screen bg-[#F8F4F0] py-8 sm:py-12">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

//           {/* ── Page title + SSL badge ── */}
//           <div className="flex items-center justify-between mb-8">
//             <h1 className="font-black text-black text-2xl sm:text-3xl tracking-tight">
//               Payment Method
//             </h1>
//             <div className="flex items-center gap-1.5 bg-maroon/5 border border-maroon/20 text-maroon
//               text-[10px] font-black tracking-[0.18em] uppercase px-3 py-1.5 rounded-full">
//               <ShieldCheck className="w-3.5 h-3.5" /> Secure SSL
//             </div>
//           </div>

//           {/* Error message */}
//           {error && (
//             <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
//               {error}
//             </div>
//           )}

//           {/* ── Two-column layout ── */}
//           <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start">

//             {/* ── LEFT: payment methods ── */}
//             <div className="space-y-3">

//               {/* UPI - Disabled */}
//               <MethodBlock
//                 id="upi" active={activeMethod === "upi"} onToggle={() => toggle("upi")}
//                 icon={Smartphone} title="UPI (Google Pay, PhonePe, BHIM)"
//                 subtitle="Pay directly from your bank account"
//                 iconBg="bg-indigo-50 text-indigo-600"
//                 disabled={true}
//               >
//                 <div className="space-y-4 pt-3">
//                   <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
//                     {UPI_APPS.map(app => (
//                       <button
//                         key={app}
//                         className="py-2 px-2 text-[10px] font-bold rounded-xl border border-gray-200 text-gray-500"
//                       >
//                         {app}
//                       </button>
//                     ))}
//                   </div>
//                   <Input
//                     label="UPI ID"
//                     placeholder="yourname@upi"
//                     value={upiId}
//                     onChange={setUpiId}
//                   />
//                 </div>
//               </MethodBlock>

//               {/* Credit / Debit Card - Disabled */}
//               <MethodBlock
//                 id="card" active={activeMethod === "card"} onToggle={() => toggle("card")}
//                 icon={CreditCard} title="Credit / Debit / ATM Card"
//                 subtitle="Visa, Mastercard, RuPay & More"
//                 iconBg="bg-maroon/5 text-maroon"
//                 disabled={true}
//               >
//                 <div className="space-y-4 pt-3">
//                   <Input
//                     label="Card Number"
//                     placeholder="0000 0000 0000 0000"
//                     value={cardNum}
//                     onChange={v => setCardNum(formatCard(v))}
//                     maxLength={19}
//                     icon={<CreditCard className="w-4 h-4" />}
//                   />
//                   <Input
//                     label="Name on Card"
//                     placeholder="JOHN DOE"
//                     value={cardName}
//                     onChange={v => setCardName(v.toUpperCase())}
//                   />
//                   <div className="grid grid-cols-2 gap-4">
//                     <Input
//                       label="Expiry Date"
//                       placeholder="MM / YY"
//                       value={expiry}
//                       onChange={v => setExpiry(formatExpiry(v))}
//                       maxLength={7}
//                     />
//                     <Input
//                       label="CVV"
//                       placeholder="• • •"
//                       value={cvv}
//                       onChange={v => setCvv(v.replace(/\D/g, "").slice(0, 4))}
//                       type="password"
//                       maxLength={4}
//                       icon={<Lock className="w-3.5 h-3.5" />}
//                     />
//                   </div>
//                   <label className="flex items-center gap-2.5 cursor-pointer group">
//                     <div
//                       onClick={() => setSaveCard(!saveCard)}
//                       className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0
//                         ${saveCard ? "bg-maroon border-maroon" : "border-gray-300 group-hover:border-maroon"}`}
//                     >
//                       {saveCard && <Check className="w-3 h-3 text-white" />}
//                     </div>
//                     <span className="text-xs text-gray-500 font-medium">
//                       Save card securely for future payments
//                     </span>
//                   </label>
//                 </div>
//               </MethodBlock>

//               {/* Netbanking - Disabled */}
//               <MethodBlock
//                 id="netbanking" active={activeMethod === "netbanking"} onToggle={() => toggle("netbanking")}
//                 icon={Landmark} title="Netbanking"
//                 subtitle="Login to your bank portal"
//                 iconBg="bg-amber-50 text-amber-600"
//                 disabled={true}
//               >
//                 <div className="pt-3 space-y-3">
//                   <p className="text-[11px] font-black tracking-[0.18em] uppercase text-gray-500">
//                     Select Your Bank
//                   </p>
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
//                     {BANKS.map(b => (
//                       <button
//                         key={b}
//                         className="py-2.5 px-2 text-[11px] font-bold rounded-xl border border-gray-200 text-gray-500"
//                       >
//                         {b}
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               </MethodBlock>

//               {/* Cash on Delivery - Available */}
//               <MethodBlock
//                 id="cod" active={activeMethod === "cod"} onToggle={() => toggle("cod")}
//                 icon={Package} title="Cash on Delivery (COD)"
//                 subtitle="Pay when you receive the order"
//                 iconBg="bg-rose-50 text-rose-500"
//                 disabled={false}
//               >
//                 <div className="pt-3">
//                   <div className="bg-maroon/5 border border-maroon/20 rounded-xl p-4 text-xs text-maroon font-medium leading-relaxed">
//                     ⚠️ An additional handling fee of <strong>₹10</strong> applies for Cash on Delivery orders.
//                     Payment must be made in exact change to the delivery agent.
//                   </div>
//                 </div>
//               </MethodBlock>
//             </div>

//             {/* ── RIGHT: Order Summary ── */}
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden lg:sticky lg:top-6">
//               <div className="h-1 bg-gradient-to-r from-maroon via-maroon to-maroon" />
//               <div className="p-6">
//                 <h2 className="font-bold text-black text-lg mb-5">Order Summary</h2>

//                 {/* Items */}
//                 <div className="space-y-3 mb-5 pb-5 border-b border-gray-100">
//                   {orderItems.map((item, i) => (
//                     <div key={i} className="flex justify-between items-start gap-3">
//                       <div>
//                         <p className="text-sm font-semibold text-black leading-snug">{item.name}</p>
//                         <p className="text-[11px] text-gray-400 mt-0.5">
//                           Size: {item.size} · Color: {item.color} · Qty: {item.qty}
//                         </p>
//                       </div>
//                       <span className="text-sm font-bold text-black flex-shrink-0">₹{(item.price * item.qty).toFixed(2)}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Breakdown */}
//                 <div className="space-y-3 mb-5 pb-5 border-b border-gray-100">
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Subtotal</span>
//                     <span className="font-semibold text-black">₹{orderSummary.subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm items-center">
//                     <span className="text-gray-500">Shipping</span>
//                     {orderSummary.shipping === 0
//                       ? <span className="text-[10px] font-black tracking-wider text-maroon bg-maroon/5 border border-maroon/20 px-2 py-0.5 rounded-full">FREE</span>
//                       : <span className="font-semibold text-black">₹{orderSummary.shipping.toFixed(2)}</span>
//                     }
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="text-gray-500">Tax (8%)</span>
//                     <span className="font-semibold text-black">₹{orderSummary.tax.toFixed(2)}</span>
//                   </div>
//                   {activeMethod === "cod" && (
//                     <div className="flex justify-between text-sm">
//                       <span className="text-maroon">COD Fee</span>
//                       <span className="font-semibold text-maroon">₹2.00</span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Total */}
//                 <div className="flex justify-between items-center mb-6">
//                   <span className="font-bold text-black text-base">Total Amount</span>
//                   <span className="font-black text-maroon text-2xl">
//                     ₹{(total + (activeMethod === "cod" ? 2 : 0)).toFixed(2)}
//                   </span>
//                 </div>

//                 {/* CTA */}
//                 <button
//                   onClick={handlePay}
//                   disabled={loading}
//                   className="w-full bg-maroon hover:bg-maroon/80 disabled:bg-gray-400 text-white font-black
//                     text-sm tracking-wide py-4 rounded-xl transition-all shadow-md shadow-maroon/20
//                     hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
//                 >
//                   {loading ? (
//                     <span className="flex items-center gap-2">
//                       <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
//                       </svg>
//                       Processing…
//                     </span>
//                   ) : (
//                     <>Complete Purchase <ArrowRight className="w-4 h-4" /></>
//                   )}
//                 </button>

//                 {/* Security note */}
//                 <div className="mt-5 pt-4 border-t border-gray-100">
//                   <div className="flex items-start gap-2.5 mb-4">
//                     <ShieldCheck className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
//                     <p className="text-[11px] text-gray-400 leading-relaxed">
//                       Your data is encrypted and secure. We do not store sensitive card information.
//                     </p>
//                   </div>
//                   {/* Payment icons */}
//                   <div className="flex items-center justify-center gap-4">
//                     <CreditCard className="w-6 h-6 text-gray-300" />
//                     <Wifi      className="w-6 h-6 text-gray-300" />
//                     <Landmark  className="w-6 h-6 text-gray-300" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </>
//   );
// }


"use client";

import { useState, useEffect, Suspense } from "react";
import {
  ShieldCheck, CreditCard, Smartphone, Landmark, Package,
  ChevronDown, ChevronUp, ArrowRight, Check, Lock, Wifi, Zap,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";
import { getOrderByIdApi, placeOrderApi } from "../../api/order";

// ── UPI apps ──────────────────────────────────────────────────────────────────
const UPI_APPS = ["Google Pay", "PhonePe", "BHIM", "Paytm", "Amazon Pay"];

// ── Banks ─────────────────────────────────────────────────────────────────────
const BANKS = [
  "HDFC Bank", "ICICI Bank", "SBI", "Axis Bank",
  "Kotak Bank", "Yes Bank", "HSBC", "Citibank",
];

type Method = "upi" | "card" | "netbanking" | "cod" | "stripe";

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
        ${focused ? "border-red-700 ring-2 ring-red-700/10" : "border-gray-200 hover:border-gray-300"}`}>
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent px-4 py-3 text-sm text-black placeholder-gray-300
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
  id, active, onToggle, icon: Icon, title, subtitle, iconBg, children, disabled = false,
}: {
  id: Method; active: boolean; onToggle: () => void;
  icon: React.ElementType; title: string; subtitle: string;
  iconBg: string; children?: React.ReactNode; disabled?: boolean;
}) {
  if (disabled) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gray-50/80 rounded-2xl z-10 flex items-center justify-center cursor-not-allowed">
          <span className="text-xs font-bold text-gray-400 bg-white px-3 py-1 rounded-full shadow-sm">
            Currently Unavailable
          </span>
        </div>
        <div className="rounded-2xl border-2 border-gray-100 bg-white opacity-50">
          <div className="flex items-center justify-between px-5 py-4">
            <div className="flex items-center gap-3.5">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-black text-sm">{title}</p>
                <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden bg-white
      ${active ? "border-red-700 shadow-md" : "border-gray-100 hover:border-gray-200 shadow-sm"}`}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <div className="flex items-center gap-3.5">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-black text-sm">{title}</p>
            <p className="text-gray-400 text-xs mt-0.5">{subtitle}</p>
          </div>
        </div>
        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors
          ${active ? "bg-red-50 text-red-700" : "bg-gray-100 text-gray-400"}`}>
          {active ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {active && children && (
        <div className="px-5 pb-5 pt-1 border-t border-red-100 animate-slideDown">
          {children}
        </div>
      )}
    </div>
  );
}

// ── Loading fallback ──────────────────────────────────────────────────────────
function PaymentPageFallback() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F8F4F0] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent" />
          <p className="mt-4 text-gray-500">Loading payment details...</p>
        </div>
      </div>
      <Footer />
    </>
  );
}

// ── Inner page (uses useSearchParams — must be inside Suspense) ───────────────
function PaymentPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  const [activeMethod, setActiveMethod] = useState<Method>("stripe");

  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  const [orderSummary, setOrderSummary] = useState({ subtotal: 0, shipping: 0, tax: 0 });
  const [loadingOrder, setLoadingOrder] = useState(true);

  const [cardNum,  setCardNum]  = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry,   setExpiry]   = useState("");
  const [cvv,      setCvv]      = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [upiId,    setUpiId]    = useState("");
  const [bank,     setBank]     = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState("");

  // Fetch order data
  useEffect(() => {
    const fetchOrderData = async () => {
      if (!orderId) {
        setError("Order ID not found. Please go back and select an address.");
        setLoadingOrder(false);
        return;
      }
      try {
        setLoadingOrder(true);
        const response = await getOrderByIdApi(orderId);
        if (response?.success && response?.order) {
          const orderData = response.order;
          setOrder(orderData);
          const items = orderData.items.map((item: any) => ({
            name:  item.product?.name || "Product",
            size:  item.size  || "One Size",
            color: item.color || "N/A",
            qty:   item.quantity,
            price: item.price,
          }));
          setOrderItems(items);
          const subtotal = items.reduce(
            (sum: number, item: any) => sum + item.price * item.qty, 0
          );
          setOrderSummary({ subtotal, shipping: 0, tax: subtotal * 0.08 });
        } else {
          setError("Failed to load order details");
        }
      } catch (err: any) {
        console.error("Error fetching order:", err);
        setError(err.message || "Failed to load order details");
      } finally {
        setLoadingOrder(false);
      }
    };
    fetchOrderData();
  }, [orderId]);

  const total = orderSummary.subtotal + orderSummary.shipping + orderSummary.tax;

  const formatCard   = (v: string) =>
    v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
  };

  const handlePay = async () => {
    setError("");
    if (!orderId) {
      setError("Order ID not found. Please go back and try again.");
      return;
    }

    // Stripe
    if (activeMethod === "stripe") {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}payment/create-checkout-session`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ orderId }),
          }
        );
        const data = await res.json();
        if (data?.url) {
          window.location.href = data.url;
        } else {
          setError(data?.error || "Failed to create Stripe session. Please try again.");
        }
      } catch (err: any) {
        console.error("Stripe error:", err);
        setError(err.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
      return;
    }

    // COD
    if (activeMethod === "cod") {
      setLoading(true);
      try {
        const response = await placeOrderApi(orderId);
        if (response?.success) {
          setSuccess(true);
          setTimeout(() => {
            router.push(`/order-success?orderId=${orderId}`);
          }, 2000);
        } else {
          setError(response?.message || "Failed to place order. Please try again.");
        }
      } catch (err: any) {
        console.error("COD error:", err);
        setError(err.message || "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
      return;
    }

    setError("Please select a payment method to continue.");
  };

  // Loading state
  if (loadingOrder) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#F8F4F0] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent" />
            <p className="mt-4 text-gray-500">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // COD Success state
  if (success) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#F8F4F0] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-sm w-full text-center">
            <div className="relative inline-flex mb-6">
              <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <div className="absolute -inset-2 rounded-3xl bg-green-50 animate-ping"
                style={{ animationDuration: "2s" }} />
            </div>
            <h2 className="font-display font-bold text-black text-3xl mb-2">Order Placed!</h2>
            <p className="text-gray-400 text-sm mb-1">Your order has been confirmed</p>
            <p className="font-black text-red-700 text-xl mb-7">
              ₹{(total + 2).toFixed(2)}
            </p>
            <button
              onClick={() => router.push("/orders")}
              className="w-full bg-black hover:bg-red-700 text-white font-bold text-sm tracking-wider uppercase
                py-3.5 rounded-xl transition-colors"
            >
              View My Orders
            </button>
          </div>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;700;900&display=swap');
            .font-display{font-family:'Cormorant Garamond',serif;}
          `}</style>
        </div>
        <Footer />
      </>
    );
  }

  // Main render
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600;700;800;900&display=swap');
        .font-display{font-family:'Cormorant Garamond',serif;}
        *{font-family:'DM Sans',sans-serif;}
        @keyframes slideDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}
        .animate-slideDown{animation:slideDown 0.22s ease;}
      `}</style>

      <Navbar />

      <div className="min-h-screen bg-[#F8F4F0] py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Title + SSL badge */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-black text-black text-2xl sm:text-3xl tracking-tight">
              Payment Method
            </h1>
            <div className="flex items-center gap-1.5 bg-red-50 border border-red-200 text-red-700
              text-[10px] font-black tracking-[0.18em] uppercase px-3 py-1.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> Secure SSL
            </div>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start">

            {/* LEFT: payment methods */}
            <div className="space-y-3">

              {/* Stripe — enabled & preselected */}
              <MethodBlock
                id="stripe" active={activeMethod === "stripe"}
                onToggle={() => setActiveMethod("stripe")}
                icon={Zap}
                title="Pay Online — Card / UPI / Wallet"
                subtitle="Powered by Stripe · Visa, Mastercard, RuPay & more"
                iconBg="bg-violet-50 text-violet-600"
                disabled={false}
              >
                <div className="pt-3 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {["Visa", "Mastercard", "RuPay", "UPI", "Wallets", "NetBanking"].map(label => (
                      <div key={label}
                        className="py-2 px-2 text-[10px] font-bold rounded-xl border border-violet-100
                          text-violet-600 bg-violet-50 text-center">
                        {label}
                      </div>
                    ))}
                  </div>
                  <div className="bg-violet-50 border border-violet-100 rounded-xl p-4
                    text-xs text-violet-700 font-medium leading-relaxed flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5 text-violet-500" />
                    <span>
                      You'll be redirected to a <strong>secure Stripe checkout page</strong> to
                      complete payment. Your card details are never stored on our servers.
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black tracking-widest uppercase
                      text-violet-600 bg-violet-100 px-2.5 py-1 rounded-full">
                      ✦ Recommended
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">
                      Fastest & most secure option
                    </span>
                  </div>
                </div>
              </MethodBlock>

              {/* UPI — disabled */}
              <MethodBlock
                id="upi" active={activeMethod === "upi"}
                onToggle={() => setActiveMethod("upi")}
                icon={Smartphone}
                title="UPI (Google Pay, PhonePe, BHIM)"
                subtitle="Pay directly from your bank account"
                iconBg="bg-indigo-50 text-indigo-600"
                disabled={true}
              >
                <div className="space-y-4 pt-3">
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {UPI_APPS.map(app => (
                      <button key={app}
                        className="py-2 px-2 text-[10px] font-bold rounded-xl border border-gray-200 text-gray-500">
                        {app}
                      </button>
                    ))}
                  </div>
                  <Input label="UPI ID" placeholder="yourname@upi" value={upiId} onChange={setUpiId} />
                </div>
              </MethodBlock>

              {/* Card — disabled */}
              <MethodBlock
                id="card" active={activeMethod === "card"}
                onToggle={() => setActiveMethod("card")}
                icon={CreditCard}
                title="Credit / Debit / ATM Card"
                subtitle="Visa, Mastercard, RuPay & More"
                iconBg="bg-red-50 text-red-700"
                disabled={true}
              >
                <div className="space-y-4 pt-3">
                  <Input
                    label="Card Number" placeholder="0000 0000 0000 0000"
                    value={cardNum} onChange={v => setCardNum(formatCard(v))}
                    maxLength={19} icon={<CreditCard className="w-4 h-4" />}
                  />
                  <Input
                    label="Name on Card" placeholder="JOHN DOE"
                    value={cardName} onChange={v => setCardName(v.toUpperCase())}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date" placeholder="MM / YY"
                      value={expiry} onChange={v => setExpiry(formatExpiry(v))} maxLength={7}
                    />
                    <Input
                      label="CVV" placeholder="• • •"
                      value={cvv} onChange={v => setCvv(v.replace(/\D/g, "").slice(0, 4))}
                      type="password" maxLength={4} icon={<Lock className="w-3.5 h-3.5" />}
                    />
                  </div>
                  <label className="flex items-center gap-2.5 cursor-pointer group">
                    <div
                      onClick={() => setSaveCard(!saveCard)}
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all flex-shrink-0
                        ${saveCard ? "bg-black border-black" : "border-gray-300 group-hover:border-black"}`}
                    >
                      {saveCard && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">
                      Save card securely for future payments
                    </span>
                  </label>
                </div>
              </MethodBlock>

              {/* Netbanking — disabled */}
              <MethodBlock
                id="netbanking" active={activeMethod === "netbanking"}
                onToggle={() => setActiveMethod("netbanking")}
                icon={Landmark}
                title="Netbanking"
                subtitle="Login to your bank portal"
                iconBg="bg-amber-50 text-amber-600"
                disabled={true}
              >
                <div className="pt-3 space-y-3">
                  <p className="text-[11px] font-black tracking-[0.18em] uppercase text-gray-500">
                    Select Your Bank
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BANKS.map(b => (
                      <button key={b}
                        className="py-2.5 px-2 text-[11px] font-bold rounded-xl border border-gray-200 text-gray-500">
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </MethodBlock>

              {/* COD — enabled */}
              <MethodBlock
                id="cod" active={activeMethod === "cod"}
                onToggle={() => setActiveMethod("cod")}
                icon={Package}
                title="Cash on Delivery (COD)"
                subtitle="Pay when you receive the order"
                iconBg="bg-rose-50 text-rose-500"
                disabled={false}
              >
                <div className="pt-3">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4
                    text-xs text-red-700 font-medium leading-relaxed">
                    ⚠️ An additional handling fee of <strong>₹2</strong> applies for Cash on
                    Delivery orders. Payment must be made in exact change to the delivery agent.
                  </div>
                </div>
              </MethodBlock>
            </div>

            {/* RIGHT: Order Summary */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden lg:sticky lg:top-6">
              <div className="h-1 bg-gradient-to-r from-black via-red-700 to-black" />
              <div className="p-6">
                <h2 className="font-bold text-black text-lg mb-5">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-5 pb-5 border-b border-gray-100">
                  {orderItems.map((item, i) => (
                    <div key={i} className="flex justify-between items-start gap-3">
                      <div>
                        <p className="text-sm font-semibold text-black leading-snug">{item.name}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">
                          Size: {item.size} · Color: {item.color} · Qty: {item.qty}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-black flex-shrink-0">
                        ₹{(item.price * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Breakdown */}
                <div className="space-y-3 mb-5 pb-5 border-b border-gray-100">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-black">₹{orderSummary.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-gray-500">Shipping</span>
                    {orderSummary.shipping === 0
                      ? <span className="text-[10px] font-black tracking-wider text-green-600
                          bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">FREE</span>
                      : <span className="font-semibold text-black">₹{orderSummary.shipping.toFixed(2)}</span>
                    }
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax (8%)</span>
                    <span className="font-semibold text-black">₹{orderSummary.tax.toFixed(2)}</span>
                  </div>
                  {activeMethod === "cod" && (
                    <div className="flex justify-between text-sm">
                      <span className="text-red-600">COD Fee</span>
                      <span className="font-semibold text-red-600">₹2.00</span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="font-bold text-black text-base">Total Amount</span>
                  <span className="font-black text-red-700 text-2xl">
                    ₹{(total + (activeMethod === "cod" ? 2 : 0)).toFixed(2)}
                  </span>
                </div>

                {/* CTA */}
                <button
                  onClick={handlePay}
                  disabled={loading}
                  className="w-full bg-black hover:bg-red-700 disabled:bg-gray-400 text-white font-black
                    text-sm tracking-wide py-4 rounded-xl transition-all shadow-md
                    hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10"
                          stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      {activeMethod === "stripe" ? "Redirecting to Stripe…" : "Processing…"}
                    </span>
                  ) : (
                    <>
                      {activeMethod === "stripe"
                        ? <><Zap className="w-4 h-4" /> Pay with Stripe</>
                        : <>Complete Purchase <ArrowRight className="w-4 h-4" /></>
                      }
                    </>
                  )}
                </button>

                {activeMethod === "stripe" && (
                  <p className="text-center text-[10px] text-gray-400 mt-2 font-medium">
                    You'll be redirected to Stripe's secure checkout
                  </p>
                )}

                {/* Security note */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <div className="flex items-start gap-2.5 mb-4">
                    <ShieldCheck className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
                    <p className="text-[11px] text-gray-400 leading-relaxed">
                      Your data is encrypted and secure. We do not store sensitive card information.
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-4">
                    <CreditCard className="w-6 h-6 text-gray-300" />
                    <Wifi       className="w-6 h-6 text-gray-300" />
                    <Landmark   className="w-6 h-6 text-gray-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// ── Default export — wraps in Suspense (REQUIRED for useSearchParams) ─────────
export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentPageFallback />}>
      <PaymentPageInner />
    </Suspense>
  );
}