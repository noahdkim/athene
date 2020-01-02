const getters = {
  isAuthenticated (state) {
    return !!state.token && !!state.userUID
  },
  devotionalsMetas (state) {
    return state.devotionalsMetas
  },
  overallStatistics (state) {
    return state.overallStatistics
  }
}

export default getters
