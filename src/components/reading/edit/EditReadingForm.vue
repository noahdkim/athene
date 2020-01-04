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
          <v-text-field
            label="Title"
            v-model="title"
            required
          />
        </v-col>
        <v-col
          cols="4"
        >
          <v-text-field
            label="Author"
            v-model="author"
            required
          />
        </v-col>
        <v-col
          cols="3"
        >
          <v-text-field
            label="Rating"
            v-model="rating"
            required
          >
          </v-text-field>
        </v-col>
        <v-col
          cols="3"
        >
          <v-text-field
            label="Genre"
            v-model="genre"
            required
          >
          </v-text-field>
        </v-col>
        <v-col
          cols="3"
        >
          <v-select
            :items="['Work', 'Pleasure']"
            label="Work or Pleasure"
          ></v-select>
        </v-col>
        <v-col
          cols="5"
        >
          <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="startDate"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="dateDisplay"
              label="Date Started"
              readonly
              required
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="startDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        </v-col>
         <v-col
          cols="5"
        >
          <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="completionDate"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="dateDisplay"
              label="Date Finished"
              readonly
              required
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="completionDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-textarea
          label="Synopsis"
          v-model="synopsis"
          required>
        </v-textarea>
      </v-row>
      <v-row>
        <v-textarea
          label="Notes"
          v-model="notes"
          required>
        </v-textarea>
      </v-row>
    </v-container>
    <v-btn class="mr-4" @click="validate">save</v-btn>
    <v-btn to="/reading">Go Back</v-btn>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'

export default {
  name: 'edit-reading-form',
  props: {
    initialAuthor: {
      type: String,
      default: ''
    },
    initialTitle: {
      type: String,
      default: ''
    },
    initialRating: {
      type: Number,
      default: 0
    },
    initialStartDate: {
      type: String,
      default: moment().format('YYYY-MM-DD')
    },
    initialCompletionDate: {
      type: String,
      default: moment().format('YYYY-MM-DD')
    },
    initialGenre: {
      type: String,
      default: ''
    },
    initialSynopsis: {
      type: String,
      default: ''
    },
    initialNotes: {
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
      author: this.initialAuthor,
      title: this.initialTitle,
      genre: this.initialGenre,
      rating: this.initialRating,
      startDate: this.initialStartDate,
      completionDate: this.initialCompletionDate,
      synopsis: this.initialSynopsis,
      notes: this.initialNotes,
      menu: false,
      valid: true
    }
  },

  computed: {
    dateDisplay: {
      get () {
        return moment(this.date).format('MMMM Do YYYY')
      }
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
      return this.createDevotionalEntryInFirebase({ entry, meta })
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.saveDevotionalEntry().then(
          this.$router.push('/devotionals/view')
        )
      }
    },
    parseChapterAndVerses () {
      const splitChapterAndVerses = this.chapterAndVerses.split(':')
      const chapter = parseInt(splitChapterAndVerses[0])
      const verses = splitChapterAndVerses[1]
      const splitVerses = verses.split('-')
      const startVerse = parseInt(splitVerses[0])
      const endVerse = parseInt(splitVerses[1])
      return { chapter, startVerse, endVerse }
    }

  }
}
</script>
