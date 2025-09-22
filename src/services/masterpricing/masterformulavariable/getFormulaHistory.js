import useSWR from "swr";

import { fetcherMuatrans } from "@/lib/axios";
import { fetcherMuatransCS } from "@/lib/fetcherBasicAuth";

// Configuration flag for fetcher selection
const useFetcherMuatrans = true;

// Mock API result for development/testing
export const mockAPIResult = {
  Message: {
    Code: 200,
    Text: "OK"
  },
  Data: {
    data: [
      {
        id: "21368ef0-7c38-4b51-a0ee-a495230b1642",
        formulaId: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
        action: "UPDATE",
        name: "4PL",
        isActive: true,
        variables: [
          {
            id: "5441c5e3-fc52-4e0f-a12f-306cdc6c792d",
            isActive: true,
            variableName: "a",
            isFromShipper: false
          },
          {
            id: "d33da90c-233d-48b9-bf0f-36fc44e173f5",
            isActive: true,
            variableName: "b",
            isFromShipper: false
          },
          {
            id: "0d305d28-2752-4585-a331-1b2bea3e232e",
            isActive: true,
            variableName: "c",
            isFromShipper: false
          },
          {
            id: "e3464bad-f832-403f-9443-5cd3e321a941",
            isActive: true,
            variableName: "d",
            isFromShipper: false
          },
          {
            id: "e6e0fd5b-7734-4aad-8ad9-769d4deedeb9",
            isActive: true,
            variableName: "jarak",
            isFromShipper: true
          },
          {
            id: "4ec224a0-bd77-42fa-9a85-2ab07115c266",
            isActive: true,
            variableName: "tonase",
            isFromShipper: true
          }
        ],
        createdAt: "2025-09-20T02:55:26.455Z",
        createdBy: "Backend BO GM"
      },
      {
        id: "a330a0c8-371b-4db2-a52e-5f5b6df53db1",
        formulaId: "f655e5c3-35a4-4703-a3c7-4f321652f9c2",
        action: "CREATE",
        name: "6PL",
        isActive: true,
        variables: [
          {
            id: "2ccb11f1-2265-4361-b769-55d773928760",
            isActive: true,
            createdAt: "2025-09-20T02:27:44.773Z",
            createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
            deletedAt: null,
            formulaId: "f655e5c3-35a4-4703-a3c7-4f321652f9c2",
            updatedAt: "2025-09-20T02:27:44.773Z",
            variableName: "jarak",
            isFromShipper: true
          },
          {
            id: "070e3ff1-bdd1-4e2a-a46b-d1c2044327e2",
            isActive: true,
            createdAt: "2025-09-20T02:27:44.773Z",
            createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
            deletedAt: null,
            formulaId: "f655e5c3-35a4-4703-a3c7-4f321652f9c2",
            updatedAt: "2025-09-20T02:27:44.773Z",
            variableName: "tonase",
            isFromShipper: true
          },
          {
            id: "34b44f3d-d265-4c2b-a284-565bc94f11d2",
            isActive: true,
            createdAt: "2025-09-20T02:27:44.773Z",
            createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
            deletedAt: null,
            formulaId: "f655e5c3-35a4-4703-a3c7-4f321652f9c2",
            updatedAt: "2025-09-20T02:27:44.773Z",
            variableName: "enam",
            isFromShipper: false
          },
          {
            id: "f979e389-2930-4bf0-b790-badb7bb21d70",
            isActive: true,
            createdAt: "2025-09-20T02:27:44.773Z",
            createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
            deletedAt: null,
            formulaId: "f655e5c3-35a4-4703-a3c7-4f321652f9c2",
            updatedAt: "2025-09-20T02:27:44.773Z",
            variableName: "PL",
            isFromShipper: false
          }
        ],
        createdAt: "2025-09-20T02:27:44.817Z",
        createdBy: "Backend BO GM"
      },
      {
        id: "df9c6870-92db-4ce6-9b97-559626005b92",
        formulaId: "d9a845d1-8a88-453e-9485-ab813e43194c",
        action: "CREATE",
        name: "5PL",
        isActive: true,
        variables: [
          {
            id: "780db686-63d4-4845-95f4-2edadb7eed29",
            isActive: true,
            createdAt: "2025-09-20T02:27:23.384Z",
            createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
            deletedAt: null,
            formulaId: "d9a845d1-8a88-453e-9485-ab813e43194c",
            updatedAt: "2025-09-20T02:27:23.384Z",
            variableName: "jarak",
            isFromShipper: true
          },
          {
            id: "c0b52080-8616-42c3-8596-fa2e85fb611a",
            isActive: true,
            createdAt: "2025-09-20T02:27:23.384Z",
            createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
            deletedAt: null,
            formulaId: "d9a845d1-8a88-453e-9485-ab813e43194c",
            updatedAt: "2025-09-20T02:27:23.384Z",
            variableName: "tonase",
            isFromShipper: true
          },
          {
            id: "837ad4e1-9dd0-441e-93e3-fde2c485864a",
            isActive: true,
            createdAt: "2025-09-20T02:27:23.384Z",
            createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
            deletedAt: null,
            formulaId: "d9a845d1-8a88-453e-9485-ab813e43194c",
            updatedAt: "2025-09-20T02:27:23.384Z",
            variableName: "lima",
            isFromShipper: false
          },
          {
            id: "6ce984db-2956-4004-8cfc-19043ccbaef3",
            isActive: true,
            createdAt: "2025-09-20T02:27:23.384Z",
            createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
            deletedAt: null,
            formulaId: "d9a845d1-8a88-453e-9485-ab813e43194c",
            updatedAt: "2025-09-20T02:27:23.384Z",
            variableName: "L",
            isFromShipper: false
          }
        ],
        createdAt: "2025-09-20T02:27:23.435Z",
        createdBy: "Backend BO GM"
      },
      {
        id: "21368ef0-7c38-4b51-a0ee-a495230b1641",
        formulaId: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
        action: "UPDATE",
        name: "4PL",
        isActive: false,
        variables: [
          {
            id: "5441c5e3-fc52-4e0f-a12f-306cdc6c792d",
            isActive: true,
            variableName: "a",
            isFromShipper: false
          },
          {
            id: "d33da90c-233d-48b9-bf0f-36fc44e173f5",
            isActive: true,
            variableName: "b",
            isFromShipper: false
          },
          {
            id: "0d305d28-2752-4585-a331-1b2bea3e232e",
            isActive: true,
            variableName: "c",
            isFromShipper: false
          },
          {
            id: "e3464bad-f832-403f-9443-5cd3e321a941",
            isActive: true,
            variableName: "d",
            isFromShipper: false
          },
          {
            id: "e6e0fd5b-7734-4aad-8ad9-769d4deedeb9",
            isActive: true,
            variableName: "jarak",
            isFromShipper: true
          },
          {
            id: "4ec224a0-bd77-42fa-9a85-2ab07115c266",
            isActive: true,
            variableName: "tonase",
            isFromShipper: true
          }
        ],
        createdAt: "2025-09-19T02:47:26.455Z",
        createdBy: "Backend BO GM"
      },
      {
        id: "c617315f-22ea-4e26-af4b-c8f810c7a239",
        formulaId: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
        action: "UPDATE",
        name: "4PL",
        isActive: true,
        variables: [],
        createdAt: "2025-09-19T02:38:54.198Z",
        createdBy: "Backend BO GM"
      },
      {
        id: "0758b426-4f0f-4c9d-bc7d-ec74c690d3a2",
        formulaId: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
        action: "UPDATE",
        name: "4PL",
        isActive: false,
        variables: [],
        createdAt: "2025-09-19T02:32:59.412Z",
        createdBy: "Backend BO GM"
      },
      {
        id: "f3b2f598-6c74-4fe7-ace0-3f13f30147e3",
        formulaId: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
        action: "CREATE",
        name: "4PL",
        isActive: true,
        variables: [
          {
            id: "e6e0fd5b-7734-4aad-8ad9-769d4deedeb9",
            isActive: true,
            createdAt: "2025-09-18T16:17:49.976Z",
            createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
            deletedAt: null,
            formulaId: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
            updatedAt: "2025-09-18T16:17:49.976Z",
            variableName: "jarak",
            isFromShipper: true
          },
          {
            id: "4ec224a0-bd77-42fa-9a85-2ab07115c266",
            isActive: true,
            createdAt: "2025-09-18T16:17:49.976Z",
            createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
            deletedAt: null,
            formulaId: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
            updatedAt: "2025-09-18T16:17:49.976Z",
            variableName: "tonase",
            isFromShipper: true
          },
          {
            id: "5441c5e3-fc52-4e0f-a12f-306cdc6c792d",
            isActive: true,
            createdAt: "2025-09-18T16:17:49.976Z",
            createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
            deletedAt: null,
            formulaId: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
            updatedAt: "2025-09-18T16:17:49.976Z",
            variableName: "a",
            isFromShipper: false
          },
          {
            id: "d33da90c-233d-48b9-bf0f-36fc44e173f5",
            isActive: true,
            createdAt: "2025-09-18T16:17:49.976Z",
            createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
            deletedAt: null,
            formulaId: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
            updatedAt: "2025-09-18T16:17:49.976Z",
            variableName: "b",
            isFromShipper: false
          },
          {
            id: "0d305d28-2752-4585-a331-1b2bea3e232e",
            isActive: true,
            createdAt: "2025-09-18T16:17:49.976Z",
            createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
            deletedAt: null,
            formulaId: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
            updatedAt: "2025-09-18T16:17:49.976Z",
            variableName: "c",
            isFromShipper: false
          },
          {
            id: "e3464bad-f832-403f-9443-5cd3e321a941",
            isActive: true,
            createdAt: "2025-09-18T16:17:49.976Z",
            createdBy: "09d2f11e-ea5f-4758-b230-e8f240b2dd39",
            deletedAt: null,
            formulaId: "39100e8e-f4c9-4dd2-a025-85df7a4a3f89",
            updatedAt: "2025-09-18T16:17:49.976Z",
            variableName: "d",
            isFromShipper: false
          }
        ],
        createdAt: "2025-09-18T16:17:50.054Z",
        createdBy: "Backend BO GM"
      }
    ],
    pagination: {
      page: 1,
      limit: 10,
      total: 7,
      totalPages: 1,
      hasNext: false,
      hasPrev: false
    }
  },
  Type: "/v1/bo/pricing/master/formula/history"
};

