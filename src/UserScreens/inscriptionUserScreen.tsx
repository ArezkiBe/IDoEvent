import React,{Component} from 'react';
import { Pressable, Text, View, TextInput, ScrollView, Alert} from 'react-native';
import {stylesInscription} from '../styles'
import { AntDesign, Zocial } from '@expo/vector-icons';
import {ADRESSE_IP} from '../../settings'

import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {auth} from '../../firebaseConfig';

export interface Props {
  navigation: any
}

export default class InscriptionUser extends Component<Props> {
  
  constructor(props: any){
    super(props);
  }

  state={
    messageError: "",
    nom: "",
    prenom: "",
    mail: "",
    numero: "",
    motDePasse: "",
    CmotDePasse: "",
    cliqueBouton: false
  }

  componentDidMount =()=>{  //initialisation

    this.props.navigation.addListener('beforeRemove', (e: any) => { 
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
    const champsRemplis: boolean =  Boolean((this.state.nom.length || this.state.prenom.length || this.state.mail.length || this.state.numero.length || this.state.motDePasse.length || this.state.CmotDePasse.length)!=0);
    if(champsRemplis){
      this.setState({retour: false});
      return true;
    }
    else{
      this.setState({retour: true});
      return false;
    }
  }

  boutonInscription =()=>{
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
          onPress: () =>this.props.navigation.navigate("MenuUtilisateur")
        }
        ])

      })
      .catch(error => {
        Alert.alert('L\'inscription a échoué...', 'adresse mail déjà existante',
        [{text: "ok", style: 'cancel',onPress: ()=> this.setState({cliqueBouton: false})}]);
      })
      .then(() => {

        fetch(`http://${ADRESSE_IP}:5000/accueil/utilisateur/inscription`, {

        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom: this.state.nom,
          prenom: this.state.prenom,
          mail: this.state.mail.toLocaleLowerCase(),
          telephone: this.state.numero,
          type: "utilisateur"
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

  validationNomPrenom = () : boolean =>{
    if(this.state.nom.length==0){
      this.setState({
        messageError : "Le champ nom est vide."
      });
      return false;
    }
    else if(this.state.prenom.length== 0){
      this.setState({
        messageError : "Le champ prenom est vide."
      });
      return false;
    }
    else if(this.state.nom.length > 20) {
      this.setState({
        messageError : "Le champ nom est trop long."
      });
      return false;
    }
    else if(this.state.prenom.length > 20){
      this.setState({
        messageError : "Le champ prenom est trop long."
      });
      return false;
    }
    else if((this.state.nom.includes("0") || this.state.nom.includes("1") || this.state.nom.includes("2") || this.state.nom.includes("3") || this.state.nom.includes("4") || this.state.nom.includes("5")  || this.state.nom.includes("6") || this.state.nom.includes("7") || this.state.nom.includes("8") || this.state.nom.includes("9"))){
      this.setState({
        messageError : "Le champ nom ne doit pas contenir de chiffres."
      });
      return false;
    }
    else if((this.state.prenom.includes("0") || this.state.prenom.includes("1") || this.state.prenom.includes("2") || this.state.prenom.includes("3") || this.state.prenom.includes("4") || this.state.prenom.includes("5")  || this.state.prenom.includes("6") || this.state.prenom.includes("7") || this.state.prenom.includes("8") || this.state.prenom.includes("9"))){
      this.setState({
        messageError : "Le champ prenom ne doit pas contenir de chiffres."
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
    }
    else if(this.state.mail.length > 30){
      this.setState({
        messageError : "Le champ adresse mail est trop long."
      });
    }
 
    if(!(this.state.mail.includes("@") && (this.state.mail.includes(".com") || this.state.mail.includes(".fr")))){
      this.setState({
        messageError : "Entrez une adresse mail valide."
      });

      return false;
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
    else if(this.state.motDePasse.length > 20){
      this.setState({
        messageError : "Le mot de passe est trop long"
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
    if (this.validationNomPrenom() && this.validationMail() && this.validationNumero() && this.validationMDP())
    {
      return true;
    }
    else return false;
  }




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
  
                  <Text style={stylesInscription.text}>Nom :</Text>
                  <TextInput style={stylesInscription.input}
                              value= {this.state.nom}
                              onChangeText={nom => this.setState({nom})}
                              placeholder='Descartes'/>
  
                  <Text style={stylesInscription.text}>Prenom :</Text>
                  <TextInput style={stylesInscription.input}
                            value= {this.state.prenom}
                            onChangeText={prenom => this.setState({prenom})}              
                            placeholder='René'/>
  
                  <Text style={stylesInscription.text}>Adresse mail :</Text>
                  <TextInput style={stylesInscription.input}
                            keyboardType= 'email-address'
                            value= {this.state.mail}
                            onChangeText={mail => this.setState({mail})}
                            placeholder='Rene_Descartes@gmail.com'/>
  
                  <Text style={stylesInscription.text}>Numero de téléphone :</Text>
                  <TextInput style={stylesInscription.input}
                            keyboardType= 'number-pad'
                            value= {this.state.numero}
                            onChangeText={numero => this.setState({numero})}
                            placeholder='0612345476'/>
  
                  <Text style={stylesInscription.text}>Mot de passe :</Text>
                  <TextInput style={stylesInscription.input}
                            secureTextEntry
                            value= {this.state.motDePasse}
                            onChangeText={motDePasse => this.setState({motDePasse})}
                            placeholder='*******'/>
  
                  <Text style={stylesInscription.text}>Confirmation de mot de passe :</Text>
                  <TextInput style={stylesInscription.input}
                            secureTextEntry
                            value= {this.state.CmotDePasse}
                            onChangeText={CmotDePasse => this.setState({CmotDePasse})}
                            placeholder='*******'/>
  
  
                  <Pressable style={stylesInscription.button1} disabled={this.state.cliqueBouton? true: false } onPress={()=> this.boutonInscription()}>
                        <Text style={stylesInscription.buttontext}>
                            Inscription
                        </Text>
                  </Pressable>
  
              </View>
       </ScrollView>
      </View>
      );
  }
  
}

