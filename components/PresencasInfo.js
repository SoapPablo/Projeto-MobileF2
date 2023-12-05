import React from 'react';
import { View, ScrollView, Text, FlatList, StyleSheet } from 'react-native';

const PresencasInfo = ({ presencas }) => {
  const totalPresencas = presencas.length;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Presenças Confirmadas: {totalPresencas}
          </Text>
        </View>
        <FlatList
          data={presencas}
          keyExtractor={(item, index) => (item?.userID || index).toString()}
          renderItem={({ item }) => (
            <View style={styles.userIDContainer}>
              <Text style={styles.userIDText}>Nome do usuário</Text>
            </View>
          )}
          initialNumToRender={10}
          style={styles.flatList}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#a020f0',
    height: 500,
  },
  headerContainer: {
    width: '100%',
    backgroundColor: '#a020f0',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  flatList: {
    flex: 1,
    width: '100%',
    marginTop: -8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#a020f0',
  },
  userIDContainer: {
    flex: 1,
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#a020f0',
    alignItems: 'center',
  },
  userIDText: {
    fontSize: 16,
    color: '#a020f0',
  },
});

export default PresencasInfo;
