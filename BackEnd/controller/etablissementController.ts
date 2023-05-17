import { Request, Response} from "express";
import Etablissement from "../model/etablissementModel";
import { GeoPosition } from "geo-position.ts";


//Creation d'un nouveau document dans la collection Etablissement

const createEtablissement = (req: Request, res: Response) =>{

    const proprio = new Etablissement(req.body);
    proprio.save()
    .then((proprio : any)=> {
        return res.status(201).json({proprio})
    })
    .catch((error: any )=> {
        if(error.code == 11000){
            return res.status(400).json({error : "le magasin existe déja"})
        }
        else{
            res.status(500).json({error : "server error"})
        }
       
    }) ;  
}

//Récupération d'un document dans la collection Etablissement à l'aide du mail

const getEtablissement =async (req: Request, res: Response,next: any) =>{
    let etablissement;
    try{
        etablissement = await Etablissement.findOne({email: req.params.email});
        if(etablissement == null){
            return res.status(404).json({message: 'etablissement introuvable'});
        }
        else{
            res.status(201).json({etablissement});
        }

    }catch(err : any){
        return res.status(500).json({message: err.message})
    }
    
    next()
}

//Actualisation des éléments d'un document situés la collection Etablissement à l'aide du mail.

const updateEtablissement =async (req: Request, res: Response) =>{
    let etablissement;
    try{
        etablissement = await Etablissement.findOneAndUpdate({email: req.params.email},
            {
            name : req.body.name,
            phone: req.body.phone,
            maxCapacity: req.body.maxCapacity,
            description: req.body.description,
            theme: req.body.theme,
            image: req.body.image
            }
        );

        if(!etablissement?.isModified){
            return res.status(404).json({message: "la mise à jour n'a pas pu s'effectuer correctement"});
        }
        else{
            res.status(201).json({etablissement});
           
        }

    }catch(error: any){
            return res.status(500).json({message: error.message})
    }
}

//Récupération de tous les établissements à partir de filtres passés en parmètres

const getAllEtablissement =async (req: Request, res: Response,next: any) =>{
    let etablissement;
    let etablissementReturn = [];
    let capaciteOK = false
    let typeEvenementOK = false
    let codeP = false


    const capParam = Number(req.query.capMax)
    const codePostal = Number(req.query.codePostal)
    const typeEven = req.query.typeEve
    
    const longitude = Number(req.query.longitude);
    const latitude = Number(req.query.latitude);
    let positionOne = new GeoPosition (latitude, longitude);
    const distance2 = Number(req.query.distance);
    

    console.log(req.query.typeEve)
    if (capParam != 0 ) {
        capaciteOK= true
    }
    if (codePostal != 0) {
        codeP = true
    }
    if (req.query.typeEve != "aucun" ) {
        typeEvenementOK= true
    }


    try{
        etablissement = await Etablissement.find({maxCapacity:{$ne:"0"}});
        if(etablissement == null){
            return res.status(404).json({message: 'etablissement introuvable'});
        }
        else{
            for (let i = 0; i < etablissement.length; i++) {
                const capaMax = Number(etablissement[i].maxCapacity)
                let positionTwo = new GeoPosition (etablissement[i].location?.latitudes, etablissement[i].location?.longitudes)
                let distance = +positionOne.Distance(positionTwo).toFixed(0)
                if (distance/1000 <= distance2) {
                    if (capaciteOK){
                        if (capaMax< capParam){
                            continue;
                        }else if (typeEvenementOK){
                            if (etablissement[i].theme[0]==typeEven || etablissement[i].theme[1]==typeEven || etablissement[i].theme[2]==typeEven || etablissement[i].theme[3]==typeEven){
                                if (codeP) {
                                    if (Number(etablissement[i].address?.postalCode) === codePostal ){
                                        etablissementReturn.push(etablissement[i])
                                    }
                                    continue;
                                }
                                etablissement[i].distance = distance
                                etablissementReturn.push(etablissement[i])
                                
                            }
                            continue;
                        }else{
                            if (codeP) {
                                if (Number(etablissement[i].address?.postalCode) === codePostal ){
                                    etablissement[i].distance = distance
                                    etablissementReturn.push(etablissement[i])
                                }
                                continue;
                            }
                            etablissement[i].distance = distance
                            etablissementReturn.push(etablissement[i])
                            continue;
                        }
                    }else{
                        if (typeEvenementOK){
                            if (etablissement[i].theme[0]==typeEven || etablissement[i].theme[1]==typeEven || etablissement[i].theme[2]==typeEven || etablissement[i].theme[3]==typeEven){
                                if (codeP) {
                                    if (Number(etablissement[i].address?.postalCode) === codePostal ){
                                        etablissement[i].distance = distance
                                        etablissementReturn.push(etablissement[i])
                                    }
                                    continue;
                                }
                                etablissement[i].distance = distance
                                etablissementReturn.push(etablissement[i])
                            }
                            continue;
                        }else {
                            if (codeP) {
                                if (Number(etablissement[i].address?.postalCode) === codePostal ){
                                    etablissement[i].distance = distance
                                    etablissementReturn.push(etablissement[i])
                                }
                                continue;
                            }
                            etablissement[i].distance = distance
                            etablissementReturn.push(etablissement[i])
                        }
                    }
                    

                }
                
                
            }
            etablissementReturn.sort((a,b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0))
            res.status(201).json(etablissementReturn);
        }

    }catch(err : any){
        return res.status(500).json({message: err.message})
    }
    
    next()
}


export {createEtablissement, getEtablissement, getAllEtablissement, updateEtablissement};
