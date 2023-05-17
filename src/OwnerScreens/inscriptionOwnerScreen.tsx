import {stylesInscriptionOwner, stylesInscription} from '../styles'
import React,{Component} from 'react';
import { Pressable, Text, View, TextInput, ScrollView, Alert, ActivityIndicator} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import {ADRESSE_IP} from '../../settings'
import Geocoder from 'react-native-geocoding';
import Props from '../Props';


export default class InscriptionOwner extends Component<Props> {
  
  constructor(props: any){
    super(props);
  }

  state={
    messageError: "",
    nom: "",
    numeroAdresse: "",
    nomAdresse: "",
    codePostal:"",
    adresse : "",
    mail: "",
    numero: "",
    motDePasse: "",
    CmotDePasse: "",
    cliqueBouton: false
  }


  componentDidMount =()=>{  //initialisation
    
    this.props.navigation.addListener('beforeRemove', (e: any) => {            //bouton back
      if(!this.affichageRetourAlert() || this.state.cliqueBouton){
        return
      }
    
      e.preventDefault();

      Alert.alert(
        'Inscription en cours...',
        "Etes-vous sûrs de vouloir quitter la page d'inscription ?",
        [
          { text: "Non", style: 'cancel', onPress: () => {} },
          {
            text: 'Oui',
            style: 'destructive',
            onPress: () => this.props.navigation.dispatch(e.data.action),
          },
        ]
      );
    }),
    [this.props.navigation]

    
  }

  affichageRetourAlert =()=>{
    const champsRemplis: boolean =  Boolean((this.state.nom.length || this.state.numeroAdresse.length || this.state.nomAdresse.length || this.state.codePostal.length  || this.state.mail.length || this.state.numero.length || this.state.motDePasse.length || this.state.CmotDePasse.length)!=0);
    if(champsRemplis){
      this.setState({retour: false});
      return true;
    }
    else{
      this.setState({retour: true});
      return false;
    }
  }


  boutonInscription =async ()=>{
    this.setState({cliqueBouton: true});
    
    if(this.validation()) {
      auth
      createUserWithEmailAndPassword(auth, this.state.mail,this.state.motDePasse)
      .then(userCredentials => {
        const user = userCredentials.user;
        
        Alert.alert("Inscription validée...","Merci !",
        [
          {text: "Allons-y !",
          style: "destructive",
          onPress: () =>{
                          this.props.navigation.navigate("MenuEtabli");
                        }
        }
        ])

      })
      .catch(error => {
        Alert.alert('L\'inscription a échoué...', 'adresse mail déjà existante',
        [{text: "ok", style: 'cancel',onPress: ()=> this.setState({cliqueBouton: false})}]);
      })
      .then(() => {


        fetch(`http://${ADRESSE_IP}:5000/accueil/etablissement/inscription`, {

        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.nom,
          address:{
            addressNumber: parseInt(this.state.numeroAdresse),
            addressName: this.state.nomAdresse,
            postalCode: this.state.codePostal
          },
          email: this.state.mail.toLocaleLowerCase(),
          phone: this.state.numero,
        }),
        });
      })
      .catch(error => {
        console.log(error.message);
      })
      
    }
    else{
      this.setState({cliqueBouton: false});
    }
    
  }


  validationNom = () : boolean =>{
    if(this.state.nom.length==0){
      
      this.setState({
        messageError : "Le champ nom est vide."
      });

      return false;
    }
    else if (this.state.nom.length > 20) {
      this.setState ({
        messageError : "le champ nom est trop long"
      });
      return false
    }
    else if((this.state.nom.includes("0") || this.state.nom.includes("1") || this.state.nom.includes("2") || this.state.nom.includes("3") || this.state.nom.includes("4") || this.state.nom.includes("5")  || this.state.nom.includes("6") || this.state.nom.includes("7") || this.state.nom.includes("8") || this.state.nom.includes("9"))){
      this.setState({
        messageError : "Le champ nom ne doit pas contenir de chiffres."
    });
      return false;
    }  

    else{
      return true;
    }
  }

  validationAdresse =()=>{
   if(this.state.numeroAdresse.length==0 ||this.state.nomAdresse.length==0 ||this.state.codePostal.length==0){
    
    this.setState({
      messageError : "L'adresse de l'établissement n'est pas complet."
    });

    return false;

   }

   else if(this.state.numeroAdresse.length>3 || this.state.numeroAdresse.includes('.') || this.state.numeroAdresse.includes('-')){
    this.setState({
      messageError : "Le champ numéro de l'adresse de l'établissement est incorrect."
    });

    return false;
   }

   else if(this.state.nomAdresse.length>30){
    this.setState({
      messageError : "Le nom de la rue est trop long."
    });

    return false;
   }

   else if(this.state.nomAdresse.includes("0") || this.state.nomAdresse.includes("1") || this.state.nomAdresse.includes("2") || this.state.nomAdresse.includes("3") || this.state.nomAdresse.includes("4") || this.state.nomAdresse.includes("5")  || this.state.nomAdresse.includes("6") || this.state.nomAdresse.includes("7") || this.state.nomAdresse.includes("8") || this.state.nomAdresse.includes("9")){
    this.setState({
      messageError : "Le nom de la rue ne doit pas contenir de chiffres."
    });

    return false;
   }

   else if(this.state.codePostal.length<0 || this.state.codePostal.length>5){
    this.setState({
      messageError : "Le code postal est incorrect."
    });

    return false;
   }
   else{
    return true;
   }
  }



  //faire le cas de figure ou le mail est existant 
  validationMail= () : boolean =>{
    if(this.state.mail.length==0){
      this.setState({
        messageError : "Le champ adresse mail est vide."
      });
      return false;
    }
    else if(!(this.state.mail.includes("@") && !this.state.mail.includes(' ') &&(this.state.mail.includes(".com") || this.state.mail.includes(".fr")))){

      this.setState({
        messageError : "Entrez une adresse mail valide."
      });

      return false;
    }
    else if (this.state.mail.length > 50) {
      this.setState ({
        messageError : "le champ mail est trop long."
      });
      return false
    }
    else{
      return true;
    }
  }

  validationNumero = () : boolean =>{
    if(this.state.numero.length == 0){
      this.setState({
        messageError : "Le champ numero de téléphone est vide."
      });
      return false;
    }

    else if(this.state.numero.length != 10){
     
      this.setState({
        messageError : "Entrez un numero de téléphone valide."
      });
  
      return false;
    }
    else{
      return true;
    }
    
  }

  validationMDP = () : boolean =>{
    if(this.state.motDePasse.length==0){
      this.setState({
        messageError : "Le champ mot de passe est vide."
      });
      return false;
    }

    else if(this.state.motDePasse.length<6){
      this.setState({
        messageError : "Le mot de passe est trop court (6 caractères min.)"
      });
      return false;
    }
    else if(this.state.motDePasse.length>25){
      this.setState({
        messageError : "Le mot de passe est trop long (25 caractères max.)"
      });
      return false;
    }

    else if(this.state.motDePasse != this.state.CmotDePasse){
      this.setState({
        messageError : "Les mots de passe ne concordent pas."
      });
      return false;
    }

    else {
      return true;
    }
    
  }

  validation=()=>{
    return this.validationAdresse() && this.validationMail() && this.validationNumero() && this.validationMDP() ;
  }
