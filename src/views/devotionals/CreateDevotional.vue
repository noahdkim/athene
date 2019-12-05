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

export default {
  name: 'create-devotional',
  components: { EditDevotionalForm },

  data: () => ({

  }),

  methods: {
  }
}
</script>
