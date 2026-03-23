"use client";

import { useState } from "react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import ResetPassword from "../ResetPassword/ResetPassword";

type AuthView = "login" | "signup" | "forgot-password" | "reset-password" | null;

interface AuthManagerProps {
  initialView?: AuthView;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Add this prop
}

export default function AuthManager({ 
  initialView = "login", 
  isOpen, 
  onClose,
  onSuccess // Add this
}: AuthManagerProps) {
  const [currentView, setCurrentView] = useState<AuthView>(initialView);
  const [resetEmail, setResetEmail] = useState("");

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setCurrentView(initialView);
      setResetEmail("");
    }, 300);
  };

  const handleOtpSent = (email: string) => {
    setResetEmail(email);
    setCurrentView("reset-password");
  };

  const handleBackToForgotPassword = () => {
    setCurrentView("forgot-password");
    setResetEmail("");
  };

  // Handle successful login/signup
  const handleAuthSuccess = () => {
    onSuccess?.(); // Call the parent's onSuccess callback
    handleClose(); // Close the modal
  };

  return (
    <>
      <Login
        isOpen={isOpen && currentView === "login"}
        onClose={handleClose}
        onSwitchToSignup={() => setCurrentView("signup")}
        onSwitchToForgotPassword={() => setCurrentView("forgot-password")}
        onSuccess={handleAuthSuccess} // Pass onSuccess to Login
      />
      
      <SignUp
        isOpen={isOpen && currentView === "signup"}
        onClose={handleClose}
        onSwitchToLogin={() => setCurrentView("login")}
        onSuccess={handleAuthSuccess} // Pass onSuccess to SignUp
      />
      
      <ForgotPassword
        isOpen={isOpen && currentView === "forgot-password"}
        onClose={handleClose}
        onSwitchToLogin={() => setCurrentView("login")}
        onOtpSent={handleOtpSent}
      />
      
      <ResetPassword
        isOpen={isOpen && currentView === "reset-password"}
        onClose={handleClose}
        onSwitchToLogin={() => setCurrentView("login")}
        email={resetEmail}
      />
    </>
  );
}