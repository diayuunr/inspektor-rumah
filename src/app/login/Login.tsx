"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage("");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            clientType: "web",
            login,
            secret: password,
          }),
        }
      );

      const data = await res.json();

      console.log("STATUS:", res.status);
      console.log("DATA:", data);

      if (res.ok) {
        router.push("/dashboard");
        return;
      }

      if (data.message === "Incorrect password") {
        setErrorMessage("Password salah. Coba lagi.");
      } else {
        setErrorMessage(data.message || "Login gagal.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Terjadi kesalahan saat login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md border border-gray-300/60 rounded-xl shadow-sm py-8 px-6">
        <h1 className="text-3xl font-bold text-center">
          Selamat Datang Kembali
        </h1>

        <p className="text-sm text-gray-500 text-center mt-2">
          Masuk untuk melakukan inspeksi.
        </p>

        <form onSubmit={onSubmit} className="flex flex-col gap-2 mt-8">
          <label className="text-sm font-semibold">
            Email <span className="text-red-500">*</span>
          </label>

          <input
            type="login"
            placeholder="fatimah@badr.co.id"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="border border-gray-300/80 text-sm p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
            required
          />

          <label className="text-sm font-semibold">
            Kata Sandi <span className="text-red-500">*</span>
          </label>

          <input
            type="password"
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300/80 text-sm p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {errorMessage && (
            <p className="text-sm text-red-500 mt-2">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 bg-[var(--primary-800)] cursor-pointer text-white py-2 rounded-lg hover:bg-[var(--primary-600)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Masuk..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}