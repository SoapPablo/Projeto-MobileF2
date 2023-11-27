import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useEventoContext } from '../contexts/EventoContext';
import imagem1 from '../assets/ImgPicker.png';

const EventCard = () => (
  <View style={styles.card}>
    <Image source={{imagem1}} style={styles.image} />
    <View style={styles.content}>
      <Text style={styles.title}>Churrascada PGT</Text>
      <Text style={styles.details}>
        Data: 18hrs | Horário: 19hrs
      </Text>
      <Text style={styles.description} numberOfLines={3}>
        LKJHBGFDGHJKLKKOIUYTRFGVHBNKMLOI987Y6T5RTFGVHBJNKMLOIU87Y6T5RTF
      </Text>
    </View>
  </View>
);

// apagar este event card de cima e descomentar este de de baixo !!!!!!!!!!!!!!!!!!!!!


// const EventCard = () => (
//   <View style={styles.card}>
//     <Image source={imageSource} style={styles.image} />
//     <View style={styles.content}>
//       <Text style={styles.title}>{title}</Text>
//       <Text style={styles.details}>
//         Data: {date} | Horário: {time}
//       </Text>
//       <Text style={styles.description} numberOfLines={3}>
//         {description}
//       </Text>
//     </View>
//   </View>
// );

const BuscarEventos = ({ navigation }) => {
  const { eventos } = useEventoContext();
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <ScrollView style={styles.container}>
      <Searchbar
        placeholder="Pesquisar eventos"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <EventCard/> 
      
      {/* {eventos.map((evento, index) => (
        <EventCard key={index} {...evento} />
      ))} */}
      <Button theme={{ colors: { primary: "#9400d3" } }} title="Criar Eventos" onPress={() => navigation.navigate('Criar Eventos')} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: 'purple',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginHorizontal: 10, // Margem horizontal para alinhar com o Appbar
  },
  image: {
    width: 100,
    height: 'auto',
    resizeMode: 'cover',
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  details: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: 'white',
  },
});

export default BuscarEventos;
