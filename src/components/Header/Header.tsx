import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../store/hooks.ts'
import { toggleSystem } from '../../store/sytemSlice.ts'

import styles from './Header.module.scss'
import { getWeatherByCity } from '../../store/weatherSlice.ts'

export function Header() {
  const [search, setSearch] = useState('')

  const isCelsius = useAppSelector(state => state.system.celsius)
  const dispatch = useAppDispatch()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === 'celsius') {
      dispatch(toggleSystem(true))
    } else if (e.target.value === 'fahrenheit') {
      dispatch(toggleSystem(false))
    }
  }

  const searchHandler = () => {
    dispatch(getWeatherByCity(search))
    setSearch('')
  }

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchHandler()
    }
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link to="/">Weather App</Link>
      </h1>

      <div className={styles.search}>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={keyDownHandler}/>
        <button onClick={searchHandler}>Search City</button>
      </div>

      <div className={styles.system}>
        <label>
          <input type="radio" name="system" value="celsius" checked={isCelsius} onChange={onChange}/>
          °C
        </label>

        <label>
          <input type="radio" name="system" value="fahrenheit" onChange={onChange}/>
          °F
        </label>
      </div>
    </header>
  )
}
