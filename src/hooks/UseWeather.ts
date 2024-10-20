import axios  from "axios"
import { SearchType } from "../types"
import{z}from'zod' 
import { useMemo, useState } from "react"
//import{object,string,number,InferOutput,parse} from 'valibot'

/* function isWeatherResponse(weather:unknown): weather is Weather{

    return(
        Boolean(weather)&&
        typeof weather==='object' &&
        typeof (weather as Weather).name==='string'&&       
        typeof (weather as Weather).main.temp==='number' &&
        typeof (weather as Weather).main.temp_max==='number' &&
        typeof (weather as Weather).main.temp_min==='number'
  
    )
 
} */

   //zod


    const Weather = z.object({
       name: z.string(),
       main: z.object({
         temp: z.number(),
         temp_max: z.number(),
         temp_min: z.number()
       })
   }) 
 
   export type Weather=z.infer<typeof Weather>
   // valibot
/* const WeatherSchema = object({
    name: string(),
    main: object({
        temp: number(),
        temp_max: number(),
        temp_min: number()
    })
})
 */

  // type Weather=InferOutput<typeof WeatherSchema >
 
export  default function  useWeather(){
    const [weather, setWeather] = useState<Weather>({
        name: '',
        main: {
            temp: 0,
            temp_max: 0,
            temp_min: 0
        }
    })
    const fetchWeather=async(search:SearchType)=>{
       const appId='9a952f71b404c22bedd83532e1177ac3'
       try{
                const geoURL=`http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`

                const {data} = await axios(geoURL)
                
                const lat=data[0].lat
                const lon=data[0].lon
                const weatherURL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`
/*      castear el type
                const {data:weatherResult}= await axios<Weather>(weatherURL)
                console.log(weatherResult.temp)
                console.log(weatherResult.name) */
                
            //type  gards 
/* 
            const {data:weatherResult}= await axios(weatherURL)
            const result=isWeatherResponse(weatherResult)
            if(result){
                weatherResult.main 
            } */

            //zod    

            const{data:weatherResult}= await axios(weatherURL)
            const result=Weather.safeParse(weatherResult)
            if(result.success){
            
             setWeather(result.data)
            
            } 
            //valibot
        /*     const {data:weatherResult}= await axios(weatherURL)
            const result=parse(WeatherSchema,weatherResult)   
            if(result){
                console.log(result.name)
               
            }    */
       } catch(error){


            console.error( error)

       }
    }

    const hasWeatherData=useMemo(()=>weather.name,[weather])
    return{
        weather,
        fetchWeather,
        hasWeatherData
    }
}