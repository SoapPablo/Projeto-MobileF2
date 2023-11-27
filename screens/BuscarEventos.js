import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useEventoContext } from '../contexts/EventoContext';

const EventCard = ({
  imagemEvento,
  nomeEvento,
  dataEvento,
  horaEvento,
  subtitulo,
  onPress,
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Image source={{ uri: imagemEvento }} style={styles.image} />
    <View style={styles.content}>
      <Text style={styles.title}>{nomeEvento}</Text>
      <Text style={styles.details}>
        Data: {dataEvento} | Horário: {horaEvento}
      </Text>
      <Text style={styles.description} numberOfLines={3}>
        {subtitulo}
      </Text>
    </View>
  </TouchableOpacity>
);

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

      {eventos.length > 0 ? (
        eventos.map((evento) => (
          <EventCard
            key={evento.id}
            imagemEvento={evento.imagemEvento}
            nomeEvento={evento.nomeEvento}
            dataEvento={evento.dataEvento}
            horaEvento={evento.horaEvento}
            subtitulo={evento.subtitulo}
            onPress={() =>
              navigation.navigate('Detalhes do Evento', { eventoId: evento.id })
            }
          />
        ))
      ) : (
        <Text style={styles.noEventsText}>Nenhum evento encontrado</Text>
      )}

      <TouchableOpacity
        style={styles.createEventButton}
        onPress={() => navigation.navigate('Criar Eventos')}>
        <Text style={styles.createEventButtonText}>Criar Evento</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 'auto',
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 8,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
  noEventsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: 'gray',
  },
  createEventButton: {
    backgroundColor: '#9400d3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  createEventButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BuscarEventos;
