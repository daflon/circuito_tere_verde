import client from './client'

// Públicos
export const getParques = (params) => client.get('/parques/', { params })
export const getTrilhas = (params) => client.get('/trilhas/', { params })
export const getTrilha = (id) => client.get(`/trilhas/${id}/`)
export const getMapa = (params) => client.get('/trilhas/mapa/', { params })
export const getEventos = (params) => client.get('/eventos/', { params })
export const getBiodiversidade = (params) => client.get('/biodiversidade/', { params })

// Autenticados
export const login = (username, password) =>
  client.post('/token/', { username, password })

export const getFavoritos = () => client.get('/favoritos/')
export const addFavorito = (trilhaId) => client.post('/favoritos/', { trilha: trilhaId })
export const removeFavorito = (id) => client.delete(`/favoritos/${id}/`)

export const getComentarios = (params) => client.get('/comentarios/', { params })
export const addComentario = (trilhaId, texto, nota) =>
  client.post('/comentarios/', { trilha: trilhaId, texto, nota })
