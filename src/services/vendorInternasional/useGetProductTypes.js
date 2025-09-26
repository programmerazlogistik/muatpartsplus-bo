import useSWR from "swr";
import { fetcherMuatparts } from "@/lib/axios";

const isMockData = true;

const apiResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Success get product types",
    },
    Data: {
      types: [
        { value: "OEM", name: "OEM" },
        { value: "Genuine", name: "Genuine" },
        { value: "Aftermarket", name: "Aftermarket" },
      ],
    },
  },
};

export const fetcherProductTypes = async () => {
  if (isMockData) {
    return apiResult.data.Data;
  }
  const result = await fetcherMuatparts.get("v1/product-types");
  return result?.data?.Data || {};
};

export const useGetProductTypes = () =>
  useSWR("product-types-list", fetcherProductTypes);