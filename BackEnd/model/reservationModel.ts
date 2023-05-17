import mongoose from 'mongoose';
 
const reservationSchema= new mongoose.Schema({

   etablissement:{
        nomEtablissement:{
            type: String,
            required: true
        },
        mailEtablissement:{
            type: String,
            required: true
        },
        numeroEtablissement:{
            type: String,
            required: true
        },
        adresseEtablissement:{
            type: String,
            required: true
        }
    },
    utilisateur:{
        nom: String,
        prenom:String,
        mailUser:String,
        numeroUser:String
    },

    theme:{
        type: String,
        required: true
    },
    nbPersonnes:{
        type: Number,
        required: true
    },
    date: {
        type: Array<Number>,
        required: true,
    },
    horaireDebut:{
        type: String,
        required:true
    },
    horaireFin: {
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "en attente"
    },
    message:{
        type: String,
        required: false
    }


});


const reservation =mongoose.model('reservation', reservationSchema);
export default reservation;