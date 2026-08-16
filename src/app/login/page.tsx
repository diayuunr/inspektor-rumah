"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Login from "./Login";
import { getCurrentUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();

      if (user) {
        router.replace("/dashboard");
      }
    };

    checkAuth();
  }, [router]);

  return <Login />;
}