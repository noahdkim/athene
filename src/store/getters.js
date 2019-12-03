const getters = {
  isAuthenticated (state) {
    console.log(state)
    return !!state.token
  }
}

export default getters
