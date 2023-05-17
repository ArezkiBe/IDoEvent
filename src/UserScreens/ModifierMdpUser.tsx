import React,{  Component, useState } from 'react';
import {Pressable, Text, View, TextInput, Alert, Image,StyleSheet} from 'react-native';
import {width} from '../styles';
import {auth} from '../../firebaseConfig';
import {ADRESSE_IP} from '../../settings';
import firebase from 'firebase/compat';
import Props from '../Props';


export default class ModifierMdpUser extends Component<Props> {
  
  constructor(props: any){
    super(props)
  }

  //recuperer les infos dans la base de données et les mettre dans les input correspondant
  state={
    MotDePasseActuel:"",
    NvMotDePasse: "",
         
  }
  reauthenticate = (MotDePasseActuel: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const user = firebase.auth().currentUser;
      if (user && user.email) {
        const cred = firebase.auth.EmailAuthProvider.credential(user.email, MotDePasseActuel);
        user
          .reauthenticateWithCredential(cred)
          .then(() => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(new Error('User or email or password is not defined'));
      }
    });
  };
  

  onChangePasswordPress = () => {
      this.reauthenticate(this.state.MotDePasseActuel).then(()=>{
        const user = firebase.auth().currentUser;
        if(user){
          user.updatePassword(this.state.NvMotDePasse).then(()=>{
            Alert.alert("Mot de passe modifié")
          })
          .catch((error)=>{
            Alert.alert(error.message);
          });
      }
      }).catch((error)=>{
          Alert.alert(error.message);
      })
    
}
 

  render(){
    return (
    
      <View style={styles.container}>

        
            <View style={{flexDirection:'row'}}>
                
              
                <View style={{marginTop:130,alignItems:'center',  width:(width+115)/2}}>
                        
                        <View style={{width:215}}>
                        <Text style={styles.text}>Mot de passe actuel:{'\t'}{'\t'} </Text>
                        </View>
                            <View style={styles.info}>
                              <TextInput style={styles.text2}
                                          secureTextEntry
                                          value= {this.state.MotDePasseActuel}
                                          onChangeText={(text) => {this.setState({MotDePasseActuel: text})}}
                                          placeholder='*******'
                                          />
                            </View>

                            <View style={{width:215}}>
                        <Text style={styles.text}>Nouveau mot de passe:{'\t'}{'\t'} </Text>
                        </View>
                            <View style={styles.info}>
                              <TextInput style={styles.text2}
                                          secureTextEntry
                                          value= {this.state.NvMotDePasse}
                                          onChangeText={(text) => {this.setState({NvMotDePasse: text})}}
                                          placeholder='*******'
                                          />
                            </View>

                        <View style={{width:215}}>
                        <Text style={styles.text}>Confirmation mot de passe: {'\t'} </Text>
                        </View>
                              <View style={styles.info}>
                              <TextInput style={styles.text2}
                                          secureTextEntry
                                  
                                          placeholder='*******'/>
                              </View>

                        <View style= {{alignItems:'center'}}>
                            <Pressable style={styles.button1} onPress={this.onChangePasswordPress}>
                            <Text style={styles.buttontext}> Modifier </Text>
                            </Pressable>
                        </View>

                  </View>

                  <View style={{ height:700, width: width-(width+115)/2}} >

                      <Image style={{width:180, height:600}} source={require('../../assets/feuille.jpg')}/> 

                  </View>
                 
              
              </View>
              
      
      </View>
    );
  }
}

  
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 10,
  
    },

     text:{
      fontSize:17,
      fontWeight:'300',
      
     },
     textmdp:{
      fontSize:17,
      fontWeight:'300',
      textAlign:'center',
      color:'blue',
      textDecorationLine: 'underline',
     },
     text2:{
      fontSize:17,
      color:'rgba(64, 64, 64,0.9)',
      marginLeft:10,
     },
     
     info:{
        borderBottomWidth:1,
        borderColor:'#D3AA35',
        width:240,
        marginBottom:40,
        backgroundColor: '#F9F9F9',
        height:40,
        justifyContent:'center',
        borderRadius:8,
        
     },

     button1:{
      backgroundColor:  '#CDB07D',
      borderRadius:20,
      height: 80,
      width: 190,
      justifyContent:'center',
      elevation:11,
      marginTop:10,
  
    },

    buttontext:{
      textAlign:'center',
      color:'white',
      fontSize:22,    
    },
    
});



