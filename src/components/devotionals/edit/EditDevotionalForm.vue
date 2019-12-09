<template>
  <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      >
    <v-container>
      <v-row>
        <v-col
          cols="4"
        >
          <v-autocomplete
            label="Book"
            :items="books"
            :rules="bookRules"
            v-model="book"
            required
          ></v-autocomplete>
        </v-col>
        <v-col
          cols="3"
        >
          <v-text-field
            label="ch:v1-v2"
            :rules="chapterAndVerseRules"
            v-model="chapterAndVerses"
            required
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
              :rules="dateRules"
              readonly
              required
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
          v-model="summary"
          :rules="summaryRules"
          required>
        </v-textarea>
      </v-row>
      <v-row>
        <v-textarea
          label="Reflection"
          v-model="reflection"
          :rules="reflectionRules"
          required>
        </v-textarea>
      </v-row>
    </v-container>
    <v-btn class="mr-4" @click="validate">submit</v-btn>
    <v-btn to="/devotionals">Go Back</v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import { booksList } from '@/components/devotionals/edit/books-and-verses.js'
import {
  bookRules,
  chapterAndVerseRules,
  dateRules,
  summaryRules,
  reflectionRules
} from '@/components/devotionals/edit/edit-rules.js'

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
      bookRules: bookRules,
      chapter: this.initialChapter,
      chapterAndVerses: '',
      chapterAndVerseRules: chapterAndVerseRules,
      date: this.initialDate,
      dateRules: dateRules,
      startVerse: this.initialStartVerse,
      endVerse: this.initialEndVerse,
      summary: this.initialSummary,
      summaryRules: summaryRules,
      reflection: this.initialReflection,
      reflectionRules: reflectionRules,
      menu: false,
      valid: true
    }
  },

  methods: {
    ...mapActions([
      'createDevotionalEntryInFirebase',
      'updateDevotionalEntryInFirebase',
      'getDevotionalEntry'
    ]),
    saveDevotionalEntry () {
      const parsedChapterAndVerses = this.parseChapterAndVerses()
      const { chapter, startVerse, endVerse } = parsedChapterAndVerses
      const entry = {
        book: this.book,
        chapter: chapter,
        date: this.date,
        startVerse: startVerse,
        endVerse: endVerse,
        summary: this.summary,
        reflection: this.reflection
      }
      const meta = {
        book: this.book,
        chapter: chapter,
        date: this.date,
        startVerse: startVerse,
        endVerse: endVerse
      }
      this.createDevotionalEntryInFirebase({ entry, meta })
    },
    formatDate (date) {
      let month = `${date.getMonth() + 1}`
      let day = `${date.getDate()}`
      const year = date.getFullYear()

      if (month.length < 2) month = `0${month}`
      if (day.length < 2) day = `0${day}`

      return [year, month, day].join('-')
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.saveDevotionalEntry()
      }
    },
    parseChapterAndVerses () {
      const splitChapterAndVerses = this.chapterAndVerses.split(':')
      const chapter = splitChapterAndVerses[0]
      const verses = splitChapterAndVerses[1]
      const splitVerses = verses.split('-')
      const startVerse = splitVerses[0]
      const endVerse = splitVerses[1]
      return { chapter, startVerse, endVerse }
    }

  }
}
</script>
