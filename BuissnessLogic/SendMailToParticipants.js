const nodemailer = require('nodemailer');
const composeEmail = require('./ComposeEmail');
const smtpTransport = require('nodemailer-smtp-transport');
const admin = require('firebase-admin');
const {getAuth} = require('firebase-admin/auth');
const {initializeApp} = require('firebase-admin/app');
const {getParticipantsByExperimentId, getExperimentById} = require('../DB/Queries')

require('dotenv').config();

initializeApp({
    credential: admin.credential.cert(
        {
            "type": process.env.FIREBASE_ADMIN_TYPE,
            "project_id": process.env.FIREBASE_ADMIN_PROJECT_ID,
            "private_key_id": process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
            "private_key": process.env.FIREBASE_ADMIN_PRIVATE_KEY,
            "client_email": process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            "client_id": process.env.FIREBASE_ADMIN_CLIENT_ID,
            "auth_uri": process.env.FIREBASE_ADMIN_AUTH_URI,
            "token_uri": process.env.FIREBASE_ADMIN_TOKEN_URI,
            "auth_provider_x509_cert_url": process.env.FIREBASE_ADMIN_AUTH_PROVIDER,
            "client_x509_cert_url": process.env.FIREBASE_ADMIN_CLIENT_CERT_URI,
            "universe_domain": process.env.FIREBASE_ADMIN_UNIVERSE_DOMAIN
        }
    )
});

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'shenkar.chitchat.ai@gmail.com',
        pass: process.env.GMAIL_APP_PASS
    }
}));

const mailOptions = (mail, expId, expSubject, registerOrJoin) => {
    return {
        from: 'shenkar.chitchat.ai@gmail.com',
        to: mail,
        subject: registerOrJoin === 'register' ? 'ChitChat.ai: Successfully registered to experiment' : 'ChitChat.ai: Experiment is about to start',
        html: composeEmail('https://chitchat-chatplatform.web.app/' + expId, expSubject, registerOrJoin)
    }
};

const sendMailToAllParticipants = async (expId, registerOrJoin) => {
    const participantsMails = [];
    const participantsIds = await getParticipantsByExperimentId(expId);
    const {exp_subject} = await getExperimentById(expId);
    participantsIds.forEach((participant) => {
        getAuth().getUser(participant.participant_id).then((userRecord) => participantsMails.push(userRecord.email))
    })
    if (participantsMails.length > 0)
        await transporter.sendMail(mailOptions(participantsMails, expId, exp_subject, registerOrJoin), (err, info) => {
            if (err)
                throw new Error(err)
        });
    else
        throw new Error(`No participants are associated with experiment, exp_id: ${expId}`)
}
const sendMailToParticipant = async (expId, participantId, registerOrJoin = 'register') => {

    const {exp_subject} = await getExperimentById(expId)
    getAuth().getUser(participantId).then((userRecord) => {
        transporter.sendMail(mailOptions(userRecord.email, expId, exp_subject, registerOrJoin), (err, info) => {
            if (err)
                throw new Error(err)
        });
    })


}

module.exports = {sendMailToAllParticipants, sendMailToParticipant}