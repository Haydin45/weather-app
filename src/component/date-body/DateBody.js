import React from "react";
import DateCard from "../date-card/DateCard";
import { useWeather } from "../../context/weather/WeatherContext";

const DateBody = () => {
  const { weatherForecast, loading } = useWeather();

  return (
    <div className="wr-body">
      {!loading && weatherForecast && weatherForecast.length
        ? weatherForecast.map((dailyForecast, index) => {
            return <DateCard key={index} dailyForecast={dailyForecast} />;
          })
        : null}
    </div>
  );
};

export default DateBody;
