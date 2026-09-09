import { useState } from "react";
import { ForecastData, WeatherData } from "../types/weather";
import { fetchForecast, fetchForecastLocatiuonData, fetchNowLocationData, fetchWeather } from "../lib/api_weather";

export function useWeather(){
    const [weather,setWeather]=useState<WeatherData|null>(null);
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState<string|null>(null);
    const [forecast,setFocast]=useState<ForecastData|null>(null);

    const search=async(city:string)=>{
        if(!city.trim()){
            return;
        }
        setIsLoading(true);
        setError(null);
        setWeather(null);
        setFocast(null);

        try{
            const [weatherData,ForecastData]=await Promise.all([
                fetchWeather(city),
                fetchForecast(city),
            ]);
            setWeather(weatherData);
            setFocast(ForecastData);
        }catch(err){
            setError(
                err instanceof Error ? err.message:"不明なエラーが発生しました"
            );
        }finally{
            setIsLoading(false);
        }
    };

    const searchByLocation=()=>{
        if(!navigator.geolocation){
            setError("このブラウザは現在地取得に対応していません");
            return;
        }

        setIsLoading(true);
        setError(null);
        setFocast(null);
        setWeather(null);

        navigator.geolocation.getCurrentPosition(
            async (position)=>{
                try{
                    const [weatherData,ForecastData]=await Promise.all([
                        fetchNowLocationData(position.coords.latitude,position.coords.longitude),
                        fetchForecastLocatiuonData(position.coords.latitude,position.coords.longitude),
                    ]);
                    setWeather(weatherData);
                    setFocast(ForecastData);
                }catch(err){
                    setError(err instanceof Error ? err.message : "不明なエラーが発生しました");
                }finally{
                    setIsLoading(false);
                }
            },()=>{
                //取得失敗したら東京を検索
                search("Tokyo");
            }
        );
    };

    return{weather,isLoading,error,search,forecast,searchByLocation};
}