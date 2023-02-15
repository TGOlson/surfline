import { ForecastQuery, ForecastResponse, ForecastType } from "./types";

const BASE_FORECAST_URL = 'https://services.surfline.com/kbyg/spots/forecasts';

export async function fetchForecast<T extends ForecastType>(q: ForecastQuery<T>): Promise<ForecastResponse[T]> {
  const subPath = q.type === 'combined' ? '' : `/${q.type}`;
  const days = q.days ?? 1;
  const intervalHours = q.intervalHours ?? 12;

  const url = `${BASE_FORECAST_URL}${subPath}?spotId=${q.spotId}&days=${days}&intervalHours=${intervalHours}`;

  const res = await fetch(url);
  const resJSON = await res.json();

  if (res.status! !== 200) {
    throw new Error((resJSON as {message: string}).message)
  }

  return resJSON as ForecastResponse[T];
}
