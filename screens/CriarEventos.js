import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import DatePicker from '../components/DataPicker';
import MapPicker from '../components/MapPicker';
import MyImagePicker from '../components/MyImagePicker';
import { EventoProvider, useEventoContext } from '../contexts/EventoContext';
import { useNavigation } from '@react-navigation/native';

const CriarEventosContent = () => {
  const {
    setImagemEvento,
    nomeEvento,
    descricaoEvento,
    endereco,
    imagemError,
    nomeEventoError,
    descricaoEventoError,
    enderecoError,
    handleLocationSelected,
    handleDataSelected,
    handleHoraSelected,
    validarNomeEvento,
    validarDescricaoEvento,
    validarEndereco,
    criarEvento,
  } = useEventoContext();

  const navigation = useNavigation();

  const handleCriarEvento = async () => {
    try {
      await criarEvento();
      navigation.navigate('BuscarEventos');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View>
        <View style={styles.image}>
          <MyImagePicker onImageSelected={(uri) => setImagemEvento(uri)} />
        </View>

        <View style={styles.container}>
          <HelperText
            style={styles.helperText}
            type="error"
            visible={Boolean(imagemError)}>
            {imagemError}
          </HelperText>

          <TextInput
            style={styles.textinput}
            type="outlined"
            label="Nome do evento"
            value={nomeEvento}
            onChangeText={validarNomeEvento}
          />
          <HelperText
            style={styles.helperText}
            type="error"
            visible={Boolean(nomeEventoError)}>
            {nomeEventoError}
          </HelperText>

          <TextInput
            style={styles.textinputdesc}
            label="Descrição do evento (opcional)"
            value={descricaoEvento}
            onChangeText={validarDescricaoEvento}
            multiline={true}
            numberOfLines={10}
          />
          <HelperText
            style={styles.helperText}
            type="error"
            visible={Boolean(
              descricaoEventoError && descricaoEvento.length > 0
            )}>
            {descricaoEventoError}
          </HelperText>

          <Text style={styles.textTitle}>Data e hora</Text>

          <View style={styles.datePicker}>
            <DatePicker
              onDateSelected={handleDataSelected}
              onHoraSelected={handleHoraSelected}
            />
          </View>

          <View style={styles.mapContainer}>
            <MapPicker onLocationSelected={handleLocationSelected} />
          </View>

          <TextInput
            style={styles.textinput2}
            type="outlined"
            label="Endereço"
            value={endereco}
            onChangeText={validarEndereco}
          />
          <HelperText
            style={styles.helperText}
            type="error"
            visible={enderecoError}>
            {enderecoError}
          </HelperText>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleCriarEvento}>
            <Text style={styles.buttonText}>Criar Evento</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const CriarEventos = () => {
  return (
    <EventoProvider>
      <CriarEventosContent />
    </EventoProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  image: {
    width: '100%',
    height: 270,
  },
  container: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textinput: {
    margin: 10,
    borderRadius: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    width: '90%',
  },
  textinput2: {
    margin: 10,
    borderRadius: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    width: '90%',
  },
  textinputdesc: {
    margin: 10,
    borderRadius: 0,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    height: 200,
    width: '90%',
  },
  textTitle: {
    marginTop: 30,
    color: '#a020f0',
    fontSize: 25,
    fontWeight: 'bold',
  },
  datePicker: {
    width: '100%',
    margin: 5,
  },
  mapContainer: {
    width: '90%',
  },
  helperText: {
    margin: -10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  confirmButton: {
    width: '98%',
    height: 50,
    backgroundColor: '#a020f0',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -20,
    marginTop: 7,
  },
});

export default CriarEventos;
