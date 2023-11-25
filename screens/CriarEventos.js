import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DatePicker from '../components/DataPicker';
import MapPicker from '../components/MapPicker';
import MyImagePicker from '../components/MyImagePicker';
import { EventoProvider, useEventoContext } from '../contexts/EventoContext';

const CriarEventosContent = () => {
  const {
    // Estados
    setImagemEvento,
    nomeEvento,
    subTitulo,
    descricaoEvento,
    selectedFaixaEtaria,
    setSelectedFaixaEtaria,
    selectedBebidas,
    setSelectedBebidas,
    selectedFumante,
    setSelectedFumante,
    selectedTipoEvento,
    setSelectedTipoEvento,
    selectedDuracao,
    setSelectedDuracao,
    endereco,
    // Estados de erro
    imagemError,
    nomeEventoError,
    subTituloError,
    descricaoEventoError,
    pickerNaError,
    dataEventoError,
    localizacaoEventoError,
    enderecoError,
    // Funções
    handleLocationSelected,
    handleDataSelected,
    handleHoraSelected,
    validarNomeEvento,
    validarSubTitulo,
    validarDescricaoEvento,
    validarEndereco,
    criarEvento,
  } = useEventoContext();

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
            style={styles.textinput}
            type="outlined"
            label="Subtítulo (opcional)"
            value={subTitulo}
            onChangeText={validarSubTitulo}
          />
          <HelperText
            style={styles.helperText}
            type="error"
            visible={Boolean(subTituloError)}>
            {subTituloError}
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

          <View style={styles.pickercontainer}>
            <Text style={styles.textTitle}>Informações do evento</Text>

            <Picker
              selectedValue={selectedFaixaEtaria}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedFaixaEtaria(itemValue)
              }>
              <Picker.Item label="Selecione a faixa etária" value="na" />
              <Picker.Item label="+18" value="Proibido menores de 18 anos" />
              <Picker.Item label="+16" value="Proibido menores de 16 anos" />
              <Picker.Item label="+14" value="Proibido menores de 14 anos" />
              <Picker.Item label="+12" value="Proibido menores de 12 anos" />
              <Picker.Item
                label="Livre para todos os públicos"
                value="Livre para todos"
              />
            </Picker>
            <Picker
              selectedValue={selectedBebidas}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedBebidas(itemValue)
              }>
              <Picker.Item label="Selecione o consumo de bebidas" value="na" />
              <Picker.Item label="Bar no local" value="Bar no local" />
              <Picker.Item label="Leve sua bebida" value="Leve sua bebida" />
              <Picker.Item
                label="Proibido bebidas alcoólicas"
                value="Sem álcool"
              />
            </Picker>
            <Picker
              selectedValue={selectedFumante}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedFumante(itemValue)
              }>
              <Picker.Item label="Selecione a regra para fumantes" value="na" />
              <Picker.Item label="Permitido fumar" value="Permitido fumar" />
              <Picker.Item label="Proibido fumar" value="Proibido fumar" />
              <Picker.Item
                label="Local com fumódromo"
                value="Local com fumódromo"
              />
              <Picker.Item label="Hookah" value="Hookah" />
            </Picker>
            <Picker
              selectedValue={selectedTipoEvento}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedTipoEvento(itemValue)
              }>
              <Picker.Item label="Selecione o tipo do evento" value="na" />
              <Picker.Item label="Casamento" value="Casamento" />
              <Picker.Item label="Aniversário" value="Aniversario" />
              <Picker.Item label="Formatura" value="Formatura" />
              <Picker.Item label="Festas e shows" value="Festas e shows" />
              <Picker.Item label="Churrasco" value="Churrasco" />
              <Picker.Item label="Campeonatos" value="Campeonatos" />
              <Picker.Item label="Stand Up Comedy" value="Stand Up Comedy" />
              <Picker.Item
                label="Esportes e atividades físicas"
                value="Esportes e atividades físicas"
              />
              <Picker.Item
                label="E-sports e online"
                value="E-sports e online"
              />
              <Picker.Item
                label="Reuniões e palestras"
                value="Reuniões e palestras"
              />
            </Picker>
          </View>
          <HelperText
            style={styles.helperText}
            type="error"
            visible={pickerNaError}>
            {pickerNaError}
          </HelperText>

          <Text style={styles.textTitle}>Data e hora</Text>

          <View style={styles.datePicker}>
            <DatePicker
              onDateSelected={handleDataSelected}
              onHoraSelected={handleHoraSelected}
            />
          </View>

          <Picker
            selectedValue={selectedDuracao}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedDuracao(itemValue)
            }>
            <Picker.Item label="Selecione a duração do evento" value="na" />
            <Picker.Item label="1 Hora" value="1" />
            <Picker.Item label="2 Horas" value="2" />
            <Picker.Item label="3 Horas" value="3" />
            <Picker.Item label="6 Horas" value="6" />
            <Picker.Item label="12 Horas" value="12" />
            <Picker.Item label="1 Dia" value="24" />
            <Picker.Item label="2 Dias" value="48" />
            <Picker.Item label="3 Dias" value="72" />
          </Picker>

          <HelperText
            style={styles.helperText}
            type="error"
            visible={dataEventoError}>
            {dataEventoError}
          </HelperText>

          <Text style={styles.textTitle}>Localização e endereço</Text>

          <View style={styles.mapContainer}>
            <MapPicker onLocationSelected={handleLocationSelected} />
          </View>

          <HelperText
            style={styles.helperText}
            type="error"
            visible={Boolean(localizacaoEventoError)}>
            {localizacaoEventoError}
          </HelperText>

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

          <TouchableOpacity style={styles.confirmButton} onPress={criarEvento}>
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
  pickercontainer: {
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  picker: {
    margin: 10,
    width: '90%',
    height: 50,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#a020f0',
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