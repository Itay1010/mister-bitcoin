import { getFirestore, collection, getDocs, addDoc, query, where, getDoc, doc, setDoc, limit, startAfter, orderBy, deleteDoc, onSnapshot }
    from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import store from "@/store";
import router from "@/router";
const pageSize = 8
var gLastDocForPaging = null

export const firebaseService = {
    initFirebase,
    getDocuments,
    getDocument,
    addDocument,
    saveDocument,
    subscribe,
    signup,
    login,
    getUser,
    loginGuest,
    logout
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

    //Initialize Auth
    const auth = getAuth(app)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            store.dispatch({ type: 'loadUser', id: user.uid })
            console.log('user')
        } else {
            router.push('/auth/signup')
        }
    })

    // debug:
    window.tsayriliApp = app
    window.tsayriliAuth = auth
    window.signoutUser = logout
}

async function addDocument(collectionName, document) {
    const db = getFirestore()
    try {
        const docRef = await addDoc(collection(db, collectionName), document)
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
        querySnapshot.forEach((doc) => {
            docs.push({ id: doc.id, ...doc.data() })
        })
        cb(docs)
    })
}

async function signup(email, password) {
    const auth = getAuth()
    const res = await createUserWithEmailAndPassword(auth, email, password)
    return res.user.uid
}

async function login(email, password) {
    const auth = getAuth()
    const res = await signInWithEmailAndPassword(auth, email, password)
    return res.user.uid
}

async function logout() {
    const auth = getAuth()
    await signOut(auth)
}

async function getUser() {
    const auth = getAuth()
    return auth.currentUser
}

async function loginGuest() {
    const auth = getAuth()
    signInAnonymously(auth)
}