import { ForecastQuery, ForecastResponse } from "./types";

const BASE_FORECAST_URL = 'https://services.surfline.com/kbyg/spots/forecasts';

const forecastUrl = ({type, spotId, days = 1, intervalHours = 12}: ForecastQuery): string => {
  const subPath = type === 'combined' ? '' : `/${type}`;
  
  return `${BASE_FORECAST_URL}${subPath}?spotId=${spotId}&days=${days}&intervalHours=${intervalHours}`;
}

export async function fetchForecast(q: ForecastQuery): Promise<ForecastResponse[typeof q['type']]> {
  const url = forecastUrl(q);
  const res = await fetch(url);
  return await res.json() as ForecastResponse[typeof q['type']];
}
