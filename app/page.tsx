// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useWeather } from "./hooks/useWeather";
import { useFavprites } from "./hooks/useFavorites";
import { DeleteCityButton, FavoriteButton } from "./components/Button";
import { FavoriteCityCard } from "./components/FavoriteCityCard";
import { useSearchHistory } from "./hooks/useSearchHistory";
import { getDailyForecast } from "./lib/foecastUtils";
import {getBackgroundClass } from "./lib/weatherstyle";




export default function Home() {
  const [city, setCity] = useState("");
  const {weather,isLoading,error,search,forecast,searchByLocation}=useWeather();
  const {favoriteCity,addFavoriteCity,deleteFavoriteCity}=useFavprites();
  const {history,addHistory}=useSearchHistory();

  useEffect(()=>{//初めに東京で固定
    searchByLocation();
  },[]);

  // if(error){
  //   return <p style={{color:"red"}}>{error}</p>
  // }

  // if(!weather||isLoading){//空配列であるときそれを渡さないようにする
  //   return(
  //     <p>読み込み中...</p>
  //   );
  // }

  const handleSearchCity=(e:React.FormEvent)=>{
    e.preventDefault();
    search(city);
    addHistory(city);
    setCity("");
  };

  
  const UserFavoriteCity=favoriteCity.map((city)=>{//お気に入りの描画
    return(
      <FavoriteCityCard
      key={city.id}
      cityId={city.id}
      cityTitle={city.title}
      onDelete={deleteFavoriteCity}
      onSelect={search}
      />
    );
  });


  return(
    
    <>
    {weather && ! isLoading && (//weatehr|nullを回避

    <div className={`min-h-screen ${getBackgroundClass(weather.weather[0].main)}`}>

    <div className="flex flex-col items-center text-center w-full mt-16">

    {/* enterキーで検索可能 */}
      <form onSubmit={handleSearchCity}
          className="rounded-2xl py-2 px-4 border-gray-300 border-2 
          shadow mt-1 bg-gray-300 w-8/10 flex"
      >
        <input 
          type="text"
          value={city}
          onChange={(e)=>setCity(e.target.value)}
          placeholder="都市名を入力(例:Tokyo)"
          className="focus:outline-none flex-1"
          />
          <button
          type="submit"
          >検索</button>
      </form>
      {error &&(
        <p className="text-red-5oo mt-2">{error}</p>
      )}

    <ul className="flex flex-col w-8/10 m-8 gap-4">
      {UserFavoriteCity}
    </ul>
    

      <div className="main_weather flex flex-col items-center text-  center
    bg-gray-300/50 w-10/12 sm:w-3/4 md:w-1/2 p-4 sm:p-8 rounded-2xl">
        <div className="flex-1">
          <FavoriteButton
          onAdd={()=>addFavoriteCity(weather.name)}
          />
        </div>

        <h1 className="text-4xl">{weather.name}</h1>
        <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
        />
        <p className="text-7xl">{Math.round(weather.main.temp)}°C</p>
        <p className="text-4xl">湿度: {weather.main.humidity}%</p>
        <p>風速: {weather.wind.speed} m/s</p>
        <p>{weather.weather[0].description}</p>
      </div>

    {history.length > 0 && (
      <div className="text-sm text-white mt-2">
        最近の検索:{" "}
        {history.map((c) => (
          <button
            key={c}
            onClick={() => search(c)}
            className="underline mx-1"
          >
            {c}
          </button>
        ))}
      </div>
    )}

        {forecast && (
        <div className="flex gap-2 overflow-x-auto w-8/10 mt-4 mx-auto justify-center">
          {forecast.list.slice(0, 8).map((item) => (
            <div key={item.dt} className="rounded-2xl p-2 text-center
             bg-gray-300/50 min-w-[80px] text-white text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
              <p className="text-sm">
                {item.dt_txt.split(" ")[1].slice(0, 5)} {/* "12:00:00" → "12:00" */}
              </p>
              <p className="text-xs text-gray-500 text-shadow-none">
                {item.dt_txt.split(" ")[0].slice(5)} {/* "09-05" */}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
              />
              <p>{Math.round(item.main.temp)}°C</p>
            </div>
          ))}
        </div>
      )}

    {forecast && (
  <div className="flex gap-4 w-full m-8 justify-center">
    <ul className="flex flex-col gap-4 w-8/10">
      {getDailyForecast(forecast).map((item) => (
        <li key={item.dt} className="flex flex-col text-shadow-[2px_2px_4px_rgba(0,0,0,0.5)]">
          <div  className="rounded-2xl flex justify-between items-center p-4 bg-gray-300/50">
            {/* 左側: 日付・画像 */}
            <div className="flex items-center gap-2">
              <p className="text-2xl text-white">
                {item.dt_txt.split(" ")[0].slice(5)}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt={item.weather[0].description}
              />
            </div>

            {/* 右側: 気温 */}
            <p className="text-2xl text-white ">
              {Math.round(item.main.temp)}°C
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
)}

    </div>

    </div>
    )}
  
    </>
  );
};