import axios from "axios";

import { FlightEntry, NewFlightEntry } from "../types";
import { apiBaseUrl } from "../constants";


const getAll = async () => {
  const { data } = await axios.get<FlightEntry[]>(
    `${apiBaseUrl}/api/diaries`
  );

  return data;
};

const addFlight = async (object: NewFlightEntry) => {
  const { data } = await axios.post<FlightEntry>(
    `${apiBaseUrl}/api/diaries`,
    object
  );

  return data;
};

export default {
  getAll, addFlight
};

