"use client";

import { useEffect, useState } from "react";

export interface AddInspectorForm {
  name: string;
  email: string;
  username: string;
  pin: string;
}

interface AddInspectorModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: AddInspectorForm) => void;
  submitting: boolean;
  errorMessage: string;
}

const EMPTY_FORM: AddInspectorForm = {
  name: "",
  email: "",
  username: "",
  pin: "",
};

export default function AddInspectorModal({
  open,
  onClose,
  onSubmit,
  submitting,
  errorMessage,
}: AddInspectorModalProps) {
  const [form, setForm] = useState<AddInspectorForm>(EMPTY_FORM);

  useEffect(() => {
    if (open) setForm(EMPTY_FORM);
  }, [open]);

  if (!open) return null;

  const handleChange =
    (field: keyof AddInspectorForm) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-bold text-[var(--neutral-900)]">
          Tambah Inspektur
        </h2>
        <p className="text-sm text-[var(--neutral-500)] mt-1">
          Buat akun untuk inspektur baru
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
          className="flex flex-col gap-4 mt-6"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[var(--neutral-700)]">
              Nama Inspektur
            </label>
            <input
              type="text"
              placeholder="Nama"
              value={form.name}
              onChange={handleChange("name")}
              required
              className="border border-[var(--neutral-300)] text-sm p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[var(--neutral-700)]">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange("email")}
              required
              className="border border-[var(--neutral-300)] text-sm p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[var(--neutral-700)]">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={handleChange("username")}
              required
              className="border border-[var(--neutral-300)] text-sm p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-[var(--neutral-700)]">
              PIN
            </label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={6}
              placeholder="••••••"
              value={form.pin}
              onChange={handleChange("pin")}
              required
              className="border border-[var(--neutral-300)] text-sm p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)]"
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-[var(--danger)]">{errorMessage}</p>
          )}

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--neutral-300)] text-[var(--neutral-700)] hover:bg-[var(--neutral-50)] cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitting ? "Menambahkan..." : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
