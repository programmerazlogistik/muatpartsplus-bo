import useSWR from "swr";
import { fetcherMuatparts } from "@/lib/axios";

const isMockData = true;

const apiResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Success get company types",
    },
    Data: {
      types: [
        { value: "Ltd", name: "Ltd" },
        { value: "Pte", name: "Pte" },
        { value: "Inc", name: "Inc" },
      ],
    },
  },
};

export const fetcherCompanyTypes = async () => {
  if (isMockData) {
    return apiResult.data.Data;
  }
  const result = await fetcherMuatparts.get("v1/company-types");
  return result?.data?.Data || {};
};

export const useGetCompanyTypes = () =>
  useSWR("company-types-list", fetcherCompanyTypes);