import React, { createContext, useContext, useState, useEffect } from 'react';

import EventoService from '../services/EventoService';
import { getAuthenticatedUserId } from '../services/AuthService';

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
  const [subtitulo, setSubtitulo] = useState('');
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

  const [imagemError, setImagemError] = useState('');
  const [nomeEventoError, setNomeEventoError] = useState('');
  const [subtituloError, setSubtituloError] = useState('');
  const [descricaoEventoError, setDescricaoEventoError] = useState('');
  const [pickerNaError, setPickerNaError] = useState('');
  const [dataEventoError, setDataEventoError] = useState(null);
  const [localizacaoEventoError, setLocalizacaoEventoError] = useState(null);
  const [enderecoError, setEnderecoError] = useState('');

  const [eventos, setEventos] = useState([]);

  // Obtém o ID do usuário autenticado
  const userID = getAuthenticatedUserId();

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

  // Valida o subtítulo.
  const validarSubtitulo = (text) => {
    if (text.length > 42) {
      setSubtituloError('O subtítulo não pode ter mais de 42 caracteres.');
      return;
    } else {
      setSubtituloError('');
    }
    setSubtitulo(text);
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
          setNomeEventoError(
            'O nome do evento deve ter pelo menos 5 caracteres.'
          );
          return;
        } else {
          setNomeEventoError('');
        }

        // Verifica os pickers de informação.
        if (
          selectedFaixaEtaria === 'na' ||
          selectedBebidas === 'na' ||
          selectedFumante === 'na' ||
          selectedTipoEvento === 'na'
        ) {
          setPickerNaError(
            'Por favor, Preencha todas as informações do evento.'
          );
          return;
        } else {
          setPickerNaError('');
        }

        // Verifica se a data, hora e duração foram escolhidas.
        if (!dataEvento) {
          setDataEventoError('Por favor, selecione a data do evento.');
          return;
        } else if (!horaEvento) {
          setDataEventoError('Por favor, selecione o horário do evento');
          return;
        } else if (selectedDuracao == 'na') {
          setDataEventoError('Por favor, selecione a duração do evento.');
          return;
        } else {
          setDataEventoError('');
        }

        // Verifica se uma localização foi escolhida.
        if (!localizacaoEvento) {
          setLocalizacaoEventoError(
            'Por favor, marque a localização do evento.'
          );
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

        // Busca os eventos do Firebase para obter o maior ID
        const eventosDoFirebase = await EventoService.buscarEventos();

        // Encontra o maior ID
        const maiorId = eventosDoFirebase.reduce((maxId, evento) => {
          return evento.id > maxId ? evento.id : maxId;
        }, 0);

        // cria o evento
        const novoEvento = {
          id: maiorId + 1,
          criador: userID,
          imagemEvento,
          nomeEvento,
          subtitulo,
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
          confirmados: [userID],
        };

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
    subtitulo,
    descricaoEvento,
    selectedFaixaEtaria,
    selectedBebidas,
    selectedFumante,
    selectedTipoEvento,
    dataEvento,
    horaEvento,
    selectedDuracao,
    localizacaoEvento,
    endereco
  ) => {
    const eventoAtualizado = {
      id,
      imagemEvento,
      nomeEvento,
      subtitulo,
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
    const listaAtualizada = eventos.map((evento) =>
      evento.id === id ? eventoAtualizado : evento
    );
    setEventos(listaAtualizada);
  };

  const buscar = (id) => {
    return eventos.find((evento) => evento.id === id);
  };

  const contextValues = {
    userID,
    imagemEvento,
    setImagemEvento,
    nomeEvento,
    setNomeEvento,
    subtitulo,
    setSubtitulo,
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
    imagemError,
    setImagemError,
    nomeEventoError,
    setNomeEventoError,
    subtituloError,
    setSubtituloError,
    descricaoEventoError,
    setDescricaoEventoError,
    pickerNaError,
    setPickerNaError,
    dataEventoError,
    setDataEventoError,
    localizacaoEventoError,
    setLocalizacaoEventoError,
    enderecoError,
    setEnderecoError,
    handleLocationSelected,
    handleDataSelected,
    handleHoraSelected,
    validarNomeEvento,
    validarSubtitulo,
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
