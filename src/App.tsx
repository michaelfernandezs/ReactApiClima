import styles from "./App.module.css"
import Form from "./components/Form/Form"
import WeatherDetail from "./components/wheaterdetail/wheaterDetail"
import useWeather from "./hooks/UseWeather"
import Spinner from "./spinner/spinner"
  
function App() {

 
const {weather,loading,fetchWeather,hasWeatherData}=useWeather()
  return (
    <>
      <h1 className={styles.tittle}>Buscador de clima</h1>
      <div className={styles.container}>
          <Form
            fetchWeather={fetchWeather}
          />
          {loading&&<Spinner/>}
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
