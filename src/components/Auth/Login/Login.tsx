"use client";

import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Mail, Lock, Eye, EyeOff, Loader2, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";
// Remove useRouter import
// import { useRouter } from "next/navigation";
import { loginApi } from "@/api/auth";

interface LoginProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
  onSwitchToForgotPassword: () => void;
  onSuccess?: () => void; // Add this prop
}

export default function Login({
  isOpen,
  onClose,
  onSwitchToSignup,
  onSwitchToForgotPassword,
  onSuccess, // Add this
}: LoginProps) {
  // Remove router
  // const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    if (errors[name as keyof typeof errors]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Minimum 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validateForm()) return;

    try {
      setIsLoading(true);

      const response = await loginApi({
  email: formData.email,
  password: formData.password,
});

if (response.success) {
  const token = response.token;
  const user = response.user;

  localStorage.setItem("token", token || "");
  localStorage.setItem("user", JSON.stringify(user));

  console.log("Login Token:", token);
  console.log("Stored Token:", localStorage.getItem("token"));

  // success popup
  setSuccessMessage(`Welcome back, ${user?.name || formData.email.split("@")[0]}!`);
  setShowSuccessPopup(true);

  onClose();
  onSuccess?.();

  toast.success("Login successful 🎉");
} else {
  toast.error(response.message || "Login failed");
  setErrors({ general: response.message });
}
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-hide success popup after 3 seconds
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  // Rest of your JSX remains exactly the same, with the addition of success popup
  return (
    <>
      {/* Success Popup */}
      <Transition appear show={showSuccessPopup} as={Fragment}>
        <Dialog as="div" className="relative z-[60]" onClose={() => setShowSuccessPopup(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 translate-y-4"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm rounded-2xl bg-white shadow-2xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col items-center text-center">
                      {/* Success Icon */}
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      
                      {/* Success Message */}
                      <Dialog.Title className="text-xl font-bold text-gray-900 mb-2">
                        Login Successful!
                      </Dialog.Title>
                      <p className="text-gray-600 mb-4">
                        {successMessage}
                      </p>
                      <p className="text-sm text-gray-500">
                        You have been successfully logged in.
                      </p>
                      
                      {/* Progress bar for auto-close */}
                      <div className="w-full h-1 bg-gray-100 rounded-full mt-6 overflow-hidden">
                        <div 
                          className="h-full bg-green-600 rounded-full animate-shrink-width"
                          style={{ 
                            animation: 'shrinkWidth 3s linear forwards',
                            transformOrigin: 'left'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white">
                  {/* Decorative top bar - changed to red gradient */}
                  <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600" />

                  <div className="bg-white px-8 pt-8 pb-10">
                    {/* Close */}
                    <button 
                      onClick={onClose} 
                      disabled={isLoading} 
                      className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 transition-all"
                    >
                      <X size={16} />
                    </button>

                    {/* Logo mark - changed to black */}
                    {/* <div className="flex justify-center mb-7">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 0.6, 0.3].map((op, i) => (
                            <div key={i} className="w-2.5 h-2.5 rounded-full bg-black" style={{ opacity: op }} />
                          ))}
                        </div>
                        <span className="text-black font-black tracking-[0.2em] text-lg">LUXE</span>
                      </div>
                    </div> */}

                    {/* Heading */}
                    <div className="text-center mb-7">
                      <Dialog.Title as="h3" className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-1.5">
                        Welcome Back
                      </Dialog.Title>
                      <p className="text-gray-600 text-sm">Sign in to your account to continue</p>
                    </div>

                    {/* General error */}
                    {errors.general && (
                      <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-sm text-center">{errors.general}</p>
                      </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type="email" name="email" value={formData.email} onChange={handleChange}
                            placeholder="you@example.com" disabled={isLoading}
                            className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded-xl text-black placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition text-sm`}
                          />
                        </div>
                        {errors.email && <p className="mt-1.5 text-red-500 text-xs">{errors.email}</p>}
                      </div>

                      {/* Password */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Password</label>
                          <button 
                            type="button" 
                            onClick={onSwitchToForgotPassword} 
                            disabled={isLoading} 
                            className="text-xs text-red-600 hover:text-red-700 transition font-medium"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input
                            type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                            placeholder="Enter your password" disabled={isLoading}
                            className={`w-full pl-10 pr-11 py-3 bg-gray-50 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded-xl text-black placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition text-sm`}
                          />
                          <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)} 
                            disabled={isLoading} 
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {errors.password && <p className="mt-1.5 text-red-500 text-xs">{errors.password}</p>}
                      </div>

                      {/* Remember me */}
                      <label className="flex items-center gap-2.5 cursor-pointer group">
                        <div className="relative">
                          <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} disabled={isLoading} className="sr-only" />
                          <div className={`w-4 h-4 rounded border transition-all ${formData.rememberMe ? "bg-red-600 border-red-600" : "border-gray-300 bg-white"} flex items-center justify-center`}>
                            {formData.rememberMe && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 10"><path d="M1 5l3 4L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                          </div>
                        </div>
                        <span className="text-sm text-gray-600 group-hover:text-black transition">Remember me for 30 days</span>
                      </label>

                      {/* Submit */}
                      <button
                        type="submit" disabled={isLoading}
                        className="w-full mt-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 text-sm"
                      >
                        {isLoading ? <><Loader2 className="animate-spin" size={17} /> Signing in...</> : "Sign In"}
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-3 bg-white text-gray-500 text-xs">Or continue with</span>
                      </div>
                    </div>

                    {/* Social */}
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Google", icon: <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
                        { label: "Facebook", icon: <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                      ].map(({ label, icon }) => (
                        <button 
                          key={label} 
                          disabled={isLoading} 
                          className="flex items-center justify-center gap-2.5 bg-gray-50 hover:bg-red-50 border border-gray-200 text-gray-700 hover:text-red-600 py-2.5 rounded-xl transition-all text-sm font-medium"
                        >
                          {icon} {label}
                        </button>
                      ))}
                    </div>

                    <p className="text-center text-gray-600 text-sm mt-6">
                      Don't have an account?{" "}
                      <button 
                        onClick={onSwitchToSignup} 
                        disabled={isLoading} 
                        className="text-red-600 hover:text-red-700 font-semibold transition"
                      >
                        Create account
                      </button>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Add the animation CSS */}
      <style jsx>{`
        @keyframes shrinkWidth {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .animate-shrink-width {
          animation: shrinkWidth 3s linear forwards;
        }
      `}</style>
    </>
  );
}