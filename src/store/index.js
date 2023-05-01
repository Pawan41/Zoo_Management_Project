import { createStore } from 'vuex'
import router from '@/router';

export default createStore({

  // State is a object || holds the entire state of the application
  // State is immutable , means we can't directly modify , instead mutation are used to modify 
  // the state object
  
  state: {
    userEmail: '',
    loggedIn: false,
  },

  // mutation is a predefined function
  mutations: {
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    setLoggedIn(state, loggedin) {
      state.loggedIn = loggedin;
    },
  },

  actions: {
    setUserEmail(context, email) {
      context.commit('setUserEmail', email)
    },
    setLoggedIn(context, loggedin) {
      context.commit('setLoggedIn', loggedin)
    },
    logout({ commit }) {
      localStorage.removeItem("user-info");
      commit('setLoggedIn', false);
      commit('setUserEmail', '');
      router.push('/');
    }
  },

})
