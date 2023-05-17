import mongoose from 'mongoose';

 
const favorisSchema= new mongoose.Schema({
    etablissement:{
        mailEtablissement: String,

    },
    utilisateur:{
        mailUser:String, 
       
    },
        
    
});

const Favoris =mongoose.model('favoris', favorisSchema);
export default Favoris;