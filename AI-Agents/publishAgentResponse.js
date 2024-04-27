const {collection, addDoc, serverTimestamp} = require("firebase/firestore");
const {db} = require("../DB/firebase");

const publishAgentResponse = async (id, value, name) => {
    if (value.trim() === '') {
        alert('Enter valid message');
        return;
    }
    const modifyName = name.replace(' ', '+');
    console.log(modifyName);
    await addDoc(collection(db, id), {
        text: value,
        name: name,
        avatar: `https://ui-avatars.com/api/?background=0F9D58&color=FFFFFF&name=${modifyName}`,
        createdAt: serverTimestamp(),
    });
    return "success";
};

module.exports = { publishAgentResponse };
