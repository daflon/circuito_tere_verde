import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getParques } from '../api/endpoints'
import trilhaImages from '../data/trilhaImages'

const badgeColor = {
  'Fácil': 'bg-green-100 text-green-800',
  'Moderada': 'bg-yellow-100 text-yellow-800',
  'Difícil': 'bg-orange-100 text-orange-800',
  'Muito Difícil': 'bg-red-100 text-red-800',
}

export default function Parque() {
  const { id } = useParams()
  const [parque, setParque] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getParques().then(({ data }) => {
      const list = data.results || data
      const found = list.find((p) => String(p.id) === String(id))
      setParque(found || null)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="skeleton h-8 w-64"></div>
        <div className="skeleton h-4 w-48"></div>
        <div className="skeleton h-20 w-full rounded-xl"></div>
        {[1, 2, 3].map((i) => <div key={i} className="skeleton h-24 w-full rounded-xl"></div>)}
      </div>
    )
  }

  if (!parque) return <p>Parque não encontrado</p>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/" className="text-green-700 text-sm hover:underline">← Voltar</Link>

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{parque.nome}</h1>
        <p className="text-gray-500 mt-1">📍 {parque.localizacao}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-5">
        <p className="text-gray-600 leading-relaxed">{parque.descricao}</p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Trilhas ({parque.trilhas?.length || 0})
        </h2>
        <div className="space-y-3">
          {(parque.trilhas || []).map((t) => (
            <Link
              key={t.id}
              to={`/trilhas/${t.id}`}
              className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-center card-hover block"
            >
              <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                <img src={trilhaImages[t.nome]} alt={t.nome} className="w-full h-full object-cover" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-gray-800">{t.nome}</h3>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${badgeColor[t.dificuldade] || ''}`}>
                    {t.dificuldade}
                  </span>
                  {t.distancia_km && (
                    <span className="text-xs text-gray-500">📏 {t.distancia_km} km</span>
                  )}
                  {t.tempo_estimado_min && (
                    <span className="text-xs text-gray-500">⏱️ {t.tempo_estimado_min} min</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1 line-clamp-1">{t.descricao}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
