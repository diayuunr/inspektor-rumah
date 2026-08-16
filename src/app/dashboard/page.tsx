'use client';

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";
import Dashboard from "./dashboard";

const DashboardPage = () => {
const [headerSearch, setHeaderSearch] = useState("");
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
      <Header
        title="Dashboard"
        searchValue={headerSearch}
        onSearchChange={setHeaderSearch}
      />
      <Dashboard />
      </div>
    </div>
  );
};

export default DashboardPage;