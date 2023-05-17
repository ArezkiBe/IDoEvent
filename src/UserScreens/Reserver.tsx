import React,{Component} from 'react';
import { Pressable, Text, View, TextInput, ScrollView, Alert, StyleSheet} from 'react-native';
import {stylesReserver} from '../styles'
import { AntDesign } from '@expo/vector-icons';
import { Slider } from 'react-native-elements';
import {auth} from '../../firebaseConfig';

import { useState, useEffect } from 'react';
import { ADRESSE_IP } from '../../settings';
import { RouteProp} from '@react-navigation/native';
import { Dropdown } from 'react-native-element-dropdown';



export interface Props {
  navigation: any,
  route: RouteProp<{ params: { item: Item } }, 'params'>
}

interface Item {
  name: string,
  image:string,
  address:any,
  email:string,
  phone:string,
  maxCapacity:string,
  description:string,
  theme1:string,
  theme2:string,
  theme3: string,
  theme4: string,
  theme5: string
}


export default class Reserver extends Component<Props> {
  
  constructor(props: any){
    super(props);
  }

  state={
    messageError: "",
    typeEve: "",
    nbPersonnes:"",
    jour:"",
    mois:"",
    annee:"",
    hDebut:"",
    hFin:"",
    message:"",

    isFocus : false
  }


  
  reserverPost=()=>{
    //console.log(this.props.route.params.item)
    fetch(`http://${ADRESSE_IP}:5000/accueil/utilisateur/reservationEtab/${auth.currentUser?.email}`, {

    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      
      etablissement:{
        nomEtablissement: this.props.route.params.item.name,
        mailEtablissement: this.props.route.params.item.email,
        numeroEtablissement: this.props.route.params.item.phone,
        adresseEtablissement: this.props.route.params.item.address.addressNumber +" "+ this.props.route.params.item.address.addressName +", "+ this.props.route.params.item.address.postalCode
      },
      
      theme: this.state.typeEve,
      nbPersonnes: this.state.nbPersonnes,
      date:[ parseInt(this.state.jour),
             parseInt(this.state.mois),
             parseInt(this.state.annee)
           ],
      horaireDebut:this.state.hDebut,
      horaireFin: this.state.hFin,
      message: this.state.message,
    }),
    }).then(()=> Alert.alert("",
                             "La réservation a été effectuée !",
                              [
                                  {
                                    text: 'OK',
                                    style: 'destructive',
                                    onPress: () => {this.props.navigation.goBack()}     
                                  },
                              ]
                           )
            )
     
  }
  validationTypeEv = () : boolean =>{
    if(this.state.typeEve === ""){
      this.setState({
        messageError : "Le champ type d'évènement est vide."
      });
      return false;
    }
    else if(this.state.typeEve.length > 20){
      this.setState({
        messageError : "Le champ type d'évènement est trop long."
      });
      return false;
    }
    else if((this.state.typeEve.includes("0") || this.state.typeEve.includes("1") || this.state.typeEve.includes("2") || this.state.typeEve.includes("3") || this.state.typeEve.includes("4") || this.state.typeEve.includes("5")  || this.state.typeEve.includes("6") || this.state.typeEve.includes("7") || this.state.typeEve.includes("8") || this.state.typeEve.includes("9"))){
      this.setState({
        messageError : "Le champ type d'évènement ne doit pas contenir de chiffres."
      });
      return false;
    }
    else{
      return true;
    }
  }
  validationNbPersonnes= () : boolean =>{
    if(this.state.nbPersonnes.length== 0){
      this.setState({
        messageError : "Le champ nombre de personne est vide."
      });
      return false;
    }
    else if(this.state.nbPersonnes.length > 3){
      this.setState({
        messageError : "Le champ nombre de personne est trop long."
      });
      return false;
    }
    else{
      return true;
    }
  }
  validationJour= () : boolean =>{
    const jour0 = this.state.jour.charAt(0);
    const jour1 = this.state.jour.charAt(1);

    if(this.state.jour.length== 0){
      this.setState({
        messageError : "Le champ jour est vide."
      });
      return false;
    }
    else if(this.state.jour.length > 2){
      this.setState({
        messageError : "Entrez un jour valide."
      });
      return false;
    }
    else if(!(jour0.includes("0") || jour0.includes("1") || jour0.includes("2") || jour0.includes("3") || jour0.includes("4") || jour0.includes("5")  || jour0.includes("6") || jour0.includes("7") || jour0.includes("8") || jour0.includes("9")) || !(jour1.includes("0") || jour1.includes("1") || jour1.includes("2") || jour1.includes("3") || jour1.includes("4") || jour1.includes("5")  || jour1.includes("6") || jour1.includes("7") || jour1.includes("8") || jour1.includes("9"))){
      this.setState({
        messageError : "Le champ jour doit contenir que des chiffres."
      });
      return false;
    }
    else{
      return true;
    }
  }

  validationMois= () : boolean =>{

    const jour0 = this.state.mois.charAt(0);
    const jour1 = this.state.mois.charAt(1);

    if(this.state.mois.length== 0){
      this.setState({
        messageError : "Le champ mois est vide."
      });
      return false;
    }
    else if(this.state.mois.length > 2){
      this.setState({
        messageError : "Entrez un mois valide."
      });
      return false;
    }
    else if(!(jour0.includes("0") || jour0.includes("1") || jour0.includes("2") || jour0.includes("3") || jour0.includes("4") || jour0.includes("5")  || jour0.includes("6") || jour0.includes("7") || jour0.includes("8") || jour0.includes("9")) || !(jour1.includes("0") || jour1.includes("1") || jour1.includes("2") || jour1.includes("3") || jour1.includes("4") || jour1.includes("5")  || jour1.includes("6") || jour1.includes("7") || jour1.includes("8") || jour1.includes("9"))){
      this.setState({
        messageError : "Le champ mois doit contenir que des chiffres."
      });
      return false;
    }
    else{
      return true;
    }
  }

  validationAnnee= () : boolean =>{

    if(this.state.annee.length== 0){
      this.setState({
        messageError : "Le champ année est vide."
      });
      return false;
    }
    else if(this.state.annee.length!=4){
      this.setState({
        messageError : "Entrez une année valide."
      });
      return false;
    }
  
    else{
      return true;
    }
  }
  validationHdebut= () : boolean =>{
    if(this.state.hDebut.length== 0){
      this.setState({
        messageError : "Le champ horaire de début est vide."
      });
      return false;
    }
    else if(this.state.hDebut.length != 5){
      this.setState({
        messageError : "Entrez le bon format dans le champ horaire de début. (ex: 11h30)"
      });
      return false;
    }
    else if(!(this.state.hDebut.includes("H") || this.state.hDebut.includes("h"))){
      this.setState({
        messageError : "Entrez une horaire de début valide. (ex: 11h30)"
      });
      return false;
    }
    else{
      return true;
    }
  }

  validationHfin= () : boolean =>{
    if(this.state.hFin.length== 0){
      this.setState({
        messageError : "Le champ horaire de fin est vide."
      });
      return false;
    }
    else if(this.state.hFin.length != 5){
      this.setState({
        messageError : "Entrez le bon format dans le champ horaire de fin. (ex: 11h30)"
      });
      return false;
    }
    else if(!(this.state.hFin.includes("H") || this.state.hDebut.includes("h"))){
      this.setState({
        messageError : "Entrez une horaire de fin valide. (ex: 11h30)"
      });
      return false;
    }
    else{
      return true;
    }
  }

  validationMessage = () : boolean =>{
  if(this.state.message.length > 200){
      this.setState({
        messageError : "Le champ message est trop long. (200 caractères max.)"
      });
      return false;
    }
  else{
      return true;
    }
  }
  //VERIFICATION
  verification =()=>{
     return this.validationTypeEv()&&this.validationNbPersonnes() && this.validationJour() && this.validationMois() && this.validationAnnee() && this.validationHdebut() && this.validationHfin();
  }
  render(){
  
    return (
     
    
      <View style={stylesReserver.container}>
          <View style={{ width:390}}>

            { (this.state.messageError.length>0) && 
              <Text style={{fontSize: 15, color: '#C13F3F', paddingLeft: 10}}>    
                <AntDesign name="exclamationcircleo" size={20} color="#C13F3F" />   {'\t'} 
                {this.state.messageError}
                
              </Text>
           }
          </View>
        
       
        <ScrollView style={stylesReserver.scroll}>
              
              <View style={{paddingTop: 15}}>
  
              <Text style={stylesReserver.text}>Type d'événements* :</Text>   
                  
                  <TextInput style={stylesReserver.input}
                            value= {this.state.typeEve}
                            onChangeText={typeEve => this.setState({typeEve})}
                            placeholder='ex : Anniversaire'/>
                  
  
                  <Text style={stylesReserver.text}>Nombre de personnes* :</Text>   
                  
                  <TextInput style={stylesReserver.input}
                            keyboardType= 'number-pad'
                            value= {this.state.nbPersonnes}
                            onChangeText={nbPersonnes => this.setState({nbPersonnes})}
                            placeholder='ex : 12'/>
                  
                  <View style={{flexDirection:'row'}}> 
                  
                  <View>
                      <Text style={stylesReserver.text}>  Jour* :</Text>    
                      <TextInput style={stylesReserver.inputDate}
                                keyboardType= 'number-pad'
                                value= {this.state.jour}
                                onChangeText={ jour=> this.setState({jour})}
                                placeholder='12'/>
                                
                  </View>
                  

                  <Text> {'\n\n\n'}/</Text>

                  <View>
                      <Text style={stylesReserver.text}>  Mois* :</Text>    
                      <TextInput style={stylesReserver.inputDate}
                                keyboardType= 'number-pad'
                                value= {this.state.mois}
                                onChangeText={mois => this.setState({mois})}
                                placeholder='01'/>
                  </View>

                  <Text> {'\n\n\n'}/</Text>

                  <View>
                      <Text style={stylesReserver.text}>Année* :</Text>    
                      <TextInput style={stylesReserver.inputDate}
                                keyboardType= 'number-pad'
                                value= {this.state.annee}
                                onChangeText={annee => this.setState({annee})}
                                placeholder='2023'/>
                  </View>
                  </View> 
                  
                
                  <Text style={stylesReserver.text}>Horaire début* :</Text>    
                  <TextInput style={stylesReserver.input}
                            
                            value= {this.state.hDebut}
                            onChangeText={hDebut => this.setState({hDebut})}
                            placeholder='ex : 18h30,  15h00'/>

                  <Text style={stylesReserver.text}>Horaire fin* :</Text>    
                  <TextInput style={stylesReserver.input}
                           
                            value= {this.state.hFin}
                            onChangeText={hFin => this.setState({hFin})}
                            placeholder='ex : 18h30,  15h00'/>
                  <Text style={stylesReserver.text}>Message (facultatif):</Text>    
                  <TextInput style={stylesReserver.inputMessage} 
                            value= {this.state.message}
                            onChangeText={message => this.setState({message})}
                            placeholder='Vous pouvez préciser votre demande ici...'/>

  
                  <Pressable style={stylesReserver.button1} onPress={()=>this.verification() && this.reserverPost()}>
                        <Text style={stylesReserver.buttontext}>
                            Demande de Réservation
                        </Text>
                  </Pressable>
  
              </View>
       </ScrollView>
      </View>
      );
  }
  
}

//==============================
//==========STYLES==============
//==============================

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

