import firebase from "firebase"

let app 
if (!firebase.apps.length) {
    // app not loaded yet
    app = firebase.initializeApp({
        apiKey: "AIzaSyCfHJcu3a2S7vCOgaG85BlVE_ie0JiNy6k",
        authDomain: "test-project-48404.firebaseapp.com",
        databaseURL: "https://test-project-48404.firebaseio.com",
        projectId: "test-project-48404",
        storageBucket: "test-project-48404.appspot.com",
        messagingSenderId: "849718722129",
        appId: "1:849718722129:web:9c9e0d856a4f4d4cd44270"
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