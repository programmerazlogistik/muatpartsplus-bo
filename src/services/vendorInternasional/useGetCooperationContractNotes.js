// src/services/useGetCooperationContractNotes.js
import useSWR from "swr";

import { fetcherMuatparts } from "@/lib/axios";

const isMockData = true;

const apiResult = {
  data: {
    Message: {
      Code: 200,
      Text: "Success: The cooperation contract notes were retrieved successfully.",
    },
    Data: {
      notes:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed mauris laoreet, luctus erat at, viverra nisl. Donec tristique, sapien eu feugiat efficitur, enim orci euismod augue, at cursus diam nisl id orci. Pellentesque vitae aliquet elit. Quisque sed metus congue, sollicitudin leo vel, vulputate enim. Nullam placerat nulla et purus dignissim euismod. Nunc in eleifend nulla. Mauris a tempor lacus, vel facilisis metus. Nulla velit ante, hendrerit non mollis vel, aliquam eu mi. Duis integer.",
    },
    Type: "cooperation-contract-notes",
  },
};

export const fetcherCooperationContractNotes = async () => {
  if (isMockData) {
    const result = apiResult;
    return result.data.Data;
  }

  const result = await fetcherMuatparts.get("v1/cooperation-contract/notes");
  return result?.data?.Data || {};
};

export const useGetCooperationContractNotes = () =>
  useSWR("cooperation-contract-notes", fetcherCooperationContractNotes);