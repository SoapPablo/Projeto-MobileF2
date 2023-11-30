import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const IconInfo = () => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoItem}>
        <Image source={require('../assets/Icons/18.png')} style={styles.infoImage} />
        <Text style={styles.infoText} numberOfLines={2}>
          Proibido menores de 18 anos
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Image
          source={require('../assets/Icons/leve-sua-bebida.png')}
          style={styles.infoImage}
        />
        <Text style={styles.infoText} numberOfLines={2}>
          Leve sua bebida
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Image
          source={require('../assets/Icons/fumodromo.png')}
          style={styles.infoImage}
        />
        <Text style={styles.infoText} numberOfLines={2}>
          Local com fumódromo
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 35,
    width: '100%',
    backgroundColor: '#f8f2ff',
  },
  infoItem: {
    alignItems: 'center',
  },
  infoImage: {
    width: 80,
    height: 80,
    margin: 5,
  },
  infoText: {
    color: 'black',
    fontSize: 15,
    width: 120,
    textAlign: 'center',
  },
});

export default IconInfo;