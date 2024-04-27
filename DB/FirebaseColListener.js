const {db} = require('./firebase');
const { onSnapshot, collection, limit , query} = require( "firebase/firestore");


 const firestoreColListener = (colId) => {
    const q = query(collection(db, colId), limit(1))
     return onSnapshot(q, (querySnapShot) => {
         querySnapShot.forEach((doc) => console.log(doc.data()));
     });
}

module.exports = {firestoreColListener}