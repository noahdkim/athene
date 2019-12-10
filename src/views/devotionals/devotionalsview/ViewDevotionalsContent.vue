<template>
    <v-container>
        <v-row ref="info-row">
            <v-col cols=7>
              <div class="title" style="white-space: pre-line;">
                  {{book}} {{chapter}}:{{startVerse}}-{{endVerse}}
              </div>
            </v-col>
            <v-col class="text-right">
              {{date | moment}}
            </v-col>
        </v-row>
        <v-row ref="summary-row">
            <v-col cols=12 class="pb-0">
              <div class="subtitle-1">Summary</div>
            </v-col>
            <v-col cols=12 class="pt-0">
              <div class="body-1 font-weight-light" style="white-space: pre-line;">
                  {{summary}}
              </div>
            </v-col>
        </v-row>
        <v-row ref="reflection-row">
            <v-col cols=12 class="pb-0">
              <div class="subtitle-1">Reflection</div>
            </v-col>
            <v-col cols=12 class="pt-0">
              <div class="body-1 font-weight-light" style="white-space: pre-line;">
                  {{reflection}}
              </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { db } from '@/main.js'
import moment from 'moment'

export default {
  name: 'view-devotionals-content',
  components: {
  },
  created: function () {
    this.getDevotionalsContent(this.$route.params.contentId)
  },
  beforeRouteUpdate (to, from, next) {
  // just use `this`
    this.getDevotionalsContent(this.$route.params.contentId)
    next()
  },

  data: function () {
    return {
      book: '',
      chapter: 0,
      date: null,
      startVerse: 0,
      endVerse: 0,
      reflection: '',
      summary: ''
    }
  },

  methods: {
    getDevotionalsContent (id) {
      db.collection('devotionals-content').doc(id)
        .get()
        .then((doc) => {
          if (doc.exists) {
            this.setData(doc.data())
          } else {
            console.error('doc does not exist')
          }
        })
    },
    setData (devotionalsDoc) {
      const { book, chapter, date, startVerse, endVerse, reflection, summary } = devotionalsDoc
      this.book = book
      this.chapter = chapter
      this.date = date
      this.startVerse = startVerse
      this.endVerse = endVerse
      this.reflection = reflection
      this.summary = summary
    }
  },
  filters: {
    moment: function (date) {
      return moment(date).format('MMMM Do YYYY')
    }
  }
}
</script>
