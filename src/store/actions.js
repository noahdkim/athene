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
          commit('auth_success', { token, user })
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
  },
  createDevotionalEntryInFirebase ({ commit }, devotionalEntry) {
    db.collection('devotionals-content').add(devotionalEntry)
      .then(function () {
        console.log('Document successfully written!')
      })
      .catch(function (error) {
        console.error('Error writing document: ', error)
      })
  },
  updateDevotionalEntryInFirebase ({ commit }, devotionalEntry) {
    db.collection('devotionals-content').doc(devotionalEntry.devotionalEntryId)
      .update(devotionalEntry)
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
  },
  getUserDevotionalsMetas ({ commit, state }) {
    const userUID = state.userUID
    let devotionalsMetas = []
    return new Promise((resolve, reject) => {
      db.collection('meta').doc(userUID).collection('devotionals_meta')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.data())
            devotionalsMetas.push(doc.data())
          })
          commit('updateDevotionalsMetas', devotionalsMetas)
          resolve()
        })
        .catch(function (error) {
          console.error('Error getting documents: ', error)
          reject(error)
        })
    })
  }

}

export default actions
