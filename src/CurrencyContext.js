import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CurrencyContext = createContext(null);
const STORAGE_KEY = "@conversor_favoritas";

export function CurrencyProvider({ children }) {
  const [favoritas, setFavoritas] = useState([]);

  useEffect(() => {
    async function carregarFavoritas() {
      try {
        const salvas = await AsyncStorage.getItem(STORAGE_KEY);
        if (salvas) setFavoritas(JSON.parse(salvas));
      } catch (erro) {
        console.log("Erro ao carregar favoritas:", erro);
      }
    }

    carregarFavoritas();
  }, []);

  async function alternarFavorita(codigo) {
    const atualizadas = favoritas.includes(codigo)
      ? favoritas.filter((item) => item !== codigo)
      : [...favoritas, codigo];

    setFavoritas(atualizadas);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(atualizadas));
    } catch (erro) {
      console.log("Erro ao salvar favoritas:", erro);
    }
  }

  return (
    <CurrencyContext.Provider value={{ favoritas, alternarFavorita }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}