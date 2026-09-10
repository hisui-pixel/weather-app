import { ForecastData, GeocodingResults, WeatherData } from "../types/weather";

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
const BASE_URL="https://api.openweathermap.org/data/2.5/weather";

//URLの作成
export async function fetchWeather(city:string):Promise<WeatherData>{
    const res=await fetch(
        `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ja`
    );

    if(!res.ok){
        throw new Error(`天気データの取得に失敗しました(status:${res.status})`);
    }

    const data:WeatherData=await res.json();
    return data;
}

export async function fetchForecast(city:string):Promise<ForecastData>{
     const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ja`
  );
    if(!res.ok){
        throw new Error(`予報データの取得に失敗しました(status:${res.status})`);
    }
    const data:ForecastData=await res.json();
    return data;
}

export async function fetchNowLocationData(lat:number,lon:number):Promise<WeatherData>{
    const res=await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`
    );

    if(!res.ok){
        throw new Error(`天気データの取得に失敗しました(status:${res.status})`);
    }

    const data:WeatherData=await res.json();
    return data;
}

export async function fetchForecastLocatiuonData(lat:number,lon:number):Promise<ForecastData> {
    const res=await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`
    );
    if(!res.ok){
        throw new Error(`予報データの取得に失敗しました(status:${res.status})`);
    }
    const data:ForecastData=await res.json();
    return data;
}

// lib/api_weather.ts に追加
export async function fetchGeocoding(cityName: string): Promise<GeocodingResults[]> {
  const res = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`
  );

  if (!res.ok) {
    throw new Error(`都市の検索に失敗しました(status:${res.status})`);
  }

  const data: GeocodingResults[] = await res.json();
  return data;
}