import firebase from 'firebase'
import { db } from '@/main.js'

const readingActions = {
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
  },
  createReadingEntryInFirebase ({ commit, state }, payload) {
    const { entry, meta } = payload
    const userUID = state.userUID
    const readingContentRef = db.collection('reading-content')
    const readingMetaRef = db.collection('meta')
      .doc(userUID)
      .collection('reading_meta')
    const batch = db.batch()

    var newReadingEntryRef = readingContentRef.doc()
    var newReadingMetaRef = readingMetaRef.doc()
    meta.contentId = newReadingEntryRef.id
    meta.lastEdited = firebase.firestore.Timestamp.fromDate(new Date())
    meta.created = meta.lastEdited
    batch.set(newReadingEntryRef, entry)
    batch.set(newReadingMetaRef, meta)
    return new Promise((resolve, reject) => {
      batch.commit()
        .then(function () {
          resolve(newReadingEntryRef.id)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  updateReadingEntryInFirebase ({ commit }, devotionalEntry) {
    db.collection('reading-content').doc(devotionalEntry.devotionalEntryId)
      .update(devotionalEntry)
      .then(function () {
        console.log('Document successfully written!')
      })
      .catch(function (error) {
        console.error('Error writing document: ', error)
      })
  },
  getReadingEntry ({ commit, state }) {
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
  getUserReadingMetas ({ commit, state }) {
    const userUID = state.userUID
    let readingMetas = []
    return new Promise((resolve, reject) => {
      db.collection('meta').doc(userUID).collection('reading_meta')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            readingMetas.push(doc.data())
          })
          commit('updateReadingMetas', readingMetas)
          resolve()
        })
        .catch(function (error) {
          console.error('Error getting documents: ', error)
          reject(error)
        })
    })
  }

}

export default readingActions
