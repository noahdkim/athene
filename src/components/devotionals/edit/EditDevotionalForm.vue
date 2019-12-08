<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col
          cols="4"
        >
          <v-autocomplete
            label="Book"
            :items="books"
            v-model="book"
          ></v-autocomplete>
        </v-col>
        <v-col
          cols="3"
        >
          <v-text-field
            label="ch:v1-v2"
          >
          </v-text-field>
        </v-col>
        <v-col
          cols="5"
        >
          <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="date"
              label="Date"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-textarea
          label="Summary"
          v-model="summary">
        </v-textarea>
      </v-row>
      <v-row>
        <v-textarea
          label="Reflection"
          v-model="reflection">
        </v-textarea>
      </v-row>
    </v-container>
    <v-btn class="mr-4" @click="saveDevotionalEntry">submit</v-btn>
    <v-btn to="/devotionals">Go Back</v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import { booksList } from '@/components/devotionals/edit/books-and-verses.js'

export default {
  name: 'edit-devotional-form',
  props: {
    initialBook: {
      type: String,
      default: ''
    },
    initialChapter: {
      type: Number,
      default: 0
    },
    initialDate: {
      type: String,
      default: new Date().toISOString().slice(0, 10)
    },
    initialStartVerse: {
      type: Number,
      default: 0
    },
    initialEndVerse: {
      type: Number,
      default: 0
    },
    initialSummary: {
      type: String,
      default: ''
    },
    initialReflection: {
      type: String,
      default: ''
    },
    contentId: {
      type: String,
      default: ''
    }
  },

  data: function () {
    return {
      books: booksList,
      book: this.initialBook,
      chapter: this.initialChapter,
      date: this.initialDate,
      startVerse: this.initialStartVerse,
      endVerse: this.initialEndVerse,
      summary: this.initialSummary,
      reflection: this.initialReflection,
      menu: false
    }
  },

  methods: {
    ...mapActions([
      'createDevotionalEntryInFirebase',
      'updateDevotionalEntryInFirebase',
      'getDevotionalEntry'
    ]),
    saveDevotionalEntry () {
      const entry = {
        book: this.book,
        chapter: this.chapter,
        date: this.date,
        startVerse: this.startVerse,
        endVerse: this.endVerse,
        summary: this.summary,
        reflection: this.reflection
      }
      this.createDevotionalEntryInFirebase(entry)
    },
    formatDate (date) {
      let month = `${date.getMonth() + 1}`
      let day = `${date.getDate()}`
      const year = date.getFullYear()

      if (month.length < 2) month = `0${month}`
      if (day.length < 2) day = `0${day}`

      return [year, month, day].join('-')
    }
  }
}
</script>
