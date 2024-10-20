export const formatTemperature=(tempeture:number):number=>{
    return Math.round(tempeture - 273.15); // Convert Kelvin to Celsius
}