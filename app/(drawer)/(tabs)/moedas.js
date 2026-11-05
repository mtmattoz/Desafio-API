import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { buscarMoedas } from "../../../src/api";
import { useCurrency } from "../../../src/CurrencyContext";

export default function Moedas() {
  const [moedas, setMoedas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const { favoritas, alternarFavorita } = useCurrency();

  useEffect(() => {
    buscarMoedas()
      .then(setMoedas)
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) return <ActivityIndicator style={styles.centro} size="large" />;
  if (erro) return <Text style={styles.erro}>{erro}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Moedas disponíveis</Text>

      <FlatList
        data={moedas}
        keyExtractor={(item) => item.codigo}
        renderItem={({ item }) => {
          const favorita = favoritas.includes(item.codigo);

          return (
            <View style={styles.item}>
              <View style={styles.info}>
                <Text style={styles.codigo}>{item.codigo}</Text>
                <Text style={styles.nome}>{item.nome}</Text>
              </View>

              <Pressable onPress={() => alternarFavorita(item.codigo)}>
                <Text style={styles.estrela}>{favorita ? "★" : "☆"}</Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  centro: { flex: 1, justifyContent: "center" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 12 },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  info: { flex: 1 },
  codigo: { fontSize: 16, fontWeight: "bold" },
  nome: { color: "#666", marginTop: 3 },
  estrela: { fontSize: 28, color: "#e5a000", paddingHorizontal: 10 },
  erro: { padding: 20, color: "red" },
});