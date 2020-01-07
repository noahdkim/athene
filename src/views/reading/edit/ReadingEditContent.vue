<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col>
        <h1 class="display-2 font-weight-bold mb-3 text-center">
          Create Reading Log
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center">
        <EditReadingForm/>
    </v-row>
  </v-container>
</template>

<script>
import EditReadingForm from '@/components/reading/edit/EditReadingForm.vue'
import store from '@/store'

export default {
  name: 'reading-edit',
  components: { EditReadingForm },

  data: () => ({

  }),
  beforeRouteEnter (to, from, next) {
    store.dispatch('getReadingEntry').then((err, resp) => {
      next(vm => vm.setInitialData(err, resp))
    }
    )
  },
  beforeRouteUpdate (to, from, next) {
    this.post = null
    // TODO: implement get reading entry and then pass as props into form
    store.dispatch('getReadingEntry').then((err, post) => {
      this.setInitialData(err, post)
      next()
    })
  },

  methods: {

  }
}
</script>
