import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";
import { getWeathers } from "../../network/requests/weathers";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [weatherForecast, setWeatherForecast] = useState([]);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  useMemo(() => {
    navigator.geolocation.getCurrentPosition((position) =>
      setLocation((prevState) => {
        return {
          ...prevState,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
      })
    );
  }, [setLocation]);

  useEffect(() => {
    const dayList = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];

    const getData = async (location) => {
      setLoading(true);
      const res = await getWeathers(location.latitude, location.longitude);
      setLoading(false);

      const forecastList = res.data.daily.map((forecast) => {
        const date = new Date((forecast.dt - res.data.timezone_offset) * 1000);

        return {
          day: dayList[date.getDay()],
          isToday: new Date().toDateString() === date.toDateString(),
          tempMax: Math.round(forecast.temp.max),
          tempMin: Math.round(forecast.temp.min),
          description: forecast.weather[0].description,
          icon: `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`,
        };
      });

      setWeatherForecast(forecastList);
    };

    location && getData(location);
  }, [location]);

  return (
    <WeatherContext.Provider
      value={{
        weatherForecast,
        setWeatherForecast,
        location,
        setLocation,
        loading,
        setLoading,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => useContext(WeatherContext);
