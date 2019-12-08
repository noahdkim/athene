<template>
    <v-card
    >
      <v-card-title>{{book}} {{chapter}}:{{startVerse}}-{{endVerse}}</v-card-title>
      <v-card-subtitle>{{dateCreated}}</v-card-subtitle>
  </v-card>
</template>

<script>

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
      type: String,
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
  }
}
</script>
