<template>
    <v-container>
        <v-row ref="info-row">
            <v-col cols=7>
              <div class="title" style="white-space: pre-line;">
                  {{title}} by: {{author}}
              </div>
            </v-col>
            <v-col class="text-right">
              {{completionDate | moment}}
            </v-col>
        </v-row>
        <v-row ref="synopsis-row">
            <v-col cols=12 class="pb-0">
              <div class="subtitle-1">Synopsis</div>
            </v-col>
            <v-col cols=12 class="pt-0">
              <div class="body-1 font-weight-light" style="white-space: pre-line;">
                  {{synopsis}}
              </div>
            </v-col>
        </v-row>
        <v-row ref="notes-row">
            <v-col cols=12 class="pb-0">
              <div class="subtitle-1">Notes</div>
            </v-col>
            <v-col cols=12 class="pt-0">
              <div class="body-1 font-weight-light" style="white-space: pre-line;">
                  {{notes}}
              </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { db } from '@/main.js'
import moment from 'moment'

export default {
  name: 'reading-view-content',
  components: {
  },
  created: function () {
    this.getReadingContent(this.$route.params.contentId)
  },
  beforeRouteUpdate (to, from, next) {
    this.getReadingContent(this.$route.params.contentId)
    next()
  },

  data: function () {
    return {
      author: '',
      completionDate: null,
      genre: '',
      notes: '',
      rating: null,
      synopsis: '',
      title: '',
      wordCount: null
    }
  },

  methods: {
    getReadingContent (id) {
      db.collection('reading-content').doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.setData(doc.data())
          } else {
            this.$router.push('/reading/view')
          }
        })
    },
    setData (readingDoc) {
      const { author, completionDate, genre, notes, rating, startDate, synopsis, title, wordCount } = readingDoc
      this.author = author
      this.completionDate = completionDate
      this.genre = genre
      this.notes = notes
      this.rating = rating
      this.startDate = startDate
      this.synopsis = synopsis
      this.title = title
      this.wordCount = wordCount
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY')
    }
  }
}
</script>