/*validationAdresseCompleteA = ()=>{
  return this.validationAdresseCompl();
}

*/

  render(){
  
    return (
     
    
      <View style={stylesInscription.container}>
      
      { (this.state.messageError.length>0) && 
              <Text style={{fontSize: 15, color: '#C13F3F', paddingLeft: 10}}>    
                <AntDesign name="exclamationcircleo" size={20} color='#C13F3F' />  {'\t'}  
                {this.state.messageError}
                
              </Text>
        }

  
        <ScrollView style={stylesInscription.scroll}>
              
              <View style={{paddingTop: 15}}>
  
                  <Text style={stylesInscription.text}>Nom de l'établissement* :</Text>
                  <TextInput style={stylesInscription.input}
                              value= {this.state.nom}
                              onChangeText={nom => this.setState({nom})}
                              placeholder='Noccio'/>
  
                  <Text style={stylesInscription.text}>Adresse de l'établissement* :</Text>

                  
                  <View style={{flexDirection:'row'}} >

                  <View>
                  <Text style={{paddingLeft:20, marginTop:10, color:'#6C7173'}}>n° :</Text>
                  <TextInput style={stylesInscription.inputNumberAdress}
                            value= {this.state.numeroAdresse}
                            keyboardType= 'number-pad'
                            onChangeText={numeroAdresse => this.setState({numeroAdresse})}              
                            placeholder='ex. 12'/>
                  </View>

                  <View>
                  <Text style={{paddingLeft:20, marginTop:10, color:'#6C7173'}}>nom de rue :</Text>
                  <TextInput style={stylesInscription.inputAddress}
                            value= {this.state.nomAdresse}
                            onChangeText={nomAdresse => this.setState({nomAdresse})}              
                            placeholder='rue des Saints-Pères'/>
                  </View>

                  <View>
                  <Text style={{paddingLeft:13, marginTop:10, color:'#6C7173'}}>code postal :</Text>
                  <TextInput style={stylesInscription.inputCodeAdress}
                            value= {this.state.codePostal}
                            keyboardType= 'number-pad'
                            onChangeText={codePostal => this.setState({codePostal})}              
                            placeholder='75006'/>
                  </View>

                  </View>

  
                  <Text style={stylesInscription.text}>Adresse mail* :</Text>
                  <TextInput style={stylesInscription.input}
                            keyboardType= 'email-address'
                            value= {this.state.mail}
                            onChangeText={mail => this.setState({mail})}
                            placeholder='NoccioBar@outlook.com'/>
  
                  <Text style={stylesInscription.text}>Numero* :</Text>
                  <TextInput style={stylesInscription.input}
                            keyboardType= 'number-pad'
                            value= {this.state.numero}
                            onChangeText={numero => this.setState({numero})}
                            placeholder='0612345346'/>
  
                  <Text style={stylesInscription.text}>Mot de passe* :</Text>
                  <TextInput style={stylesInscription.input}
                            secureTextEntry
                            value= {this.state.motDePasse}
                            onChangeText={motDePasse => this.setState({motDePasse})}
                            placeholder='*******'/>
  
                  <Text style={stylesInscription.text}>Confirmation de mot de passe* :</Text>
                  <TextInput style={stylesInscription.input}
                            secureTextEntry
                            value= {this.state.CmotDePasse}
                            onChangeText={CmotDePasse => this.setState({CmotDePasse})}
                            placeholder='*******'/>
  
  
                  <Pressable style={stylesInscriptionOwner.button1} disabled={this.state.cliqueBouton ? true : false} onPress={()=> this.boutonInscription()}>
                       
                      {
                        this.state.cliqueBouton && 
                        <ActivityIndicator size="large" color="white" style={{alignItems:'center'}}/>
                      }

                      {                      
                        !this.state.cliqueBouton &&
                        <Text style={stylesInscription.buttontext}>
                                Inscription
                        </Text>
                      }
                      
                  </Pressable>
  
              </View>
       </ScrollView>
      </View>
      );
  }
  
}