/**
 * Fetcher function to get formula history
 * @param {string} url - The API endpoint URL
 * @returns {Promise} - Axios response promise
 */
export const getFormulaHistory = async (url) => {
  const fetcher = useFetcherMuatrans ? fetcherMuatrans : fetcherMuatransCS;
  return fetcher.get(url);
};

/**
 * Transform API response data to table format
 * @param {Array} apiData - Raw API response data
 * @returns {Array} - Transformed data for table usage
 */
export const transformFormulaHistoryToTableData = (apiData) => {
  if (!apiData || !Array.isArray(apiData)) return [];

  return apiData.map((history) => {
    const createdDate = new Date(history.createdAt);
    
    return {
      id: history.id,
      formulaId: history.formulaId,
      action: history.action,
      name: history.name,
      isActive: history.isActive,
      variables: history.variables || [],
      createdAt: history.createdAt,
      createdBy: history.createdBy,
      // Formatted display values
      createdAtFormatted: `${createdDate.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })} ${createdDate.toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      })}`,
      status: history.isActive ? "Aktif" : "Tidak Aktif",
      statusColor: history.isActive ? "text-green-600" : "text-red-600",
      statusBadge: history.isActive 
        ? "bg-green-100 text-green-800 border-green-200" 
        : "bg-red-100 text-red-800 border-red-200",
      variablesCount: history.variables ? history.variables.length : 0,
      variablesList: history.variables ? history.variables.map(v => v.variableName).join(", ") : "",
    };
  });
};

