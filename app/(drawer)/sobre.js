import { View, Text, StyleSheet } from 'react-native';

export default function SobreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sobre o aplicativo</Text>

      <Text style={styles.texto}>
        Este aplicativo permite consultar moedas e realizar
        conversões utilizando a ExchangeRate-API. Ele foi desenvolvido como parte de um desafio para demonstrar habilidades em desenvolvimento de aplicativos móveis. Aproveite o app e converta a moeda que desejar de forma rápida e prática!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  texto: {
    fontSize: 16,
    lineHeight: 24,
  },
});