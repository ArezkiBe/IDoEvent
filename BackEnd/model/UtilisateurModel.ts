import mongoose from 'mongoose';

const utilisateurSchema= new mongoose.Schema({
    nom:{
        type: String,
        required: true
    },
    prenom:{
        type: String,
        required: true
    },
    mail:{
        type: String,
        required: true,
        unique: true
    },
    telephone:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    }

});

const Utilisateur_model =mongoose.model('utilisateurs', utilisateurSchema);

export default Utilisateur_model;
