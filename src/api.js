const API_KEY = process.env.EXPO_PUBLIC_EXCHANGE_RATE_KEY;
const BASE_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}`;

export async function buscarMoedas() {
  const resposta = await fetch(`${BASE_URL}/codes`);
  const dados = await resposta.json();

  if (dados.result !== "success") {
    throw new Error("Não foi possível carregar as moedas.");
  }

  return dados.supported_codes.map(([codigo, nome]) => ({
    codigo,
    nome,
  }));
}

export async function buscarTaxas() {
  const resposta = await fetch(`${BASE_URL}/latest/USD`);
  const dados = await resposta.json();

  if (dados.result !== "success") {
    throw new Error("Não foi possível carregar as taxas de câmbio.");
  }

  return dados.conversion_rates;
}