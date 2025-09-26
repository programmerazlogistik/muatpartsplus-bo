import useSWR from "swr";
import { fetcherMuatparts } from "@/lib/axios";

const isMockData = true;

const apiResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Success get vendor detail",
    },
    Data: {
      email: "djada@gmail.com",
      phoneNumber: "878212312322",
      picName: "huaaaa",
      picEmail: "huaaaa@gmail.com",
      picPhoneNumber: "878212312322",
      position: "Account executive",
      companyName: "PT. Sukarindo",
      companyType: "Ltd",
      productType: "OEM",
      addressDetail: "Jl. jalan - saja",
      companyLocationGmaps: "Surabaya",
      city: "Surabaya",
      postalCode: "612312",
      pinPoint: {
        latitude: -7.2926,
        longitude: 112.727,
      },
      companyPhoneNumbers: [
        {
          id: 1,
          number: "878212312322",
        },
      ],
    },
    Type: "vendor-detail",
  },
};

export const fetcherVendorDetail = async () => {
  if (isMockData) {
    return apiResult.data.Data;
  }
  const result = await fetcherMuatparts.get("v1/vendor/international/detail");
  return result?.data?.Data || {};
};

export const useGetVendorDetail = () =>
  useSWR("vendor-detail-international", fetcherVendorDetail);