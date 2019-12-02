<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <Landing/>
    </v-content>
  </v-app>
</template>

<script>
import Landing from './components/Landing'

export default {
  name: 'App',

  components: {
    Landing
  },

  data: () => ({
    //
  })
}
</script>
