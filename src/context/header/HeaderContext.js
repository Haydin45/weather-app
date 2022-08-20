import React, { createContext, useContext, useMemo, useState } from "react";
import {
  getCityCoordinates,
  getProvincesOfTheCountry,
} from "../../network/requests/cities";
import { useWeather } from "../weather/WeatherContext";

const HeaderContext = createContext();

export const HeaderProvider = ({ children }) => {
  const { setLoading, setLocation } = useWeather();
  const [provinceList, setProvinceList] = useState([]);

  useMemo(() => {
    const getProvinces = async (country) => {
      const res = await getProvincesOfTheCountry(country);

      const provinces = res.data.data.states.map((province) => {
        const name = province.name.replace(" Province", "");
        return name;
      });

      setProvinceList(provinces);
    };

    getProvinces("turkey");
  }, [setProvinceList]);

  const handleSelect = async (province) => {
    setLoading(true);
    const res = await getCityCoordinates(province);

    res.data.length &&
      setLocation((prevState) => {
        return {
          ...prevState,
          latitude: res.data[0].lat,
          longitude: res.data[0].lon,
        };
      });
  };

  return (
    <HeaderContext.Provider value={{ provinceList, handleSelect }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeader = () => useContext(HeaderContext);
