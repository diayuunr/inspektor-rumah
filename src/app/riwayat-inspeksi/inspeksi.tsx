'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ChevronRight,
} from "react-feather";

const API_URL = "https://canary-api.inspeksirumah.id";

type Inspector = {
  id: string;
  name: string;
};

type Inspection = {
  id: string;
  reportLocation: string;
  customerName: string;
  inspectors: Inspector[];
  houseImageUrl: string;
  inspectionDate: string;
};

type InspectionResponse = {
  items: Inspection[];
  limit: number;
  offset: number;
  total: number;
  nextCursor?: string;
};

type InspectorResponse = Inspector[];

localStorage.getItem("accessToken");

const getToken = () => {
  return localStorage.getItem("accessToken");
};

const InspeksiPage = () => {
  const [inspections, setInspections] = useState<Inspection[]>([]);
  const [totalInspections, setTotalInspections] = useState(0);
  const [totalInspectors, setTotalInspectors] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = getToken();

        if (!token) {
          throw new Error("Authentication token tidak ditemukan");
        }

        const today = new Date().toISOString().split("T")[0];

        const [inspectionResponse, inspectorResponse] =
          await Promise.all([
            fetch(
              `${API_URL}/inspections?startDate=${today}&endDate=${today}&limit=10`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            ),

            fetch(`${API_URL}/inspectors`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }),
          ]);

        if (!inspectionResponse.ok) {
          throw new Error(
            `Gagal mengambil data inspeksi (${inspectionResponse.status})`
          );
        }

        if (!inspectorResponse.ok) {
          throw new Error(
            `Gagal mengambil data inspektur (${inspectorResponse.status})`
          );
        }

        const inspectionData: InspectionResponse =
          await inspectionResponse.json();

        const inspectorData: InspectorResponse =
          await inspectorResponse.json();

        setInspections(inspectionData.items ?? []);
        setTotalInspections(inspectionData.total ?? 0);
        setTotalInspectors(inspectorData.length ?? 0);
      } catch (error) {
        console.error("Dashboard error:", error);

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Terjadi kesalahan saat mengambil data dashboard");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex flex-col gap-6 bg-[var(--neutral-50)]">
      <div className="m-6 bg-[var(--card)] border border-[var(--neutral-200)] rounded-xl p-4 py-6 h-auto">
        <div className="flex flex-col gap-4 mb-4">
          <h2 className="text-base font-bold text-[var(--neutral-900)]">
            Inspeksi Hari Ini
          </h2>

          {error && (
            <p className="text-xs text-[var(--neutral-900)]">
              {error}
            </p>
          )}

        {!loading && inspections.length === 0 ? (
        <div className="flex justify-center items-center min-h-40 w-full">
            <p className="text-xs text-[var(--neutral-900)]">
            Belum ada inspeksi hari ini!
            </p>
        </div>
        ) : (
        <div className="flex gap-4">
            {inspections.map((inspection) => (
                <div
                  key={inspection.id}
                  className="flex flex-col border border-[var(--neutral-200)] rounded-lg w-[25%] bg-[var(--neutral-25)]"
                >
                  <div className="w-full overflow-hidden">
                    <Image
                      src={inspection.houseImageUrl}
                      alt={inspection.reportLocation}
                      className="w-full h-full object-cover rounded-t-lg"
                      height={150}
                      width={300}
                    />
                  </div>

                  <div className="flex flex-col gap-1 p-3">
                    <h3 className="text-sm font-semibold mb-1 mt-1 text-[var(--neutral-900)]">
                      {inspection.reportLocation}
                    </h3>

                    <div className="flex">
                      <div className="flex flex-col gap-1">
                        <p className="text-xs text-[var(--neutral-900)]">
                          Kien : {inspection.customerName}
                        </p>

                        <p className="text-xs text-[var(--neutral-900)]">
                          Inspektur :{" "}
                          {inspection.inspectors?.[0]?.name ?? "-"}
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
            )}
          </div>
        </div>
      </div>

  );
};

export default InspeksiPage;