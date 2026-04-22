import { View, Text, StyleSheet } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌿 Circuito Terê Verde</Text>
      <Text style={styles.subtitle}>Descubra as trilhas de Teresópolis</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0fdf4' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#166534' },
  subtitle: { fontSize: 16, color: '#6b7280', marginTop: 8 },
})
