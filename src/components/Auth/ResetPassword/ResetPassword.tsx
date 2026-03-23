"use client";

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Lock, KeyRound, ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import { resetPasswordApi , forgotPasswordApi  } from "../../../api/auth";

interface ResetPasswordPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
  email: string;
}

type Step = "reset" | "success";

export default function ResetPasswordPopup({ 
  isOpen, 
  onClose, 
  onSwitchToLogin,
  email 
}: ResetPasswordPopupProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentStep, setCurrentStep] = useState<Step>("reset");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent pasting multiple digits
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.some((digit) => !digit)) {
      setError("Please enter the complete OTP");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError("");
      setIsLoading(true);

      const otpCode = otp.join(""); // convert array to string

      const res = await resetPasswordApi({
        email,
        otp: otpCode,
        password: newPassword,
      });

      if (res.success) {
        toast.success("Password reset successfully!");
        setCurrentStep("success");
      }

    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Reset password failed";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email not found");
      return;
    }

    try {
      setIsLoading(true);

      const res = await forgotPasswordApi(email);

      if (res.success) {
        toast.success("New OTP sent to your email!");
      }

    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Failed to resend OTP";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmPassword("");
    setCurrentStep("reset");
    setError("");
    onClose();
  };

  const renderResetStep = () => (
    <>
      {/* Icon - changed to red */}
      <div className="flex justify-center mb-5">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center">
          <KeyRound className="text-red-600" size={28} />
        </div>
      </div>

      <div className="text-center mb-7">
        <Dialog.Title as="h3" className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-1.5">
          Reset Password
        </Dialog.Title>
        <p className="text-gray-600 text-sm">Enter the 6-digit code sent to {email}</p>
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm text-center">{error}</p>
        </div>
      )}

      <form onSubmit={handleResetPassword} className="space-y-6">
        <div>
          <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3 text-center">
            Verification Code
          </label>
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                disabled={isLoading}
                className="w-12 h-12 text-center text-lg font-semibold bg-gray-50 border border-gray-300 rounded-xl text-black focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition"
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-black placeholder-gray-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 outline-none transition text-sm"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-300 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 text-sm"
        >
          {isLoading ? <><Loader2 className="animate-spin" size={17} /> Resetting password...</> : "Reset Password"}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        <button 
          onClick={handleResendOtp}
          disabled={isLoading}
          className="text-red-600 hover:text-red-700 text-sm font-medium w-full disabled:text-red-300"
        >
          Resend OTP
        </button>
      </div>
    </>
  );

  const renderSuccessStep = () => (
    <div className="text-center">
      <div className="flex justify-center mb-5">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-200 flex items-center justify-center">
            <CheckCircle className="text-green-600" size={28} />
          </div>
          <div className="absolute -inset-2 rounded-3xl bg-green-500/10 animate-ping" style={{ animationDuration: "2s" }} />
        </div>
      </div>

      <Dialog.Title as="h3" className="text-2xl sm:text-3xl font-black text-black tracking-tight mb-2">
        Password Reset!
      </Dialog.Title>
      <p className="text-gray-600 text-sm mb-6">
        Your password has been successfully reset
      </p>

      <button 
        onClick={onSwitchToLogin}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
      >
        <ArrowLeft size={15} /> Sign In with New Password
      </button>
    </div>
  );

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95 translate-y-4" enterTo="opacity-100 scale-100 translate-y-0" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl bg-white">
                {/* Top bar - changed to red gradient */}
                <div className="h-1 w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600" />

                <div className="bg-white px-8 pt-8 pb-10">
                  <button 
                    onClick={handleClose} 
                    disabled={isLoading} 
                    className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-600 transition-all"
                  >
                    <X size={16} />
                  </button>

                  {/* Logo - changed to black */}
                  <div className="flex justify-center mb-7">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1, 0.6, 0.3].map((op, i) => (
                          <div key={i} className="w-2.5 h-2.5 rounded-full bg-black" style={{ opacity: op }} />
                        ))}
                      </div>
                      <span className="text-black font-black tracking-[0.2em] text-lg">LUXE</span>
                    </div>
                  </div>

                  {currentStep === "reset" && renderResetStep()}
                  {currentStep === "success" && renderSuccessStep()}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}