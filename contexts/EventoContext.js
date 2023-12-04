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
  const [aletaError, setAlertaError] = useState('');

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
    // Verifica se uma imagem foi escolhida.
    if (!imagemEvento) {
      setImagemError('Por favor, escolha uma imagem para o evento.');
    } else {
      setImagemError('');
    }

    // Verifica o nome do evento.
    if (nomeEvento.trim().length < 5) {
      setNomeEventoError('O nome do evento deve ter pelo menos 5 caracteres.');
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
      setPickerNaError('Por favor, Preencha todas as informações do evento.');
    } else {
      setPickerNaError('');
    }

    // Verifica se a data, hora e duração foram escolhidas.
    if (!dataEvento) {
      setDataEventoError('Por favor, selecione a data do evento.');
    } else if (!horaEvento) {
      setDataEventoError('Por favor, selecione o horário do evento');
    } else if (selectedDuracao == 'na') {
      setDataEventoError('Por favor, selecione a duração do evento.');
    } else {
      setDataEventoError('');
    }

    // Verifica se uma localização foi escolhida.
    if (!localizacaoEvento) {
      setLocalizacaoEventoError('Por favor, marque a localização do evento.');
    } else {
      setLocalizacaoEventoError('');
    }

    // Verifica o endereço do evento.
    if (endereco.trim().length < 10) {
      setEnderecoError('O endereço deve ter pelo menos 10 caracteres');
    } else {
      setEnderecoError('');
    }

    // Se ouver erros, mostra um alert ao usuário.
    if (
      imagemError ||
      nomeEventoError ||
      pickerNaError ||
      dataEventoError ||
      localizacaoEventoError ||
      enderecoError
    ) {
      setAlertaError('Por favor, reveja o formulário e corrija os erros.');
      return;
    }

    // cria o evento
    const novoEvento = {
      id: eventos.length + 1,
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

    setEventos([...eventos, novoEvento]);
    await adicionarEventoNoFirebase(novoEvento);
  };

  const adicionarEventoNoFirebase = async (novoEvento) => {
    try {
      await EventoService.adicionarEvento(novoEvento);
    } catch (error) {
      console.error('Erro ao adicionar evento no Firebase:', error);
    }
  };

  const removerEvento = (id) => {
    const listaAtualizada = eventos.filter((eventos) => eventos.id !== id);
    setEventos(listaAtualizada);
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

  useEffect(() => {}, [eventos]);

  const contextValues = {
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
    aletaError,
    setAlertaError,
    removerEvento,
    atualizar,
    buscar,

    buscarEventos: async () => {
      try {
        const eventosDoServidor = await EventoService.buscarEventos();

        setEventos(eventosDoServidor);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      }
    },
  };


  return (
    <EventoContext.Provider value={contextValues}>
      {children}
    </EventoContext.Provider>
  );
};
