import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Trilhas from './pages/Trilhas'
import TrilhaDetalhe from './pages/TrilhaDetalhe'
import Parque from './pages/Parque'
import Mapa from './pages/Mapa'
import Eventos from './pages/Eventos'
import Biodiversidade from './pages/Biodiversidade'
import Educacao from './pages/Educacao'
import Login from './pages/Login'

const tabs = [
  { path: '/', label: 'Início', icon: '🏠' },
  { path: '/trilhas', label: 'Trilhas', icon: '🥾' },
  { path: '/mapa', label: 'Mapa', icon: '🗺️' },
  { path: '/eventos', label: 'Eventos', icon: '📅' },
  { path: '/bio', label: 'Bio', icon: '🌿' },
  { path: '/educacao', label: 'Educar', icon: '🌍' },
]

export default function App() {
  const location = useLocation()

  return (
    <AuthProvider>
      <div className="min-h-screen bg-green-50 pb-20 sm:pb-0">
        {/* Desktop top nav */}
        <nav className="hidden sm:flex bg-green-800 text-white px-4 py-3 gap-6 items-center sticky top-0 z-50 shadow-md">
          <Link to="/" className="font-bold text-lg">🌿 Terê Verde</Link>
          <Link to="/trilhas" className="hover:underline text-sm">Trilhas</Link>
          <Link to="/mapa" className="hover:underline text-sm">Mapa</Link>
          <Link to="/eventos" className="hover:underline text-sm">Eventos</Link>
          <Link to="/bio" className="hover:underline text-sm">Biodiversidade</Link>
          <Link to="/educacao" className="hover:underline text-sm">Educação Ambiental</Link>
          <Link to="/login" className="ml-auto bg-white/20 px-3 py-1 rounded-lg text-sm hover:bg-white/30">
            Admin
          </Link>
        </nav>

        {/* Mobile top bar */}
        <header className="sm:hidden bg-green-800 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50 shadow-md safe-top">
          <Link to="/" className="font-bold text-lg">🌿 Terê Verde</Link>
          <Link to="/login" className="bg-white/20 px-3 py-1 rounded-lg text-sm">Admin</Link>
        </header>

        <main className="p-4 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trilhas" element={<Trilhas />} />
            <Route path="/trilhas/:id" element={<TrilhaDetalhe />} />
            <Route path="/parques/:id" element={<Parque />} />
            <Route path="/mapa" element={<Mapa />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/bio" element={<Biodiversidade />} />
            <Route path="/educacao" element={<Educacao />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        {/* Mobile bottom tabs */}
        <nav className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-50 safe-bottom">
          {tabs.map((tab) => {
            const active = location.pathname === tab.path
            return (
              <Link
                key={tab.path}
                to={tab.path}
                className={`flex flex-col items-center text-xs ${active ? 'text-green-800 font-bold' : 'text-gray-400'}`}
              >
                <span className="text-xl">{tab.icon}</span>
                {tab.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </AuthProvider>
  )
}
