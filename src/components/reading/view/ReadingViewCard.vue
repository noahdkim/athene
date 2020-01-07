<template>
    <v-card
      :to="`/reading/view/${contentId}`"
    >
      <v-card-title>{{title}}</v-card-title>
      <v-card-subtitle>{{completionDate | moment}}</v-card-subtitle>
  </v-card>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    book: {
      type: String,
      default: ''
    },
    contentId: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    genre: {
      type: String,
      default: ''
    },
    rating: {
      type: Number,
      default: 0
    },
    completionDate: {
      type: Date,
      default: null
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY')
    }
  }
}
</script>
