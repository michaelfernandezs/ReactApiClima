import axios  from "axios"
import { SearchType } from "../types"
export  default function  useWeather(){
    const fetchWeather=async(search:SearchType)=>{
       const appId='25fd904ed3ff9cb1f2b917eb952b1c3d'
       try{
                const geoURL=`https://api.openweathermap.org/data/2.5/weather?q=${search.city},
                ${search.country}&appid=${appId}`

                const {data} = await axios(geoURL)
                console.log(data)
                const lat=data[0].lat
                const lon=data[0].lon
                const weatherURL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid={appId}`

                const {data:weatherResult}= await axios(weatherURL)
                console.log(weatherResult)
       } catch(error){

       }
    }
    return{
        fetchWeather
    }
}