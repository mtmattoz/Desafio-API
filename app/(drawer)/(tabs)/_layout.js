import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="moedas"
        options={{ title: "Moedas", tabBarLabel: "Moedas" }}
      />
      <Tabs.Screen
        name="favoritas"
        options={{ title: "Favoritas", tabBarLabel: "Favoritas" }}
      />
      <Tabs.Screen
        name="converter"
        options={{ title: "Converter", tabBarLabel: "Converter" }}
      />
    </Tabs>
  );
}