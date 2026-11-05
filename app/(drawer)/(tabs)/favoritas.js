import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { buscarMoedas } from "../../../src/api";
import { useCurrency } from "../../../src/CurrencyContext";

export default function Favoritas() {
  const { favoritas } = useCurrency();
  const [moedas, setMoedas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    buscarMoedas()
      .then(setMoedas)
      .catch((e) => console.log(e.message))
      .finally(() => setCarregando(false));
  }, []);

  const lista = moedas.filter((moeda) => favoritas.includes(moeda.codigo));

  if (carregando) return <ActivityIndicator style={styles.centro} size="large" />;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas favoritas</Text>

      {lista.length === 0 ? (
        <Text>Nenhuma moeda favoritada ainda. Toque na estrela na aba Moedas.</Text>
      ) : (
        <FlatList
          data={lista}
          keyExtractor={(item) => item.codigo}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.codigo}>{item.codigo}</Text>
              <Text style={styles.nome}>{item.nome}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  centro: { flex: 1, justifyContent: "center" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  item: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  codigo: { fontWeight: "bold", fontSize: 16 },
  nome: { color: "#666", marginTop: 3 },
});