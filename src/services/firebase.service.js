import { getFirestore, collection, getDocs, addDoc, query, where, getDoc, doc, setDoc, limit, startAfter, orderBy, deleteDoc, onSnapshot }
    from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js"

const pageSize = 8
var gLastDocForPaging = null


export const firebaseService = {
    initFirebase,
    getDocuments,
    getDocument,
    addDocument,
    saveDocument,
    subscribe
}

async function initFirebase() {
    // Get from Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyCSmbg0IYVSNKeNhAiIFuL_aJI4xTI5s_Q",
        authDomain: "fundamentals-d14c1.firebaseapp.com",
        databaseURL: "https://fundamentals-d14c1-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "fundamentals-d14c1",
        appId: "1:159329252355:web:d6de43eaa3e21702828a36"
    }

    // Initialize Firebase
    const app = initializeApp(firebaseConfig)


    // debug:
    window.tsayriliApp = app
}

async function addDocument(collectionName, document) {
    const db = getFirestore()
    try {
        const docRef = await addDoc(collection(db, collectionName), document)
        // console.log("Doc saved. id: ", docRef.id)
        return docRef
    } catch (err) {
        console.error("Error adding document: ", err)
        throw err
    }
}

async function getDocument(collectionName, id) {
    const db = getFirestore()
    const snap = await getDoc(doc(db, collectionName, id))
    if (!snap.exists()) {
        return null
    }
    const docToReturn = snap.data()
    docToReturn.id = id
    return docToReturn
}


async function saveDocument(collectionName, document, id) {
    const db = getFirestore()
    await setDoc(doc(db, collectionName, id), document, { merge: true })
    return document
}

async function getDocuments(collectionName, filterBy) {

    const db = getFirestore()
    var collectionRef = collection(db, collectionName)
    var orderByParams = []

    if (filterBy.criteria) {
        collectionRef = query(collectionRef, where(filterBy.criteria, '==', filterBy.searchField))
    }

    const querySnapshot = await getDocs(collectionRef)
    const docs = []
    querySnapshot.forEach((doc) => {
        docs.push({ _id: doc.id, ...doc.data() })
    })
    return docs
}


function subscribe(collectionName, cb) {
    const db = getFirestore()
    const unsub = onSnapshot(collection(db, collectionName), (querySnapshot) => {
        const docs = []
        // console.log("Current data: ", querySnapshot.docs)
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
            docs.push({ id: doc.id, ...doc.data() })
        })
        cb(docs)
    })

}
