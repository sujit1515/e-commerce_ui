"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import { signupApi } from "@/api/auth";

interface SignUpProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onSuccess?: () => void;
}

export default function SignUp({ 
  isOpen, 
  onClose, 
  onSwitchToLogin,
  onSuccess
}: SignUpProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ 
    fullName: "", 
    email: "", 
    password: "", 
    confirmPassword: "", 
    agreeToTerms: false 
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const passwordStrength = (pw: string) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };
  
  const strength = passwordStrength(formData.password);
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "bg-maroon", "bg-maroon-light", "bg-maroon", "bg-maroon-dark"][strength];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    if (errors[name]) setErrors((p) => { const n = { ...p }; delete n[name]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = "Full name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email";
    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 6) e.password = "Minimum 6 characters";
    if (formData.password !== formData.confirmPassword) e.confirmPassword = "Passwords don't match";
    if (!formData.agreeToTerms) e.agreeToTerms = "You must accept the terms";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      const { token, user, success, message } = await signupApi({
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      if (success && token && user) {
        localStorage.setItem("token", token);
        toast.success("Account created successfully!");
        
        onSuccess?.();
      } else {
        toast.error(message || "Signup failed");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        :root {
          --maroon: #800000;
          --maroon-dark: #5C0000;
          --maroon-light: #9D2A2A;
          --maroon-soft: #F5E6E6;
        }
        
        .bg-maroon {
          background-color: var(--maroon);
        }
        
        .bg-maroon-dark {
          background-color: var(--maroon-dark);
        }
        
        .bg-maroon-light {
          background-color: var(--maroon-light);
        }
        
        .text-maroon {
          color: var(--maroon);
        }
        
        .border-maroon {
          border-color: var(--maroon);
        }
        
        .hover\\:bg-maroon-dark:hover {
          background-color: var(--maroon-dark);
        }
        
        .focus\\:ring-maroon\\/20:focus {
          --tw-ring-color: rgba(128, 0, 0, 0.2);
        }
      `}</style>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={onClose}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white">
                  {/* Top bar - maroon gradient */}
                  <div className="h-1 w-full bg-gradient-to-r from-maroon via-maroon-light to-maroon" />

                  <div className="bg-white px-8 pt-8 pb-10">
                    <button 
                      onClick={onClose} 
                      disabled={isLoading} 
                      className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-maroon/5 text-gray-500 hover:text-maroon transition-all"
                    >
                      <X size={16} />
                    </button>

                    <div className="text-center mb-7">
                      <Dialog.Title as="h3" className="text-2xl sm:text-3xl font-black text-maroon tracking-tight mb-1.5">
                        Create Account
                      </Dialog.Title>
                      <p className="text-black text-sm">Join us and elevate your everyday</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-2">Full Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input 
                            type="text" name="fullName" value={formData.fullName} onChange={handleChange} 
                            placeholder="Alexandra Chen" disabled={isLoading}
                            className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.fullName ? "border-maroon" : "border-gray-200"} rounded-xl text-black placeholder-gray-400 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none transition text-sm`}
                          />
                        </div>
                        {errors.fullName && <p className="mt-1.5 text-maroon text-xs">{errors.fullName}</p>}
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input 
                            type="email" name="email" value={formData.email} onChange={handleChange} 
                            placeholder="you@example.com" disabled={isLoading}
                            className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${errors.email ? "border-maroon" : "border-gray-200"} rounded-xl text-black placeholder-gray-400 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none transition text-sm`}
                          />
                        </div>
                        {errors.email && <p className="mt-1.5 text-maroon text-xs">{errors.email}</p>}
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-2">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input 
                            type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} 
                            placeholder="Create a strong password" disabled={isLoading}
                            className={`w-full pl-10 pr-11 py-3 bg-gray-50 border ${errors.password ? "border-maroon" : "border-gray-200"} rounded-xl text-black placeholder-gray-400 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none transition text-sm`}
                          />
                          <button 
                            type="button" onClick={() => setShowPassword(!showPassword)} 
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-maroon transition"
                          >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                        {formData.password && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className="flex gap-1 flex-1">
                              {[1, 2, 3, 4].map((n) => (
                                <div key={n} className={`h-1 flex-1 rounded-full transition-all ${strength >= n ? strengthColor : "bg-gray-200"}`} />
                              ))}
                            </div>
                            <span className={`text-xs font-medium ${
                              strength === 1 ? "text-maroon" : 
                              strength === 2 ? "text-maroon-light" : 
                              strength === 3 ? "text-maroon" : 
                              strength === 4 ? "text-maroon-dark" : "text-gray-400"
                            }`}>{strengthLabel}</span>
                          </div>
                        )}
                        {errors.password && <p className="mt-1.5 text-maroon text-xs">{errors.password}</p>}
                      </div>

                      {/* Confirm Password */}
                      <div>
                        <label className="block text-xs font-semibold text-black uppercase tracking-wider mb-2">Confirm Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                          <input 
                            type={showConfirm ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} 
                            placeholder="Repeat your password" disabled={isLoading}
                            className={`w-full pl-10 pr-11 py-3 bg-gray-50 border ${
                              errors.confirmPassword ? "border-maroon" : 
                              formData.confirmPassword && formData.password === formData.confirmPassword ? "border-maroon" : 
                              "border-gray-200"
                            } rounded-xl text-black placeholder-gray-400 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none transition text-sm`}
                          />
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                            {formData.confirmPassword && formData.password === formData.confirmPassword && (
                              <Check size={14} className="text-maroon" />
                            )}
                            <button 
                              type="button" onClick={() => setShowConfirm(!showConfirm)} 
                              className="text-gray-400 hover:text-maroon transition"
                            >
                              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                        {errors.confirmPassword && <p className="mt-1.5 text-maroon text-xs">{errors.confirmPassword}</p>}
                      </div>

                      {/* Terms */}
                      <div>
                        <label className="flex items-start gap-2.5 cursor-pointer group">
                          <div className="relative mt-0.5 flex-shrink-0" onClick={() => setFormData({ ...formData, agreeToTerms: !formData.agreeToTerms })}>
                            <div className={`w-4 h-4 rounded border transition-all ${formData.agreeToTerms ? "bg-maroon border-maroon" : "border-gray-300 bg-white"} flex items-center justify-center`}>
                              {formData.agreeToTerms && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 12 10"><path d="M1 5l3 4L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                            </div>
                          </div>
                          <span className="text-sm text-gray-600 leading-snug">
                            I agree to the{" "}
                            <a href="/terms" className="text-maroon hover:text-maroon-dark transition underline underline-offset-2">Terms of Service</a>
                            {" "}and{" "}
                            <a href="/privacy" className="text-maroon hover:text-maroon-dark transition underline underline-offset-2">Privacy Policy</a>
                          </span>
                        </label>
                        {errors.agreeToTerms && <p className="mt-1.5 text-maroon text-xs">{errors.agreeToTerms}</p>}
                      </div>

                      <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full mt-1 bg-maroon hover:bg-maroon-dark disabled:bg-maroon/50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-maroon/30 flex items-center justify-center gap-2 text-sm"
                      >
                        {isLoading ? <><Loader2 className="animate-spin" size={17} /> Creating account...</> : "Create Account"}
                      </button>
                    </form>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-3 bg-white text-gray-400 text-xs">Or sign up with</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Google", icon: <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg> },
                        { label: "Facebook", icon: <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
                      ].map(({ label, icon }) => (
                        <button 
                          key={label} 
                          disabled={isLoading} 
                          className="flex items-center justify-center gap-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 hover:text-maroon py-2.5 rounded-xl transition-all text-sm font-medium"
                        >
                          {icon} {label}
                        </button>
                      ))}
                    </div>

                    <p className="text-center text-gray-600 text-sm mt-6">
                      Already have an account?{" "}
                      <button 
                        onClick={onSwitchToLogin} 
                        disabled={isLoading} 
                        className="text-maroon hover:text-maroon-dark font-semibold transition"
                      >
                        Sign in
                      </button>
                    </p>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}