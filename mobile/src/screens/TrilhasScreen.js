import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'
import { getTrilhas } from '../api/endpoints'

export default function TrilhasScreen() {
  const [trilhas, setTrilhas] = useState([])

  useEffect(() => {
    getTrilhas().then(({ data }) => setTrilhas(data.results || data))
  }, [])

  return (
    <FlatList
      style={styles.list}
      data={trilhas}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.parque}>{item.parque_nome}</Text>
          <View style={styles.tags}>
            <Text style={styles.tag}>{item.dificuldade}</Text>
            {item.distancia_km && <Text style={styles.tag}>{item.distancia_km} km</Text>}
          </View>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: '#f0fdf4', padding: 16 },
  card: { backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 12, elevation: 2 },
  nome: { fontSize: 18, fontWeight: 'bold', color: '#166534' },
  parque: { fontSize: 13, color: '#6b7280', marginTop: 2 },
  tags: { flexDirection: 'row', gap: 8, marginTop: 8 },
  tag: { backgroundColor: '#dcfce7', color: '#166534', fontSize: 12, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
})
