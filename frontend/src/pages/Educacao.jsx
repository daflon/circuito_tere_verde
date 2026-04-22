import { Link } from 'react-router-dom'

const dicas = [
  {
    icon: '🗑️',
    titulo: 'Não deixe lixo na trilha',
    texto: 'Leve um saco para recolher todo o seu lixo. O que você trouxe, leva de volta. Resíduos demoram décadas para se decompor na natureza.',
  },
  {
    icon: '🚶',
    titulo: 'Permaneça na trilha demarcada',
    texto: 'Sair da trilha causa erosão e destrói a vegetação nativa. Respeite as demarcações e placas de sinalização dos parques.',
  },
  {
    icon: '🔇',
    titulo: 'Evite barulho excessivo',
    texto: 'Sons altos afugentam a fauna silvestre e perturbam outros visitantes. Aprecie os sons da natureza.',
  },
  {
    icon: '🌱',
    titulo: 'Não colete plantas ou animais',
    texto: 'A coleta de espécies é crime ambiental (Lei 9.605/98). Observe, fotografe, mas não retire nada do ambiente natural.',
  },
  {
    icon: '🔥',
    titulo: 'Não faça fogueiras',
    texto: 'Incêndios florestais destroem ecossistemas inteiros. Não acenda fogo, não jogue bitucas de cigarro e denuncie queimadas.',
  },
  {
    icon: '💧',
    titulo: 'Preserve os recursos hídricos',
    texto: 'Não use sabão ou produtos químicos em rios e cachoeiras. A água dos parques abastece comunidades inteiras.',
  },
  {
    icon: '🐾',
    titulo: 'Não alimente animais silvestres',
    texto: 'Alimentos humanos causam doenças e dependência nos animais. Quatis, macacos e aves devem se alimentar naturalmente.',
  },
  {
    icon: '📱',
    titulo: 'Informe-se antes de ir',
    texto: 'Consulte as condições da trilha, previsão do tempo e leve equipamento adequado. Avise alguém sobre seu roteiro.',
  },
]

const biomas = [
  {
    nome: 'Mata Atlântica',
    descricao: 'Teresópolis está inserida no bioma Mata Atlântica, um dos mais ricos em biodiversidade do planeta. Restam apenas 12,4% da cobertura original, tornando sua preservação urgente.',
    dado: 'Abriga cerca de 20.000 espécies de plantas, 8% de todas as espécies do mundo.',
  },
  {
    nome: 'Serra dos Órgãos',
    descricao: 'O Parque Nacional da Serra dos Órgãos protege 20.024 hectares de Mata Atlântica em altitudes que variam de 200 a 2.275 metros, criando diversos microclimas e habitats.',
    dado: 'O PARNASO foi o terceiro parque nacional criado no Brasil, em 1939.',
  },
  {
    nome: 'Unidades de Conservação',
    descricao: 'Teresópolis é delimitada por três unidades de conservação que protegem a biodiversidade e regulam o crescimento urbano, garantindo qualidade de vida para a população.',
    dado: 'As UCs de Teresópolis somam mais de 60.000 hectares de área protegida.',
  },
]

export default function Educacao() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <section className="text-center py-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">
          🌍 Educação Ambiental
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Conhecer para preservar. Aprenda sobre o bioma, as boas práticas e como contribuir para a conservação dos parques de Teresópolis.
        </p>
      </section>

      {/* Bioma */}
      <section>
        <h2 className="text-xl font-bold text-green-800 mb-4">🌳 Nosso Bioma</h2>
        <div className="space-y-4">
          {biomas.map((b) => (
            <div key={b.nome} className="bg-white rounded-xl shadow-sm p-5">
              <h3 className="font-bold text-gray-800 text-lg">{b.nome}</h3>
              <p className="text-gray-600 mt-2 leading-relaxed">{b.descricao}</p>
              <p className="text-sm text-green-700 mt-3 font-medium bg-green-50 rounded-lg px-3 py-2">
                📊 {b.dado}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Boas práticas */}
      <section>
        <h2 className="text-xl font-bold text-green-800 mb-4">✅ Boas Práticas nas Trilhas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {dicas.map((d) => (
            <div key={d.titulo} className="bg-white rounded-xl shadow-sm p-4 card-hover">
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{d.icon}</span>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">{d.titulo}</h3>
                  <p className="text-sm text-gray-600 mt-1 leading-relaxed">{d.texto}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Legislação */}
      <section className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h2 className="font-bold text-amber-800 mb-2">⚖️ Legislação Ambiental</h2>
        <ul className="text-sm text-amber-900 space-y-2">
          <li>• <strong>Lei 9.985/2000</strong> — Sistema Nacional de Unidades de Conservação (SNUC)</li>
          <li>• <strong>Lei 9.605/1998</strong> — Crimes Ambientais: penas para danos à flora, fauna e poluição</li>
          <li>• <strong>Lei 11.428/2006</strong> — Lei da Mata Atlântica: proteção do bioma</li>
          <li>• <strong>Art. 225 da Constituição</strong> — Direito ao meio ambiente ecologicamente equilibrado</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="text-center py-6">
        <p className="text-gray-600 mb-4">Explore a biodiversidade dos parques de Teresópolis</p>
        <div className="flex gap-3 justify-center">
          <Link to="/bio" className="bg-green-800 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-green-700">
            🐾 Ver Biodiversidade
          </Link>
          <Link to="/trilhas" className="bg-white text-green-800 px-5 py-2.5 rounded-xl text-sm font-medium border border-green-800 hover:bg-green-50">
            🥾 Ver Trilhas
          </Link>
        </div>
      </section>
    </div>
  )
}
