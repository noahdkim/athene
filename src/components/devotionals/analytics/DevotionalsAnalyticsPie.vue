<template>
    <div>
    <apexchart width="300" type="pie" :options="options" :series="createSeries(overallStatistics)"></apexchart>
    </div>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
export default {
  name: 'devotionals-analytics-pie',
  components: {
    apexchart: VueApexCharts
  },
  data: function () {
    return {
      overallStatistics: this.$store.getters.overallStatistics,
      options: { labels: ['Read', 'Unread'] }
    }
  },

  methods: {
    createSeries (statistics) {
      const { numberOfVersesRead, totalNumberOfVerses } = statistics
      return [numberOfVersesRead, totalNumberOfVerses - numberOfVersesRead]
    }
  }
}
</script>
