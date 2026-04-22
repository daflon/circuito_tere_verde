import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getTrilhas } from '../api/endpoints'
import { useAuth } from '../context/AuthContext'
import { addFavorito, removeFavorito, getFavoritos } from '../api/endpoints'
import trilhaImages from '../data/trilhaImages'

const badgeColor = {
  'Fácil': 'bg-green-100 text-green-800',
  'Moderada': 'bg-yellow-100 text-yellow-800',
  'Difícil': 'bg-orange-100 text-orange-800',
  'Muito Difícil': 'bg-red-100 text-red-800',
}

const DIFICULDADES = ['Todas', 'Fácil', 'Moderada', 'Difícil', 'Muito Difícil']
const TIPOS = [
  { label: 'Todos', value: '', icon: '' },
  { label: 'Trilhas', value: 'trilha', icon: '🥾' },
  { label: 'Cachoeiras', value: 'cachoeira', icon: '💧' },
  { label: 'Mirantes', value: 'mirante', icon: '🏔️' },
]

const tipoIcon = { trilha: '🥾', cachoeira: '💧', mirante: '🏔️' }

export default function Trilhas() {
  const { user } = useAuth()
  const [trilhas, setTrilhas] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [dificuldade, setDificuldade] = useState('Todas')
  const [tipo, setTipo] = useState('')
  const [ordering, setOrdering] = useState('')
  const [favIds, setFavIds] = useState({})

  const fetchTrilhas = useCallback(() => {
    const params = {}
    if (search) params.search = search
    if (dificuldade !== 'Todas') params.dificuldade = dificuldade
    if (tipo) params.tipo = tipo
    if (ordering) params.ordering = ordering
    getTrilhas(params).then(({ data }) => {
      setTrilhas(data.results || data)
      setLoading(false)
    })
  }, [search, dificuldade, tipo, ordering])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(fetchTrilhas, 300)
    return () => clearTimeout(timer)
  }, [fetchTrilhas])

  useEffect(() => {
    if (user) {
      getFavoritos().then(({ data }) => {
        const map = {}
        ;(data.results || data).forEach((f) => { map[f.trilha] = f.id })
        setFavIds(map)
      }).catch(() => {})
    }
  }, [user])

  const toggleFav = async (e, trilhaId) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) return
    if (favIds[trilhaId]) {
      await removeFavorito(favIds[trilhaId])
      setFavIds((prev) => { const n = { ...prev }; delete n[trilhaId]; return n })
    } else {
      const { data } = await addFavorito(trilhaId)
      setFavIds((prev) => ({ ...prev, [trilhaId]: data.id }))
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-4">Trilhas de Teresópolis</h2>

      {/* Busca */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Buscar trilha, parque..."
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Filtros tipo */}
      <div className="flex flex-wrap gap-2 mb-4">
        {TIPOS.map((t) => (
          <button
            key={t.value}
            onClick={() => setTipo(t.value)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              tipo === t.value ? 'bg-blue-700 text-white' : 'bg-white text-gray-600 hover:bg-blue-100'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Filtros dificuldade */}
      <div className="flex flex-wrap gap-2 mb-4">
        {DIFICULDADES.map((d) => (
          <button
            key={d}
            onClick={() => setDificuldade(d)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              dificuldade === d ? 'bg-green-800 text-white' : 'bg-white text-gray-600 hover:bg-green-100'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Ordenação */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xs text-gray-500">Ordenar:</span>
        {[
          { label: 'Recentes', value: '' },
          { label: 'Menor distância', value: 'distancia_km' },
          { label: 'Maior distância', value: '-distancia_km' },
          { label: 'Nome A-Z', value: 'nome' },
        ].map((o) => (
          <button
            key={o.value}
            onClick={() => setOrdering(o.value)}
            className={`text-xs px-2 py-1 rounded transition-colors ${
              ordering === o.value ? 'bg-green-100 text-green-800 font-medium' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <div className="skeleton h-48 w-full rounded-xl"></div>
              <div className="skeleton h-5 w-3/4"></div>
              <div className="skeleton h-4 w-1/2"></div>
            </div>
          ))}
        </div>
      )}

      {/* Cards */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trilhas.map((t) => (
            <Link key={t.id} to={`/trilhas/${t.id}`} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow block relative">
              {/* Favorito */}
              {user && (
                <button
                  onClick={(e) => toggleFav(e, t.id)}
                  className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full w-9 h-9 flex items-center justify-center shadow-sm"
                >
                  <span className={`text-lg ${favIds[t.id] ? 'text-red-500' : 'text-gray-400'}`}>
                    {favIds[t.id] ? '❤️' : '🤍'}
                  </span>
                </button>
              )}
              <div className="h-48 overflow-hidden">
                <img
                  src={trilhaImages[t.nome]}
                  alt={t.nome}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800">{t.nome}</h3>
                <p className="text-sm text-gray-500 mt-1">{t.parque_nome}</p>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{t.descricao}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor[t.dificuldade] || 'bg-gray-100 text-gray-800'}`}>
                    {t.dificuldade}
                  </span>
                  {t.distancia_km && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                      📏 {t.distancia_km} km
                    </span>
                  )}
                  {t.tempo_estimado_min && (
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full font-medium">
                      ⏱️ {t.tempo_estimado_min} min
                    </span>
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${t.status === 'aberta' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                    {t.status === 'aberta' ? '🟢 Aberta' : '🔴 Fechada'}
                  </span>
                  {t.tipo && t.tipo !== 'trilha' && (
                    <span className="bg-cyan-100 text-cyan-800 text-xs px-2 py-1 rounded-full font-medium">
                      {tipoIcon[t.tipo]} {t.tipo}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && trilhas.length === 0 && (
        <div className="text-center py-12">
          <span className="text-5xl block mb-3">🔍</span>
          <p className="text-gray-500 font-medium">Nenhuma trilha encontrada</p>
          <p className="text-sm text-gray-400 mt-1">Tente ajustar os filtros ou a busca</p>
          <button onClick={() => { setSearch(''); setDificuldade('Todas'); setTipo(''); setOrdering('') }} className="mt-4 text-green-700 text-sm hover:underline">
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  )
}
