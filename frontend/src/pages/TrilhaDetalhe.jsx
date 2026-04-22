import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTrilha, getComentarios, addComentario, getFavoritos, addFavorito, removeFavorito } from '../api/endpoints'
import { useAuth } from '../context/AuthContext'
import trilhaImages from '../data/trilhaImages'

const badgeColor = {
  'Fácil': 'bg-green-100 text-green-800',
  'Moderada': 'bg-yellow-100 text-yellow-800',
  'Difícil': 'bg-orange-100 text-orange-800',
  'Muito Difícil': 'bg-red-100 text-red-800',
}

export default function TrilhaDetalhe() {
  const { id } = useParams()
  const { user } = useAuth()
  const [trilha, setTrilha] = useState(null)
  const [comentarios, setComentarios] = useState([])
  const [texto, setTexto] = useState('')
  const [nota, setNota] = useState(5)
  const [loading, setLoading] = useState(true)
  const [favId, setFavId] = useState(null)

  useEffect(() => {
    getTrilha(id).then(({ data }) => { setTrilha(data); setLoading(false) })
    getComentarios({ trilha: id }).then(({ data }) => setComentarios(data.results || data)).catch(() => {})
    if (user) {
      getFavoritos().then(({ data }) => {
        const fav = (data.results || data).find((f) => String(f.trilha) === String(id))
        if (fav) setFavId(fav.id)
      }).catch(() => {})
    }
  }, [id, user])

  const toggleFav = async () => {
    if (!user) return
    if (favId) {
      await removeFavorito(favId)
      setFavId(null)
    } else {
      const { data } = await addFavorito(id)
      setFavId(data.id)
    }
  }

  const enviarComentario = async (e) => {
    e.preventDefault()
    if (!texto.trim()) return
    try {
      await addComentario(id, texto, nota)
      setTexto('')
      const { data } = await getComentarios({ trilha: id })
      setComentarios(data.results || data)
    } catch {
      alert('Faça login para comentar')
    }
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="skeleton h-64 w-full rounded-xl"></div>
        <div className="skeleton h-8 w-64"></div>
        <div className="skeleton h-4 w-48"></div>
        <div className="skeleton h-20 w-full rounded-xl"></div>
      </div>
    )
  }

  if (!trilha) return <p>Trilha não encontrada</p>

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link to="/trilhas" className="text-green-700 text-sm hover:underline">← Voltar</Link>

      {/* Imagem */}
      <div className="h-56 sm:h-72 rounded-xl overflow-hidden shadow-lg relative">
        <img src={trilhaImages[trilha.nome]} alt={trilha.nome} className="w-full h-full object-cover" />
        {user && (
          <button
            onClick={toggleFav}
            className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full w-11 h-11 flex items-center justify-center shadow-md"
          >
            <span className="text-2xl">{favId ? '❤️' : '🤍'}</span>
          </button>
        )}
      </div>

      {/* Info */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{trilha.nome}</h1>
        <p className="text-gray-500 mt-1">{trilha.parque_nome}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${badgeColor[trilha.dificuldade] || ''}`}>
            {trilha.dificuldade}
          </span>
          {trilha.distancia_km && (
            <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">📏 {trilha.distancia_km} km</span>
          )}
          {trilha.tempo_estimado_min && (
            <span className="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full font-medium">⏱️ {trilha.tempo_estimado_min} min</span>
          )}
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${trilha.status === 'aberta' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
            {trilha.status === 'aberta' ? '🟢 Aberta' : '🔴 Fechada'}
          </span>
        </div>
      </div>

      {/* Descrição */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-bold text-gray-800 mb-2">Sobre a trilha</h2>
        <p className="text-gray-600 leading-relaxed">{trilha.descricao}</p>
      </div>

      {/* Coordenadas */}
      {trilha.latitude && trilha.longitude && (
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-bold text-gray-800 mb-2">Localização</h2>
          <p className="text-sm text-gray-500">📍 {trilha.latitude}, {trilha.longitude}</p>
          <a
            href={`https://www.google.com/maps?q=${trilha.latitude},${trilha.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-700 text-sm font-medium hover:underline mt-2 inline-block"
          >
            Abrir no Google Maps →
          </a>
        </div>
      )}

      {/* Comentários */}
      <div className="bg-white rounded-xl shadow-sm p-5">
        <h2 className="font-bold text-gray-800 mb-4">Comentários ({comentarios.length})</h2>

        {user && (
          <form onSubmit={enviarComentario} className="mb-6 space-y-3">
            <textarea
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Deixe seu comentário sobre a trilha..."
              className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-500">Nota:</span>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setNota(n)} className={`text-lg ${n <= nota ? 'text-yellow-400' : 'text-gray-300'}`}>★</button>
                ))}
              </div>
              <button type="submit" className="bg-green-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700">Enviar</button>
            </div>
          </form>
        )}

        {!user && (
          <p className="text-sm text-gray-400 mb-4">
            <Link to="/login" className="text-green-700 hover:underline">Faça login</Link> para comentar e favoritar
          </p>
        )}

        <div className="space-y-4">
          {comentarios.map((c) => (
            <div key={c.id} className="border-b border-gray-100 pb-3 last:border-0">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-gray-800">{c.user_nome}</span>
                {c.nota && <span className="text-yellow-400 text-sm">{'★'.repeat(c.nota)}{'☆'.repeat(5 - c.nota)}</span>}
              </div>
              <p className="text-sm text-gray-600 mt-1">{c.texto}</p>
            </div>
          ))}
          {comentarios.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-4">Nenhum comentário ainda. Seja o primeiro!</p>
          )}
        </div>
      </div>
    </div>
  )
}
