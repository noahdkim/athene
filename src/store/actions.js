import firebase from 'firebase'

const actions = {
  googleSignIn ({ commit }) {
    // Using a popup.
    var provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithPopup(provider)
        .then((resp) => {
        // This gives you a Google Access Token.
          var token = resp.credential.accessToken
          // The signed-in user info.
          var user = resp.user
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  }
}

export default actions
