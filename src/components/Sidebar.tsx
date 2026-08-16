"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutIcon } from "./icons";
import { FileText, Home, Clipboard, Users } from "react-feather";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/riwayat-inspeksi", label: "Riwayat Inspeksi", icon: Clipboard },
  { href: "/laporan", label: "Laporan", icon: FileText },
  { href: "/inspektur", label: "Inspektur", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[var(--neutral-200)] flex flex-col min-h-screen">
      <div className="flex items-center gap-2 px-6 h-20 border-b border-[var(--neutral-200)]">
        <Image
          src="/logo-inspektor.png"
          alt="Inspektor Rumah"
          width={32}
          height={32}
          className="rounded"
        />
        <span className="font-bold text-[var(--neutral-900)]">Inspektor Rumah</span>
      </div>

      <nav className="flex-1 px-4 py-6">
        <p className="text-xs font-semibold text-[var(--neutral-400)] uppercase tracking-wide px-2 mb-2">
          Menu
        </p>
        <ul className="flex flex-col gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium border-l-4 transition-colors ${
                    isActive
                      ? "border-[var(--primary)] bg-[var(--primary-50)] text-[var(--primary-700)]"
                      : "border-transparent text-[var(--neutral-600)] hover:bg-[var(--neutral-50)]"
                  }`}
                >
                  <Icon />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-6 border-t border-[var(--neutral-200)]">
        <button
          type="button"
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-[var(--danger)] hover:bg-[var(--error-50)] transition-colors cursor-pointer"
        >
          <LogoutIcon />
          Keluar
        </button>
      </div>
    </aside>
  );
}
