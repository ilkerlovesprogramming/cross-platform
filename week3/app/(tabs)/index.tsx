import React, { useRef, useState } from "react";
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState("left");

  // Toggle the drawer position between left and right
  const changeDrawerPosition = () => {
    setDrawerPosition((prevPosition) => (prevPosition === "left" ? "right" : "left"));
  };

  // Navigation view for the drawer
  const navigationView = (
    <View style={[styles.container, styles.navigationContainer]}>
      <Button title="Close drawer" onPress={() => drawer.current.closeDrawer()} />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={200}
      drawerPosition={drawerPosition}
      renderNavigationView={() => navigationView} // Make sure it's passed as a function
    >
      <View style={styles.container}>
        <Text style={styles.paragraph}>Swipe from {drawerPosition} to open the drawer</Text>
        <Button title="Open drawer" onPress={() => drawer.current.openDrawer()} />
        <Button title="Change Drawer Position" onPress={changeDrawerPosition} />
      </View>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center",
  },
});
