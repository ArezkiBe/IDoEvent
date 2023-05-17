import mongoose from 'mongoose';

/**
 * Méthode permettant de se connecter à la base de données MongoDB
 * @param url
 * 
 */

const connectToBDD = (url : string) : void=>{
  mongoose.set("strictQuery",false);
  mongoose.connect(url)
  .then(() => {
        console.log('connexion etablie avec la base de données !');
  }).catch(() => {
        console.log("erreur lors de la connexion à la base de données.");
  });

}



export {connectToBDD}







