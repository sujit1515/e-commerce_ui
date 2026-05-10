"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthManager from "@/components/Auth/AuthManager/AuthManager";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleSuccess = () => {
    router.push("/");
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <AuthManager
        isOpen={true}
        onClose={handleClose}
        initialView="login"
        onSuccess={handleSuccess}
      />
    </div>
  );
}