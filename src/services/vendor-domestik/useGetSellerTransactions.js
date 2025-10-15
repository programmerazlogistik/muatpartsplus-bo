import useSWR from "swr";

import { fetcherMock } from "@/lib/axios";

const USE_MOCK = true;

/**
 * @typedef {Object} Transaction
 * @property {string} id - The unique identifier for the transaction.
 * @property {string} transactionCode - The transaction code/number.
 * @property {string} productName - The name of the product.
 * @property {string} buyerName - The name of the buyer.
 * @property {string} date - The date of the transaction (ISO 8601 format).
 * @property {number} quantity - The quantity of the product sold.
 * @property {number} totalPrice - The total price of the transaction.
 * @property {'DIPROSES' | 'DIKIRIM' | 'SELESAI' | 'DIBATALKAN'} status - The status of the transaction.
 */

/**
 * @typedef {Object} PaginationInfo
 * @property {number} currentPage - The current page number.
 * @property {number} totalPages - The total number of pages.
 * @property {number} perPage - The number of items per page.
 * @property {number} totalItems - The total number of items.
 */

/**
 * @typedef {Object} SellerTransactionsData
 * @property {Transaction[]} transactions - An array of transaction objects.
 * @property {PaginationInfo} pagination - Pagination information.
 */

/**
 * @typedef {Object} APIResponse
 * @property {Object} Message
 * @property {number} Message.Code
 * @property {string} Message.Text
 * @property {SellerTransactionsData} Data
 * @property {string} Type
 */

/**
 * @typedef {Object} MockAPIResult
 * @property {APIResponse} data
 */

/** @type {MockAPIResult} */
export const mockAPIResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Success getting seller transactions",
    },
    Data: {
      transactions: [
        {
          id: "TRX001",
          transactionCode: "INV/2025/09/001",
          productName: "Suku Cadang Rem Tipe A",
          buyerName: "Bambang Sugeng",
          date: "2025-09-25T10:30:00Z",
          quantity: 2,
          totalPrice: 500000,
          status: "SELESAI",
        },
        {
          id: "TRX002",
          transactionCode: "INV/2025/09/002",
          productName: "Filter Oli Mesin V2",
          buyerName: "Citra Lestari",
          date: "2025-09-25T11:00:00Z",
          quantity: 5,
          totalPrice: 750000,
          status: "DIKIRIM",
        },
        {
          id: "TRX003",
          transactionCode: "INV/2025/09/003",
          productName: "Busi Iridium Super",
          buyerName: "Agus Santoso",
          date: "2025-09-24T15:00:00Z",
          quantity: 10,
          totalPrice: 1200000,
          status: "DIPROSES",
        },
        {
          id: "TRX004",
          transactionCode: "INV/2025/09/004",
          productName: "Kampas Kopling Set",
          buyerName: "Dewi Anggraini",
          date: "2025-09-23T09:45:00Z",
          quantity: 1,
          totalPrice: 850000,
          status: "DIBATALKAN",
        },
        {
          id: "TRX005",
          transactionCode: "INV/2025/09/005",
          productName: "Aki Kering MF 60Ah",
          buyerName: "Eko Prasetyo",
          date: "2025-09-22T14:20:00Z",
          quantity: 1,
          totalPrice: 950000,
          status: "SELESAI",
        },
      ],
      pagination: {
        currentPage: 1,
        totalPages: 5,
        perPage: 10,
        totalItems: 50,
      },
    },
    Type: "seller-transactions-list",
  },
};

/**
 * Fetches seller transaction data from the API.
 * @param {Object} params - The parameters for fetching data.
 * @param {number} params.page - The page number to fetch.
 * @param {number} params.limit - The number of items per page.
 * @param {string} params.search - The search term.
 * @param {string} params.sort - The sort field.
 * @param {string} params.order - The sort order (asc/desc).
 * @returns {Promise<SellerTransactionsData>} The seller transaction data.
 */
export const fetcherSellerTransactions = async ({
  page = 1,
  limit = 10,
  search = '',
  sort = null,
  order = null
} = {}) => {
  let response;
  if (USE_MOCK) {
    // For now, return the mock data regardless of parameters
    // In a real implementation, you would filter/sort the mock data based on parameters
    response = mockAPIResult;
  } else {
    // Replace with your actual API endpoint
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search }),
      ...(sort && { sort }),
      ...(order && { order })
    });
    response = await fetcherMock.get(`/v1/seller/transactions?${params}`);
  }
  return response.data?.Data;
};

/**
 * @typedef {Object} UseGetSellerTransactionsReturn
 * @property {SellerTransactionsData|null} data - The seller transaction data.
 * @property {Error|null} error - Error object if the request failed.
 * @property {boolean} isLoading - The loading state.
 * @property {Function} mutate - Function to mutate the data.
 */

/**
 * SWR hook for fetching seller transaction data.
 * @param {Object} params - The parameters for fetching data.
 * @param {number} params.page - The page number to fetch.
 * @param {number} params.limit - The number of items per page.
 * @param {string} params.search - The search term.
 * @param {string} params.sort - The sort field.
 * @param {string} params.order - The sort order (asc/desc).
 * @returns {UseGetSellerTransactionsReturn} SWR result with seller transaction data.
 */
export const useGetSellerTransactions = ({
  page = 1,
  limit = 10,
  search = '',
  sort = null,
  order = null
} = {}) => {
  // Create a cache key based on the parameters
  const cacheKey = `seller-transactions-list-${page}-${limit}-${search}-${sort}-${order}`;

  const { data, error, isLoading, mutate } = useSWR(
    cacheKey,
    () => fetcherSellerTransactions({ page, limit, search, sort, order })
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
