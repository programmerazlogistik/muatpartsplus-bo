import useSWR from "swr";
import { fetcherMuatparts } from "@/lib/axios";

const isMockData = true;

const apiResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Success: Vendor details retrieved.",
    },
    Data: {
      businessLegalEntity: {
        businessLicense: "File.pdf",
        companyRegistration: "File.pdf",
        vatCertificate: "File.pdf",
        history: [
          {
            id: 1,
            lastUpdate: "20/01/2024 17.07",
            businessLicenseFile: "File.pdf",
            companyRegistrationFile: "File.pdf",
          },
          {
            id: 2,
            lastUpdate: "20/01/2024 17.07",
            businessLicenseFile: "File.pdf",
            companyRegistrationFile: "File.pdf",
          },
          {
            id: 3,
            lastUpdate: "20/01/2024 17.06",
            businessLicenseFile: "File.pdf",
            companyRegistrationFile: "File.pdf",
          },
          {
            id: 4,
            lastUpdate: "20/01/2024 17.05",
            businessLicenseFile: "File.pdf",
            companyRegistrationFile: "File.pdf",
          },
          {
            id: 5,
            lastUpdate: "20/01/2024 17.00",
            businessLicenseFile: "File.pdf",
            companyRegistrationFile: "File.pdf",
          },
        ],
      },
      directorInformation: {
        identityCardFile: "File.pdf",
        identityCardNumber: "312424121222",
        name: "Yayan Hendrawan",
        position: "Direktur Utama",
        statementLetterFile: "File.pdf",
      },
      brands: [
        {
          id: "brand_1",
          name: "Isuzu",
          iprFile: "File.pdf",
          registrationDate: "2000-05-30",
          originCertificateFile: "File.pdf",
        },
        {
          id: "brand_2",
          name: "Isuzu",
          iprFile: "File.pdf",
          registrationDate: "2000-05-30",
          originCertificateFile: "File.pdf",
        },
      ],
      productCatalog: "File.pdf",
    },
    Type: "GetVendorInternationalDetail",
  },
};

export const fetcherVendorInternationalDetail = async () => {
  if (isMockData) {
    return apiResult.data.Data;
  }
  const result = await fetcherMuatparts.get("v1/vendor/international-detail");
  return result?.data?.Data || {};
};

export const useGetVendorLegality = () =>
  useSWR("vendor-international-detail", fetcherVendorInternationalDetail);