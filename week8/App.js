import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View, Button, StyleSheet } from 'react-native';

// Create drawer navigator
const Drawer = createDrawerNavigator();

// Home Screen Component
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Home Screen</Text>
      <Button 
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

// Details Screen Component
function DetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Details Screen</Text>
      <Button 
        title="Go Back to Home"
        onPress={() => navigation.goBack()}
      />
      <Button 
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

// Profile Screen Component
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Profile</Text>
      <Text style={styles.profileItem}>Name: Ilker Ozturk</Text>
      <Text style={styles.profileItem}>Email: n01680555@humber.ca</Text>
    </View>
  );
}

// Side panel (drawer content) component
function SidePanel({ navigation }) {
  return (
    <View style={styles.sidePanelContainer}>
      <Button 
        title="Home"
        onPress={() => navigation.navigate('Home')}
      />
      <Button 
        title="Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button 
        title="Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f8ff',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileItem: {
    fontSize: 18,
    marginVertical: 5,
  },
  sidePanelContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
});

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={(props) => <SidePanel {...props} />}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Details" component={DetailsScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}