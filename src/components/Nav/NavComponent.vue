<template>
  <nav>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand text-info" to="/">ZooS</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse mr-5" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <router-link class="nav-link active" to="/">Home </router-link>
          </li>
          <li class="nav-item" v-if="!loggedIn">
            <router-link class="nav-link" to="/signup">SignUp</router-link>
          </li>
          <li class="nav-item" v-if="!loggedIn">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="loggedIn">
            <router-link to="/" class="nav-link" @click="logout">Logout ({{ userEmail }})</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </nav>
</template>
  
<script>

import { mapState, mapActions } from "vuex"

export default {
  computed: {
    ...mapState(['loggedIn', 'userEmail']),

  },
  methods: {
    ...mapActions(['logout']),
  }
}

</script>
  
  