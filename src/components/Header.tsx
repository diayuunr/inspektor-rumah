import { BellIcon, SearchIcon } from "./icons";

interface HeaderProps {
  title: string;
  searchValue: string;
  onSearchChange: (value: string) => void;
}

export default function Header({ title, searchValue, onSearchChange }: HeaderProps) {
  return (
    <header className="h-20 shrink-0 flex items-center justify-between px-8 border-b border-[var(--neutral-200)] bg-white">
      <h1 className="text-xl font-bold text-[var(--neutral-900)]">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]">
            <SearchIcon />
          </span>
          <input
            type="text"
            placeholder="Cari"
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 pr-3 py-2 w-56 text-sm rounded-lg border border-[var(--neutral-300)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)]"
          />
        </div>

        <button
          type="button"
          aria-label="Notifikasi"
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] transition-colors cursor-pointer"
        >
          <BellIcon />
        </button>
      </div>
    </header>
  );
}
