'use client';

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import InspeksiPage from "./inspeksi";
import { useState } from "react";
import DaftarInspeksi from "./daftar-inspeksi";

const RiwayatInspeksiPage = () => {
const [headerSearch, setHeaderSearch] = useState("");
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
      <Header
        title="Riwayat Inspeksi"
        searchValue={headerSearch}
        onSearchChange={setHeaderSearch}
      />
      <div className="overflow-y-auto">
      <InspeksiPage />
      <DaftarInspeksi />
      </div>
      </div>
    </div>
  );
};

export default RiwayatInspeksiPage;