import { env } from "../env/env";
import { baseService } from "../services/baseService";

export const getCityCoordinates = (cityName) => {
  return baseService.get(env.api, `coordinates?city=${cityName}`);
};

export const getProvincesOfTheCountry = (country) => {
  return baseService.get(
    env.countriesNow,
    `api/v0.1/countries/states/q?country=${country}`
  );
};
