import { Request, Response} from "express";
import Favoris from '../model/favorisModel';
import Etablissement from "../model/etablissementModel";


const ajouterFavoris = async (req: Request, res: Response) =>{

    let favorisExist = await Favoris.findOne({$and : [{"utilisateur.mailUser": req.params.mail},{"etablissement.mailEtablissement": req.params.email}]})

    if(!favorisExist){
        const requete = {
            etablissement : {
                mailEtablissement: req.params.email,
            },
            utilisateur:{
                mailUser:req.params.mail,
            }
        }
        const favoris = new Favoris(requete);
        favoris.save()
        .then((favoris: any)=> {
            return res.status(201).json({favoris})
        })
        .catch((error: any )=> {
            return res.status(400).json({error})
        }) 
        
    }
    else{
       return res.status(401).json()
    }

 
}


const deleteFavoris=async (req:Request, res: Response)=>{
    let favoris;
    try{
        favoris= await Favoris.findOneAndDelete({$and: [{"utilisateur.mailUser": req.params.mail}, {"etablissement.mailEtablissement": req.params.email}]});     
    }
    catch(error: any){
        return res.status(500).json({message: error.message})
    }
}

const getFavorisForUser = async (req:Request, res: Response,next: any)=>{
    try{ 
        let favoris=[]
        let favorisUser = await Favoris.find({"utilisateur.mailUser": req.params.mail})
        if(favorisUser == null){
            return res.status(404).json({message: 'favoris introuvable'});
        }
        else{
            try{    
                for(let i=0;i<favorisUser.length;i++)    {
                    let etablisement= await Etablissement.findOne({"email" : favorisUser[i].etablissement?.mailEtablissement})
                    favoris.push(etablisement)
                }
                
                    res.status(201).json({favoris}); 
            }
            catch(err: any){
                return res.status(500).json({message: err.message})
            }
           
        }

    }catch(err : any){
        return res.status(500).json({message: err.message})
    }
    next()
    
}

export {ajouterFavoris,getFavorisForUser,deleteFavoris};