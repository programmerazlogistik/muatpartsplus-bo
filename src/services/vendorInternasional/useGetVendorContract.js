// src/services/useGetVendorContract.js

import useSWR from "swr";

import { fetcher } from "@/lib/axios";

const USE_MOCK = true;

/**
 * @typedef {Object} Contract
 * @property {string} agreementNumber - The cooperation agreement number.
 * @property {string} agreementFileName - The name of the agreement file.
 * @property {string} cooperationNotes - Notes regarding the cooperation.
 * @property {string} cooperationDate - The start date of the cooperation.
 * @property {number} contractDuration - The duration of the contract in years.
 */

/**
 * @typedef {Object} VendorContractData
 * @property {string} swiftBicCode - The SWIFT/BIC code.
 * @property {string} accountNumber - The bank account number.
 * @property {string} accountHolderName - The name of the account holder.
 * @property {string} picFinancePhoneNumber - The phone number of the finance PIC.
 * @property {Contract[]} contracts - A list of contracts.
 */

/**
 * @typedef {Object} APIResponse
 * @property {Object} Message
 * @property {number} Message.Code
 * @property {string} Message.Text
 * @property {VendorContractData} Data
 * @property {string} Type
 */

/** @type {{data: APIResponse}} */
export const mockAPIResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Success: Vendor contract data retrieved.",
    },
    Data: {
      swiftBicCode: "098821312",
      accountNumber: "771281911911",
      accountHolderName: "Yayan Ruihiya",
      picFinancePhoneNumber: "Rini Iswahyuni",
      contracts: [
        {
          agreementNumber: "PKS/01/99912010",
          agreementFileName: "File.pdf",
          cooperationNotes: "Semua ada potongan harga minimal pesanan 10 koli",
          cooperationDate: "2002-02-28", // Using a valid date for the initial value
          contractDuration: 5,
        },
      ],
    },
    Type: "GET_VENDOR_CONTRACT",
  },
};

/**
 * Fetches vendor contract data from the API.
 * @returns {Promise<VendorContractData>} The vendor contract data.
 */
export const fetcherVendorContract = async () => {
  let response;
  if (USE_MOCK) {
    response = mockAPIResult;
  } else {
    // Replace with your actual API endpoint
    response = await fetcher.get("/v1/vendor/international/contract");
  }
  return response.data?.Data;
};

/**
 * @typedef {Object} UseGetVendorContractReturn
 * @property {VendorContractData|null} data
 * @property {Error|null} error
 * @property {boolean} isLoading
 * @property {Function} mutate
 */

/**
 * SWR hook for fetching vendor contract data.
 * @returns {UseGetVendorContractReturn}
 */
export const useGetVendorContract = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "vendor-contract",
    fetcherVendorContract
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};