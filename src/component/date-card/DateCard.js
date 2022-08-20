import React from "react";

const DateCard = ({ dailyForecast }) => {
  return (
    <div className={`forecast ${dailyForecast.isToday && "today"}`}>
      <h5 className="day">{dailyForecast.day}</h5>
      <img src={dailyForecast.icon} alt={dailyForecast.description} />
      <h5 className="temp">
        <span>{dailyForecast.tempMax}&deg;</span>{" "}
        <span className="min">{dailyForecast.tempMin}&deg;</span>
      </h5>
    </div>
  );
};

export default DateCard;
