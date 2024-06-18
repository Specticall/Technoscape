import { useQuery } from "@tanstack/react-query";
import { API } from "./Auth/API";
import { useState } from "react";
import { SuccessResponse } from "../utils/types";

type Props = {
  take: number;
};

export type Language = {
  id: string;
  language: string;
};

// We should probably dynamically adjust this to the amount of items stored inside the db.
const TOTAL_LANGUAGES_COUNT = 309;

export default function useLanguageQuery({ take }: Props) {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");

  const languageQuery = useQuery({
    queryFn: () =>
      API.get<
        SuccessResponse<{
          languages: Language[];
          count: number;
        }>
      >(`/language?page=${page}&take=${take}${query ? "&query=" + query : ""}`),
    queryKey: ["language", page, query],
  });

  const languageData = languageQuery.data?.data.data.languages;
  const languageCount =
    languageQuery.data?.data.data.count || TOTAL_LANGUAGES_COUNT;

  const MAX_PAGE = Math.floor(languageCount / take);

  const paginationInfo = {
    showing: `${page * take || 1} - ${
      page + 1 > MAX_PAGE ? languageCount : (page + 1) * take
    }`,
    outOf: languageCount,
  };

  const nextPage = () => {
    setPage((current) => {
      return current + 1 > MAX_PAGE ? current : current + 1;
    });
  };
  const prevPage = () => {
    setPage((current) => {
      return current - 1 < 0 ? 0 : current - 1;
    });
  };

  return {
    languageQuery,
    languageData,
    paginationInfo,
    setQuery,
    setPage,
    nextPage,
    prevPage,
  };
}
