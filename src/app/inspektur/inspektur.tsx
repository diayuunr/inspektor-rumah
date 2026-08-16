"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  SearchIcon,
  XCircleIcon,
} from "@/components/icons";
import type { Inspector, SortOrder } from "@/types/inspector";
import AddInspectorModal, { AddInspectorForm } from "./AddInspectorModal";
import DeleteInspectorModal from "./DeleteInspectorModal";

// Sesuaikan path endpoint di bawah ini (`/inspectors`) dengan route backend kamu.
const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;
const PAGE_SIZE = 10;

export default function Inspektur() {
  const [inspectors, setInspectors] = useState<Inspector[]>([]);
  const [headerSearch, setHeaderSearch] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("az");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addSubmitting, setAddSubmitting] = useState(false);
  const [addErrorMessage, setAddErrorMessage] = useState("");

  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Ambil daftar inspektur dari backend.
  useEffect(() => {
    const fetchInspectors = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const res = await fetch(`${API_BASE}/inspectors`, {
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok) {
          setInspectors(data.data ?? data ?? []);
        } else {
          setErrorMessage(data.message || "Gagal memuat data inspektur.");
        }
      } catch (err) {
        console.error(err);
        setErrorMessage("Terjadi kesalahan saat memuat data inspektur.");
      } finally {
        setLoading(false);
      }
    };

    fetchInspectors();
  }, []);

  // Reset ke halaman pertama setiap kali pencarian/urutan berubah.
  useEffect(() => {
    setCurrentPage(1);
  }, [tableSearch, sortOrder]);

  const visibleInspectors = useMemo(() => {
    const query = tableSearch.trim().toLowerCase();

    const filtered = query
      ? inspectors.filter((inspector) =>
          inspector.name.toLowerCase().includes(query)
        )
      : inspectors;

    return [...filtered].sort((a, b) =>
      sortOrder === "az"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }, [inspectors, tableSearch, sortOrder]);

  const totalPages = Math.max(
    1,
    Math.ceil(visibleInspectors.length / PAGE_SIZE)
  );

  const paginatedInspectors = visibleInspectors.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleAddInspector = async (form: AddInspectorForm) => {
    try {
      setAddSubmitting(true);
      setAddErrorMessage("");

      const res = await fetch(`${API_BASE}/inspectors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        const newInspector: Inspector = data.data ?? data;
        setInspectors((prev) => [...prev, newInspector]);
        setIsAddModalOpen(false);
      } else {
        setAddErrorMessage(data.message || "Gagal menambahkan inspektur.");
      }
    } catch (err) {
      console.error(err);
      setAddErrorMessage("Terjadi kesalahan saat menambahkan inspektur.");
    } finally {
      setAddSubmitting(false);
    }
  };

  const handleDeleteInspector = async () => {
    if (!deleteTargetId) return;

    try {
      setDeleting(true);

      const res = await fetch(`${API_BASE}/inspectors/${deleteTargetId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setInspectors((prev) =>
          prev.filter((inspector) => inspector.id !== deleteTargetId)
        );
        setDeleteTargetId(null);
      } else {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.message || "Gagal menghapus inspektur.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Terjadi kesalahan saat menghapus inspektur.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[var(--neutral-50)]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header
          title="Inspektur"
          searchValue={headerSearch}
          onSearchChange={setHeaderSearch}
        />

        <main className="flex-1 p-8">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] cursor-pointer"
          >
            <PlusIcon />
            Inspektur
          </button>

          <div className="mt-6 bg-[var(--card)] border border-[var(--neutral-200)] rounded-xl p-6">
            <h2 className="text-base font-bold text-[var(--neutral-900)]">
              Daftar Inspektur
            </h2>

            <div className="flex items-center gap-3 mt-4">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Cari nama inspektur"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  className="pl-9 pr-3 py-2 w-full text-sm rounded-lg border border-[var(--neutral-300)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)]"
                />
              </div>

              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                  className="appearance-none pl-3 pr-8 py-2 text-sm rounded-lg border border-[var(--neutral-300)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)] cursor-pointer"
                >
                  <option value="az">Nama (A-Z)</option>
                  <option value="za">Nama (Z-A)</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>

            {errorMessage && (
              <p className="text-sm text-[var(--danger)] mt-4">
                {errorMessage}
              </p>
            )}

            <div className="overflow-x-auto mt-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--neutral-50)] text-left text-[var(--neutral-600)]">
                    <th className="px-4 py-3 font-semibold rounded-l-lg">
                      Nama Inspektur
                    </th>
                    <th className="px-4 py-3 font-semibold">Email</th>
                    <th className="px-4 py-3 font-semibold">Username</th>
                    <th className="px-4 py-3 font-semibold">PIN</th>
                    <th className="px-4 py-3 font-semibold rounded-r-lg text-right">
                      &nbsp;
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-[var(--neutral-500)]"
                      >
                        Memuat data inspektur...
                      </td>
                    </tr>
                  ) : paginatedInspectors.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-4 py-10 text-center text-[var(--neutral-500)]"
                      >
                        {inspectors.length === 0
                          ? "Anda belum menambahkan Inspektur"
                          : "Inspektur tidak ditemukan"}
                      </td>
                    </tr>
                  ) : (
                    paginatedInspectors.map((inspector) => (
                      <tr
                        key={inspector.id}
                        className="border-b border-[var(--neutral-100)] last:border-0"
                      >
                        <td className="px-4 py-3 text-[var(--neutral-800)]">
                          {inspector.name}
                        </td>
                        <td className="px-4 py-3 text-[var(--neutral-600)]">
                          {inspector.email}
                        </td>
                        <td className="px-4 py-3 text-[var(--neutral-600)]">
                          {inspector.username}
                        </td>
                        <td className="px-4 py-3 text-[var(--neutral-600)]">
                          {inspector.pin}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            aria-label={`Hapus ${inspector.name}`}
                            onClick={() => setDeleteTargetId(inspector.id)}
                            className="text-[var(--neutral-400)] hover:text-[var(--danger)] cursor-pointer"
                          >
                            <XCircleIcon />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {!loading && visibleInspectors.length > 0 && totalPages > 1 && (
              <div className="flex items-center gap-2 mt-4">
                <button
                  type="button"
                  aria-label="Halaman sebelumnya"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--neutral-500)] hover:bg-[var(--neutral-100)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeftIcon />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium cursor-pointer ${
                        page === currentPage
                          ? "bg-[var(--primary)] text-white"
                          : "text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  type="button"
                  aria-label="Halaman berikutnya"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-[var(--neutral-500)] hover:bg-[var(--neutral-100)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronRightIcon />
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <AddInspectorModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddInspector}
        submitting={addSubmitting}
        errorMessage={addErrorMessage}
      />

      <DeleteInspectorModal
        open={deleteTargetId !== null}
        onClose={() => setDeleteTargetId(null)}
        onConfirm={handleDeleteInspector}
        deleting={deleting}
      />
    </div>
  );
}
