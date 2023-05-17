import React,{Component} from 'react';
import { Pressable, Text, View, TextInput, ScrollView, StyleSheet} from 'react-native';
import {stylesReserver} from '../styles'
import { Slider } from 'react-native-elements';

import { Dropdown } from 'react-native-element-dropdown';

export interface Props {
  navigation: any
}

const data = [
  { label: 'Anniversaire', value: 'Anniversaire' },
  { label: 'Mariage', value: 'Mariage' },
  { label: 'Soirée', value: 'Soirée' },
  { label: 'Diner d\'entreprise', value: 'Diner d\'entreprise' },
  { label: 'Autre', value: 'Autre' },
  
];

export default class InscriptionUser extends Component<Props> {
  
  constructor(props: any){
    super(props);
  }
  
  state={
    messageError: "",
    typeEve: "aucun",
    distance: 5 ,
    nbPersonnes:"0",
    codePostal: "0",

    
    isFocus : false,
    
    cliqueBouton: false
  }
  validationTypeEv = () : boolean =>{
    if(this.state.typeEve.length== 0){
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
  validationCodePostal= () : boolean =>{
    if(this.state.codePostal.length == 0){
      return true;
    }
    else if(this.state.codePostal.length >=  6 ){
      this.setState({
        messageError : "Le champ code postal est trop long."
      });
      return false;
    }
    else{
      return true;
    }
  }
  validationNbPersonne= () : boolean =>{
    if(this.state.nbPersonnes.length== 0){
      
      return true;
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
  
  
    //VERIFICATION
    verification =()=>{
      return this.validationTypeEv() && this.validationCodePostal() && this.validationNbPersonne();
   }
  
  render(){
  
    return (
     
    
      <View style={stylesReserver.container}>
        
       
        <ScrollView style={stylesReserver.scroll}>
              
              <View style={{paddingTop: 15}}>
  
              <Dropdown
                style={[stylesReserver.input, this.state.isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!this.state.isFocus ? 'Type d\'évènement' : '...'}
                value={this.state.typeEve}
                onFocus={() => this.setState({isFocus : true})}
                onBlur={() => this.setState({isFocus : false})}
                onChange={item => {
                  this.setState({typeEve : item.value});
                  this.setState({isFocus : false});
                }}
              
              />
  
                  <Text style={stylesReserver.text}>Distance : {this.state.distance} km</Text>
                  <Slider
                   style={{width:350, marginLeft:20}}
                   value={this.state.distance}
                   minimumValue={1}
                   maximumValue={20}
                   step={1}
                   thumbStyle={{ height: 20, width: 20, backgroundColor: 'green' }}
                   thumbTintColor="blue"
                   minimumTrackTintColor="green"
                   maximumTrackTintColor="lightgray"
                   onValueChange={distance => this.setState({distance})}
                   />
  
                  <Text style={stylesReserver.text}>Code Postal :</Text>
                  <TextInput style={stylesReserver.input}
                            keyboardType= 'number-pad'
                            value= {this.state.codePostal}
                            onChangeText={codePostal => this.setState({codePostal})}
                            placeholder='ex : 75012'/>
                  <Text style={stylesReserver.text}>Nombre de personnes :</Text>    
                  <TextInput style={stylesReserver.input}
                            keyboardType= 'number-pad'
                            value= {this.state.nbPersonnes}
                            onChangeText={nbPersonnes => this.setState({nbPersonnes})}
                            placeholder='ex : 12'/>
                  
                  

  
                  <Pressable style={stylesReserver.button1} onPress={ ()=>this.verification() && this.props.navigation.navigate('PagesEtabli',{
                    distance : this.state.distance,
                    type_evenement : this.state.typeEve,
                    capacite_max : this.state.nbPersonnes,
                    codePostal : this.state.codePostal
                  })}>
                        <Text style={stylesReserver.buttontext}>
                            Rechercher
                        </Text>
                  </Pressable>
  
              </View>
       </ScrollView>
      </View>
      );
  }
  
}

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
