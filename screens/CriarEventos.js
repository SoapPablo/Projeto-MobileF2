import MyImagePicker from '../components/MyImagePicker';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const CriarEventos = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View>
        <View style={styles.image}>
          <MyImagePicker onImageSelected={(uri) => setImagemEvento(uri)} />
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
  }
});

export default CriarEventos;
