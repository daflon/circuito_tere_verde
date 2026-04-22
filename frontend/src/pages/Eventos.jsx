import { useState, useEffect } from 'react'
import { getEventos } from '../api/endpoints'

export default function Eventos() {
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEventos().then(({ data }) => {
      setEventos(data.results || data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-32"></div>
        {[1, 2, 3].map((i) => <div key={i} className="skeleton h-24 w-full rounded-xl"></div>)}
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-2">Eventos</h2>
      <p className="text-gray-500 mb-6">Atividades programadas nos parques da região</p>

      <div className="space-y-4">
        {eventos.map((e) => {
          const date = new Date(e.data)
          return (
            <div key={e.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4 items-start card-hover">
              <div className="bg-green-100 text-green-800 rounded-xl p-3 text-center min-w-[70px] shrink-0">
                <span className="text-2xl font-bold block">{date.getDate()}</span>
                <span className="text-xs font-medium uppercase">
                  {date.toLocaleString('pt-BR', { month: 'short' })}
                </span>
                <span className="text-xs block text-green-600">{date.getFullYear()}</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{e.titulo}</h3>
                <p className="text-sm text-gray-600 mt-1">{e.descricao}</p>
              </div>
            </div>
          )
        })}
      </div>

      {eventos.length === 0 && (
        <div className="text-center py-12">
          <span className="text-5xl block mb-3">📅</span>
          <p className="text-gray-500">Nenhum evento programado no momento</p>
        </div>
      )}
    </div>
  )
}
