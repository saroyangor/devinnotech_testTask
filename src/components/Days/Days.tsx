import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../store/hooks.ts'
import { getWeatherByCity } from '../../store/weatherSlice.ts'
import { Day } from '../Day/Day.tsx'

import styles from './Days.module.scss'

export function Days() {
  const allWeather = useAppSelector(state => state.weather.weather)
  const dispatch = useAppDispatch()
  const weather = allWeather.list.filter(day => day.dt_txt.includes('12:00:00'))

  useEffect(() => {
    dispatch(getWeatherByCity('Yerevan'))
  }, [dispatch])

  return (
    <section className={styles.days}>
      {weather.map((day, index) => (
        <Day key={index} day={day} />
      ))}
    </section>
  )
}