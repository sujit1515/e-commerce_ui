"use client";

import { useState } from "react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

type AuthView = "login" | "signup" | "forgot-password" | null;

interface AuthManagerProps {
  initialView?: AuthView;
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthManager({ initialView = "login", isOpen, onClose }: AuthManagerProps) {
  const [currentView, setCurrentView] = useState<AuthView>(initialView);

  const handleClose = () => {
    onClose();
    setTimeout(() => setCurrentView(initialView), 300);
  };

  return (
    <>
      <Login
        isOpen={isOpen && currentView === "login"}
        onClose={handleClose}
        onSwitchToSignup={() => setCurrentView("signup")}
        onSwitchToForgotPassword={() => setCurrentView("forgot-password")}
      />
      <SignUp
        isOpen={isOpen && currentView === "signup"}
        onClose={handleClose}
        onSwitchToLogin={() => setCurrentView("login")}
      />
      <ForgotPassword
        isOpen={isOpen && currentView === "forgot-password"}
        onClose={handleClose}
        onSwitchToLogin={() => setCurrentView("login")}
      />
    </>
  );
}