'use client';
import Image from "next/image";
import { FileText, PenTool, Clipboard, Users, ChevronRight } from "react-feather";

const stats = [
  { id: 1, label: "Tugas Hari Ini", icon: PenTool, value: 10 },
  { id: 2, label: "Laporan", icon: FileText, value: 3 },
  { id: 3, label: "Total Inspeksi", icon: Clipboard, value: 5 },
  { id: 4, label: "Total Inspektur", icon: Users, value: 5 },
];

const inspections = [
  { id: 1, title: "Central Garden Cirebon", clientName: "Melky Sedek", inspectorName: "John Doe", image: '/inspeksi-dummy.png' },
  { id: 2, title: "Inspeksi Rumah B", clientName: "John Doe", inspectorName: "Jane Smith", image: '/inspeksi-dummy.png' },
  { id: 3, title: "Inspeksi Rumah C", clientName: "Jane Smith", inspectorName: "Bob Johnson", image: '/inspeksi-dummy.png' },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6 h-screen bg-[var(--neutral-50)]">
        <div className="mx-6 flex gap-4 w-[75%]">
            {stats.map((stat) => (
                <div key={stat.id} className="flex flex-col gap-2 mt-6 bg-[var(--card)] border border-[var(--neutral-200)] rounded-xl p-3 h-auto w-full">
                    <h2 className="text-sm font-medium text-[var(--neutral-700)]">
                        {stat.label}
                    </h2>
                    <div className="flex items-center gap-auto justify-between ">
                    <div className="flex items-center justify-start">
                        <span className="text-2xl font-bold text-[var(--neutral-900)]">
                            {stat.value}
                        </span>
                    </div>
                    <div className="flex items-center justify-end">
                        <span className="text-sm bg-[var(--primary-100)]/30 rounded-lg p-1.5">
                            {stat.icon && <stat.icon className="w-5 h-5 text-[var(--primary-800)]" />}
                        </span>
                    </div>
                    </div>
                </div>
            ))}
        </div>
        <div className="mx-6 mb-6 bg-[var(--card)] border border-[var(--neutral-200)] rounded-xl p-4 py-6 h-auto">
            <div className="flex flex-col gap-4 mb-4">
            <h2 className="text-base font-bold text-[var(--neutral-900)]">
                Inspeksi Hari Ini
            </h2>
            <div className="flex gap-4">
                {inspections.map((inspection) => (
                <div key={inspection.id} className="flex flex-col border border-[var(--neutral-200)] rounded-lg w-[25%] bg-[var(--neutral-25)]">
                    <div className="w-auto h-auto overflow-hidden">
                    <Image
                        src={inspection.image}
                        alt={inspection.title}
                        className="w-full h-full object-cover rounded-t-lg"
                        height={150}
                        width={300}
                        loading="eager"
                    />
                    </div>
                    <div className="flex flex-col gap-1 p-3">
                    <h3 className="text-sm font-semibold mb-1 mt-1 text-[var(--neutral-900)]">
                        {inspection.title}
                    </h3>
                    <div className="flex">
                    <div className="flex flex-col gap-1">
                    <p className="text-xs text-[var(--neutral-900)]">
                        Kien : {inspection.clientName}
                    </p>
                    <p className="text-xs text-[var(--neutral-900)]">
                        Inspektur : {inspection.inspectorName}
                    </p>
                    </div>
                    <button className="text-xs text-[var(--primary-800)] ml-auto mb-2 bg-[var(--primary-100)]/70 border-2 border-[var(--primary-800)] rounded-lg p-1.5 cursor-pointer hover:bg-[var(--primary-800)] hover:text-white transition-colors duration-300">
                        <ChevronRight className="w-5 h-5 " />
                    </button>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;