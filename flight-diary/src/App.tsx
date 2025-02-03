import React, { useEffect, useState } from 'react';
import { FlightEntry, NewFlightEntry, Visibility, Weather } from './types';
import axios from 'axios';
import { apiBaseUrl } from './constants';
import flightService from "./services/flights";

const App = () => {
  const [flights, setFlights] = useState<FlightEntry[]>([]);
  const [error, setError] = useState<string>();
  const [newEntry, setNewEntry] = useState<NewFlightEntry>({
    date: '',
    visibility: Visibility.Great,
    weather: Weather.Sunny,
    comment: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry({
      ...newEntry,
      [name]: value,
    });
  };

  const addEntry = () => {
    submitNewFlight(newEntry);
    setNewEntry({
      date: '',
      visibility: Visibility.Great,
      weather: Weather.Sunny,
      comment: '',
    });
  };

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const flights = await flightService.getAll();
      setFlights(flights);
    };
    void fetchPatientList();
  }, []);

  const submitNewFlight = async (values: NewFlightEntry) => {
    setError(undefined);
    try {
      const flight = await flightService.addFlight(values);
      setFlights(flights.concat(flight));
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <h1>Flight Diary</h1>
      <div style={{ color: 'red' }}>{error}</div>
      <h2>Add new entry</h2>
      <div>
        <input
          type="date"
          name="date"
          value={newEntry.date}
          onChange={handleChange}
          placeholder="Date"
        />
        <div>
          <label>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Great}
              checked={newEntry.visibility === Visibility.Great}
              onChange={handleChange}
            />
            Great
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Good}
              checked={newEntry.visibility === Visibility.Good}
              onChange={handleChange}
            />
            Good
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Ok}
              checked={newEntry.visibility === Visibility.Ok}
              onChange={handleChange}
            />
            Ok
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value={Visibility.Poor}
              checked={newEntry.visibility === Visibility.Poor}
              onChange={handleChange}
            />
            Poor
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="weather"
              value={Weather.Sunny}
              checked={newEntry.weather === Weather.Sunny}
              onChange={handleChange}
            />
            Sunny
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value={Weather.Rainy}
              checked={newEntry.weather === Weather.Rainy}
              onChange={handleChange}
            />
            Rainy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value={Weather.Cloudy}
              checked={newEntry.weather === Weather.Cloudy}
              onChange={handleChange}
            />
            Cloudy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value={Weather.Stormy}
              checked={newEntry.weather === Weather.Stormy}
              onChange={handleChange}
            />
            Stormy
          </label>
          <label>
            <input
              type="radio"
              name="weather"
              value={Weather.Windy}
              checked={newEntry.weather === Weather.Windy}
              onChange={handleChange}
            />
            Windy
          </label>
        </div>
        <input
          type="text"
          name="comment"
          value={newEntry.comment}
          onChange={handleChange}
          placeholder="comment"
        />
        <button onClick={addEntry}>Add Entry</button>
      </div>
      <h2>Diary entries</h2>
      <ul>
        {flights.map((entry, index) => (
          <li key={index}>
            <p><strong>{entry.date}</strong></p>
            <p>visibility: {entry.visibility}</p>
            <p>weather: {entry.weather}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
