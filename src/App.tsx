import { Route, Routes } from 'react-router-dom'
import { Days } from './components/Days/Days.tsx'
import { Weather } from './components/Weather/Weather.tsx'
import { Header } from './components/Header/Header.tsx'

function App() {
  return (
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Weather city="Yerevan" />} />
        <Route path="day/:date" element={<Weather city="Yerevan" />} />
        <Route path="*" element={<></>} />
      </Routes>

      <Days/>
    </main>
  )
}

export default App
