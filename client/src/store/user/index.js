import axios from '@/axios-auth';

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      localStorage.setItem('token', payload.token);
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('token');
    }
  },
  actions: {
    signUserUp({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');

      axios
        .post('/users', payload)
        .then(res => {
          commit('setLoading', false);
          commit('setUser', res.data.user);
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setError', err.response.data.message);
        });
    },
    signUserIn({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');

      axios
        .post('/users/login', payload)
        .then(res => {
          commit('setLoading', false);
          commit('setUser', res.data.user);
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setError', err.response.data.message);
        });
    },
    tryAutoLogin({ commit }) {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      commit('setLoading', true);
      axios
        .get('/users')
        .then(res => {
          commit('setLoading', false);
          commit('setUser', res.data.user);
        })
        .catch(() => {
          commit('setLoading', false);
        });
    },
    logUserOut({ commit }) {
      commit('clearUser');
    },
    updateUser({ commit }, payload) {
      commit('setLoading', true);
      commit('clearError');

      axios
        .put('/users', payload)
        .then(res => {
          commit('setLoading', false);
          commit('setUser', res.data.user);
        })
        .catch(err => {
          commit('setLoading', false);
          commit('setError', err.response.data.message);
        });
    }
  }
};
