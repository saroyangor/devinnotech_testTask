import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { WeatherList } from '../WeatherList/WeatherList.tsx'

import { useAppDispatch, useAppSelector } from '../../store/hooks.ts'
import { getWeatherByCity } from '../../store/weatherSlice.ts'
import { getTemperature, Systems } from '../../utils/getTemperature.ts'

import styles from './Weather.module.scss'

export function Weather({city}: { city: string }) {
  const {date} = useParams()
  const weather = useAppSelector(state => state.weather.weather)
  const isCelsius = useAppSelector(state => state.system.celsius)
  const dispatch = useAppDispatch()

  const today = new Date()
  const currentDay = new Date(date || today).getDate()

  const weatherList = weather.list.filter(day => {
    return day.dt_txt.split('-')[2].split(' ')[0] === String(currentDay)
  })

  console.log(weatherList)

  useEffect(() => {
    dispatch(getWeatherByCity(city))
  }, [city, dispatch])

  if (!weather) {
    return <h1>Something went wrong!</h1>
  }

  const temperature = isCelsius ? getTemperature(weather.list[0]?.main.temp, Systems.CELSIUS) : getTemperature(weather.list[0]?.main.temp, Systems.FAHRENHEIT)

  return (
    <section className={styles.weather}>
      <div className={styles.left}>
        <h1>{weather.city.name}</h1>
        <p className={styles.temp}>
          {temperature}
          <img src={`https://openweathermap.org/img/wn/${weather.list[0]?.weather[0].icon}.png`} alt=""
               className={styles.icon}/>
        </p>
        <p>
          {weather.list[0]?.weather[0].description.charAt(0).toUpperCase() + weather.list[0]?.weather[0].description.slice(1)}
        </p>
      </div>

      <div className={styles.right}>
        {
          weatherList.length && weatherList.map((day, index) => (
            <WeatherList key={index} day={day}/>
          ))
        }
      </div>
    </section>
  )
}