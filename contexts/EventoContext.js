import React, { createContext, useContext, useState, useEffect } from 'react';
import EventoService from '../services/EventoService';

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
  const [descricaoEvento, setDescricaoEvento] = useState('');
  const [dataEvento, setDataEvento] = useState(null);
  const [horaEvento, setHoraEvento] = useState(null);
  const [localizacaoEvento, setLocalizacaoEvento] = useState(null);
  const [endereco, setEndereco] = useState('');

  const [imagemError, setImagemError] = useState('');
  const [nomeEventoError, setNomeEventoError] = useState('');
  const [descricaoEventoError, setDescricaoEventoError] = useState('');
  const [dataEventoError, setDataEventoError] = useState(null);
  const [localizacaoEventoError, setLocalizacaoEventoError] = useState(null);
  const [enderecoError, setEnderecoError] = useState('');

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

 const listar = async () => {
    try {
      const listaAtualizada = await EventoService.buscarEventos();
      setEventos(listaAtualizada);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Valida o nome do evento.
  const validarNomeEvento = (text) => {
    if (text.length > 26) {
      setNomeEventoError(
        'O nome do evento não pode ter mais de 26 caracteres.'
      );
    } else {
      setNomeEventoError('');
    }
    setNomeEvento(text);
  };

  // Valida a descrição.
  const validarDescricaoEvento = (text) => {
    const descricaoLinhas = text.split('\n').length;
    const descricaoCaracteres = text.length;

    if (descricaoLinhas > 15) {
      setDescricaoEventoError(
        'A descrição não pode ter mais de 15 quebras de linha.'
      );
    } else if (descricaoCaracteres > 500) {
      setDescricaoEventoError(
        'A descrição não pode ter mais de 500 caracteres.'
      );
    } else {
      setDescricaoEventoError('');
    }
    setDescricaoEvento(text);
  };

  // Valida o endereço.
  const validarEndereco = (text) => {
    if (text.length > 40) {
      setEnderecoError('O endereço não pode ter mais de 40 caracteres.');
    } else {
      setEnderecoError('');
    }
    setEndereco(text);
  };

  const criarEvento = async () => {
  return new Promise(async (resolve, reject) => {
    try {
    // Verifica se uma imagem foi escolhida.
    if (!imagemEvento) {
      setImagemError('Por favor, escolha uma imagem para o evento.');
      return;
    } else {
      setImagemError('');
    }

    // Verifica o nome do evento.
    if (nomeEvento.trim().length < 5) {
      setNomeEventoError('O nome do evento deve ter pelo menos 5 caracteres.');
      return;
    } else {
      setNomeEventoError('');
    }

    // Verifica se a data, hora e duração foram escolhidas.
    if (!dataEvento) {
      setDataEventoError('Por favor, selecione a data do evento.');
      return;
    } else if (!horaEvento) {
      setDataEventoError('Por favor, selecione o horário do evento');
      return;
    } else {
      setDataEventoError(null);
    }

    // Verifica se uma localização foi escolhida.
    if (!localizacaoEvento) {
      setLocalizacaoEventoError('Por favor, marque a localização do evento.');
      return;
    } else {
      setLocalizacaoEventoError('');
    }

    // Verifica o endereço do evento.
    if (endereco.trim().length < 10) {
      setEnderecoError('O endereço deve ter pelo menos 10 caracteres');
      return;
    } else {
      setEnderecoError('');
    }

    // cria o evento
    const novoEvento = {
      id: eventos.length + 1,
      imagemEvento,
      nomeEvento,
      descricaoEvento,
      dataEvento,
      horaEvento,
      localizacaoEvento,
      endereco,
    };
 // Atualiza o estado com o novo evento
      setEventos([...eventos, novoEvento]);

      // Adiciona o evento ao Firebase
      await adicionarEventoNoFirebase(novoEvento);

      // Resolva a Promise, indicando que a operação foi concluída com sucesso
      resolve();
    } catch (error) {
      // Rejeita a Promise se houver um erro
      reject(error);
    }
  });
};

const adicionarEventoNoFirebase = async (novoEvento) => {
  try {
    await EventoService.adicionarEvento(novoEvento);
  } catch (error) {
    console.error('Erro ao adicionar evento no Firebase:', error);
  }
};

  const atualizar = (
    id,
    imagemEvento,
    nomeEvento,
    descricaoEvento,
    dataEvento,
    horaEvento,
    localizacaoEvento,
    endereco
  ) => {
    const eventoAtualizado = {
      id,
      imagemEvento,
      nomeEvento,
      descricaoEvento,
      dataEvento,
      horaEvento,
      localizacaoEvento,
      endereco,
    };
    const listaAtualizada = eventos.map((evento) =>
      evento.id === id ? eventoAtualizado : evento
    );
    setEventos(listaAtualizada);
  };

  const buscar = (id) => {
    return eventos.find((evento) => evento.id === id);
  };

  const contextValues = {
    imagemEvento,
    setImagemEvento,
    nomeEvento,
    setNomeEvento,
    descricaoEvento,
    setDescricaoEvento,
    dataEvento,
    dataEventoError,
    horaEvento,
    setHoraEvento,
    localizacaoEvento,
    setLocalizacaoEvento,
    endereco,
    setEndereco,
    imagemError,
    setImagemError,
    nomeEventoError,
    setNomeEventoError,
    descricaoEventoError,
    setDescricaoEventoError,
    setDataEventoError,
    localizacaoEventoError,
    setLocalizacaoEventoError,
    enderecoError,
    setEnderecoError,
    handleLocationSelected,
    handleDataSelected,
    handleHoraSelected,
    validarNomeEvento,
    validarDescricaoEvento,
    validarEndereco,
    criarEvento,
    eventos,
    setEventos,
    atualizar,
    buscar,
    listar,
  };

  return (
    <EventoContext.Provider value={contextValues}>
      {children}
    </EventoContext.Provider>
  );
};
