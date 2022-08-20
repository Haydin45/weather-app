import React from "react";
import { useHeader } from "../../context/header/HeaderContext";
import { useWeather } from "../../context/weather/WeatherContext";

const Header = () => {
  const { provinceList, handleSelect } = useHeader();
  const { loading } = useWeather();

  const turkishToEnglish = (word) => {
    return word
      .replace(/Ğ/g, "G")
      .replace(/ğ/g, "g")
      .replace(/Ü/g, "U")
      .replace(/ü/g, "u")
      .replace(/Ş/g, "S")
      .replace(/ş/g, "s")
      .replace(/İ/g, "I")
      .replace(/ı/g, "i")
      .replace(/Ö/g, "O")
      .replace(/ö/g, "o")
      .replace(/Ç/g, "C")
      .replace(/ç/g, "c");
  };

  return (
    <div className="wr-header">
      <select onChange={(e) => e.target.value && handleSelect(e.target.value)}>
        <option value="">
          {provinceList.length ? "Lütfen şehir seçiniz..." : "Yükleniyor..."}
        </option>

        {provinceList && provinceList.length
          ? provinceList.map((province) => {
              return (
                <option
                  value={turkishToEnglish(province)}
                  key={provinceList.indexOf(province)}
                >
                  {province}
                </option>
              );
            })
          : null}
      </select>
      {loading && <span className="loading">Yükleniyor...</span>}
    </div>
  );
};

export default Header;
