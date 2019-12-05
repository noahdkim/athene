<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-col
          cols="4"
        >
          <v-autocomplete
            label="Book"
            :items="books"
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
          label="Summary">
        </v-textarea>
      </v-row>
      <v-row>
        <v-textarea
          label="Reflection">
        </v-textarea>
      </v-row>
    </v-container>
    <v-btn class="mr-4" @click="submit">submit</v-btn>
    <v-btn to="/devotionals">Go Back</v-btn>
  </v-form>
</template>

<script>

export default {
  name: 'edit-devotional-form',

  data: () => ({
    books: [
      'Genesis', 'Exodus', 'Leviticus', 'Numbers',
      'Deutoronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel',
      '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles',
      '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther',
      'Job', 'Psalms', 'Proverbs', 'Ecclesiastes',
      'Song of Songs', 'Isaiah', 'Jeremiah', 'Lamentations',
      'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah',
      'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah',
      'Haggai', 'Zechariah', 'Malachi',
      'Matthew', 'Mark', 'Luke', 'John', 'Acts', 'Romans',
      '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians',
      'Colossians', '1 Thessalonians', '2 Thessalonians',
      '1 Timothy', '2 Timothy', 'Titus', 'Philemon',
      'Hebrews', 'James', '1 Peter', '2 Peter', '1 John',
      '2 John', '3 John', 'Jude', 'Revelations'
    ],
    menu: false
  }),

  methods: {
  }
}
</script>
