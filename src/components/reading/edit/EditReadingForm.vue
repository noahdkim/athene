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
            label="Word Count"
            v-model="wordCount"
            required
          >
          </v-text-field>
        </v-col>
         <v-col
          cols="4"
        >
          <v-autocomplete
            label="Genre"
            :items="genres"
            v-model="genre"
            required
          ></v-autocomplete>
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
import { genresList } from '@/components/reading/edit/genres.js'

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
    },
    initialWordCount: {
      type: Number,
      default: 0
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
      wordCount: this.initialWordCount,
      genres: genresList,
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
      'createReadingEntryInFirebase',
      'updateReadingEntryInFirebase',
      'getDevotionalEntry'
    ]),
    saveReadingEntry () {
      const entry = {
        title: this.title,
        genre: this.genre,
        author: this.author,
        startDate: this.startDate,
        completionDate: this.completionDate,
        rating: this.rating,
        synopsis: this.synopsis,
        notes: this.notes,
        wordCount: this.wordCount
      }
      const meta = {
        title: this.title,
        genre: this.genre,
        author: this.author,
        startDate: this.startDate,
        completionDate: this.completionDate,
        rating: this.rating,
        wordCount: this.wordCount
      }
      return this.createReadingEntryInFirebase({ entry, meta })
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.saveReadingEntry().then(
          this.$router.push('/reading/view')
        )
      }
    }
  }
}
</script>
