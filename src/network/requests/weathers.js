import { env } from "../env/env";
import { baseService } from "../services/baseService";

export const getWeathers = (
  latitude,
  longitude,
  exclude = "minutely,hourly",
  unit = "metric"
) => {
  return baseService.get(
    env.api,
    `forecast?lat=${latitude}&lon=${longitude}&exclude=${exclude}&units=${unit}`
  );
};
