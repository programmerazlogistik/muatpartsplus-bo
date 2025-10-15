import useSWR from "swr";

import { fetcherMock } from "@/lib/axios";

const USE_MOCK = true;

/**
 * @typedef {Object} BusinessCategoryOption
 * @property {string} id - The unique ID of the business category.
 * @property {string} name - The name of the business category.
 */

/**
 * @typedef {Object} BusinessCategoryData
 * @property {BusinessCategoryOption[]} options - An array of business category options.
 */

/**
 * @typedef {Object} APIResponse
 * @property {object} Message
 * @property {number} Message.Code
 * @property {string} Message.Text
 * @property {BusinessCategoryData} Data
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
      Text: "Success getting business category options",
    },
    Data: {
      options: [
        { id: "transportasi", name: "Transportasi & Logistik" },
        { id: "manufaktur", name: "Manufaktur" },
        { id: "perdagangan", name: "Perdagangan" },
        { id: "jasa", name: "Jasa" },
      ],
    },
    Type: "GET_BUSINESS_CATEGORY_OPTIONS",
  },
};

/**
 * Fetches business category options from the API.
 * @returns {Promise<BusinessCategoryData>} The business category options data.
 */
export const fetcherBusinessCategoryOptions = async () => {
  const response = USE_MOCK
    ? mockAPIResult
    : await fetcherMock.get("/v1/options/business-categories");
  return response.data?.Data;
};

/**
 * @typedef {Object} UseGetBusinessCategoryOptionsReturn
 * @property {BusinessCategoryData|null} data
 * @property {Error|null} error
 * @property {boolean} isLoading
 * @property {Function} mutate
 */

/**
 * SWR hook for fetching business category options.
 * @returns {UseGetBusinessCategoryOptionsReturn}
 */
export const useGetBusinessCategoryOptions = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "business-category-options",
    fetcherBusinessCategoryOptions
  );

  return { data, error, isLoading, mutate };
};
