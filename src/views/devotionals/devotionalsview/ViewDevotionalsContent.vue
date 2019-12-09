<template>
    <v-container>
        <v-row>
            <div class="title" style="white-space: pre-line;">
                {{book}} {{chapter}}:{{startVerse}}-{{endVerse}}
            </div>
        </v-row>
        <v-row>
            <div class="body-1" style="white-space: pre-line;">
                {{summary}}
            </div>
        </v-row>
        <v-row>
            <div class="body-1" style="white-space: pre-line;">
                {{reflection}}
            </div>
        </v-row>
    </v-container>
</template>

<script>
import { db } from '@/main.js'

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
  }
}
</script>
