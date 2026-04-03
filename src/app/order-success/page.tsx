"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  CheckCircle, Package, Truck, Clock, MapPin, 
  Calendar, ArrowRight, Download, Share2, Home
} from "lucide-react";
import Navbar from "../../components/Common/Navbar";
import Footer from "../../components/Common/Footer";
import { getOrderByIdApi } from "../../api/order";

interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images?: string[];
  };
  quantity: number;
  size: string;
  color: string;
  price: number;
}

interface Address {
  _id: string;
  fullName: string;
  phone: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface OrderData {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  address: Address;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
}

export default function OrderSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError("No order found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await getOrderByIdApi(orderId);
        
        if (response?.success && response?.order) {
          setOrder(response.order);
        } else {
          setError("Failed to fetch order details");
        }
      } catch (err: any) {
        console.error("Error fetching order:", err);
        setError(err.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'shipped':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'delivered':
        return 'text-purple-600 bg-purple-50 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#F8F4F0] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-maroon border-t-transparent"></div>
            <p className="mt-4 text-gray-500">Loading order details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#F8F4F0] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-red-500" />
            </div>
            <h2 className="font-display font-bold text-black text-2xl mb-2">Order Not Found</h2>
            <p className="text-gray-400 text-sm mb-6">
              {error || "We couldn't find your order details."}
            </p>
            <button
              onClick={() => router.push("/")}
              className="w-full bg-maroon text-white font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl hover:bg-maroon/80 transition-colors"
            >
              Return to Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const orderItem = order.items[0];
  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days from now

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&family=DM+Sans:wght@400;500;600;700;800;900&display=swap');
        .font-display { font-family: 'Cormorant Garamond', serif; }
        * { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <Navbar />

      <div className="min-h-screen bg-[#F8F4F0] py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-4 mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-display font-bold text-black text-3xl sm:text-4xl mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-500 text-sm">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order ID Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-100">
              <div>
                <p className="text-xs text-gray-400 font-medium mb-1">ORDER NUMBER</p>
                <p className="font-mono font-bold text-black text-lg">{order._id}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-1">ORDER DATE</p>
                <p className="font-medium text-black">{formatDate(order.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-1">PAYMENT METHOD</p>
                <p className="font-medium text-black">{order.paymentMethod}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4">
              <div>
                <p className="text-xs text-gray-400 font-medium mb-1">ORDER STATUS</p>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(order.orderStatus)}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                  {order.orderStatus.toUpperCase()}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium mb-1">ESTIMATED DELIVERY</p>
                <p className="font-medium text-black flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {estimatedDelivery.toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
            <h2 className="font-bold text-black text-lg mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-maroon" />
              Order Summary
            </h2>
            
            <div className="space-y-4">
              {/* Product Details */}
              <div className="flex gap-4 pb-4 border-b border-gray-100">
                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  {orderItem.product?.images?.[0] ? (
                    <img 
                      src={orderItem.product.images[0]} 
                      alt={orderItem.product.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <Package className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-black">{orderItem.product?.name || "Product"}</h3>
                  <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-500">
                    <span>Size: {orderItem.size || "N/A"}</span>
                    <span>Color: {orderItem.color || "N/A"}</span>
                    <span>Quantity: {orderItem.quantity}</span>
                  </div>
                  <p className="font-bold text-maroon mt-2">
                    ₹{(orderItem.price * orderItem.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-black">₹{order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax (8%)</span>
                  <span className="font-medium text-black">₹{(order.totalAmount * 0.08).toFixed(2)}</span>
                </div>
                {order.paymentMethod === "COD" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">COD Fee</span>
                    <span className="font-medium text-maroon">₹2.00</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-gray-100">
                  <span className="font-bold text-black">Total Amount</span>
                  <span className="font-bold text-maroon text-xl">
                    ₹{(order.totalAmount + (order.paymentMethod === "COD" ? 2 : 0) + (order.totalAmount * 0.08)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.address && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <h2 className="font-bold text-black text-lg mb-4 flex items-center gap-2">
                <Truck className="w-5 h-5 text-maroon" />
                Shipping Address
              </h2>
              <div className="space-y-2">
                <p className="font-bold text-black">{order.address.fullName}</p>
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {order.address.street}{order.address.apt && `, ${order.address.apt}`}
                </p>
                <p className="text-gray-500 text-sm">
                  {order.address.city}, {order.address.state} {order.address.zip}
                </p>
                <p className="text-gray-500 text-sm">{order.address.country}</p>
                <p className="text-gray-500 text-sm">Phone: {order.address.phone}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => router.push("/orders")}
              className="flex-1 bg-maroon text-white font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl hover:bg-maroon/80 transition-colors flex items-center justify-center gap-2"
            >
              View My Orders
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => router.push("/")}
              className="flex-1 border-2 border-maroon text-maroon font-bold text-sm tracking-wider uppercase py-3.5 rounded-xl hover:bg-maroon/5 transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              Continue Shopping
            </button>
          </div>

          {/* Order Tracking Info */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-400">
              A confirmation email has been sent to your registered email address.
              You can track your order status in the "My Orders" section.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}