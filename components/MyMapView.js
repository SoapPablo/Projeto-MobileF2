import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const MyMapView = ({ latitude, longitude, nomeEvento, tipoEvento }) => {
  return (
    <View style={styles.map}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003,
        }}>
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          title={nomeEvento}
          description={tipoEvento}
          pinColor="#a020f0"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: 300,
    marginBottom: 40,
  },
});

export default MyMapView;
