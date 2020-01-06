import firebase from 'firebase'

const actions = {
  googleSignIn ({ commit }) {
    // Using a popup.
    let provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider)
        .then((resp) => {
          // This gives you a Google Access Token.
          const token = resp.credential.accessToken
          // The signed-in user info.
          const user = resp.user
          commit('authSuccess', { token, user })
          resolve(resp)
        })
        .catch(err => {
          commit('authError')
          reject(err)
        })
    })
  },
  signOut ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('userSignOut')
      resolve()
    })
  }
}

export default actions
