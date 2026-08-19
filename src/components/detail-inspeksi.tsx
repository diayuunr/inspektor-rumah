import Image from "next/image";
import { X, ChevronDown, MapPin, Calendar } from "react-feather";

type Inspection = {
  id: string;
  tanggal: string;
  namaProyek: string;
  namaKlien: string;
  kontakKlien: string;
  alamat: string;
  status: "selesai" | "proses";
};

type DetailInspeksiProps = {
  inspection: Inspection;
  onClose: () => void;
};

const DetailInspeksi = ({
  inspection,
  onClose,
}: DetailInspeksiProps) => {
  return (
    <>
      <div
        className="fixed top-16 left-0 right-0 bottom-0 bg-black/20 z-40"
        onClick={onClose}
      />

      <aside className="fixed top-16 right-0 bottom-0 z-50 w-[25%] min-w-[400px] bg-white border-l border-[var(--neutral-200)] shadow-xl overflow-y-auto">
        <div className="p-4">
          <div className="flex justify-end mb-3">
            <button
              type="button"
              onClick={onClose}
              className="text-[var(--primary-700)] hover:text-[var(--primary-900)] cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className={`rounded-lg border border-[var(--neutral-100)] px-2 py-2 mb-3 
          ${inspection.status === "selesai" ? "bg-[var(--success-50)]" : "bg-[var(--primary-50)]"}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[var(--neutral-700)]">
                {inspection.status === "selesai"
                  ? "Selesai"
                  : "Sedang Proses"}
              </span>

              <span className="text-xs text-[var(--neutral-700)]">
                {inspection.status === "selesai" ? "100%" : "50%"}
              </span>
            </div>

            <div className="w-full h-2 bg-[var(--neutral-200)] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  inspection.status === "selesai"
                    ? "w-full bg-[var(--success-400)]"
                    : "w-1/2 bg-[var(--primary-500)]"
                }`}
              />
            </div>
          </div>

          <div className="w-full h-[185px] rounded-lg overflow-hidden mb-5">
            <Image
              src="/inspeksi-dummy.png"
              alt={inspection.namaProyek}
              className="w-full h-full object-cover"
              width={300}
              height={150}
            />
          </div>

          <h2 className="flex text-xl font-semibold text-[var(--neutral-900)] mb-5">
            {inspection.namaProyek}
          </h2>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="flex text-xs font-semibold text-[var(--neutral-900)] mb-2">
                Nama Klien
              </label>

              <input
                type="text"
                value={inspection.namaKlien}
                readOnly
                className="w-full h-10 px-3 text-sm text-[var(--neutral-700)] bg-white border border-[var(--neutral-300)] rounded-lg focus:outline-none"
              />
            </div>

            <div>
              <label className="flex text-xs font-semibold text-[var(--neutral-900)] mb-2">
                Kontak Klien
              </label>

              <div className="flex h-10 border border-[var(--neutral-300)] rounded-lg overflow-hidden">
                <div className="flex items-center gap-1 px-3 text-sm text-[var(--neutral-500)] border-r border-[var(--neutral-300)]">
                  +62
                  <ChevronDown className="w-3 h-3" />
                </div>

                <input
                  type="text"
                  value={inspection.kontakKlien.replace(
                    /@.*$/,
                    ""
                  )}
                  readOnly
                  className="flex-1 px-3 text-sm text-[var(--neutral-700)] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="flex text-xs font-semibold text-[var(--neutral-900)] mb-2">
                Lokasi Properti
              </label>

              <div className="flex items-center h-auto p-3 border border-[var(--neutral-300)] rounded-lg text-sm text-[var(--neutral-700)]">
                <MapPin className="w-5 h-5 text-[var(--neutral-600)]" />
                {inspection.alamat}
              </div>
            </div>

            <div>
              <label className="flex text-xs font-semibold text-[var(--neutral-900)] mb-2">
                Tim Inspeksi
              </label>

              <div className="flex gap-2">
                <span className="px-3 py-2 rounded-md bg-[var(--neutral-100)] text-xs text-[var(--neutral-700)]">
                  Raffa Fahmi
                </span>

                <span className="px-3 py-2 rounded-md bg-[var(--neutral-100)] text-xs text-[var(--neutral-700)]">
                  Diyau Aini
                </span>
              </div>
            </div>

            <div>
              <label className="flex text-xs font-semibold text-[var(--neutral-900)] mb-2">
                Tanggal Inspeksi
              </label>

              <div className="flex items-center h-10 px-3 gap-2 border border-[var(--neutral-300)] rounded-lg text-sm text-[var(--neutral-700)]">
                <Calendar className="w-4 h-4 text-[var(--neutral-600)]" />
                25/07/26
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6 pb-4">
            <button
              type="button"
              className="w-[30%] h-10 rounded-lg border border-[var(--primary-500)] bg-[var(--primary-50)] text-sm font-medium text-[var(--primary-700)] hover:bg-[var(--primary-100)] transition-colors"
            >
              Edit
            </button>

            <button
              type="button"
              className="flex-1 h-10 rounded-lg bg-[var(--primary-700)] text-white text-sm font-medium hover:bg-[var(--primary-800)] transition-colors"
            >
              Detail Laporan
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default DetailInspeksi;