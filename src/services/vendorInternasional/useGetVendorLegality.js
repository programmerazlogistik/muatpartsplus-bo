import useSWR from "swr";

import { fetcherMock } from "@/lib/axios";

const USE_MOCK = true;

/**
 * @typedef {Object} DocumentFile
 * @property {string} name - The name of the file.
 * @property {string} url - The URL to the file.
 */

/**
 * @typedef {Object} LegalHistoryItem
 * @property {string} id - The unique ID of the history item.
 * @property {string} date - The update date.
 * @property {DocumentFile} businessLicense - The business license document.
 * @property {DocumentFile} companyRegistration - The company registration document.
 */

/**
 * @typedef {Object} BrandInfo
 * @property {string} id - The unique ID of the brand.
 * @property {string} name - The brand name.
 * @property {DocumentFile} ipr - The Intellectual Property document.
 * @property {string} registrationDate - The registration date.
 * @property {DocumentFile} originCertificate - The Certificate of Origin document.
 */

/**
 * @typedef {Object} VendorLegalityData
 * @property {Object} businessLegalEntity
 * @property {DocumentFile} businessLegalEntity.businessLicense
 * @property {DocumentFile} businessLegalEntity.companyRegistration
 * @property {DocumentFile} businessLegalEntity.vatCertificate
 * @property {LegalHistoryItem[]} businessLegalEntity.history
 * @property {Object} directorInfo
 * @property {DocumentFile} directorInfo.idCard
 * @property {string} directorInfo.idCardNumber
 * @property {string} directorInfo.name
 * @property {string} directorInfo.position
 * @property {DocumentFile} directorInfo.statementLetter
 * @property {Object} exporterLegality
 * @property {BrandInfo[]} exporterLegality.brands
 * @property {Object} productList
 * @property {DocumentFile} productList.productCatalog
 */

/**
 * @typedef {Object} APIResponse
 * @property {Object} Message
 * @property {number} Message.Code
 * @property {string} Message.Text
 * @property {VendorLegalityData} Data
 * @property {string} Type
 */

/** @type {{data: APIResponse}} */
export const mockAPIResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Success",
    },
    Data: {
      businessLegalEntity: {
        businessLicense: { name: "File.pdf", url: "#" },
        companyRegistration: { name: "File.pdf", url: "#" },
        vatCertificate: { name: "File.pdf", url: "#" },
        history: [
          {
            id: "1",
            date: "20/01/2024 17.06",
            businessLicense: { name: "File.pdf", url: "#" },
            companyRegistration: { name: "File.pdf", url: "#" },
          },
          {
            id: "2",
            date: "20/01/2024 17.08",
            businessLicense: { name: "File.pdf", url: "#" },
            companyRegistration: { name: "File.pdf", url: "#" },
          },
          {
            id: "3",
            date: "20/01/2024 17.07",
            businessLicense: { name: "File.pdf", url: "#" },
            companyRegistration: { name: "File.pdf", url: "#" },
          },
          {
            id: "4",
            date: "20/01/2024 17.06",
            businessLicense: { name: "File.pdf", url: "#" },
            companyRegistration: { name: "File.pdf", url: "#" },
          },
          {
            id: "5",
            date: "20/01/2024 17.05",
            businessLicense: { name: "File.pdf", url: "#" },
            companyRegistration: { name: "File.pdf", url: "#" },
          },
          {
            id: "6",
            date: "20/01/2024 17.00",
            businessLicense: { name: "File.pdf", url: "#" },
            companyRegistration: { name: "File.pdf", url: "#" },
          },
        ],
      },
      directorInfo: {
        idCard: { name: "File.pdf", url: "#" },
        idCardNumber: "31244124121222",
        name: "Yayan Hendrawan",
        position: "Direktur Utama",
        statementLetter: { name: "File.pdf", url: "#" },
      },
      exporterLegality: {
        brands: [
          {
            id: "brand-1",
            name: "Isuzu",
            ipr: { name: "File.pdf", url: "#" },
            registrationDate: "30/05/2000",
            originCertificate: { name: "File.pdf", url: "#" },
          },
        ],
      },
      productList: {
        productCatalog: { name: "File.pdf", url: "#" },
      },
    },
    Type: "GET_VENDOR_LEGALITY_INTERNATIONAL",
  },
};

/**
 * Fetches vendor legality data.
 * @returns {Promise<VendorLegalityData>}
 */
export const fetcherVendorLegality = async () => {
  if (USE_MOCK) {
    return mockAPIResult.data.Data;
  }
  const response = await fetcherMock.get("/v1/vendor/legality/international");
  return response.data.Data;
};

/**
 * @typedef {Object} UseGetVendorLegalityReturn
 * @property {VendorLegalityData|null} data
 * @property {any} error
 * @property {boolean} isLoading
 * @property {Function} mutate
 */

/**
 * SWR hook to get vendor legality data.
 * @returns {UseGetVendorLegalityReturn}
 */
export const useGetVendorLegality = () => {
  const { data, error, isLoading, mutate } = useSWR(
    "vendor-legality-international",
    fetcherVendorLegality
  );

  return { data, error, isLoading, mutate };
};
