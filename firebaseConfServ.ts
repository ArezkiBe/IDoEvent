import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import * as admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json"

const adm = admin.initializeApp({
    credential : admin.credential.cert({
        privateKey : serviceAccount.private_key,
        projectId : serviceAccount.project_id,
        clientEmail : serviceAccount.client_email})
})

export {adm}

