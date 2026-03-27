"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Mail, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { forgotPasswordApi } from "../../../api/auth";

interface ForgotPasswordPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  onOtpSent: (email: string) => void;
}

export default function ForgotPasswordPopup({ 
  isOpen, 
  onClose, 
  onSwitchToLogin,
  onOtpSent 
}: ForgotPasswordPopupProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  //Handle Send OTP 
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setError("");
      setIsLoading(true);

      const res = await forgotPasswordApi(email);

      if (res.success) {
        toast.success(res.message || "OTP sent to your email!");
        onOtpSent(email);
      }

    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to send OTP";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setError("");
    onClose();
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
        <Dialog as="div" className="relative z-50" onClose={handleClose}>
          <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white">
                  {/* Maroon gradient bar at top */}
                  <div className="h-1 w-full bg-gradient-to-r from-maroon via-maroon-light to-maroon" />

                  <div className="bg-white px-8 pt-8 pb-10">
                    <button 
                      onClick={handleClose} 
                      disabled={isLoading} 
                      className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-maroon/5 hover:bg-maroon/10 text-maroon/40 hover:text-maroon transition-all"
                    >
                      <X size={16} />
                    </button>

                    {/* Icon with maroon */}
                    <div className="flex justify-center mb-5">
                      <div className="w-16 h-16 rounded-2xl bg-maroon/5 border border-maroon/20 flex items-center justify-center">
                        <Mail className="text-maroon" size={28} />
                      </div>
                    </div>

                    <div className="text-center mb-7">
                      <Dialog.Title as="h3" className="text-2xl sm:text-3xl font-black text-maroon tracking-tight mb-1.5">
                        Forgot Password?
                      </Dialog.Title>
                      <p className="text-maroon/60 text-sm">Enter your email to receive OTP</p>
                    </div>

                    {error && (
                      <div className="mb-5 px-4 py-3 bg-maroon/5 border border-maroon/20 rounded-xl">
                        <p className="text-maroon text-sm text-center">{error}</p>
                      </div>
                    )}

                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <div>
                        <label className="block text-xs font-semibold text-maroon/70 uppercase tracking-wider mb-2">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-maroon/40" size={16} />
                          <input
                            type="email" 
                            value={email} 
                            onChange={(e) => { 
                              setEmail(e.target.value); 
                              if (error) setError(""); 
                            }}
                            placeholder="you@example.com" 
                            disabled={isLoading}
                            className={`w-full pl-10 pr-4 py-3 bg-maroon/5 border ${error ? "border-maroon" : "border-maroon/20"} rounded-xl text-maroon placeholder-maroon/30 focus:border-maroon focus:ring-2 focus:ring-maroon/20 outline-none transition text-sm`}
                          />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-maroon hover:bg-maroon-dark disabled:bg-maroon/50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-maroon/30 flex items-center justify-center gap-2 text-sm"
                      >
                        {isLoading ? <><Loader2 className="animate-spin" size={17} /> Sending OTP...</> : "Send OTP"}
                      </button>
                    </form>

                    <button 
                      onClick={onSwitchToLogin} 
                      disabled={isLoading}
                      className="flex items-center justify-center gap-2 text-maroon/60 hover:text-maroon transition mt-6 text-sm w-full font-medium"
                    >
                      <ArrowLeft size={15} /> Back to Sign In
                    </button>
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