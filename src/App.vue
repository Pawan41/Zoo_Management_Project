<template>
  <Navbar />

  <router-view />
</template>

<script>

import Navbar from "./components/Nav/NavComponent.vue"


export default {
  components: {
    Navbar,

  }
}

</script>

