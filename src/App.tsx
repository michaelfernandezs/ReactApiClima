import styles from "./App.module.css"
import Form from "./components/Form/Form"
import WeatherDetail from "./components/wheaterdetail/wheaterDetail"
import useWeather from "./hooks/UseWeather"
  
function App() {

 
const {weather,fetchWeather,hasWeatherData}=useWeather()
  return (
    <>
      <h1 className={styles.tittle}>Buscador de clima</h1>
      <div className={styles.container}>
          <Form
            fetchWeather={fetchWeather}
          />
          {hasWeatherData && 
              <WeatherDetail 
                  weather={weather} 
              />
          }
      </div>
    </>
  )
}

export default App
