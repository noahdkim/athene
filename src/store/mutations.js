const mutations = {
  updateUser (state, newUser) {
    state.user = newUser
  },
  updateToken (state, newToken) {
    state.token = newToken
  },
  auth_success (state, newToken, newUser) {
    state.token = newToken
    state.user = newUser
  },
  auth_error (state) {
    state.status = 'error'
  }
}

export default mutations
