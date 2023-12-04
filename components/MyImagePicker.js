import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const MyImagePicker = ({ onImageSelected }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert(
            'Desculpe, precisamos de permissão para acessar sua galeria de fotos.'
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      onImageSelected(result.uri);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            selectedImage
              ? { uri: selectedImage }
              : require('../assets/ImgPicker.png')
          }
          style={styles.image}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%'
  }
});

export default MyImagePicker;