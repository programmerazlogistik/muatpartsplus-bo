"use client";
import { useState, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import PageTitle from "@/components/PageTitle/PageTitle";
import MasterRumusVariabelTableHistory from "@/container/MasterRumusVariabel/MasterRumusVariabelTableHistory";
import { useGetFormulaHistory } from "@/services/masterpricing/masterformulavariable/getFormulaHistory";

export default function MasterRumusVariabelHistoryPage() {
  const router = useRouter();
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionFilter, setActionFilter] = useState("");

  // Use API hook to fetch formula history
  const { data: apiData, error, isLoading } = useGetFormulaHistory(params.id, {
    search: searchTerm,
    page: currentPage,
    limit: 10,
    action: actionFilter
  });

  // Use API data directly without transformation
  const tableData = useMemo(() => {
    if (!apiData?.data?.Data) return [];
    return apiData.data.Data;
  }, [apiData?.data?.Data]);
  
  // Transform pagination data
  const paginationData = useMemo(() => {
    if (!apiData?.data?.Pagination) return null;
    return apiData.data.Pagination;
  }, [apiData?.data?.Pagination]);

  const handleBack = () => {
    router.push("/master-pricing/master-rumus-variabel");
  };

  const handleSearch = (search) => {
    setSearchTerm(search);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleActionFilter = (action) => {
    setActionFilter(action);
    setCurrentPage(1); // Reset to first page when filtering
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-gray-600">Gagal memuat data history</p>
          <button
            onClick={() => router.push("/master-pricing/master-rumus-variabel")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageTitle showBackButton={true} onBackClick={handleBack}>
        History Perubahan Rumus & Variabel
      </PageTitle>
      
      <MasterRumusVariabelTableHistory
        data={tableData}
        loading={isLoading}
        pagination={paginationData}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
        onActionFilter={handleActionFilter}
        searchTerm={searchTerm}
        actionFilter={actionFilter}
      />
    </div>
  );
}