/**
 * Transform API response pagination data
 * @param {Object} paginationData - Raw pagination data from API
 * @returns {Object} - Transformed pagination data
 */
export const transformPaginationData = (paginationData) => {
  if (!paginationData) return {};

  return {
    currentPage: paginationData.page || 1,
    totalPages: paginationData.totalPages || 1,
    totalRecords: paginationData.total || 0,
    recordsPerPage: paginationData.limit || 10,
    hasNext: paginationData.hasNext || false,
    hasPrev: paginationData.hasPrev || false,
  };
};

/**
 * Build query parameters for formula history API
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action (CREATE, UPDATE, DELETE)
 * @param {string} params.formulaId - Filter by formula ID
 * @returns {string} - Query string
 */
export const buildFormulaHistoryQuery = ({ 
  search = "", 
  page = 1, 
  limit = 10, 
  action = "",
  formulaId = ""
} = {}) => {
  const params = new URLSearchParams();
  
  if (search) {
    params.append("search", search);
  }
  
  if (action) {
    params.append("action", action);
  }
  
  if (formulaId) {
    params.append("formulaId", formulaId);
  }
  
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  
  return params.toString();
};

/**
 * SWR hook for fetching formula history
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action
 * @param {string} params.formulaId - Filter by formula ID
 * @param {Object} options - SWR options
 * @returns {Object} - SWR response object { data, error, isLoading, mutate }
 */
