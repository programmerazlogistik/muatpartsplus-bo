// src/services/useGetVendorInternational.js
import useSWR from "swr";

import { fetcherMock } from "@/lib/axios";

const USE_MOCK = true;

/**
 * @typedef {Object} PinPoint
 * @property {number} latitude - The latitude of the location.
 * @property {number} longitude - The longitude of the location.
 */

/**
 * @typedef {Object} CompanyPhoneNumber
 * @property {number} id - The unique ID of the phone number.
 * @property {string} number - The phone number.
 */

/**
 * @typedef {Object} AccountInformation
 * @property {string} email - The account email.
 * @property {string} phoneNumber - The account phone number.
 */

/**
 * @typedef {Object} PicInformation
 * @property {string} name - The name of the Person in Charge.
 * @property {string} email - The email of the PIC.
 * @property {string} phoneNumber - The phone number of the PIC.
 * @property {string} position - The position of the PIC.
 */

/**
 * @typedef {Object} CompanyInformation
 * @property {string} name - The company name.
 * @property {string} type - The company type (e.g., 'ltd').
 * @property {string} productType - The product type (e.g., 'oem').
 * @property {string} addressDetail - The detailed address.
 * @property {string} city - The city.
 * @property {string} postalCode - The postal code.
 * @property {PinPoint} pinPoint - The geographic coordinates of the company.
 * @property {CompanyPhoneNumber[]} phoneNumbers - A list of company phone numbers.
 */

/**
 * @typedef {Object} VendorData
 * @property {AccountInformation} accountInformation - Account-related information.
 * @property {PicInformation} picInformation - PIC-related information.
 * @property {CompanyInformation} companyInformation - Company-related information.
 */

/**
 * @typedef {Object} APIResponse
 * @property {Object} Message
 * @property {number} Message.Code
 * @property {string} Message.Text
 * @property {VendorData} Data
 * @property {string} Type
 */

/**
 * @typedef {Object} MockAPIResult
 * @property {APIResponse} data - Mock API response data
 */

/** @type {MockAPIResult} */
export const mockAPIResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Success get international vendor data",
    },
    Data: {
      accountInformation: {
        email: "djada@gmail.com",
        phoneNumber: "878212312322",
      },
      picInformation: {
        name: "huaaaa",
        email: "huaaaa@gmail.com",
        phoneNumber: "878212312322",
        position: "Account executive",
      },
      companyInformation: {
        name: "PT. Sukarindo",
        type: "ltd",
        productType: "oem",
        addressDetail: "Jl. jalan - saja",
        city: "surabaya",
        postalCode: "612312",
        pinPoint: {
          latitude: -7.289161,
          longitude: 112.753335,
        },
        phoneNumbers: [{ id: 1, number: "878212312322" }],
      },
    },
    Type: "GET_INTERNATIONAL_VENDOR",
  },
};

/**
 * Fetches international vendor data.
 * @returns {Promise<VendorData>}
 */
export const fetcherInternationalVendor = async () => {
  let response;
  if (USE_MOCK) {
    response = mockAPIResult;
  } else {
    // Replace with your actual API endpoint
    response = await fetcherMock.get("/v1/international-vendor/1");
  }
  return response.data?.Data;
};

/**
 * @typedef {Object} UseGetVendorInternationalReturn
 * @property {VendorData|null} data
 * @property {Error|null} error
 * @property {boolean} isLoading
 * @property {Function} mutate
 */

/**
 * SWR hook for fetching international vendor data.
 * @returns {UseGetVendorInternationalReturn}
 */
export const useGetVendorInternational = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "international-vendor-detail",
    fetcherInternationalVendor
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};
