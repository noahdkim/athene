<template>
    <v-app-bar
      app
      color="primary"
      extension-height="30"
      dark
      height="40"
    >
        <v-tabs
            align-with-title
            background-color="transparent"
            >
            <v-tab v-for="tab in tabs" :key="tab.mainTab.name">
              {{tab.mainTab.name}}
            </v-tab>
        </v-tabs>
        <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon @click="handleSignOut">mdi-logout</v-icon>
      </v-btn>
        <template v-slot:extension>
            <v-tabs
            align-with-title
            background-color="transparent"
            >
            <v-tab v-for="subTab in tabs[selectedTab].subTabs"
              :key="subTab.name"
              :to="subTab.route"
              >
                {{subTab.name}}
            </v-tab>
            </v-tabs>
        </template>
    </v-app-bar>
</template>

<script>
import { tabs } from '@/components/AtheneToolbar/toolbar-data.js'
import { mapActions } from 'vuex'

export default {
  name: 'AtheneToolbar',

  components: {
    // Home
  },

  data: () => ({
    tabs: tabs,
    selectedTab: 'devotionals'
  }),
  methods: {
    ...mapActions([
      'signOut'
    ]),
    handleSignOut () {
      this.signOut().then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>
