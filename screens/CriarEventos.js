import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import DatePicker from '../components/DataPicker';
import MapPicker from '../components/MapPicker';
import MyImagePicker from '../components/MyImagePicker';

const CriarEventos = () => {
  // Estados dos pickers e imputs.
  const [selectedFaixaEtaria, setSelectedFaixaEtaria] =
    useState('naFaixaEtaria');
  const [selectedBebidas, setSelectedBebidas] = useState('na');
  const [selectedFumante, setSelectedFumante] = useState('na');
  const [selectedTipoEvento, setSelectedTipoEvento] = useState('na');
  const [selectedDuracao, setSelectedDuracao] = useState('na');

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View>
        <View style={styles.image}>
          <MyImagePicker onImageSelected={(uri) => setImagemEvento(uri)} />
        </View>
        <View style={styles.container}>
          <TextInput
            style={styles.textinput}
            type="outlined"
            label="Nome do evento"
          />

          <TextInput
            style={styles.textinput}
            type="outlined"
            label="Subtítulo (opcional)"
          />

          <TextInput
            style={styles.textinputdesc}
            label="Descrição do evento (opcional)"
            multiline={true}
            numberOfLines={10}
          />

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

          <Text style={styles.textTitle}>Data e hora</Text>

          <View style={styles.datePicker}>
            <DatePicker />
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

          <View style={styles.mapContainer}>
            <MapPicker />
          </View>

          <TextInput
            style={styles.textinput2}
            type="outlined"
            label="Endereço"
          />
        </View>
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
});

export default CriarEventos;
