export interface Coord{
    lon:number;
    lat:number;
}

export interface WeatherCondition{
    id:number;
    main:string;
    description:string;
    icon:string;
}

export interface MainWeather{
    temp:number;
    feel_like:number;
    temp_min:number;
    temp_max:number;
    pressure:number;
    humidity:number;
    sealevel?:number;
    grand_level?:number;
}

export interface Wind{
    speed:number;
    deg:number;
    gust?:number;
}

export interface Clouds{
    all:number;
}

export interface Sys{
    type?:number;
    id?:number;
    country:string;
    sunrise:number;
    sunset:number;
}

export interface WeatherData {//上の型すべてを集約
  coord: Coord;
  weather: WeatherCondition[];
  base: string;
  main: MainWeather;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastItem{
    dt:number;
    main:MainWeather;
    weather:WeatherCondition[];
    wind:Wind;
    dt_txt:string;
}

export interface ForecastData{
    list:ForecastItem[];
    city:{
        name:string;
        county:string;
    };
}