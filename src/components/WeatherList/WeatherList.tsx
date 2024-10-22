import styles from './WeatherList.module.scss'

import { List } from '../../store/weatherSlice.ts'
import { useAppSelector } from '../../store/hooks.ts'
import { getTemperature, Systems } from '../../utils/getTemperature.ts'

export function WeatherList({day}: {day: List}) {
  const isCelsius = useAppSelector(state => state.system.celsius)
  const temperature = isCelsius ? getTemperature(day.main.temp, Systems.CELSIUS) : getTemperature(day.main.temp, Systems.FAHRENHEIT)
  
  return (
    <section className={styles.weatherList}>
      <p>{day.dt_txt.split(' ')[1]}</p>
      <p>{temperature}</p>
      <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt=""/>
    </section>
  )
}
