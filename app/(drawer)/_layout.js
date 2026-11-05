import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{ title: "Início", drawerLabel: "Início" }}
      />
      <Drawer.Screen
        name="sobre"
        options={{ title: "Sobre", drawerLabel: "Sobre" }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{ title: "Moedas", drawerLabel: "Moedas" }}
      />
    </Drawer>
  );
}