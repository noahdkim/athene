const getters = {
  isAuthenticated (state) {
    return !!state.token && !!state.userUID
  },
  devotionalsMetas (state) {
    return state.devotionalsMetas
  }
}

export default getters
