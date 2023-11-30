import React, { useState } from 'react';
import { View, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePicker = ({ onDateSelected, onHoraSelected }) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [horaNull, setHoraNull] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    const dataEvento = currentDate.toLocaleDateString();
    const horaEvento = currentDate.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    onDateSelected(dataEvento);

    if (horaNull) {
      onHoraSelected(null);
    } else {
      onHoraSelected(horaEvento);
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChangeDatepicker = () => {
    showMode('date');
    setShowDate(true);
    setHoraNull(true);
  };

  const onChangeTimepicker = () => {
    showMode('time');
    setShowTime(true);
    setHoraNull(false);
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onChangeDatepicker}>
          <Text style={styles.buttonText}>
            {showDate
              ? 'Data: ' + date.toLocaleDateString()
              : 'Escolha a data do seu evento'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onChangeTimepicker}>
          <Text style={styles.buttonText}>
            {showTime
              ? 'Horário: ' +
                date.toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Escolha o horário do seu evento'}
          </Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          locale="pt-BR"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#a020f0',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default DatePicker;