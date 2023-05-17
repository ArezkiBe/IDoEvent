import { Request, Response} from "express";
import Reservation from '../model/reservationModel';
import Etablissement from "../model/etablissementModel";
import {getUtilisateur} from './UtilisateurController'
import Utilisateur_model from "../model/utilisateurModel";

const CreateReservationUtilisateur = async (req: Request, res: Response) =>{
    
    let utilisateur : any= await Utilisateur_model.findOne({mail: req.params.mail});
 
    const requete = {
        
        etablissement:req.body.etablissement,

        utilisateur:{
            nom: utilisateur?.nom ,
            prenom: utilisateur?.prenom,
            mailUser:req.params.mail,
            numeroUser: utilisateur?.telephone
        },
    
        theme: req.body.theme,

        nbPersonnes: req.body.nbPersonnes,

        date: req.body.date,

        horaireDebut:req.body.horaireDebut,

        horaireFin: req.body.horaireFin,

        message:req.body.message
    }
    
    const reservation= new Reservation(requete);
    reservation.save()
    .then((reservation: any)=> {
        return res.status(201).json({reservation})
    })
    .catch((error: any )=> {
        return res.status(400).json({error})
    })  
}


const getReservationForUser =async (req: Request, res: Response,next: any) =>{
    let reservation;
    let date = new Date();
 
    try{
        reservation = await Reservation.find({$and: [
                                                       {"utilisateur.mailUser":req.params.mail},
                                                       {$or : [{"status": "accepté" }, {"status": "en attente" }]},
                                                       {$or : [
                                                                {"date.2":{$gt: date.getFullYear()}}, 
                                                                {$and: [{"date.2":{$gte: date.getFullYear()}}, {"date.1": {$gt: date.getMonth()+1}} ] },
                                                                {$and: [{"date.2":{$gte: date.getFullYear()}}, {"date.1": {$gte: date.getMonth()+1}}, {"date.0": {$gte: date.getDate()}} ] }
                                                              ]
                                                        }
                                                    ]
                                            })
        if(reservation == null){
            return res.status(404).json({message: 'reservation introuvable'});
        }
        else{
            res.status(201).json({reservation});
        }

    }catch(err : any){
        return res.status(500).json({message: err.message})
    }
    
    next()
}


const getHistoriqueForUser =async (req: Request, res: Response,next: any) =>{
    let reservation;
    let date= new Date();
 
    try{
        reservation = await Reservation.find({$and: [
                                                        {"utilisateur.mailUser":req.params.mail},
                                                        {$or : [
                                                                    {"status": "refusé" }, 
                                                                    {"status": "annulé" },
                                                                    {$and: [
                                                                            {"status": "accepté" },
                                                                            {$or : [
                                                                                    {"date.2":{$lt: date.getFullYear()}}, 
                                                                                    {$and: [{"date.2":{$lte: date.getFullYear()}}, {"date.1": {$lt: date.getMonth()+1}} ] },
                                                                                    {$and: [{"date.2":{$lte: date.getFullYear()}}, {"date.1": {$lte: date.getMonth()+1}}, {"date.0": {$lt: date.getDate()}} ] }
                                                                                   ]
                                                                            }
                                                                
                                                                          ]   
                                                                    }        
                                                                ]
                                                        }
                                                        
                                                    ]
                                            })
        
        if(reservation == null){
            return res.status(404).json({message: 'reservation introuvable'});
        }
        else{
            res.status(201).json({reservation});
        }

    }catch(err : any){
        return res.status(500).json({message: err.message})
    }
    
    next()
}


const getReservationForEtab =async (req: Request, res: Response,next: any) =>{
    let reservation;
    
    try{
            reservation = await Reservation.find({$and: [
                {"etablissement.mailEtablissement":req.params.email},
                 {$or: [ {"status":  "accepté"}, {"status": "en attente"} ]}
               
            ]
                
            })

        

        if(reservation == null){
            return res.status(404).json({message: 'reservation introuvable'});
        }
        else{
            res.status(201).json({reservation});
        }

    }catch(err : any){
        return res.status(500).json({message: err.message})
    }
    
    next()
}

const updateStatus =async (req: Request, res: Response)=>{
    let reservation;
    try{
        reservation= await Reservation.findByIdAndUpdate(req.params.id,
            {
                status: req.body.status
            }
        );
        if(!reservation?.isModified){
            return res.status(404).json({message: "la mise à jour n'a pas pu s'effectuer correctement"});
        }
        else{
            res.status(201).json({reservation});
        }
    }
    catch(error: any){
        return res.status(500).json({message: error.message})
    }
}

const deleteReservation =async (req:Request, res: Response)=>{
    let reservation;
    try{
        reservation= await Reservation.findByIdAndDelete(req.params.id);     
    }
    catch(error: any){
        return res.status(500).json({message: error.message})
    }
}

export{getReservationForEtab,getReservationForUser, CreateReservationUtilisateur, updateStatus, deleteReservation, getHistoriqueForUser};