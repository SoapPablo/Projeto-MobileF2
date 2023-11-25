import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Location, Permissions } from 'expo';

const MapPicker = ({ onLocationSelected }) => {
  const [mapRegion, setMapRegion] = useState({
    latitude: -15.78,
    longitude: -47.89,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    async function getLocationAsync() {
      const { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setSelectedLocation({ latitude, longitude });
      }
    }

    getLocationAsync();
  }, []);

  const handleMapPress = (e) => {
    setSelectedLocation(e.nativeEvent.coordinate);
    onLocationSelected(e.nativeEvent.coordinate);
  };

  return (
    <View style={styles.map}>
      <View>
        <Text style={styles.textTitleMap}>Marque a localização do evento</Text>
      </View>
      <View>
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          onPress={handleMapPress}>
          {selectedLocation && (
            <Marker
              coordinate={selectedLocation}
              title="Local do Evento"
              pinColor="#a020f0"
            />
          )}
        </MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textTitleMap: {
    marginTop: 10,
    fontSize: 20,
    color: '#a020f0',
    alignItems: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  map: {
    width: '100%',
    height: 320,
    marginBottom: 40,
  },
});

export default MapPicker;