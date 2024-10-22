import { List } from '../../store/weatherSlice.ts'

import styles from './Day.module.scss'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../store/hooks.ts'
import { getTemperature, Systems } from '../../utils/getTemperature.ts'

export function Day({day}: {day: List}) {
  const date = new Date(day.dt_txt)
  const isCelsius = useAppSelector(state => state.system.celsius)
  const temperature = isCelsius ? getTemperature(day.main.temp, Systems.CELSIUS) : getTemperature(day.main.temp, Systems.FAHRENHEIT)

  return (
    <Link to={`day/${date.toISOString()}`} className={styles.day}>
      <p>{date.getMonth()}-{date.getDate()}</p>
      <p className={styles.temp}>
        {temperature}
        <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt=""/>
      </p>

    </Link>
  )
}