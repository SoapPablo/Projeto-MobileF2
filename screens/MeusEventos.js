import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  IconButton,
} from 'react-native';
import { Dialog, Portal, Provider } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEventoContext } from '../contexts/EventoContext';

const Tab = createMaterialTopTabNavigator();

const ConfirmadosScreen = ({ navigation }) => {
  const { eventos, userID, handleRemoveEvent } = useEventoContext();

  const confirmadosEvents = eventos.filter((evento) =>
    evento.confirmados.includes(userID)
  );

  return (
    <ScrollView style={styles.container}>
      {confirmadosEvents.length > 0 ? (
        confirmadosEvents.map((evento) => (
          <EventCard
            key={evento.id}
            imagemEvento={evento.imagemEvento}
            nomeEvento={evento.nomeEvento}
            dataEvento={evento.dataEvento}
            horaEvento={evento.horaEvento}
            subtitulo={evento.subtitulo}
            onPress={() =>
              navigation.navigate('Detalhes do Evento', {
                eventoId: evento.id,
              })
            }
          />
        ))
      ) : (
        <Text style={styles.noEventsText}>Nenhum evento confirmado</Text>
      )}
    </ScrollView>
  );
};

function CriadosScreen() {
  const { eventos, userID, handleRemoveEvent } = useEventoContext();

  const confirmadosEvents = eventos.filter((evento) =>
    evento.confirmados.includes(userID)
  );


  return (
  <ScrollView style={styles.container}>
    {confirmadosEvents.length > 0 ? (
      confirmadosEvents.map((evento) => (
        <View key={evento.id}>
          <EventCard
            imagemEvento={evento.imagemEvento}
            nomeEvento={evento.nomeEvento}
            dataEvento={evento.dataEvento}
            horaEvento={evento.horaEvento}
            subtitulo={evento.subtitulo}
            right={(props) => (
              <IconButton
                {...props}
                icon="delete"
                color='black'
                onPress={() => handleRemoveEvent(evento.id)}
              />
            )}
            onPress={() =>
              navigation.navigate('Detalhes do Evento', {
                eventoId: evento.id,
              })
            }
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveEvent(evento.id)}
          >
            <Text style={styles.removeButtonText}>Apagar Evento</Text>
          </TouchableOpacity>
        </View>
      ))
    ) : (
      <Text style={styles.noEventsText}>Nenhum evento confirmado</Text>
    )}
  </ScrollView>
);
}
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

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'white',
          style: {
            backgroundColor: '#a020f0',
          },
          indicatorStyle: {
            backgroundColor: 'white',
          },
        }}>
        <Tab.Screen name="Confirmados" component={ConfirmadosScreen} />
        <Tab.Screen name="Criados" component={CriadosScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
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
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
