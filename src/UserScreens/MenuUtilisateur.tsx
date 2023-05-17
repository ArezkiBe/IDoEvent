
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View, Alert, ScrollView,TouchableWithoutFeedback, Animated, BackHandler, ImageBackground} from 'react-native';
import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function MenuUtilisateur(props:any) {

  const handleSignOut = () => {
    auth
    signOut(auth)
    .then (() => {
      props.navigation.navigate("PageConnexionUtil")
    })
    .catch (e => e.message)
  }

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMenuVisible2, setIsMenuVisible2] = useState(false);
  const menuOpacity = useRef(new Animated.Value(0)).current;
  
  const handleMenuToggle = () => {
    setIsMenuVisible(!isMenuVisible);
    if(isMenuVisible2){
      setIsMenuVisible2(!isMenuVisible2);
    }
    Animated.timing(menuOpacity, {
      toValue: isMenuVisible ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };
  const handleMenuToggle2 = () => {
    setIsMenuVisible2(!isMenuVisible2);
    if(isMenuVisible){
      setIsMenuVisible(!isMenuVisible);
    }
    Animated.timing(menuOpacity, {
      toValue: isMenuVisible2 ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };



  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
          return true;
      }
  
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [props.navigation])
  );

  useEffect(()=>{

          props.navigation.addListener('beforeRemove', (e: any) => {            //bouton back
      
            e.preventDefault();

            Alert.alert(
              'Déconnexion',
              "Etes-vous sûrs de vouloir vous déconnecter ?",
              [

                { text: "Non", style: 'cancel', onPress: () => {}},
                {
                  text: 'Oui',
                  style: 'destructive',
                  onPress: () => props.navigation.dispatch(e.data.action),
                },
              ]
            );
          }),
          [props.navigation]



  },[])


  /*useEffect(() => {
    const user = auth.currentUser;
    const token = user?.getIdTokenResult();
    console.log(token)
  })*/

  return (
    <ImageBackground style={{flex: 1}} source={require('../../assets/blue2.jpeg')}>
   
       <View style={{ flexDirection: 'row',borderBottomWidth:1,paddingBottom:15,borderColor:"rgba(0, 0, 0,0.2)" }}>
         <Pressable style={{paddingTop:58,paddingLeft:25, width:width/2}}>
              <Ionicons
                name="menu-outline"
                type="ionicon"
                size={30}
                color="white"
                onPress={handleMenuToggle2}
              />
            </Pressable>
          <Pressable style={{paddingTop: 55, alignItems:"flex-end",paddingRight:25, width:width/2}}>
              <Ionicons
                name="person-outline"
                type="ionicon"
                size={30}
                color="white"
                onPress={handleMenuToggle}
              />
            </Pressable>
        </View>  
    
        {isMenuVisible && (
        <TouchableWithoutFeedback onPress={handleMenuToggle}>
          <Animated.View
            style={{
              position: 'absolute',
              top: 107,
              right: 0,
              backgroundColor: "#5e7cc5",
              padding: 10,
              width:170,
              zIndex: 1,
              opacity: 0.9,
              
            }}
          >
            <Pressable onPress={ ()=>props.navigation.navigate("ApercuProfil")} style={{ height: 60,marginTop:10}}><Text style={{fontSize:20, color:'white'}}>Aperçu Profil</Text></Pressable>
            <Pressable onPress={ ()=>props.navigation.navigate("ModifInfos")} style={{ height: 60,marginBottom:20}}><Text style={{fontSize:20, color:'white'}}>Modifier mes infos</Text></Pressable>
            <Pressable onPress={handleSignOut}style={{ marginBottom:10}}><Text style={{fontSize:20, color:'white'}}>Déconnexion</Text></Pressable>
          </Animated.View>
        </TouchableWithoutFeedback>
         )}
        {isMenuVisible2 && (
        <TouchableWithoutFeedback onPress={handleMenuToggle2}>
          <Animated.View
            style={{
              position: 'absolute',
              top: 107,
              left: 0,
              backgroundColor: "#5e7cc5",
              padding: 10,
              width:160,
              height:900,
              zIndex: 1,
              opacity: 0.8,
              
            }}
          >
            <Pressable onPress={ ()=>props.navigation.navigate("Apropos")} style={{ height: 60,marginTop:10,marginBottom:30,marginLeft:5}}><Text style={{fontSize:20, color:'white'}}>A propos de iDoEvent</Text></Pressable>
            <Pressable onPress={ ()=>props.navigation.navigate("NousContacter")} style={{ height: 50,marginBottom:20,marginLeft:5}}><Text style={{fontSize:20, color:'white'}}>Nous contacter</Text></Pressable>
            <Pressable onPress={ handleSignOut} style={{ marginBottom:10,marginLeft:5}}><Text style={{fontSize:20, color:'white'}}>Déconnexion</Text></Pressable>
          </Animated.View>
        </TouchableWithoutFeedback>
        )}
      <ScrollView style={styles.scroll}>
      
          
            <View style={{paddingTop: 15}}>

              <View style={{flexDirection:'row-reverse'}}>

                <Pressable style={styles.button1} onPress={ ()=>props.navigation.navigate("PagesEtabli",{
                  distance : 5,
                  type_evenement : "aucun",
                  capacite_max : "0",
                  codePostal : "0"

                })}>
                      <Text style={styles.buttontext}>
                          Nouvelle Réservation
                      </Text>
                </Pressable>
              
              </View>

              <View>
            
                <Pressable style={styles.button2} onPress={ ()=>props.navigation.navigate("Favoris")}>
                
                      <Text style={styles.buttontext}>
                          Lieux Favoris
                      </Text>
                </Pressable>

              </View>

              <View style={{flexDirection:'row-reverse'}}>
                <Pressable style={styles.button3} onPress={ ()=>props.navigation.navigate("DemandesReservationUser")}>
                
                      <Text style={styles.buttontext}>
                          Demandes de réservation
                      </Text>
                </Pressable>

              </View>

              <View>
                <Pressable style={styles.button4} onPress={ ()=>props.navigation.navigate("Historique")}>
                
                      <Text style={styles.buttontext}>
                          Historique de réservations
                      </Text>
                </Pressable>
              </View>


            </View>
     </ScrollView>
    </ImageBackground>
  );
}
import {StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import Favoris from './Favoris';

const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    
      },
    
      button1:{
        backgroundColor:  'rgba(159, 202, 168,0.7)',
        borderRadius:20,
        
        borderBottomRightRadius: 0,
        height: 100,
        width: 250,
        justifyContent:'center',
        marginTop: 25,
        marginLeft:130,
        marginBottom:40,
        padding: 5
  
      },
      
      
      button2:{
        backgroundColor:'#E9A9BC',
        borderRadius:20,
        borderBottomLeftRadius: 0,
        height: 100,
        width: 250,
        justifyContent:'center',
        marginTop: 30,
        marginLeft: 30,
        marginBottom:40,
        padding: 5
      },
      button3:{
        backgroundColor:  '#E7D07D',
        borderRadius:20,
        
        borderBottomRightRadius: 0,
        height: 100,
        width: 250,
        justifyContent:'center',
        marginTop: 30,
        marginLeft:130,
        marginBottom:40,
        padding: 5
      },

      button4:{
        backgroundColor:  '#A0A2CB',
        borderRadius:20,
       
        borderBottomLeftRadius: 0,
        height: 100,
        width: 250,
        justifyContent:'center',
        marginTop: 30,
        marginLeft:30,
        marginBottom:40,
        alignItems:'center',
        padding: 5
        
        
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
       
 });
