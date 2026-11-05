import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { buscarMoedas, buscarTaxas } from "../../../src/api";

export default function Converter() {
  const [moedas, setMoedas] = useState([]);
  const [taxas, setTaxas] = useState({});
  const [origem, setOrigem] = useState("BRL");
  const [destino, setDestino] = useState("USD");
  const [valor, setValor] = useState("1");
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    Promise.all([buscarMoedas(), buscarTaxas()])
      .then(([lista, taxasRecebidas]) => {
        setMoedas(lista);
        setTaxas(taxasRecebidas);
      })
      .catch((e) => setErro(e.message))
      .finally(() => setCarregando(false));
  }, []);

  function converter() {
    const quantidade = Number(valor);

    if (!Number.isFinite(quantidade) || quantidade <= 0) {
      setErro("Digite um valor maior que zero.");
      setResultado(null);
      return;
    }

    const taxaOrigem = taxas[origem];
    const taxaDestino = taxas[destino];

    if (!taxaOrigem || !taxaDestino) {
      setErro("Não foi possível obter a taxa dessas moedas.");
      return;
    }

    const taxaConversao = taxaDestino / taxaOrigem;
    setErro("");
    setResultado({
      origem: quantidade,
      destino: quantidade * taxaConversao,
      taxa: taxaConversao,
    });
  }

  if (carregando) return <ActivityIndicator style={styles.centro} size="large" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Converter moedas</Text>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <Text style={styles.label}>Moeda de origem</Text>
      <Picker selectedValue={origem} onValueChange={setOrigem}>
        {moedas.map((moeda) => (
          <Picker.Item
            key={moeda.codigo}
            label={`${moeda.codigo} — ${moeda.nome}`}
            value={moeda.codigo}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Moeda de destino</Text>
      <Picker selectedValue={destino} onValueChange={setDestino}>
        {moedas.map((moeda) => (
          <Picker.Item
            key={moeda.codigo}
            label={`${moeda.codigo} — ${moeda.nome}`}
            value={moeda.codigo}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Valor a converter</Text>
      <TextInput
        style={styles.input}
        value={valor}
        onChangeText={setValor}
        keyboardType="decimal-pad"
        placeholder="Digite o valor"
      />

      <Pressable style={styles.botao} onPress={converter}>
        <Text style={styles.textoBotao}>Converter</Text>
      </Pressable>

      {resultado && (
        <View style={styles.resultado}>
          <Text>
            Valor origem: {resultado.origem.toFixed(2)} {origem}
          </Text>
          <Text>
            Valor destino: {resultado.destino.toFixed(2)} {destino}
          </Text>
          <Text>
            Taxa de conversão: 1 {origem} = {resultado.taxa.toFixed(6)} {destino}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#fff" },
  centro: { flex: 1, justifyContent: "center" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  label: { fontWeight: "bold", marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginTop: 6,
  },
  botao: {
    backgroundColor: "#1769aa",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 18,
  },
  textoBotao: { color: "#fff", fontWeight: "bold" },
  resultado: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    marginTop: 18,
    gap: 8,
  },
  erro: { color: "red", marginBottom: 8 },
});