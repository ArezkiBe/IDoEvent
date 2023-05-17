import { useState } from 'react';
import { Pressable, Text, View, TextInput, Alert, ScrollView, Image, ActivityIndicator} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../../firebaseConfig';
import {ADRESSE_IP} from '../../settings'


export default function PageConnexionEtab(props: any) {

  
  const [mail, setMail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const [passwordVisible, setPassWordVisible] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [onClick, setOnClick] = useState(false);

  const validation=()=>{
    if(mail.length==0 || motDePasse.length==0){
      setMessageError("Le champ adresse mail ou mot de passe est vide.");
      setOnClick(false);
      return false;
    }
    else{
      return true;
    }
   
  }

  return (
    
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
      
           <Text style={{fontSize: 30}}>    </Text>
            <View style={{paddingTop: 15}}>


                <Text style={styles.text}>Mail :</Text>
                <TextInput style={styles.input}
                          keyboardType= 'email-address'
                          placeholder='Rene.Descartes@gmail.com'
                          value= {mail}
                          onChangeText={text => setMail(text)}
                />


                <Text style={styles.text}>Mot de passe :</Text>
                
                <View style={{flexDirection:'row'}}>
                <TextInput style={styles.input}
                          secureTextEntry={passwordVisible ? false :true}
                          placeholder='*******'
                          value= {motDePasse}
                          onChangeText={text => setMotDePasse(text)}
                />
                 <Pressable style={{right:40,top:20, height:28}} onPress={()=> setPassWordVisible(!passwordVisible)}>
                           {passwordVisible ?
                             <Entypo name="eye" size={23} color="black" />
                           : <Entypo name="eye-with-line" size={23} color="black" />
                           
                            }
                    </Pressable>
                  </View>

                  <Text style={styles.textError}>{messageError}</Text>

                <Pressable style={styles.button1} disabled={onClick ? true : false} onPress={()=>
                    { setOnClick(true);
                      if(validation()){
                          auth;
                          signInWithEmailAndPassword(auth, mail, motDePasse)
                          .then(userCredentials => {
                            const user = auth.currentUser;
                            if (user !== null) {
                              const requestOptions = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email : mail.toLowerCase() })
                              };
  
  
                              fetch(`http://${ADRESSE_IP}:5000/accueil/connexion/etablissement`, requestOptions)
                                .then(response => response.json())
                                .then(data => {
                                  if (data.data === false) {
                                    setMessageError('Ce compte est un compte utilisateur, veuillez changer de page');
                                  } else {
                                    props.navigation.navigate("MenuEtabli");
                                    setMail("");
                                    setMotDePasse("");
                                    setMessageError("");
                                    setPassWordVisible(false);
                                    
                                  }
                                  setOnClick(false);
                                })
                                .catch(e => console.log(e))
                            }
                          })
                          .catch(error => {
                            setMessageError('Le mail ou/et le mot de passe est incorrect.');
                            setOnClick(false);

                          })
                          .finally(() => {
                            const user = auth.currentUser;
                            const token = user?.getIdToken();
                            
                          })

                      }


                    }}>

                      {
                        onClick && 
                        <ActivityIndicator size="large" color="white" style={{alignItems:'center'}}/>
                      }

                      {                      
                        !onClick &&
                        <Text style={styles.buttontext}>
                                Se connecter
                        </Text>
                      }

                </Pressable>
                <View style={styles.ensemble}>
                        <Text style={{ fontSize: 20, color: 'black', textAlign:'center'}}>Pas encore inscrit?</Text>
                        
                        <Pressable style={styles.button2} onPress={()=>{setMessageError('');
                                                                        setPassWordVisible(false);
                                                                        props.navigation.navigate("InscriptionOwner")}}>
                        
                              <Text style={styles.buttontext}>
                                  Inscription
                              </Text>
                        </Pressable>

                </View>




            </View>
     </ScrollView>
    </View>
  );
}
import {StyleSheet, Dimensions } from 'react-native';
import React from 'react';

const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
      },
    
      button1:{
        backgroundColor:  '#D6A9B7',
        borderRadius:20,
        borderColor:'#6297BB',
        
        height: 80,
        width: 230,
        justifyContent:'center',
        marginTop: 40,
        left: (width/2) - (230/2),
        elevation:11,
        marginBottom:40
  
      },
      
      button2:{
        backgroundColor:  '#6297BB',
        borderRadius:20,
        borderColor:'#6297BB',
        borderWidth:1,
        height: 80,
        width: 230,
        justifyContent:'center',
        marginTop: 20,
        elevation:11,
        marginBottom:20
  
      },
      buttontext:{
        textAlign:'center',
        color:'white',
        fontSize:28,    
      },
      text:{
          marginTop: 10,
          paddingLeft: 13
      },

      textError:{
        marginTop: 5,
        paddingLeft: 13,
        color: '#C13F3F',
        fontStyle:'italic'
    },
      input: {
          height: 40,
          width: width-50,
          margin: 12,
          borderTopWidth: 0,
          borderRightWidth: 0,
          borderLeftWidth: 0,
          borderWidth: 1,
          padding: 10,
          
        },
  
        scroll: {
         width: width - 15,
         
        },

        ensemble:{
          backgroundColor: 'rgba(246, 217, 226, 0.2)' ,
          marginTop:70,
          width: 280,
          height:200,
          borderRadius: 25,
          alignItems:'center',
          paddingTop:20,
          left: (width/2) - (289/2),
        

          textAlign:'center',        
          borderColor:'white',
          borderStyle:'solid',
          borderWidth: 1,
        }
 });
  
  
  
  