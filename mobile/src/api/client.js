import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Em dev: usar IP da máquina (não localhost) para o emulador acessar
const API_BASE = __DEV__
  ? 'http://10.0.2.2:8000/api'  // Android emulator
  : 'https://sua-api.com/api'

const client = axios.create({ baseURL: API_BASE })

client.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

client.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true
      const refresh = await AsyncStorage.getItem('refresh_token')
      if (refresh) {
        try {
          const { data } = await axios.post(`${API_BASE}/token/refresh/`, { refresh })
          await AsyncStorage.setItem('access_token', data.access)
          original.headers.Authorization = `Bearer ${data.access}`
          return client(original)
        } catch {
          await AsyncStorage.multiRemove(['access_token', 'refresh_token'])
        }
      }
    }
    return Promise.reject(error)
  }
)

export default client
