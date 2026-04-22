import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { getMapa } from '../api/endpoints'
import L from 'leaflet'

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const badgeColor = {
  'Fácil': 'text-green-700',
  'Moderada': 'text-yellow-700',
  'Difícil': 'text-orange-700',
  'Muito Difícil': 'text-red-700',
}

export default function Mapa() {
  const [features, setFeatures] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMapa().then(({ data }) => {
      setFeatures(data.features || [])
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="skeleton h-8 w-48"></div>
        <div className="skeleton h-[70vh] w-full rounded-xl"></div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-green-800 mb-4">Mapa das Trilhas</h2>
      <div className="rounded-xl overflow-hidden shadow-lg" style={{ height: '70vh' }}>
        <MapContainer
          center={[-22.44, -43.0]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {features.map((f) => (
            <Marker
              key={f.properties.id}
              position={[f.geometry.coordinates[1], f.geometry.coordinates[0]]}
            >
              <Popup>
                <div className="min-w-[180px]">
                  <strong className="text-base">{f.properties.nome}</strong>
                  <p className="text-sm text-gray-500">{f.properties.parque}</p>
                  <p className={`text-sm font-medium ${badgeColor[f.properties.dificuldade] || ''}`}>
                    {f.properties.dificuldade}
                  </p>
                  {f.properties.distancia_km && (
                    <p className="text-sm">📏 {f.properties.distancia_km} km</p>
                  )}
                  <Link
                    to={`/trilhas/${f.properties.id}`}
                    className="text-green-700 text-sm font-medium hover:underline block mt-1"
                  >
                    Ver detalhes →
                  </Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <p className="text-xs text-gray-400 mt-2 text-center">
        {features.length} trilhas mapeadas • Dados GPS reais
      </p>
    </div>
  )
}
