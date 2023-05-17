import { Request, Response} from "express";

import Utilisateur_model from '../model/utilisateurModel';
import Etablissement from '../model/etablissementModel'
import Reservation from '../model/reservationModel';
import Favoris from '../model/favorisModel';


const createNewUtilisateur = (req: Request, res: Response) =>{
    const requete = req.body;
    const utilisateur= new Utilisateur_model(requete);
    utilisateur.save()
    .then((utilisateur: any)=> {
        return res.status(201).json({utilisateur})
    })
    .catch((error: any )=> {
        return res.status(400).json({error})
    })  
}

const getUtilisateur =async (req: Request, res: Response) =>{
    let utilisateur;
    try{
        utilisateur = await Utilisateur_model.findOne({mail: req.params.mail});
        if(utilisateur == null){
            return res.status(404).json({message: 'utilisateur introuvable'});
        }
        else{
           return res.status(201).json({utilisateur});
        }

    }catch(err : any){
        return res.status(500).json({message: err.message})
    }
    

}
//update utilisateur
const updateUtilisateur=async (req: Request, res: Response) =>{
    let utilisateur;
    try{
       utilisateur = await Utilisateur_model.findOneAndUpdate({mail: req.params.mail},
            {
                nom: req.body.nom,
                prenom : req.body.prenom,
                telephone: req.body.telephone,
            }
        );

        if(!utilisateur?.isModified){
            return res.status(404).json({message: "la mise à jour n'a pas pu s'effectuer correctement"});
        }
        else{
            res.status(201).json({utilisateur});
           
        }

    }catch(error: any){
            return res.status(500).json({message: error.message})
    }
}















export {createNewUtilisateur, getUtilisateur, updateUtilisateur};