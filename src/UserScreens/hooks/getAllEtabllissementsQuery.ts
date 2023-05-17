import {useQuery} from  '@tanstack/react-query'
import { ADRESSE_IP } from '../../../settings'


//Fonction permettant de récupérer tous les établissements avec leur distance avec la position passée en paramètre
const getAllEtablissements = async(latitude : any, longitude : any, distance : Number, typeEve : String, capMax : String, codePostal : String) => {
    const response = await fetch(`http://${ADRESSE_IP}:5000/accueil/utilisateur/nouvelleReservation/affichageEtab/?latitude=${latitude}&longitude=${longitude}&distance=${distance}&typeEve=${typeEve}&capMax=${capMax}&codePostal=${codePostal}`)
    return response.json()
}

//Fonction utilisant un useQuery qui permet de récupérer les données de la requête ainsi que deux autres variables
const UseGetAllEtablissements = (latitude : any, longitude : any, distance : Number, typeEve : String, capMax : String, codePostal : String) => {
    const {isLoading, data, refetch} =  useQuery(['allEtablissements',latitude,longitude, distance, typeEve, capMax, codePostal] , ({queryKey}) => getAllEtablissements(queryKey[1], queryKey[2], queryKey[3], queryKey[4], queryKey[5], queryKey[6]));
    return {data, isLoading, refetch};
};

export {UseGetAllEtablissements}