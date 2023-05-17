import express from 'express';
import {Request, Response} from 'express';
import { createEtablissement, getAllEtablissement, getEtablissement, updateEtablissement } from '../controller/etablissementController';
import {createNewUtilisateur, getUtilisateur, updateUtilisateur} from '../controller/UtilisateurController';
import { verifConnexionUtil, verifConnexionProprio } from '../controller/ConnexionController';

import {getReservationForUser,getHistoriqueForUser, getReservationForEtab, CreateReservationUtilisateur, updateStatus, deleteReservation} from '../controller/reservationController';
import { ajouterFavoris ,getFavorisForUser , deleteFavoris} from '../controller/favorisController';
//import { inscription } from '../controller/authentification';

const router = express.Router();

//router.post('/inscription',inscription);

router.post('/accueil/utilisateur/inscription', createNewUtilisateur)
router.post('/accueil/etablissement/inscription',createEtablissement)

router.post('/accueil/connexion/utilisateur',verifConnexionUtil)
router.post('/accueil/connexion/etablissement', verifConnexionProprio)

router.get('/accueil/utilisateur/menu/apercuProfil/:mail',getUtilisateur)
router.get('/accueil/etablissement/menu/apercuProfil/:email',getEtablissement)

// update etablisement
router.get('/accueil/etablissement/menu/gerer/:email',getEtablissement)
router.patch('/accueil/etablissement/menu/gerer/:email',updateEtablissement)

router.get('/accueil/etablissement/menu/gerer/modification/:email',getEtablissement)
router.patch('/accueil/etablissement/menu/gerer/modification/:email',updateEtablissement)

// update owner 
router.get('/accueil/etablissement/menu/gerer/owner/:email',getEtablissement)
router.patch('/accueil/etablissement/menu/gerer/owner/:email',updateEtablissement)

router.get('/accueil/etablissement/menu/modifierInfos/:email',getEtablissement)
router.patch('/accueil/etablissement/menu/modifierInfos/:email',updateEtablissement)

// update utilisateur
router.get('/accueil/utilisateur/menu/gerer/:mail',getUtilisateur)
router.patch('/accueil/utilisateur/menu/gerer/:mail',updateUtilisateur)

router.get('/accueil/utilisateur/menu/modifierInfos/:mail',getUtilisateur)
router.patch('/accueil/utilisateur/menu/modifierInfos/:mail',updateUtilisateur)

//reservation
router.get('/accueil/utilisateur/nouvelleReservation/affichageEtab',getAllEtablissement)

router.post('/accueil/utilisateur/reservationEtab/:mail', CreateReservationUtilisateur)

router.get('/accueil/utilisateur/demandesReservation/:mail', getReservationForUser)
router.delete('/accueil/utilisateur/demandesReservation/cancel/:id',deleteReservation)


router.get('/accueil/utilisateur/historique/:mail', getHistoriqueForUser)
router.delete('/accueil/utilisateur/historique/cancel/:id',deleteReservation)

router.get('/accueil/etablissement/reservation/:email', getReservationForEtab)
router.patch('/accueil/etablissement/reservation/:id',updateStatus)


// favoris
router.post('/accueil/utilisateur/etabli/favoris/:email/:mail',ajouterFavoris)
router.delete('/accueil/utilisateur/Favoris/delete/:email/:mail', deleteFavoris)
router.get('/accueil/utilisateur/favoris/:mail',getFavorisForUser)





//a enlever après
router.get('/accueil/', (req: Request, res: Response) => {
    return res.send("PAGE D'ACCUEIL");
});

router.get('/accueil/connexion/', (req: Request, res: Response)=>{
    return res.send('page de connexion !!');
})

//router.post('/accueil/connexion/inscription/etablissement', createEtablissement);

export {router};
