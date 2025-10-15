"use client";

import useSWR from "swr";

const vendorsData = [
  {
    id: "vendor-001",
    companyName: "PT. Maju Mundur",
    email: "majumundur@gmail.com",
    country: "China",
    companyType: "JV",
    totalProducts: 30,
    registrationDate: "2025-02-20T20:00:00Z",
  },
  {
    id: "vendor-002",
    companyName: "PT. Maju Mapan",
    email: "majumapan@gmail.com",
    country: "China",
    companyType: "Ltd",
    totalProducts: 10,
    registrationDate: "2025-02-20T20:00:00Z",
  },
  {
    id: "vendor-003",
    companyName: "PT. Jaya Abadi",
    email: "jayabadi@gmail.com",
    country: "China",
    companyType: "LLC",
    totalProducts: 15,
    registrationDate: "2025-02-20T20:00:00Z",
  },
  {
    id: "vendor-004",
    companyName: "PT. Agung Sejahtera",
    email: "agungsejah@gmail.com",
    country: "China",
    companyType: "Ltd",
    totalProducts: 5,
    registrationDate: "2025-02-20T20:00:00Z",
  },
  {
    id: "vendor-005",
    companyName: "PT. Budi Mulya",
    email: "budmul@gmail.com",
    country: "China",
    companyType: "Ltd",
    totalProducts: 5,
    registrationDate: "2025-02-20T20:00:00Z",
  },
  {
    id: "vendor-006",
    companyName: "PT. Indo Perkasa",
    email: "indoper@gmail.com",
    country: "China",
    companyType: "Ltd",
    totalProducts: 10,
    registrationDate: "2025-02-20T20:00:00Z",
  },
  {
    id: "vendor-007",
    companyName: "PT. Jaya Teknik",
    email: "jayatek@gmail.com",
    country: "China",
    companyType: "Ltd",
    totalProducts: 20,
    registrationDate: "2025-02-20T20:00:00Z",
  },
  {
    id: "vendor-008",
    companyName: "PT. Tekno Baru Abadi",
    email: "teknobardi@gmail.com",
    country: "China",
    companyType: "Ltd",
    totalProducts: 10,
    registrationDate: "2025-02-20T20:00:00Z",
  },
  {
    id: "vendor-009",
    companyName: "PT. Sukses Murni Jaya",
    email: "suksesmurnijay@gmail.com",
    country: "China",
    companyType: "Ltd",
    totalProducts: 15,
    registrationDate: "2025-02-20T20:00:00Z",
  },
  {
    id: "vendor-010",
    companyName: "PT. Sekawan Lima",
    email: "sekawanlim@gmail.com",
    country: "China",
    companyType: "Ltd",
    totalProducts: 15,
    registrationDate: "2025-02-20T20:00:00Z",
  },
];

const sortData = (data, sorting) => {
  if (!sorting || sorting.length === 0) return data;
  const { id, desc } = sorting[0];
  return [...data].sort((a, b) => {
    const valA = a[id];
    const valB = b[id];
    if (valA < valB) return desc ? 1 : -1;
    if (valA > valB) return desc ? -1 : 1;
    return 0;
  });
};

const filterData = (data, searchTerm) => {
  if (!searchTerm) return data;
  const lowercasedTerm = searchTerm.toLowerCase();
  return data.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(lowercasedTerm)
    )
  );
};

const fetcherVendors = async ({ pagination, sorting, searchTerm }) => {
  console.log("Fetching vendor data with:", {
    ...pagination,
    sorting,
    searchTerm,
  });
  await new Promise((res) => setTimeout(res, 500));

  let processedData = filterData(vendorsData, searchTerm);
  processedData = sortData(processedData, sorting);

  const totalItems = processedData.length;
  const totalPages = Math.ceil(totalItems / pagination.pageSize);
  const paginatedData = processedData.slice(
    pagination.pageIndex * pagination.pageSize,
    (pagination.pageIndex + 1) * pagination.pageSize
  );

  return {
    Message: { Code: 200, Text: "Success: Fetched international vendor data." },
    Data: {
      vendors: paginatedData,
      pagination: {
        currentPage: pagination.pageIndex + 1,
        itemsPerPage: pagination.pageSize,
        totalItems,
        totalPages,
      },
    },
    Type: "vendor-international-list",
  };
};

export const useGetVendorsInternational = ({
  pagination,
  sorting,
  searchTerm,
}) => {
  const swrKey = `vendors-international-list-${JSON.stringify({ pagination, sorting, searchTerm })}`;
  const { data, error, isLoading } = useSWR(
    swrKey,
    () => fetcherVendors({ pagination, sorting, searchTerm }),
    { revalidateOnFocus: false }
  );
  return { data: data?.Data, error, isLoading };
};
