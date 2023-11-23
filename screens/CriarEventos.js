import MyImagePicker from '../components/MyImagePicker';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const CriarEventos = () => {
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
});

export default CriarEventos;