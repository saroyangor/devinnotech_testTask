import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export interface WeatherState {
  weather: {
    cod: string
    message: number
    cnt: number
    list: List[]
    city: City
  }
}

export interface List {
  dt: number
  main: Main
  weather: Weather[]
  clouds: Clouds
  wind: Wind
  visibility: number
  pop: number
  sys: Sys
  dt_txt: string
  rain?: Rain
}

export interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  sea_level: number
  grnd_level: number
  humidity: number
  temp_kf: number
}

export interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

export interface Clouds {
  all: number
}

export interface Wind {
  speed: number
  deg: number
  gust: number
}

export interface Sys {
  pod: string
}

export interface Rain {
  '3h': number
}

export interface City {
  id: number
  name: string
  coord: Coord
  country: string
  population: number
  timezone: number
  sunrise: number
  sunset: number
}

export interface Coord {
  lat: number
  lon: number
}


export const getWeatherByCity = createAsyncThunk<WeatherState, string, { rejectValue: string }>(
  'weather/getWeatherByCity',
  async function (city, {rejectWithValue}) {

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_API_KEY}`)

    if (!response.data) {
      return rejectWithValue('Server Error!')
    }

    return response.data

  },
)

const initialState: WeatherState = {
  weather: {
    cod: '',
    message: 0,
    cnt: 0,
    list: [],
    city: {
      id: 0,
      name: '',
      coord: {
        lat: 0,
        lon: 0
      },
      country: '',
      population: 0,
      timezone: 0,
      sunrise: 0,
      sunset: 0
    }
  }
}

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeatherByCity.fulfilled, (state, action) => {
        state.weather = { ...state.weather, ...action.payload };
      })
  },
})

export default weatherSlice.reducer