<template>
  <v-container
    fluid
  >
    <v-row>
      <v-col>
        <h1 class="display-2 font-weight-bold mb-3 text-center">
          Create Devotional
        </h1>
      </v-col>
    </v-row>
    <v-row justify="center">
        <EditDevotionalForm/>
    </v-row>
  </v-container>
</template>

<script>
import EditDevotionalForm from '@/components/devotionals/edit/EditDevotionalForm.vue'
// import store from '@/store'

export default {
  name: 'create-devotional',
  components: { EditDevotionalForm },

  data: () => ({

  }),
  // beforeRouteEnter (to, from, next) {
  //   store.dispatch('getDevotionalEntry').then((err, resp) => {
  //     next(vm => vm.setInitialData(err, resp))
  //   }
  //   )
  // },
  // beforeRouteUpdate (to, from, next) {
  //   this.post = null

  //   store.dispatch('getDevotionalEntry').then((err, post) => {
  //     this.setInitialData(err, post)
  //     next()
  //   })
  // },

  methods: {

  }
}
</script>
