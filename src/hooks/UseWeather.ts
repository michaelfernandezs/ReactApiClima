import axios  from "axios"
import { SearchType } from "../types"
export  default function  useWeather(){
    const fetchWeather=async(search:SearchType)=>{
       const appId='a26d897d04526d9b0d8e43b892ef7e72'
       try{
                const geoURL=`https://api.openweathermap.org/data/2.5/weather?q=${search.city},{search.country}&appid=${appId}`

                console.log(geoURL)
       } catch(error){

       }
    }
    return{
        fetchWeather
    }
}