'use client';

import DetailInspeksi from "@/components/detail-inspeksi";
import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "react-feather";

type Inspection = {
  id: string;
  tanggal: string;
  namaProyek: string;
  namaKlien: string;
  kontakKlien: string;
  alamat: string;
  status: "selesai" | "proses";
};

const inspectionsData: Inspection[] = [
  {
    id: "1",
    tanggal: "2023-10-01",
    namaProyek: "Central Garden Cibubur",
    namaKlien: "Lasauva Yardha",
    kontakKlien: "kontakA@example.com",
    alamat: "Alamat A",
    status: "selesai",
  },
  {
    id: "2",
    tanggal: "2023-10-02",
    namaProyek: "Proyek B",
    namaKlien: "Klien B",
    kontakKlien: "kontakB@example.com",
    alamat: "Banyuraden Gamping Sleman Yogyakarta Indonesia",
    status: "proses",
  },
];

type SortOrder = "az" | "za";
type StatusFilter = "semua" | "proses" | "selesai";

const ITEMS_PER_PAGE = 10;

const DaftarInspeksi = () => {
  const [tableSearch, setTableSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("az");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading] = useState(false);
  const [inspections] = useState<Inspection[]>(inspectionsData);
  const filteredInspections = useMemo(() => {
    const keyword = tableSearch.toLowerCase().trim();

    const result = inspections.filter((inspection) => {
      const matchesSearch =
        inspection.namaProyek.toLowerCase().includes(keyword) ||
        inspection.namaKlien.toLowerCase().includes(keyword);

      const matchesStatus =
        statusFilter === "semua" ||
        inspection.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    result.sort((a, b) => {
      const comparison = a.namaProyek.localeCompare(
        b.namaProyek,
        "id"
      );

      return sortOrder === "az" ? comparison : -comparison;
    });

    return result;
  }, [inspections, tableSearch, statusFilter, sortOrder]);

  const totalPages = Math.ceil(
    filteredInspections.length / ITEMS_PER_PAGE
  );

  const paginatedInspections = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredInspections.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredInspections, currentPage]);

  if (totalPages > 0 && currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  const handleSearchChange = (value: string) => {
    setTableSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (status: StatusFilter) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleSortChange = (value: SortOrder) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  const totalSemua = inspections.length;
  const totalProses = inspections.filter(
    (inspection) => inspection.status === "proses"
    ).length;
  const totalSelesai = inspections.filter(
    (inspection) => inspection.status === "selesai"
    ).length;
  const [selectedInspection, setSelectedInspection] =
  useState<Inspection | null>(null);

  return (
    <div className="flex flex-col gap-6 bg-[var(--neutral-50)]">
      <div className="m-6 mt-0 bg-[var(--card)] border border-[var(--neutral-200)] rounded-xl p-4 py-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-base font-bold text-[var(--neutral-900)]">
            Daftar Inspeksi
          </h2>

          <div className="flex items-center justify-between">
            {/* Filter Status */}
            <div className="flex items-center overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => handleStatusChange("semua")}
                className={`flex px-4 py-2 text-sm font-medium transition-colors cursor-pointer gap-2 ${
                  statusFilter === "semua"
                    ? "border-b-3 border-[var(--primary-800)] text-[var(--primary-800)]"
                    : "text-[var(--neutral-700)] border-b-3 border-[var(--neutral-300)]"
                }`}
              >
                <span>Semua</span>
                <span className={`${ statusFilter === "semua"
                    ? "text-[var(--primary-500)]"
                    : "text-[var(--neutral-500)]"
                }`}>{totalSemua}</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange("proses")}
                className={`flex px-4 py-2 text-sm font-medium transition-colors cursor-pointer gap-2 ${
                  statusFilter === "proses"
                    ? "border-b-3 border-[var(--primary-800)] text-[var(--primary-800)]"
                    : "text-[var(--neutral-700)] border-b-3 border-[var(--neutral-300)]"
                }`}
              >
                <span>Sedang Proses</span>
                <span className={`${ statusFilter === "proses"
                    ? "text-[var(--primary-500)]"
                    : "text-[var(--neutral-500)]"
                }`}>{totalProses}</span>
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange("selesai")}
                className={`flex px-4 py-2 text-sm font-medium transition-colors cursor-pointer gap-2 ${
                  statusFilter === "selesai"
                    ? "border-b-3 border-[var(--primary-800)] text-[var(--primary-800)]"
                    : "text-[var(--neutral-700)] border-b-3 border-[var(--neutral-300)]"
                }`}
              >
                <span>Selesai</span>
                <span className={`${ statusFilter === "selesai"
                    ? "text-[var(--primary-500)]"
                    : "text-[var(--neutral-500)]"
                }`}>{totalSelesai}</span>
              </button>
            </div>

            <div className="flex items-center justify-end gap-2">
            {/* Search */}
            <div className="relative w-96">
              <span className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5" />
              </span>

              <input
                type="text"
                placeholder="Cari nama proyek/klien"
                value={tableSearch}
                onChange={(e) =>
                  handleSearchChange(e.target.value)
                }
                className="pl-10 pr-3 py-2 w-full text-sm rounded-lg border border-[var(--neutral-300)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)]"
              />
            </div>

            {/* Sort Nama */}
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) =>
                  handleSortChange(
                    e.target.value as SortOrder
                  )
                }
                className="appearance-none pl-3 pr-8 py-2 text-sm rounded-lg border border-[var(--neutral-300)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)] cursor-pointer"
              >
                <option value="az">Nama (A-Z)</option>
                <option value="za">Nama (Z-A)</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]">
                <ChevronDown className="w-4 h-4" />
              </span>
            </div>
            </div>
          </div>

          {/* TABEL */}
          <div className="overflow-x-auto mt-2">
            <div className="min-w-[1100px] overflow-hidden rounded-xl border-2 border-[var(--neutral-200)]">
              <table className="w-full table-fixed text-sm">
                <colgroup>
                  <col className="w-[15%]" />
                  <col className="w-[20%]" />
                  <col className="w-[14%]" />
                  <col className="w-[17%]" />
                  <col className="w-[25%]" />
                  <col className="w-[10%]" />
                  <col className="w-[14%]" />
                </colgroup>

                <thead className="bg-[var(--neutral-100)]">
                  <tr className="text-left">
                    <th className="px-4 py-2 font-semibold">Tanggal</th>
                    <th className="px-4 py-2 font-semibold">Nama Proyek</th>
                    <th className="px-4 py-2 font-semibold">Nama Klien</th>
                    <th className="px-4 py-2 font-semibold">Kontak Klien</th>
                    <th className="px-4 py-2 font-semibold">Alamat</th>
                    <th className="px-4 py-2 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold text-right">&nbsp;</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-[var(--neutral-500)]"
                      >
                        Memuat data inspeksi...
                      </td>
                    </tr>
                  ) : paginatedInspections.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-[var(--neutral-500)]"
                      >
                        {tableSearch || statusFilter !== "semua"
                          ? "Data inspeksi tidak ditemukan."
                          : "Belum ada inspeksi."}
                      </td>
                    </tr>
                  ) : (
                    paginatedInspections.map((inspection) => (
                      <tr key={inspection.id}
                        className="border-t-2 border-[var(--neutral-200)] hover:bg-[var(--primary-50)] hover:border-l-4 hover:border-l-[var(--primary-700)] transition-colors">
                        <td className="px-4 py-3 truncate">{inspection.tanggal}</td>
                        <td className="px-4 py-3 truncate" title={inspection.namaProyek}>
                          {inspection.namaProyek}
                        </td>
                        <td className="px-4 py-3 truncate" title={inspection.namaKlien}>
                          {inspection.namaKlien}
                        </td>
                        <td className="px-4 py-3 truncate" title={inspection.kontakKlien}>
                          {inspection.kontakKlien}
                        </td>
                        <td className="px-4 py-3 truncate" title={inspection.alamat}>
                          {inspection.alamat}
                        </td>

                        <td className="px-4 py-3">
                          <div
                            className={`inline-flex justify-center min-w-[90px] px-3 py-1.5 rounded-md text-xs font-medium ${
                              inspection.status === "proses"
                                ? "text-[var(--primary-500)] bg-[var(--primary-50)] border border-[var(--primary-500)]"
                                : "text-[var(--success-500)] bg-[var(--success-50)] border border-[var(--success-500)]"
                            }`}
                          >
                            {inspection.status === "proses"
                              ? "Proses"
                              : "Selesai"}
                          </div>
                        </td>

                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            className="inline-flex items-center whitespace-nowrap hover:text-[var(--primary-500)] cursor-pointer"
                            onClick={() => setSelectedInspection(inspection)}
                          >
                            Lihat Detail
                            <ChevronRight className="w-5 h-5 ml-1" />
                          </button>
                          {selectedInspection && (
                            <DetailInspeksi
                              inspection={selectedInspection}
                              onClose={() => setSelectedInspection(null)}
                            />)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* PAGINATION */}
          {totalPages > 0 && (
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1">
                {/* Page Numbers */}
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-[var(--primary-800)] text-white"
                        : "border border-[var(--neutral-200)] bg-white text-[var(--neutral-600)] hover:bg-[var(--neutral-100)]"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Previous */}
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage((page) => page - 1)
                  }
                  className="flex items-center justify-center w-9 h-9 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:text-[var(--primary-800)] cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Next */}
                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() =>
                    setCurrentPage((page) => page + 1)
                  }
                  className="flex items-center justify-center w-9 h-9 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed hover:text-[var(--primary-800)] cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaftarInspeksi;