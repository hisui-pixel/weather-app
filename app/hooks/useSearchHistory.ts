"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY="weather-app-history";
const MAX_HISTORY=5;

export function useSearchHistory(){
    const [history,setHistory]=useState<string[]>([]);
    useEffect(()=>{//最初にストレージを確認する
        const saved=localStorage.getItem(STORAGE_KEY);
        if(saved){//空でないならJSONをJSのデータに変換
            setHistory(JSON.parse(saved));//変換用の配列にデータを代入
        }
    },[]);

    const addHistory=(cityName:string)=>{
        setHistory((prev)=>{
            const filterd=prev.filter((c)=>c!==cityName);//重複を防ぐ
            const updated=[cityName,...filterd].slice(0,MAX_HISTORY);//配列をマックス5にする
            localStorage.setItem(STORAGE_KEY,JSON.stringify(updated));//保存
            return updated;
        });
    };
    return{history,addHistory};
};