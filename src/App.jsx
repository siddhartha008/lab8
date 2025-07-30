import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import CreatePlayer from './pages/CreatePlayer'
import UpdatePlayer from './pages/UpdatePlayer'
import PlayerDetail from './pages/PlayerDetail'
import PlayerGallery from './pages/PlayerGallery'
import PlayerStats from './pages/PlayerStats'

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-player" element={<CreatePlayer />} />
            <Route path="/update-player" element={<UpdatePlayer />} />
            <Route path="/update-player/:id" element={<UpdatePlayer />} />
            <Route path="/player-detail" element={<PlayerDetail />} />
            <Route path="/player-gallery" element={<PlayerGallery />} />
            <Route path="/player-stats/:id" element={<PlayerStats />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
