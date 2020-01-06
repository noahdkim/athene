import firebase from 'firebase'
import { db } from '@/main.js'

const devotionalActions = {
  createDevotionalEntryInFirebase ({ commit, state }, payload) {
    const { entry, meta } = payload
    const userUID = state.userUID
    const devotionalsContentRef = db.collection('devotionals-content')
    const devotionalsMetaRef = db.collection('meta')
      .doc(userUID)
      .collection('devotionals_meta')
    const batch = db.batch()

    var newDevotionalsEntryRef = devotionalsContentRef.doc()
    var newDevotionalsMetaRef = devotionalsMetaRef.doc()
    meta.contentId = newDevotionalsEntryRef.id
    meta.lastEdited = firebase.firestore.Timestamp.fromDate(new Date())
    meta.created = meta.lastEdited
    batch.set(newDevotionalsEntryRef, entry)
    batch.set(newDevotionalsMetaRef, meta)
    return new Promise((resolve, reject) => {
      batch.commit()
        .then(function () {
          resolve(newDevotionalsEntryRef.id)
        })
        .catch(function (error) {
          reject(error)
        })
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
        .orderBy('lastEdited', 'desc')
        .limit(100)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
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
  },
  getOverallStatistics ({ commit, state }) {
    const userUID = state.userUID
    return new Promise((resolve, reject) => {
      db.collection('devotionals-statistics')
        .doc(userUID)
        .collection('completion')
        .doc('overall-completion')
        .get()
        .then((doc) => {
          const overallStatistics = doc.data()
          commit('updateOverallStatistics', overallStatistics)
          resolve()
        })
        .catch(function (error) {
          console.error('Error getting documents: ', error)
          reject(error)
        })
    })
  }

}

export default devotionalActions
