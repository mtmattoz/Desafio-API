import { Stack } from "expo-router";
import { CurrencyProvider } from "../src/CurrencyContext";

export default function RootLayout() {
  return (
    <CurrencyProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(drawer)" />
      </Stack>
    </CurrencyProvider>
  );
}