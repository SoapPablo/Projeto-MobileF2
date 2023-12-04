import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

const IconInfo = ({ faixaEtaria, bebidas, fumantes }) => {
  const getIconFaixaEtaria = (faixaEtaria) => {
    switch (faixaEtaria) {
      case 'Proibido menores de 18 anos':
        return require('../assets/Icons/18.png');
      case 'Proibido menores de 16 anos':
        return require('../assets/Icons/16.png');
      case 'Proibido menores de 14 anos':
        return require('../assets/Icons/14.png');
      case 'Proibido menores de 12 anos':
        return require('../assets/Icons/12.png');
      case 'Livre para todos':
        return require('../assets/Icons/Livre.png');
      default:
        return null;
    }
  };

  const getIconBebidas = (bebidas) => {
    switch (bebidas) {
      case 'Bar no local':
        return require('../assets/Icons/bar-no-local.png');
      case 'Leve sua bebida':
        return require('../assets/Icons/leve-sua-bebida.png');
      case 'Sem álcool':
        return require('../assets/Icons/sem-alcool.png');
      default:
        return null;
    }
  };

  const getIconFumantes = (fumantes) => {
    switch (fumantes) {
      case 'Permitido fumar':
        return require('../assets/Icons/permitido-fumar.png');
      case 'Proibido fumar':
        return require('../assets/Icons/proibido-fumar.png');
      case 'Local com fumódromo':
        return require('../assets/Icons/fumodromo.png');
      case 'Hookah':
        return require('../assets/Icons/hoonkah.png');
      default:
        return null;
    }
  };

  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoItem}>
        <Image
          source={getIconFaixaEtaria(faixaEtaria)}
          style={styles.infoImage}
        />
        <Text style={styles.infoText} numberOfLines={2}>
          {faixaEtaria}
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Image
          source={getIconBebidas(bebidas)}
          style={styles.infoImage}
        />
        <Text style={styles.infoText} numberOfLines={2}>
          {bebidas}
        </Text>
      </View>
      <View style={styles.infoItem}>
        <Image
          source={getIconFumantes(fumantes)}
          style={styles.infoImage}
        />
        <Text style={styles.infoText} numberOfLines={2}>
          {fumantes}
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
