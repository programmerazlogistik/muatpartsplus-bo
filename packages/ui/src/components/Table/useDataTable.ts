import { useState } from "react";

export const useDataTable = () => {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const onSearchChange = (value) => {
    setSearchTerm(value);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const dataTableProps = {
    sorting,
    setSorting,
    pagination,
    setPagination,
    searchTerm,
    onSearchChange,
  };

  return {
    ...dataTableProps,
    dataTableProps,
  };
};