export const useGetFormulaHistory = (params = {}, options = {}) => {
  const { search = "", page = 1, limit = 10, action = "", formulaId = "" } = params;
  
  const queryString = buildFormulaHistoryQuery({ search, page, limit, action, formulaId });
  const cacheKey = `/v1/bo/pricing/master/formula/history${queryString ? `?${queryString}` : ""}`;

  return useSWR(cacheKey, getFormulaHistory, {
    // Default SWR options
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    ...options,
  });
};

/**
 * Get formula history with mock data for development
 * @param {Object} params - Query parameters
 * @param {string} params.search - Search term
 * @param {number} params.page - Page number
 * @param {number} params.limit - Records per page
 * @param {string} params.action - Filter by action
 * @param {string} params.formulaId - Filter by formula ID
 * @returns {Promise} - Mock data promise
 */
export const getFormulaHistoryMock = async (params = {}) => {
  const { search = "", page = 1, limit = 10, action = "", formulaId = "" } = params;
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let filteredData = mockAPIResult.Data.data;
  
  // Apply search filter
  if (search) {
    filteredData = filteredData.filter(history => 
      history.name.toLowerCase().includes(search.toLowerCase()) ||
      history.action.toLowerCase().includes(search.toLowerCase()) ||
      history.createdBy.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  // Apply action filter
  if (action) {
    filteredData = filteredData.filter(history => 
      history.action.toLowerCase() === action.toLowerCase()
    );
  }
  
  // Apply formula ID filter
  if (formulaId) {
    filteredData = filteredData.filter(history => 
      history.formulaId === formulaId
    );
  }
  
  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);
  
  return {
    ...mockAPIResult,
    Data: {
      ...mockAPIResult.Data,
      data: paginatedData,
      pagination: {
        ...mockAPIResult.Data.pagination,
        page: page,
        total: filteredData.length,
        totalPages: Math.ceil(filteredData.length / limit),
        hasNext: endIndex < filteredData.length,
        hasPrev: page > 1,
      }
    }
  };
};

/**
 * Get action display text
 * @param {string} action - Action code
 * @returns {string} - Display text
 */
export const getActionDisplayText = (action) => {
  const actionMap = {
    CREATE: "Dibuat",
    UPDATE: "Diperbarui", 
    DELETE: "Dihapus",
    ACTIVATE: "Diaktifkan",
    DEACTIVATE: "Dinonaktifkan"
  };
  
  return actionMap[action] || action;
};

/**
 * Get action color class
 * @param {string} action - Action code
 * @returns {string} - CSS class
 */
export const getActionColorClass = (action) => {
  const colorMap = {
    CREATE: "text-green-600 bg-green-100",
    UPDATE: "text-blue-600 bg-blue-100",
    DELETE: "text-red-600 bg-red-100",
    ACTIVATE: "text-green-600 bg-green-100",
    DEACTIVATE: "text-orange-600 bg-orange-100"
  };
  
  return colorMap[action] || "text-gray-600 bg-gray-100";
};

/**
 * Get status display text
 * @param {boolean} isActive - Active status
 * @returns {string} - Display text
 */
export const getStatusDisplayText = (isActive) => {
  return isActive ? "Aktif" : "Tidak Aktif";
};

/**
 * Get status color class
 * @param {boolean} isActive - Active status
 * @returns {string} - CSS class
 */
export const getStatusColorClass = (isActive) => {
  return isActive ? "text-green-600" : "text-red-600";
};

/**
 * Get status badge class
 * @param {boolean} isActive - Active status
 * @returns {string} - CSS class for badge
 */
export const getStatusBadgeClass = (isActive) => {
  return isActive 
    ? "bg-green-100 text-green-800 border-green-200" 
    : "bg-red-100 text-red-800 border-red-200";
};

/**
 * Get variables display text
 * @param {Array} variables - Array of variables
 * @param {number} maxLength - Maximum length to display
 * @returns {string} - Display text
 */
export const getVariablesDisplayText = (variables, maxLength = 50) => {
  if (!variables || !Array.isArray(variables) || variables.length === 0) {
    return "Tidak ada variabel";
  }
  
  const variableNames = variables.map(v => v.variableName).join(", ");
  
  if (variableNames.length <= maxLength) {
    return variableNames;
  }
  
  return `${variableNames.substring(0, maxLength)}...`;
};

/**
 * Get variables count text
 * @param {Array} variables - Array of variables
 * @returns {string} - Count text
 */
export const getVariablesCountText = (variables) => {
  if (!variables || !Array.isArray(variables)) {
    return "0 variabel";
  }
  
  const count = variables.length;
  return count === 1 ? "1 variabel" : `${count} variabel`;
};

/**
 * Get source display text
 * @param {boolean} isFromShipper - Whether from shipper
 * @returns {string} - Display text
 */
export const getSourceDisplayText = (isFromShipper) => {
  return isFromShipper ? "Shipper" : "Sistem";
};

/**
 * Get source color class
 * @param {boolean} isFromShipper - Whether from shipper
 * @returns {string} - CSS class
 */
export const getSourceColorClass = (isFromShipper) => {
  return isFromShipper ? "text-blue-600" : "text-green-600";
};

/**
 * Get source badge class
 * @param {boolean} isFromShipper - Whether from shipper
 * @returns {string} - CSS class for badge
 */
export const getSourceBadgeClass = (isFromShipper) => {
  return isFromShipper 
    ? "bg-blue-100 text-blue-800 border-blue-200" 
    : "bg-green-100 text-green-800 border-green-200";
};

/**
 * Filter history by action
 * @param {Array} historyData - Array of history data
 * @param {string} action - Action to filter by
 * @returns {Array} - Filtered history data
 */
export const filterHistoryByAction = (historyData, action) => {
  if (!historyData || !Array.isArray(historyData) || !action) return historyData;
  
  return historyData.filter(history => 
    history.action.toLowerCase() === action.toLowerCase()
  );
};

/**
 * Filter history by formula ID
 * @param {Array} historyData - Array of history data
 * @param {string} formulaId - Formula ID to filter by
 * @returns {Array} - Filtered history data
 */
export const filterHistoryByFormulaId = (historyData, formulaId) => {
  if (!historyData || !Array.isArray(historyData) || !formulaId) return historyData;
  
  return historyData.filter(history => history.formulaId === formulaId);
};

/**
 * Search history by name
 * @param {Array} historyData - Array of history data
 * @param {string} searchTerm - Search term
 * @returns {Array} - Filtered history data
 */
export const searchHistoryByName = (historyData, searchTerm) => {
  if (!historyData || !Array.isArray(historyData) || !searchTerm) return historyData;
  
  return historyData.filter(history => 
    history.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

/**
 * Sort history by date
 * @param {Array} historyData - Array of history data
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted history data
 */
export const sortHistoryByDate = (historyData, order = 'desc') => {
  if (!historyData || !Array.isArray(historyData)) return [];
  
  return [...historyData].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    const comparison = dateA - dateB;
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * Sort history by action
 * @param {Array} historyData - Array of history data
 * @param {string} order - Sort order ('asc' or 'desc')
 * @returns {Array} - Sorted history data
 */
export const sortHistoryByAction = (historyData, order = 'asc') => {
  if (!historyData || !Array.isArray(historyData)) return [];
  
  return [...historyData].sort((a, b) => {
    const comparison = a.action.localeCompare(b.action);
    return order === 'desc' ? -comparison : comparison;
  });
};

/**
 * Get history statistics
 * @param {Array} historyData - Array of history data
 * @returns {Object} - Statistics object
 */
export const getHistoryStatistics = (historyData) => {
  if (!historyData || !Array.isArray(historyData)) {
    return {
      total: 0,
      byAction: {},
      byStatus: { active: 0, inactive: 0 },
      byFormula: {},
      totalVariables: 0
    };
  }
  
  const stats = {
    total: historyData.length,
    byAction: {},
    byStatus: { active: 0, inactive: 0 },
    byFormula: {},
    totalVariables: 0
  };
  
  historyData.forEach(history => {
    // Count by action
    stats.byAction[history.action] = (stats.byAction[history.action] || 0) + 1;
    
    // Count by status
    if (history.isActive) {
      stats.byStatus.active++;
    } else {
      stats.byStatus.inactive++;
    }
    
    // Count by formula
    stats.byFormula[history.formulaId] = (stats.byFormula[history.formulaId] || 0) + 1;
    
    // Count total variables
    if (history.variables && Array.isArray(history.variables)) {
      stats.totalVariables += history.variables.length;
    }
  });
  
  return stats;
};
