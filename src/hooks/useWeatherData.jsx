import { useEffect, useState } from "react";
import useGeolocation from "./useGeolocation";
import useFetch from "./useFetch";

const API_KEY = "350e68d17c258c106cbb393c3b51ba8d";

export default function useWeatherData() {
  const { location, error: geoError } = useGeolocation();
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (location.lat && location.lon) {
      const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&lang=kr&appid=${API_KEY}`;
      setUrl(weatherUrl);
    }
  }, [location]);

  const { data, loading, error: fetchError } = useFetch(url);

  return { data, loading, fetchError, geoError };
}
