<template>
  <v-container
    fluid
  >

    {{ overallStatistics.numberOfVersesRead }}

  </v-container>
</template>

<script>
import store from '@/store'

export default {
  name: 'devotionals-analytics',
  data: function () {
    return {
      overallStatistics: this.$store.getters.overallStatistics
    }
  },
  beforeRouteEnter (to, from, next) {
    store.dispatch('getOverallStatistics').then(res => {
      next()
    })
  },
  beforeRouteUpdate (to, from, next) {
    store.dispatch('getOverallStatistics').then(res => {
      next()
    })
  },

  methods: {

  }
}
</script>
