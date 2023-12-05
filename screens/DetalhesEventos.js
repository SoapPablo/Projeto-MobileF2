import React, { useState } from 'react';
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
import PresencasInfo from '../components/PresencasInfo';
import { useEventoContext } from '../contexts/EventoContext';
import { useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';

const DetalhesDoEvento = () => {
  const eventoContext = useEventoContext();
  const route = useRoute();
  const userID = eventoContext.userID;
  const eventoId = route.params?.eventoId;

  const eventoSelecionado = eventoContext.buscar(eventoId);

  const usuarioConfirmado = eventoSelecionado.confirmados.includes(userID);

  const [showSecondPresencasInfo, setShowSecondPresencasInfo] = useState(false);

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Image
            source={{ uri: eventoSelecionado.imagemEvento }}
            style={styles.image}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.nomeContainer}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.textTitle}>
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
            <IconInfo
              faixaEtaria={eventoSelecionado.selectedFaixaEtaria}
              bebidas={eventoSelecionado.selectedBebidas}
              fumantes={eventoSelecionado.selectedFumante}
            />
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
            <Text style={styles.textEndereco}>
              {eventoSelecionado.endereco}
            </Text>
          </View>
          <View style={styles.mapView}>
            <MyMapView
              latitude={eventoSelecionado.localizacaoEvento.latitude}
              longitude={eventoSelecionado.localizacaoEvento.longitude}
              nomeEvento={eventoSelecionado.nomeEvento}
              tipoEvento={eventoSelecionado.selectedTipoEvento}
            />
          </View>
        </View>

        <View style={styles.presencasInfoContainer}>
          <View style={styles.presencasInfo}>
            <TouchableOpacity onPress={() => setShowSecondPresencasInfo(true)}>
              <PresencasInfo presencas={eventoSelecionado.confirmados} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {showSecondPresencasInfo && (
        <View style={styles.presencasInfoContainer2}>
          <PresencasInfo presencas={eventoSelecionado.confirmados} />
          <TouchableOpacity
            onPress={() => setShowSecondPresencasInfo(false)}
            style={styles.closeButton}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.fixedButtonContainer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            {
              backgroundColor: usuarioConfirmado ? '#6c14a3' : '#a020f0',
            },
          ]}
          onPress={() => {
            if (usuarioConfirmado) {
              if (userID === eventoSelecionado.criador) {
                Alert.alert(
                  'Aviso',
                  'Você não pode cancelar a presença no seu próprio evento.'
                );
              } else {
                eventoContext.removerUsuarioDoEvento(eventoSelecionado.id);
              }
            } else {
              eventoContext.adicionarUsuarioAoEvento(eventoSelecionado.id);
            }
          }}>
          <Text style={styles.buttonText}>
            {usuarioConfirmado ? 'Cancelar presença' : 'Confirmar presença'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  scrollView: {
    paddingBottom: 20,
    flex: 1,
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
  presencasInfoContainer: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  presencasInfo: {
    width: '90%',
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  presencasInfoContainer2: {
    width: '90%',
    height: '80%',
    marginBottom: '50%',
    alignSelf: 'center',
  },
  closeButton: {
    width: '98%',
    height: 50,
    backgroundColor: '#6c14a3',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  confirmButton: {
    width: '98%',
    height: 50,
    backgroundColor: '#a020f0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fixedButtonContainer: {
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingBottom: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetalhesDoEvento;
