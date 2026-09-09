import { useEffect, useState } from "react";
import { CityList } from "../lib/favoriteCity";
import { title } from "process";

const STORAGE_KEY="weather-app-favorites";

export function useFavprites(){
    const [favoriteCity,setFavoriteCity]=useState(CityList);

    useEffect(()=>{//初めに描画する
        const saved=localStorage.getItem(STORAGE_KEY);
        if(saved){
            setFavoriteCity(JSON.parse(saved));
        }
    },[]);

    const deleteFavoriteCity=(cityId:number)=>{
        setFavoriteCity((prev)=>{//変更用の配列に代入
            const updated=prev.filter((favCity)=>favCity.id!==cityId);//対象のもののみ取り除く
            localStorage.setItem(STORAGE_KEY,JSON.stringify(updated));//新しくlocalStorageに代入
            return updated;
        });
    };

    const addFavoriteCity=(cityName:string)=>{
        setFavoriteCity((prev)=>{//変更用の配列に代入する
            const isAlreadyAdded=favoriteCity.some((c)=>c.title===cityName);
            if(isAlreadyAdded){//重複確認
                return prev;
            }
            const updated=[...prev,{id:Date.now(),title:cityName},];//localstorageに入れるために新しい変数を作る
            localStorage.setItem(STORAGE_KEY,JSON.stringify(updated));//set
            return updated;
        });
    };
    return{favoriteCity,addFavoriteCity,deleteFavoriteCity};
};