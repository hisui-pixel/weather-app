// lib/forecastUtils.ts
import { ForecastData, ForecastItem } from "../types/weather";

export function getDailyForecast(forecast: ForecastData): ForecastItem[] {
  // 正午(12:00:00)のデータだけを抽出 = 1日1件に絞る
  return forecast.list.filter((item) => item.dt_txt.includes("12:00:00"));
}