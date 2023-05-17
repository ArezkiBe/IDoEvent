import { Component} from 'react';
import { Pressable, Text, View, Alert, ScrollView, ImageBackground,} from 'react-native';
import { ADRESSE_IP } from '../../settings';
import { auth } from '../../firebaseConfig';
import {stylesGerer} from '../styles';
import Props from '../Props';


export default class Gerer extends Component<Props> {

    constructor(props: any){
        super(props)
      }

      state={
        capaciteMax: ""
      }

      /**
       * méthode qui s'exécute immédiatement après que le composant est monté.
       * Toutes les initialisations sont placés dans cette méthode.
       */
      componentDidMount=()=>{
        this.getEstablishment();
      }

      /**
       * Méthode s'actualisant à chaque modification.
       */
      componentDidUpdate=()=>{
        this.getEstablishment();
      }

      /**
       * Méthode permettant de récuperer la capacité maximale à l'aide d'une requete get.
       */
      getEstablishment = ()=>{
        fetch(`http://${ADRESSE_IP}:5000/accueil/etablissement/menu/gerer/${auth.currentUser?.email}`)
        .then(response=> response.json())
        .then(data=> 
                    this.setState({capaciteMax: data.etablissement.maxCapacity})  )
        .catch(err=>console.log(err))
       
    
    }

    /**
    * Méthode permettant de réinitialiser la capacité maximale, la description,
    * les thèmes ainsi que les images à l'aide d'une requete patch.
    */
    deleteWithPatch =()=>{

        fetch(`http://${ADRESSE_IP}:5000/accueil/etablissement/menu/gerer/${auth.currentUser?.email}`,{
            method: 'PATCH',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              maxCapacity: 0,
              description: "",
              theme: [
                      "",
                      "",
                      "",
                      ""
                     ],
              image:[
                      "",
                      "",
                      "",
                      "",
                      ""
                   ],
            })
        
          })
          .then(()=>{
            Alert.alert("Suppression effectuée !");
            
          })
          .catch(error => {
            alert(error.message);
          })
    }

    /**
     * Méthode : enLigne(), modifier()
     * Permet la navigation à une autre page en fonction de si l'établissement est mis en ligne ou non.
     */
    enLigne =()=>{
        
        if(parseInt(this.state.capaciteMax)==0){
            this.props.navigation.push("enLigne");
        }
        else{
            Alert.alert("Déjà en ligne...","Consultez 'aperçu du profil' pour voir l'affichage de votre etablissement.");
        }
    }


    modifier =()=>{
        
        if(parseInt(this.state.capaciteMax)==0){
            Alert.alert("Avant toutes modifications...","Mettez en ligne votre etablissement afin de pouvoir accéder à cette page. \n");
        }
        else{
            this.props.navigation.push("Modifier");
        }
    }

    /**
     * Permet la suppression de la mise en ligne en fonction de si l'établissement a été mis en ligne ou non.
     */
    supprimer =()=>{
       
        if(parseInt(this.state.capaciteMax)==0){
            Alert.alert("Pas mis en ligne...", "Votre etablissement n'est pas mis en ligne.");
        }
        else{

            Alert.alert(
                'Suppression...',
                "Voulez-vous supprimer la mise en ligne de votre etablissement ?",
                [
  
                  { text: "Non", style: 'cancel', onPress: () => {}},
                  {
                    text: 'Oui',
                    style: 'destructive',
                    onPress: () => this.deleteWithPatch(),
                  },
                ]
              );
            }
    }


  /**
   * 
   * @returns affichage de la page 'Gerer'
   */
    render(){
        return (
            
            <View style={stylesGerer.container}>
              
              <ScrollView style={stylesGerer.scroll}>
                   
                    <View style={stylesGerer.ensemble}>
                            <Text style={stylesGerer.text}>  
                            Souhaitez-vous que votre établissement{'\n'}       soit perçu par
                            tout le monde ?
                            </Text>
                        
                        <Pressable style={stylesGerer.button1} onPress={()=>this.enLigne()}> 
                            <Text style={stylesGerer.buttontext}> Mettre en ligne </Text>
                        </Pressable>
                    </View>
        
                    <View style={stylesGerer.ensemble}>
                             <Text style={stylesGerer.text}>  
                             Y a t-il eu une erreur de saisie ?{'\n'}Un changement entre temps ?
                            </Text>

                        <Pressable style={stylesGerer.button1} onPress={()=>this.modifier()}> 
                            <Text style={stylesGerer.buttontext}> Modifier </Text>
                        </Pressable>
                    </View>
        
                    <View style={stylesGerer.ensemble}>
                            <Text style={stylesGerer.text}>  
                            Souhaitez-vous supprimer {'\n'}l'accès à la réservation ?
                            </Text>

                        <Pressable style={stylesGerer.button1} onPress={()=>this.supprimer()}> 
                            <Text style={stylesGerer.buttontext}> Supprimer </Text>
                        </Pressable>
                    </View>
        
             </ScrollView>
            </View>
            
          );
    }
    
}
