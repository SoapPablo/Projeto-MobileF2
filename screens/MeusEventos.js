import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import { Dialog, Portal, Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEventoContext } from '../contexts/EventoContext';

const Tab = createMaterialTopTabNavigator();

function ConfirmadosScreen() {
  const { eventos, contextValues, remover } = useEventoContext();

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        {eventos.map((evento, index) => (
          <EventCard
            key={index}
            title={evento.nomeEvento}
            date={evento.dataEvento}
            time={evento.horaEvento}
            description={evento.descricaoEvento}
            imageSource={{ uri: evento.imagemEvento }}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function CriadosScreen() {
  const {
    eventos,
    showDialog,
    hideDialog,
    visible,
    setImagemEvento, // Adicione os outros setters conforme necessário
  } = useEventoContext();

  return (
    <Provider>
      <View style={{ flex: 1 }}>
        <ScrollView>
          {eventos.map((evento, index) => (
            <EventCard
              key={index}
              title={evento.nomeEvento}
              date={evento.dataEvento}
              time={evento.horaEvento}
              description={evento.descricaoEvento}
              imageSource={{ uri: evento.imagemEvento }}
            />
          ))}
          <TouchableOpacity style={styles.button} onPress={showDialog}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              CANCELAR EVENTO
            </Text>
          </TouchableOpacity>
        </ScrollView>

        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideDialog}
            style={{ backgroundColor: 'white' }}>
            <Dialog.Title style={{ color: 'black' }}>
              Cancelar Evento
            </Dialog.Title>
            <Dialog.Content>
              <Text style={{ color: 'black' }}>
                Deseja realmente cancelar o evento?
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancelar</Button>
              <Button onPress={hideDialog}>Voltar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
}

const EventCard = ({ imagemEvento, nomeEvento, dataEvento, horaEvento, descricaoEvento }) => (
  <View style={styles.card}>
    <Image source={imagemEvento} style={styles.image} />
    <View style={styles.content}>
      <Text style={styles.title}>{nomeEvento}</Text>
      <Text style={styles.details}>
        Data: {dataEvento} | Horário: {horaEvento}
      </Text>
      <Text style={styles.description} numberOfLines={3}>
        {descricaoEvento}
      </Text>
    </View>
  </View>
);

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: 'white',
          style: {
            backgroundColor: 'purple',
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
    backgroundColor: 'purple',
    maxHeight: 300,
    borderRadius: 8,
    marginTop: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginHorizontal: 10,
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
  button: {
    backgroundColor: 'red',
    color: 'white', 
    justifyContent: 'center',
    height: 30,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginHorizontal: 10,
  },
});
