import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import MyMapView from '../components/MyMapView';
import IconInfo from '../components/IconInfo';
import { useEventoContext } from '../contexts/EventoContext';
import { useRoute } from '@react-navigation/native';

const DetalhesDoEvento = () => {
  const route = useRoute();
  const eventoId = route.params?.eventoId;

  const eventoContext = useEventoContext();
  const eventoSelecionado = eventoContext.buscar(eventoId);

  return (
    <ScrollView style={styles.scrollView}>
      <View>
        <Image
          source={{ uri: eventoSelecionado.imagemEvento }}
          style={styles.image}
        />
      </View>
      <View style={styles.container}>
        <View style={styles.nomeContainer}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textTitle}>
            {eventoSelecionado.nomeEvento}
          </Text>

          <TouchableOpacity style={styles.compartilharButton}>
            <Image
              style={styles.compartilharButton}
              source={require('../assets/Icons/compartilhar.png')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.line}>
          <Text>-</Text>
        </View>

        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.textSubtitle}>
          {eventoSelecionado.subtitulo}
        </Text>

        <View style={styles.iconInfo}>
          <IconInfo />
        </View>

        <View>
          <Text style={styles.dataHora}>
            {eventoSelecionado.dataEvento} ás {eventoSelecionado.horaEvento}
          </Text>
        </View>

        <View>
          <Text style={styles.textDesc}>
            {eventoSelecionado.descricaoEvento}
          </Text>
        </View>

        <View>
          <Text style={styles.textEndereco}>{eventoSelecionado.endereco}</Text>
        </View>

        <View style={styles.mapView}>
          <MyMapView
            latitude={eventoSelecionado.localizacaoEvento.latitude}
            longitude={eventoSelecionado.localizacaoEvento.longitude}
            nomeEvento={eventoSelecionado.nomeEvento}
          />
        </View>

        <TouchableOpacity style={styles.confirmButton}>
          <Text style={styles.buttonText}>Confirmar presença</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 270,
  },
  nomeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  textTitle: {
    margin: 1,
    color: '#a020f0',
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  compartilharButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    backgroundColor: '#a020f0',
    height: 5,
    width: '100%',
    alignSelf: 'center',
    margin: 10,
  },
  textSubtitle: {
    margin: 5,
    marginTop: 0,
    color: '#a020f0',
    fontSize: 20,
    alignSelf: 'center',
  },
  iconInfo: {
    width: '100%',
  },
  dataHora: {
    margin: 1,
    color: '#a020f0',
    fontSize: 22,
    fontWeight: 'bold',
  },
  textDesc: {
    margin: 10,
    color: 'black',
    fontSize: 20,
  },
  textEndereco: {
    marginTop: 10,
    color: '#a020f0',
    fontSize: 22,
    fontWeight: 'bold',
  },
  mapView: {
    width: '90%',
  },
  confirmButton: {
    width: '98%',
    height: 50,
    backgroundColor: '#a020f0',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DetalhesDoEvento;
