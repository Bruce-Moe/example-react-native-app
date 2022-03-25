import firebase from "firebase"

let app 
if (!firebase.apps.length) {
    // app not loaded yet
    app = firebase.initializeApp({
        apiKey: "AIzaSyD3ccrvkNr7zJigd-YMCZ93W-1qDp_ekfc",
        authDomain: "simple-blog-aec83.firebaseapp.com",
        projectId: "simple-blog-aec83",
        storageBucket: "simple-blog-aec83.appspot.com",
        messagingSenderId: "98172529920",
        appId: "1:98172529920:web:e6223340a148acf44a57e5"
    })
}

class User {
    constructor({ credential, user }) {
        this.credential = credential
        this.username = user.displayName || user.email
        this.id = user.uid
        if (user.photoURL)
            this.photo = user.photoURL
        else
            this.photo = "https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg"
    }
}

async function registerUser (name, email, password) {
    const auth = app.auth()
    const res = await auth.createUserWithEmailAndPassword(email, password)
    await res.user.updateProfile({ displayName: name })
    return new User(res)
}

async function login (email, password) {
    const auth = app.auth()
    const res = await auth.signInWithEmailAndPassword(email, password)
    return new User(res)
}

async function createPost (post) {
    const firestore = app.firestore()
    const collection = firestore.collection("posts")
    await collection.add({
        ...post,
        postDate: new Date()
    })
}

async function getPosts () {
    const firestore = app.firestore()
    const collection = firestore.collection("posts")
    const snapshots = await collection.get()
    return snapshots.docs.map(doc => {
        const data = doc.data()
        data.postDate = data.postDate.toDate()
        return data
    })
}

function uploadImage ({ filename, mimetype, blob }, progressCallback) {
    const storage = app.storage()
    const rootRef = storage.ref()
    const uploadRef = rootRef.child(`images/${filename}`)
    return new Promise((resolve, reject) => {
        const uploadTask = uploadRef.put(blob, { contentType: mimetype })
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                if (progressCallback) {
                    progressCallback(snapshot.bytesTransferred, snapshot.totalBytes)
                }
            },
            (error) => {
                reject(error)
            },
            (x) => {
                console.log(x)
                console.log(uploadTask)
                uploadRef.getDownloadURL()
                .then(url => resolve(url))
                .catch(error => reject(error))
            }
        )
    })
}

export { registerUser, login, getPosts, uploadImage, createPost }