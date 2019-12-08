<template>
  <v-app>
    <athene-toolbar/>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import AtheneToolbar from '@/components/AtheneToolbar/AtheneToolbar.vue'

export default {
  name: 'App',

  components: {
    AtheneToolbar
  },

  data: () => ({
    //
  })
}
</script>
