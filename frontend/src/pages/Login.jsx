import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      navigate('/')
    } catch {
      setError('Usuário ou senha inválidos')
    }
    setLoading(false)
  }

  if (user) {
    return (
      <div className="max-w-sm mx-auto mt-10 text-center space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <span className="text-5xl block mb-4">👤</span>
          <h2 className="text-xl font-bold text-gray-800">Logado como Admin</h2>
          <p className="text-sm text-gray-500 mt-2">
            Acesse o <a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">Django Admin</a> para gerenciar conteúdo
          </p>
          <button
            onClick={logout}
            className="mt-6 bg-red-100 text-red-700 px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-sm mx-auto mt-10">
      <div className="bg-white rounded-xl shadow-sm p-8">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
          🔐 Acesso Administrativo
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Usuário</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="••••••"
              required
            />
          </div>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-800 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  )
}
