import { useEffect, useState } from "react";
import { WeatherData } from "../types/weather";
import { fetchWeather } from "../lib/api_weather";//APIを叩く機能
import { DeleteCityButton } from "./Button";

interface FavoriteCityCardProps{
    cityId:number;
    cityTitle:string;
    onDelete:(id:number)=>void;
    onSelect:(cityTitle:string)=>void;
};

export function FavoriteCityCard({cityId,cityTitle,onDelete,onSelect}:FavoriteCityCardProps){
    const [cityWeather,setCityWeather]=useState<WeatherData|null>(null);
    
    useEffect(()=>{
        fetchWeather(cityTitle).
        then(setCityWeather)
        .catch(()=>setCityWeather(null));
    },[cityTitle]);

    return(
        <li className="relative flex-1 bg-gray-300/50 rounded-2xl text-white 
        text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)] p-4 min-h-32"
        onClick={()=>onSelect(cityTitle)}>
            <p className="text-4xl absolute left-4">{cityTitle}</p>
            {cityWeather?(
                <>
                <div className="">
                    <p className="text-5xl absolute top-4 right-4">{Math.round(cityWeather.main.temp)}°C</p>
                    <p className="text-2xl absolute left-4 bottom-4">
                        最高{Math.round(cityWeather.main.temp_max)}° / 最低{Math.round(cityWeather.main.temp_min)}
                    </p>
                </div>
                </>
            ):(
                <p>読み込み中...</p>
            )}
            <div className="absolute bottom-2 right-4"
            onClick={(e)=>e.stopPropagation()}//削除時に検索機能を発火させない
            >
                <DeleteCityButton
                cityId={cityId}
                onDelete={onDelete}/>
            </div>
        </li>
    );
};