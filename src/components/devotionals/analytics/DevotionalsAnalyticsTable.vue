<template>
  <v-container
    fluid
  >
     <v-data-table
    :headers="headers"
    :items="createItems(overallStatistics.statistics)"
    :items-per-page="5"
    class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script>

export default {
  name: 'devotionals-analytics-table',
  data: function () {
    return {
      overallStatistics: this.$store.getters.overallStatistics,
      headers: [
        { text: 'Index', value: 'index' },
        { text: 'Book', align: 'left', value: 'name' },
        { text: 'Times Completed', value: 'numberOfTimesCompleted' },
        { text: 'Verses Read', value: 'numberOfVersesRead' },
        { text: 'Total Verses', value: 'totalVerses' },
        { text: '% Read', value: 'percentRead' }
      ]
    }
  },

  methods: {
    createItems (statistics) {
      return Object.keys(statistics).map(i => {
        const bookStatistics = statistics[i]
        bookStatistics.name = i
        bookStatistics.percentRead = ((bookStatistics.numberOfVersesRead / bookStatistics.totalVerses) * 100).toFixed(2)
        return statistics[i]
      }).sort(function (a, b) { return a.index - b.index })
    }
  }
}
</script>
