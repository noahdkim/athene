import firebase from 'firebase'
import { db } from '@/main.js'

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
          commit('auth_success', token, user)
          resolve(resp)
        })
        .catch(err => {
          commit('auth_error')
          reject(err)
        })
    })
  },
  saveDevotionalEntryToFirebase ({ commit }, devotionalEntry) {
    db.collection('devotionals-content').add(devotionalEntry)
      .then(function () {
        console.log('Document successfully written!')
      })
      .catch(function (error) {
        console.error('Error writing document: ', error)
      })
  },
  getDevotionalEntry ({ commit, state }) {
    return {
      book: '',
      chapter: 0,
      date: '',
      startVerse: 0,
      endVerse: 0,
      summary: '',
      reflection: '',
      metaId: '',
      contentId: ''
    }
  }

}

export default actions
