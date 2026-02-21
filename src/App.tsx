import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Create from './pages/Create'
import Play from './pages/Play'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/create" element={<Create />} />
        <Route path="/play" element={<Play />} />
      </Routes>
    </BrowserRouter>
  )
}
