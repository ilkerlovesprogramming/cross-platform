import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground } from 'react-native';

export default function App() {
  const [breeds, setBreeds] = useState([]); {/*state type: array, value default []*/}
  const [search, setSearch] = useState(''); {/*state type: string, value default ""*/}
  const [selectedBreed, setSelectedBreed] = useState(null); {/*state type: string, value default null, expected to take object*/}
  const [drawerOpen, setDrawerOpen] = useState(false); {/*sidebar values to show view. (boolean default false)*/}
  const [backgroundImages, setBackgroundImages] = useState([]); {/*grid images for welcoming page, empty array []*/}

{/*fetching part*/}
  useEffect(() => {
    fetchBackgroundImages(); {/*invoking function to fetch images*/}
    fetchBreeds(); {/*invoking function to fetch breeds*/}
  }, []);

  {/*Fetching all breeds and saving into breeds array via setBreeds function using useState*/}
  const fetchBreeds = () => {
    fetch('https://dogapi.dog/api/v2/breeds')
      .then(response => response.json())
      .then(data => {
        if (data.data) setBreeds(data.data);
      })
      .catch(error => console.error(error));
  };

{/*Fetches 4 background grid images to display in welcome page for better user experience rather than just button ;) */}
  const fetchBackgroundImages = () => {
    fetch('https://dog.ceo/api/breeds/image/random/4')
      .then(response => response.json())
      .then(data => {
        if (data.message) setBackgroundImages(data.message);
      })
      .catch(error => console.error(error));
  };

{/*dynamic updated breeds via hook variable (dynamic variable) called 'search'*/}
  const filteredBreeds = breeds.filter(breed =>
    breed.attributes.name.toLowerCase().includes(search.toLowerCase())
  );

{/*this function creates button for each breed*/}
  const renderBreed = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        setSelectedBreed(item);
        setDrawerOpen(false);
      }}
    >
      <Text style={styles.title}>{item.attributes.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
      {/*dynamic condition ? statement : statement used for sidebar to display or not display */}
        {drawerOpen ? (
          <View style={styles.drawer}>
            <TextInput
              style={styles.searchBar}
              placeholder="Search breeds..."
              onChangeText={setSearch}
              value={search}
            />
            <FlatList
              data={filteredBreeds}
              keyExtractor={item => item.id}
              renderItem={renderBreed}
            />
            <TouchableOpacity style={styles.button} onPress={() => setDrawerOpen(false)}>
              <Text style={styles.buttonText}>Close Drawer</Text>
            </TouchableOpacity>
          </View>
        ) : selectedBreed ? (
          <ScrollView style={styles.detailsContainer}>
            <Text style={styles.heading}>{selectedBreed.attributes.name}</Text>
            <Text style={styles.description}>{selectedBreed.attributes.description}</Text>
            <TouchableOpacity style={styles.button} onPress={() => setSelectedBreed(null)}>
              <Text style={styles.buttonText}>Go to Homepage</Text>
            </TouchableOpacity>
          </ScrollView>
        ) : (
          <View style={styles.homeContainer}>
            <View style={styles.gridBackground}>
              {backgroundImages.map((img, index) => (
                <ImageBackground key={index} source={{ uri: img }} style={styles.gridImage} />
              ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={() => setDrawerOpen(true)}>
              <Text style={styles.buttonText}>Open Breed Browser</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingHorizontal: 16,
  },
  drawer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  searchBar: {
    height: 40,
    borderColor: '#bbb',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  item: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#ffebcc',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#34495e',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 20,
    textAlign: 'justify',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  gridBackground: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  gridImage: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
});
