"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Mail, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface ForgotPasswordPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export default function ForgotPasswordPopup({ isOpen, onClose, onSwitchToLogin }: ForgotPasswordPopupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError("Email is required"); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address"); return; }
    setError("");
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Reset link sent!");
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setEmail("");
    setError("");
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white">
                <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" />

                <div className="bg-white px-8 pt-8 pb-10">
                  <button onClick={handleClose} disabled={isLoading} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-all">
                    <X size={16} />
                  </button>

                  {/* Logo */}
                  <div className="flex justify-center mb-7">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 0.6, 0.3].map((op, i) => (
                          <div key={i} className="w-2.5 h-2.5 rounded-full bg-gray-900" style={{ opacity: op }} />
                        ))}
                      </div>
                      <span className="text-gray-900 font-black tracking-[0.2em] text-lg">LUXE</span>
                    </div>
                  </div>

                  {!isSubmitted ? (
                    <>
                      {/* Icon */}
                      <div className="flex justify-center mb-5">
                        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                          <Mail className="text-blue-600" size={28} />
                        </div>
                      </div>

                      <div className="text-center mb-7">
                        <Dialog.Title as="h3" className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-1.5">
                          Forgot Password?
                        </Dialog.Title>
                        <p className="text-gray-500 text-sm">No worries — we'll send you reset instructions</p>
                      </div>

                      {error && (
                        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
                          <p className="text-red-600 text-sm text-center">{error}</p>
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                              type="email" value={email} onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                              placeholder="you@example.com" disabled={isLoading}
                              className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${error ? "border-red-500" : "border-gray-200"} rounded-xl text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition text-sm`}
                            />
                          </div>
                        </div>

                        <button type="submit" disabled={isLoading}
                          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 text-sm"
                        >
                          {isLoading ? <><Loader2 className="animate-spin" size={17} /> Sending link...</> : "Send Reset Link"}
                        </button>
                      </form>

                      <button onClick={onSwitchToLogin} disabled={isLoading}
                        className="flex items-center justify-center gap-2 text-gray-500 hover:text-gray-900 transition mt-6 text-sm w-full font-medium"
                      >
                        <ArrowLeft size={15} /> Back to Sign In
                      </button>
                    </>
                  ) : (
                    /* Success state */
                    <div className="text-center">
                      <div className="flex justify-center mb-5">
                        <div className="relative">
                          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                            <CheckCircle className="text-emerald-600" size={28} />
                          </div>
                          <div className="absolute -inset-2 rounded-3xl bg-emerald-500/10 animate-ping" style={{ animationDuration: "2s" }} />
                        </div>
                      </div>

                      <Dialog.Title as="h3" className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-2">
                        Check Your Inbox
                      </Dialog.Title>
                      <p className="text-gray-500 text-sm mb-3">We've sent a reset link to</p>
                      <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 mb-6">
                        <Mail size={14} className="text-blue-600 flex-shrink-0" />
                        <span className="text-blue-700 font-semibold text-sm break-all">{email}</span>
                      </div>

                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-7 text-left space-y-2">
                        {["Check your spam / junk folder", "The link expires in 15 minutes", "Request a new link if needed"].map((tip, i) => (
                          <div key={i} className="flex items-center gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                            <p className="text-gray-600 text-xs">{tip}</p>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-3">
                        <button onClick={onSwitchToLogin}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
                        >
                          <ArrowLeft size={15} /> Back to Sign In
                        </button>
                        <button onClick={() => { setIsSubmitted(false); setError(""); }}
                          className="w-full text-gray-500 hover:text-gray-900 text-sm transition font-medium py-2"
                        >
                          Try a different email
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}