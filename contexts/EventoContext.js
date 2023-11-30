import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

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
  const navigation = useNavigation();
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

  const [eventos, setEventos] = useState([
    {
      id: 1,
      imagemEvento:
        'http://hoffmann.com/sitenovo/wp-content/uploads/2020/08/evento-corporativo-7-dicas-para-realizar-um-evento-diferenciado.jpg',
      nomeEvento: 'Nome do evento',
      subtitulo: 'Subtítulo do evento',
      descricaoEvento: 'Descrição',
      selectedFaixaEtaria: 'Proibido menores de 18 anos',
      selectedBebidas: 'Leve sua bebida',
      selectedFumante: 'Hookah',
      selectedTipoEvento: 'Churrasco',
      dataEvento: '30/11/2023',
      horaEvento: '20:30',
      selectedDuracao: '3',
      localizacaoEvento: {
        longitude: -47.912813276052475,
        latitude: -15.834305760346858,
      },
      endereco: 'Estacionamento do IESB sul',
    },
    {
      id: 2,
      imagemEvento:
        'https://s2-techtudo.glbimg.com/KTWNbCJotODzAc34cm6LV8x2zz4=/0x0:1200x889/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2022/3/3/8uDXAgRv2I4Zi5KLbzMw/ccxp-techtudo.jpg',
      nomeEvento: 'Festa do JC',
      subtitulo: 'noite toda 🎉🪩',
      descricaoEvento: 'Imagine uma descrição MT boa',
      selectedFaixaEtaria: 'Proibido menores de 18 anos',
      selectedBebidas: 'Leve sua bebida',
      selectedFumante: 'Hookah',
      selectedTipoEvento: 'Churrasco',
      dataEvento: '30/11/2023',
      horaEvento: '20:00',
      selectedDuracao: '6',
      localizacaoEvento: {
        longitude: -47.913013100624084,
        latitude: -15.83442284741676,
      },
      endereco: 'Estacionamento',
    },
  ]);

  const handleLocationSelected = (location) => {
    setLocalizacaoEvento(location);
  };

  const handleDataSelected = (dataEvento) => {
    setDataEvento(dataEvento);
  };

  const handleHoraSelected = (horaEvento) => {
    setHoraEvento(horaEvento);
  };

  useEffect(() => {
    const carregarEventos = async () => {
      try {
        const eventosArmazenados = await AsyncStorage.getItem('eventos');
        if (eventosArmazenados !== null) {
          setEventos(JSON.parse(eventosArmazenados));
        }
      } catch (error) {
        console.error('Erro ao carregar eventos:', error);
      }
    };

    carregarEventos();
  }, []);

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

  const criarEvento = () => {
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

    // Verifica os pickers de informação.
    if (
      selectedFaixaEtaria === 'na' ||
      selectedBebidas === 'na' ||
      selectedFumante === 'na' ||
      selectedTipoEvento === 'na'
    ) {
      setPickerNaError('Por favor, Preencha todas as informações do evento.');
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

    const salvarEventosLocalmente = async () => {
      try {
        await AsyncStorage.setItem(
          'eventos',
          JSON.stringify([...eventos, novoEvento])
        );
        // Atualize o componente após a criação do evento
        // e navegue para a tela BuscarEventos
      } catch (error) {
        console.error('Erro ao salvar eventos localmente:', error);
      }
    };

    salvarEventosLocalmente();

    navigation.navigate('BuscarEventos');
  };

  const removerEvento = async (id) => {
    const listaAtualizada = eventos.filter((evento) => evento.id !== id);
    setEventos(listaAtualizada);

    const eventosAtualizados = listaAtualizada.map((evento) => ({
      ...evento,
      id: evento.id.toString(),
      localizacaoEvento: {
        ...evento.localizacaoEvento,
        latitude: evento.localizacaoEvento.latitude.toString(),
        longitude: evento.localizacaoEvento.longitude.toString(),
      },
    }));

    try {
      await AsyncStorage.setItem('eventos', JSON.stringify(eventosAtualizados));
    } catch (error) {
      console.error('Erro ao salvar eventos localmente:', error);
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
    removerEvento,
    atualizar,
    buscar,
  };

  return (
    <EventoContext.Provider value={contextValues}>
      {children}
    </EventoContext.Provider>
  );
};
