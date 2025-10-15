import useSWR from "swr";

import { fetcherMock } from "@/lib/axios";

const USE_MOCK = true;

/**
 * @typedef {Object} BusinessEntityOption
 * @property {string} id - The unique ID of the business entity.
 * @property {string} name - The name of the business entity.
 */

/**
 * @typedef {Object} BusinessEntityData
 * @property {BusinessEntityOption[]} options - An array of business entity options.
 */

/**
 * @typedef {Object} APIResponse
 * @property {object} Message
 * @property {number} Message.Code
 * @property {string} Message.Text
 * @property {BusinessEntityData} Data
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
      Text: "Success getting business entity options",
    },
    Data: {
      options: [
        { id: "PT", name: "PT (Perseroan Terbatas)" },
        { id: "CV", name: "CV (Commanditaire Vennootschap)" },
        { id: "FIRMA", name: "Firma" },
        { id: "KOPERASI", name: "Koperasi" },
      ],
    },
    Type: "GET_BUSINESS_ENTITY_OPTIONS",
  },
};

/**
 * Fetches business entity options from the API.
 * @returns {Promise<BusinessEntityData>} The business entity options data.
 */
export const fetcherBusinessEntityOptions = async () => {
  const response = USE_MOCK
    ? mockAPIResult
    : await fetcherMock.get("/v1/options/business-entities");
  return response.data?.Data;
};

/**
 * @typedef {Object} UseGetBusinessEntityOptionsReturn
 * @property {BusinessEntityData|null} data
 * @property {Error|null} error
 * @property {boolean} isLoading
 * @property {Function} mutate
 */

/**
 * SWR hook for fetching business entity options.
 * @returns {UseGetBusinessEntityOptionsReturn}
 */
export const useGetBusinessEntityOptions = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "business-entity-options",
    fetcherBusinessEntityOptions
  );

  return { data, error, isLoading, mutate };
};
