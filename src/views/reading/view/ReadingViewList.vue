<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col>
        <h1 class="display-2 font-weight-bold mb-3 text-center">
          Reading
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col
        v-for="meta in readingMetas"
        :key="meta.contentId"
        cols=8
      >
        <reading-view-card
          :title="meta.title"
          :author="meta.author"
          :genre="meta.genre"
          :rating="meta.rating"
          :wordCount="meta.wordCount"
          :contentId="meta.contentId"
          />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn
        color="accent"
        to="/reading/create"
        >
        Create Entry
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import store from '@/store'
import ReadingViewCard from '@/components/reading/view/ReadingViewCard.vue'

export default {
  name: 'readings',
  components: {
    ReadingViewCard
  },

  beforeRouteEnter (to, from, next) {
    store.dispatch('getUserReadingMetas').then(res => {
      next()
    })
  },
  beforeRouteUpdate (to, from, next) {
    store.dispatch('getUserReadingMetas').then(res => {
      next()
    })
  },

  data: function () {
    return {
      readingMetas: this.$store.getters.readingMetas
    }
  },

  methods: {
  }
}
</script>
