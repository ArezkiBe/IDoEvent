
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useFocusEffect } from '@react-navigation/native';
import { Header } from '@react-navigation/stack';
import React, { useRef, useState, useEffect } from 'react';
import { Pressable, Text, View, TextInput, Alert, ScrollView, TouchableOpacity, Modal,TouchableWithoutFeedback, Animated, BackHandler, ImageBackground} from 'react-native';


import { auth } from '../../firebaseConfig';
import { signOut } from 'firebase/auth';




export default function MenuEtabli(props:any) {

  const handleSignOut = () => {
    auth
    signOut(auth)
    .then (() => {
      props.navigation.navigate("PageConnexionEtab")
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
  return (

    
      <ImageBackground style={{flex: 1}} source={require('../../assets/b1.jpg')}>
      
        <View style={{ flexDirection: 'row',borderBottomWidth:1,paddingBottom:15,borderColor:"rgba(0, 0, 0,0.2)" }}>
        <Pressable  style={{paddingTop:58,paddingLeft:25, width:width/2}}>
              <Ionicons
                name="menu-outline"
                type="ionicon"
                size={30}
                color="black"
                onPress={handleMenuToggle2}
              />
            </Pressable>
          <Pressable style={{paddingTop: 55, alignItems:"flex-end",paddingRight:25, width:width/2}}>
              <Ionicons
                name="person-outline"
                type="ionicon"
                size={30}
                color="black"
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
              backgroundColor: "rgb(201, 149, 105)",
              padding: 10,
              width:170,
              zIndex: 1,
              opacity: 0.8,
              
            }}
          >
            <Pressable onPress={ ()=>props.navigation.navigate("ApercuProfilE")} style={{ height: 60,marginTop:10}}><Text style={{fontSize:20}}>Aperçu Profil</Text></Pressable>
            <Pressable onPress={ ()=>props.navigation.navigate("ModifInfosE")} style={{ height: 60,marginBottom:20}}><Text style={{fontSize:20}}>Modifier mes infos</Text></Pressable>
            <Pressable onPress={ handleSignOut} style={{ marginBottom:10}}><Text style={{fontSize:20}}>Déconnexion</Text></Pressable>
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
              backgroundColor: "rgb(201, 149, 105)",
              padding: 10,
              width:160,
              height:900,
              zIndex: 1,
              opacity: 0.8,
              
            }}
          >
            <Pressable onPress={ ()=>props.navigation.navigate("AproposEtab")} style={{ height: 60,marginTop:10,marginBottom:30,marginLeft:5}}><Text style={{fontSize:20}}>A propos de iDoEvent</Text></Pressable>
            <Pressable onPress={ ()=>props.navigation.navigate("NousContacterEtab")} style={{ height: 50,marginBottom:20,marginLeft:5}}><Text style={{fontSize:20}}>Nous contacter</Text></Pressable>
            <Pressable onPress={ handleSignOut} style={{ marginBottom:10,marginLeft:5}}><Text style={{fontSize:20}}>Déconnexion</Text></Pressable>
          </Animated.View>
        </TouchableWithoutFeedback>
      )}

      <ScrollView style={styles.scroll}>
      
            
            
            <View style={{paddingTop: 15}}>

                


                <Pressable style={styles.button1} onPress={()=>props.navigation.navigate("Calendrier")}>
                      <Text style={styles.buttontext}>
                          Calendrier
                      </Text>
                </Pressable>
            
                <Pressable style={styles.button2} onPress={()=>props.navigation.navigate("Gerer")}>
                
                      <Text style={styles.buttontext}>
                          Gérer mon établissement
                      </Text>
                </Pressable>
                <Pressable style={styles.button3} onPress={()=>props.navigation.navigate("DemandesRes")}>
                
                      <Text style={styles.buttontext}>
                          Consulter mes demandes de réservation
                      </Text>
                </Pressable>
              


            </View>
     </ScrollView>
     </ImageBackground>
    
  );
}
import {StyleSheet, Dimensions } from 'react-native';

const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

const styles = StyleSheet.create({
    
  container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40
      },
    
      button1:{
        backgroundColor:  '#DCBB5E',
        borderRadius:20,
        borderBottomRightRadius: 0,
        height: 100,
        width: 250,
        justifyContent:'center',
        marginTop: 40,
        marginLeft:(width-250)-20,
        marginBottom:40,
        padding: 5,
        elevation:2,
  
      },
      
      button2:{
        backgroundColor:  '#C0A26A',
        borderRadius:20,
        elevation:2,
        borderBottomLeftRadius: 0,
        height: 100,
        width: 250,
        justifyContent:'center',
        marginTop: 40,
        marginLeft: 20,
        marginBottom:40,
        padding: 5
  
      },
      button3:{
        backgroundColor:  '#8BB192',
        borderRadius:20,
        borderBottomRightRadius: 0,
        height: 100,
        width: 330,
        justifyContent:'center',
        marginTop: 40,
        marginLeft:(width-330)-20,
        marginBottom:40,
        padding:5,
        elevation:2,

  
      },
      buttontext:{
        textAlign:'center',
        color:'white',
        fontSize:25,    
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
         width: width ,
         
        },

 });
  
  
  
  