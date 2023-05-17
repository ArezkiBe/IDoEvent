import { Request, Response} from "express";
import Utilisateur_model from "../model/utilisateurModel";
import etablissement_model from "../model/etablissementModel";

import { adm } from "../../firebaseConfServ";


//Vérification que le compte utilisé est bien un compte utilisateur

const verifConnexionUtil = async (req: Request, res: Response) => {

    const token = req.body.token

    const trouve = await Utilisateur_model.findOne({mail : req.body.mail})

    adm.auth().verifyIdToken(token)
    .then(token => {
        if (trouve === null) {
            res.send({
                data : false
            })
        } else {
            res.send ({
                data : true
            })
        }
    })
    .catch(error => {
        res.send({
            data : false
        })
    })

    

    
}

//Vérification que le compte utilisé est bien un compte propriétaire

const verifConnexionProprio = async (req: Request, res: Response) => {
    
    const trouve = await etablissement_model.findOne(req.body)

    if (trouve === null){
        res.send({
            data : false
        })
    } else {
        res.send ({
            data : true
        })
    }
}

export {verifConnexionUtil, verifConnexionProprio}