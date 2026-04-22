import { useState, useEffect } from 'react'
import { getBiodiversidade } from '../api/endpoints'
import bioImages from '../data/bioImages'

const categoryStyle = {
  Fauna: { bg: 'bg-amber-100 text-amber-800', icon: '🐾' },
  Flora: { bg: 'bg-emerald-100 text-emerald-800', icon: '🌿' },
}

export default function Biodiversidade() {
  const [especies, setEspecies] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtro, setFiltro] = useState('Todos')

  useEffect(() => {
    getBiodiversidade().then(({ data }) => {
      setEspecies(data.results || data)
      setLoading(false)
    })
  }, [])

  const filtered = filtro === 'Todos'
    ? especies
    : especies.filter((e) => e.categoria === filtro)

  if (loading) return <p className="text-center py-10 text-gray-500">Carregando biodiversidade...</p>

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-2">Biodiversidade</h2>
      <p className="text-gray-500 mb-4">Fauna e flora da Serra dos Órgãos e região</p>

      <div className="flex gap-2 mb-6">
        {['Todos', 'Fauna', 'Flora'].map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filtro === f
                ? 'bg-green-800 text-white'
                : 'bg-white text-gray-600 hover:bg-green-100'
            }`}
          >
            {f === 'Fauna' ? '🐾 ' : f === 'Flora' ? '🌿 ' : ''}{f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((b) => {
          const style = categoryStyle[b.categoria] || categoryStyle.Fauna
          return (
            <div key={b.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img
                  src={bioImages[b.especie]}
                  alt={b.especie}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-800">{b.especie}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${style.bg}`}>
                    {style.icon} {b.categoria}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{b.descricao}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
