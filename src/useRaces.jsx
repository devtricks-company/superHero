import { useQuery } from "@tanstack/react-query";
import fetchRaces from "./fetchRaces";

export default function useRaces(publisher) {
  const result = useQuery(["RaceList", publisher], fetchRaces);

  return [result?.data ?? [], result?.status];
}
