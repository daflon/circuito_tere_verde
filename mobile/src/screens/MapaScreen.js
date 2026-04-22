import { View, Text, StyleSheet } from 'react-native'

export default function MapaScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mapa com react-native-maps — em breve</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0fdf4' },
  text: { color: '#6b7280', fontSize: 16 },
})
