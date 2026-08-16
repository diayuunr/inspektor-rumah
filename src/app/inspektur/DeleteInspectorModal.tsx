interface DeleteInspectorModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deleting: boolean;
}

export default function DeleteInspectorModal({
  open,
  onClose,
  onConfirm,
  deleting,
}: DeleteInspectorModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 text-center">
        <h2 className="text-lg font-bold text-[var(--neutral-900)]">
          Apakah Anda yakin?
        </h2>
        <p className="text-sm text-[var(--neutral-500)] mt-2">
          Akses dan data inspektur akan terhapus dari sistem
        </p>

        <div className="flex justify-center gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-[var(--neutral-300)] text-[var(--neutral-700)] hover:bg-[var(--neutral-50)] cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={deleting}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {deleting ? "Menghapus..." : "Ya"}
          </button>
        </div>
      </div>
    </div>
  );
}
