import axios from 'axios';

const BASE_URL = 'https://backend-mobile-ba2f9-default-rtdb.firebaseio.com';

const EventoService = {
  adicionarEvento: async (id, evento) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/eventos/${id}.json`,
        evento
      );
      console.log('Evento adicionado no Firebase:', response.data);
      return response.data;
    } catch (error) {
      console.error('Erro ao adicionar evento no Firebase:', error);
      throw error;
    }
  },

  buscarEventos: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/eventos.json`);

      if (Array.isArray(response.data)) {
        const eventos = response.data.filter((evento) => evento !== null);
        return eventos;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar eventos no Firebase:', error);
      throw error;
    }
  },

  adicionarUsuarioConfirmado: async (eventoId, userId) => {
    try {
      const evento = await axios.get(`${BASE_URL}/eventos/${eventoId}.json`);
      const confirmados = evento.data.confirmados || [];
      confirmados.push(userId);

      await axios.put(
        `${BASE_URL}/eventos/${eventoId}/confirmados.json`,
        confirmados
      );
    } catch (error) {
      console.error('Erro ao adicionar usuário aos confirmados:', error);
      throw error;
    }
  },

  removerUsuarioConfirmado: async (eventoId, userId) => {
    try {
      const evento = await axios.get(`${BASE_URL}/eventos/${eventoId}.json`);
      const confirmados = evento.data.confirmados || [];

      // Remove o usuário da lista de confirmados
      const novaListaConfirmados = confirmados.filter((id) => id !== userId);

      await axios.put(
        `${BASE_URL}/eventos/${eventoId}/confirmados.json`,
        novaListaConfirmados
      );
    } catch (error) {
      console.error('Erro ao remover usuário dos confirmados:', error);
      throw error;
    }
  },
};

export default EventoService;
