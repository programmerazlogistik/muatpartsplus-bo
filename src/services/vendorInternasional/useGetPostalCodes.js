import useSWR from "swr";
import { fetcherMuatparts } from "@/lib/axios";

const isMockData = true;

const apiResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Success get postal codes",
    },
    Data: {
      codes: [
        { value: "612312", name: "612312" },
        { value: "612313", name: "612313" },
        { value: "612314", name: "612314" },
      ],
    },
  },
};

export const fetcherPostalCodes = async (city) => {
  if (isMockData) {
    return apiResult.data.Data;
  }
  const result = await fetcherMuatparts.get(`v1/postal-codes?city=${city}`);
  return result?.data?.Data || {};
};

export const useGetPostalCodes = (city) =>
  useSWR(city ? `postal-codes-list-${city}` : null, () =>
    fetcherPostalCodes(city)
  );