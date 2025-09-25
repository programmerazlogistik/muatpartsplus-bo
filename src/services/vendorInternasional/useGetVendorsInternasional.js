import useSWR from "swr";
import { fetcherMuatparts } from "@/lib/axios";

// This flag allows for easy switching between mock and real data.
const isMockData = true;

// Mock API response structure, simulating a real API call.
const apiResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Success: Fetched international vendor data.",
    },
    Data: {
      vendors: [
        {
          id: "vendor-001",
          companyName: "PT. Maju Mundur",
          email: "majumundur@gmail.com",
          country: "China",
          companyType: "JV",
          totalProducts: 30,
          registrationDate: "20/02/25 20.00",
          status: "active",
        },
        {
          id: "vendor-002",
          companyName: "PT. Maju Mapan",
          email: "majumapan@gmail.com",
          country: "China",
          companyType: "Ltd",
          totalProducts: 10,
          registrationDate: "20/02/25 20.00",
          status: "inactive",
        },
        {
          id: "vendor-003",
          companyName: "PT. Jaya Abadi",
          email: "jayabadi@gmail.com",
          country: "China",
          companyType: "LLC",
          totalProducts: 15,
          registrationDate: "20/02/25 20.00",
          status: "pending",
        },
        {
          id: "vendor-004",
          companyName: "PT. Agung Sejahtera",
          email: "agungsejah@gmail.com",
          country: "China",
          companyType: "Ltd",
          totalProducts: 5,
          registrationDate: "20/02/25 20.00",
          status: "active",
        },
        {
          id: "vendor-005",
          companyName: "PT. Budi Mulya",
          email: "budmul@gmail.com",
          country: "China",
          companyType: "Ltd",
          totalProducts: 5,
          registrationDate: "20/02/25 20.00",
          status: "pending",
        },
        {
          id: "vendor-006",
          companyName: "PT. Indo Perkasa",
          email: "indoper@gmail.com",
          country: "China",
          companyType: "Ltd",
          totalProducts: 10,
          registrationDate: "20/02/25 20.00",
          status: "active",
        },
        {
          id: "vendor-007",
          companyName: "PT. Jaya Teknik",
          email: "jayatek@gmail.com",
          country: "China",
          companyType: "Ltd",
          totalProducts: 20,
          registrationDate: "20/02/25 20.00",
          status: "inactive",
        },
        {
          id: "vendor-008",
          companyName: "PT. Tekno Baru Abadi",
          email: "teknobardi@gmail.com",
          country: "China",
          companyType: "Ltd",
          totalProducts: 10,
          registrationDate: "20/02/25 20.00",
          status: "pending",
        },
        {
          id: "vendor-009",
          companyName: "PT. Sukses Murni Jaya",
          email: "suksesmurnijay@gmail.com",
          country: "China",
          companyType: "Ltd",
          totalProducts: 15,
          registrationDate: "20/02/25 20.00",
          status: "active",
        },
        {
          id: "vendor-010",
          companyName: "PT. Sekawan Lima",
          email: "sekawanlim@gmail.com",
          country: "China",
          companyType: "Ltd",
          totalProducts: 15,
          registrationDate: "20/02/25 20.00",
          status: "inactive",
        },
      ],
      pagination: {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 45, // Total items across all pages
        totalPages: 5,
      },
    },
    Type: "vendor-international-list",
  },
};

/**
 * Fetches vendor data. Returns mock data if isMockData is true,
 * otherwise makes a real API call.
 */
export const fetcherVendors = async () => {
  if (isMockData) {
    return apiResult.data.Data;
  }
  // This would be the actual API call
  const result = await fetcherMuatparts.get("v1/vendors/international");
  return result?.data?.Data || {};
};

/**
 * Custom SWR hook for fetching international vendor data.
 * The SWR key 'vendor-international-list' ensures unique caching.
 */
export const useGetVendorsInternasional = () =>
  useSWR("vendor-international-list", fetcherVendors);