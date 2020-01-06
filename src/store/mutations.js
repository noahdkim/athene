const mutations = {
  updateUser (state, newUserUID) {
    state.userUID = newUserUID
  },
  updateToken (state, newToken) {
    state.token = newToken
  },
  authSuccess (state, payload) {
    state.token = payload.token
    state.userUID = payload.user.uid
  },
  authError (state) {
    state.status = 'error'
  },
  userSignOut (state) {
    state.token = null
    state.userUID = null
  },
  updateDevotionalsMetas (state, newDevotionalsMetas) {
    console.log(newDevotionalsMetas)
    state.devotionalsMetas = newDevotionalsMetas
  },
  updateOverallStatistics (state, newOverallStatistics) {
    state.overallStatistics = newOverallStatistics
  },
  updateReadingMetas (state, newReadingMetas) {
    console.log(newReadingMetas)
    state.readingMetas = newReadingMetas
  }
}

export default mutations
