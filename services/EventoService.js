import axios from 'axios';

const BASE_URL = 'https://backend-mobile-ba2f9-default-rtdb.firebaseio.com';

const EventoService = {
  adicionarEvento: async (evento) => {
    try {
      const response = await axios.post(`${BASE_URL}/eventos.json`, evento);
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

      if (response.data) {
        const eventos = Object.keys(response.data).map((id) => ({
          id,
          ...response.data[id],
        }));

        return eventos;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar eventos no Firebase:', error);
      throw error;
    }
  },
};

export default EventoService;
