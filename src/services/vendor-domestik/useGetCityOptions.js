import useSWR from "swr";
import { fetcher } from "@/lib/axios";

const USE_MOCK = true;

/**
 * @typedef {Object} CityOption
 * @property {string} id - The unique ID of the city/regency.
 * @property {string} name - The name of the city/regency.
 */

/**
 * @typedef {Object} CityData
 * @property {CityOption[]} options - An array of city/regency options.
 */

/**
 * @typedef {Object} APIResponse
 * @property {object} Message
 * @property {number} Message.Code
 * @property {string} Message.Text
 * @property {CityData} Data
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
      Text: "Success getting city options",
    },
    Data: {
      options: [
        { id: "jakarta", name: "DKI Jakarta" },
        { id: "surabaya", name: "Surabaya" },
        { id: "bandung", name: "Bandung" },
        { id: "medan", name: "Medan" },
        { id: "semarang", name: "Semarang" },
      ],
    },
    Type: "GET_CITY_OPTIONS",
  },
};

/**
 * Fetches city/regency options from the API.
 * @returns {Promise<CityData>} The city/regency options data.
 */
export const fetcherCityOptions = async () => {
  const response = USE_MOCK ? mockAPIResult : await fetcher.get("/v1/options/cities");
  return response.data?.Data;
};

/**
 * @typedef {Object} UseGetCityOptionsReturn
 * @property {CityData|null} data
 * @property {Error|null} error
 * @property {boolean} isLoading
 * @property {Function} mutate
 */

/**
 * SWR hook for fetching city/regency options.
 * @returns {UseGetCityOptionsReturn}
 */
export const useGetCityOptions = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "city-options",
    fetcherCityOptions
  );

  return { data, error, isLoading, mutate };
};