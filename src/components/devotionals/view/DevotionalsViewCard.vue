<template>
    <v-card
      :to="`/devotionals/view/${contentId}`"
    >
      <v-card-title>{{book}} {{chapter}}:{{startVerse}}-{{endVerse}}</v-card-title>
      <v-card-subtitle>{{dateCreated | moment}}</v-card-subtitle>
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
    chapter: {
      type: Number,
      default: 0
    },
    contentId: {
      type: String,
      default: ''
    },
    dateCreated: {
      type: Date,
      default: ''
    },
    startVerse: {
      type: Number,
      default: 0
    },
    endVerse: {
      type: Number,
      default: 0
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY')
    }
  }
}
</script>
