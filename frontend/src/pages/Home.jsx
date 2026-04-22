import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getParques, getEventos } from '../api/endpoints'

export default function Home() {
  const [parques, setParques] = useState([])
  const [eventos, setEventos] = useState([])

  useEffect(() => {
    getParques().then(({ data }) => setParques(data.results || data))
    getEventos().then(({ data }) => setEventos((data.results || data).slice(0, 3)))
  }, [])

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="text-center py-8 sm:py-16">
        <h1 className="text-3xl sm:text-5xl font-bold text-green-800 mb-3">
          🌿 Circuito Terê Verde
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto">
          Descubra as trilhas, parques e a biodiversidade de Teresópolis
        </p>
        <div className="flex gap-3 justify-center mt-6">
          <Link to="/trilhas" className="bg-green-800 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
            Explorar Trilhas
          </Link>
          <Link to="/mapa" className="bg-white text-green-800 px-6 py-3 rounded-xl font-medium border border-green-800 hover:bg-green-50 transition-colors">
            Ver Mapa
          </Link>
        </div>
      </section>

      {/* Parques */}
      <section>
        <h2 className="text-xl font-bold text-green-800 mb-4">Parques</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {parques.map((p) => (
            <Link key={p.id} to={`/parques/${p.id}`} className="bg-white rounded-xl shadow-md p-5 card-hover block">
              <h3 className="font-bold text-gray-800">{p.nome}</h3>
              <p className="text-sm text-gray-500 mt-1">{p.localizacao}</p>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">{p.descricao}</p>
              <p className="text-xs text-green-700 mt-3 font-medium">
                {p.trilhas?.length || 0} trilhas disponíveis
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Próximos eventos */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-green-800">Próximos Eventos</h2>
          <Link to="/eventos" className="text-sm text-green-700 hover:underline">Ver todos →</Link>
        </div>
        <div className="space-y-3">
          {eventos.map((e) => (
            <div key={e.id} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 card-hover">
              <div className="bg-green-100 text-green-800 rounded-lg p-3 text-center min-w-[60px]">
                <span className="text-lg font-bold block">{new Date(e.data).getDate()}</span>
                <span className="text-xs">{new Date(e.data).toLocaleString('pt-BR', { month: 'short' })}</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{e.titulo}</h3>
                <p className="text-sm text-gray-500 line-clamp-1">{e.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <Link to="/bio" className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center card-hover">
          <span className="text-3xl block mb-1">🐾</span>
          <span className="font-medium text-amber-800 text-sm">Biodiversidade</span>
        </Link>
        <Link to="/mapa" className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center card-hover">
          <span className="text-3xl block mb-1">🗺️</span>
          <span className="font-medium text-blue-800 text-sm">Mapa Interativo</span>
        </Link>
        <Link to="/educacao" className="bg-green-50 border border-green-200 rounded-xl p-4 text-center card-hover">
          <span className="text-3xl block mb-1">🌍</span>
          <span className="font-medium text-green-800 text-sm">Educação Ambiental</span>
        </Link>
      </section>
    </div>
  )
}
