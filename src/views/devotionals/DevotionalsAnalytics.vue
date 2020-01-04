<template>
  <v-container
    fluid
  >
    <v-row justify="center">
      <v-col cols=3>
       <DevotionalsAnalyticsPie/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <DevotionalsAnalyticsTable/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DevotionalsAnalyticsTable from '@/components/devotionals/analytics/DevotionalsAnalyticsTable.vue'
import DevotionalsAnalyticsPie from '@/components/devotionals/analytics/DevotionalsAnalyticsPie.vue'

import store from '@/store'

export default {
  name: 'devotionals-analytics',
  components: { DevotionalsAnalyticsTable, DevotionalsAnalyticsPie },
  beforeRouteEnter (to, from, next) {
    store.dispatch('getOverallStatistics').then(res => {
      next()
    })
  },
  beforeRouteUpdate (to, from, next) {
    store.dispatch('getOverallStatistics').then(res => {
      next()
    })
  }
}
</script>
