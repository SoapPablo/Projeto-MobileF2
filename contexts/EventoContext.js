import React, { createContext, useContext, useState } from 'react';

const EventoContext = createContext();

export const useEventoContext = () => {
  const context = useContext(EventoContext);
  if (!context) {
    throw new Error(
      'useEventoContext deve ser usado dentro de um EventoProvider'
    );
  }
  return context;
};

export const EventoProvider = ({ children }) => {
  const [imagemEvento, setImagemEvento] = useState(null);
  const [nomeEvento, setNomeEvento] = useState('');
  const [subTitulo, setSubTitulo] = useState('');
  const [descricaoEvento, setDescricaoEvento] = useState('');
  const [selectedFaixaEtaria, setSelectedFaixaEtaria] =
    useState('naFaixaEtaria');
  const [selectedBebidas, setSelectedBebidas] = useState('na');
  const [selectedFumante, setSelectedFumante] = useState('na');
  const [selectedTipoEvento, setSelectedTipoEvento] = useState('na');
  const [dataEvento, setDataEvento] = useState(null);
  const [horaEvento, setHoraEvento] = useState(null);
  const [selectedDuracao, setSelectedDuracao] = useState('na');
  const [localizacaoEvento, setLocalizacaoEvento] = useState(null);
  const [endereco, setEndereco] = useState('');

  const [eventos, setEventos] = useState([]);

  const handleLocationSelected = (location) => {
    setLocalizacaoEvento(location);
  };

  const handleDataSelected = (dataEvento) => {
    setDataEvento(dataEvento);
  };

  const handleHoraSelected = (horaEvento) => {
    setHoraEvento(horaEvento);
  };

  const criarEvento = () => {
      const novoEvento = {
        id: Date.now(),
        imagemEvento,
        nomeEvento,
        subTitulo,
        descricaoEvento,
        selectedFaixaEtaria,
        selectedBebidas,
        selectedFumante,
        selectedTipoEvento,
        dataEvento,
        horaEvento,
        selectedDuracao,
        localizacaoEvento,
        endereco,
      };

      setEventos((prevEventos) => [...prevEventos, novoEvento]);
  };

  const contextValues = {
    imagemEvento,
    setImagemEvento,
    nomeEvento,
    setNomeEvento,
    subTitulo,
    setSubTitulo,
    descricaoEvento,
    setDescricaoEvento,
    selectedFaixaEtaria,
    setSelectedFaixaEtaria,
    selectedBebidas,
    setSelectedBebidas,
    selectedFumante,
    setSelectedFumante,
    selectedTipoEvento,
    setSelectedTipoEvento,
    dataEvento,
    setDataEvento,
    horaEvento,
    setHoraEvento,
    selectedDuracao,
    setSelectedDuracao,
    localizacaoEvento,
    setLocalizacaoEvento,
    endereco,
    setEndereco,
    handleLocationSelected,
    handleDataSelected,
    handleHoraSelected,
    criarEvento,
    eventos,
    setEventos,
  };

  return (
    <EventoContext.Provider value={contextValues}>
      {children}
    </EventoContext.Provider>
  );
};
