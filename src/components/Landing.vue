<template>
  <v-container
    fluid
  >
    <v-row>
      <v-img
        :src="require('../assets/owl.png')"
        class="my-3"
        contain
        height="150"
      ></v-img>
    </v-row>
    <v-row>
      <v-col>
        <h1 class="display-2 font-weight-bold mb-3 text-center">
          Welcome to Athene
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center">
        <v-img
            contain
            justify-self="center"
            max-width="200"
            :src="require('../assets/google-sign-in/btn_google_signin_light_normal_web.png')"
          ></v-img>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Landing',

  data: () => ({

  })
}
</script>
