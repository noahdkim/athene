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
        v-for="meta in devotionalsMetas"
        :key="meta.content_id"
        cols=8
      >
        <devotionals-view-card
          :book="meta.book"
          :chapter="meta.chapter"
          :contentId="meta.contentId"
          :dateCreated="meta.lastEdited.toDate()"
          :startVerse="meta.startVerse"
          :endVerse="meta.endVerse"
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
import DevotionalsViewCard from '@/components/devotionals/view/DevotionalsViewCard.vue'

export default {
  name: 'devotionals',
  components: {
    DevotionalsViewCard
  },

  beforeRouteEnter (to, from, next) {
    store.dispatch('getUserDevotionalsMetas').then(res => {
      next()
    })
  },
  beforeRouteUpdate (to, from, next) {
    store.dispatch('getUserDevotionalsMetas').then(res => {
      next()
    })
  },

  data: function () {
    return {
      devotionalsMetas: this.$store.getters.devotionalsMetas
    }
  },

  methods: {
    setInitialData (err, devotionalsMetas) {
      if (err) {
        this.error = err.toString()
      } else {
        this.devotionalsMetas = devotionalsMetas
      }
    }
  }
}
</script>
