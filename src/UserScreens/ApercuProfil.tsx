import { useState, useEffect } from 'react';
import {  Text, View,StyleSheet, Image} from 'react-native';
import {auth} from '../../firebaseConfig';
import {ADRESSE_IP} from '../../settings'
import { width } from '../styles';



export default function ApercuProfil(props:any) {
  
  const [user,setUser]=useState({
   nom:null,
    prenom: null,
    mail: "",
    numero: ""
  })

  const getUser = ()=>{
      fetch(`http://${ADRESSE_IP}:5000/accueil/utilisateur/menu/apercuProfil/${auth.currentUser?.email}`)
      .then(response=> response.json())
      .then(data=> setUser({
                  nom:data.utilisateur.nom,
                  prenom: data.utilisateur.prenom,
                  mail: data.utilisateur.mail,
                  numero: data.utilisateur.telephone
    })

      ).catch(err=>console.log(err))
  
  }

  useEffect(()=>{
    getUser();
  },[])
  

  return (
   
    <View style={styles.container}>
      
              
              <View style={{ flexDirection:'row'}}>
                 
                  
                <View style={{marginTop:130,alignItems:'center',  width:(width+115)/2}}>
                  
                  
                     <Text style={styles.text}>Nom </Text>
                  <View style={styles.info}><Text style={styles.text2}>{user.nom}</Text></View>
                  
                  <Text style={styles.text}>Prénom </Text>
                  
                  <View style={styles.info}><Text style={styles.text2}>{user.prenom}</Text></View>
                 
                  <Text style={styles.text}>Adresse Mail </Text>
                  <View style={styles.info}><Text style={styles.text2}>{user.mail}</Text></View>
                 
                  <Text style={styles.text}>Numéro de téléphone </Text>
                  
                  <View style={styles.info}><Text style={styles.text2}>{user.numero}</Text></View> 
                  
                 </View>  

                  <View  style={{height:700, width: width-(width+115)/2}} >
                      <Image style={{width:185, height:620, left:10}} source={require('../../assets/feuille.jpg')}/> 
                  </View>

               </View>

               

             
              
                
            
            
     
   </View>
   
  );
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
        textAlign:'center',
        marginBottom:5,
        
       },
       text2:{
        fontSize:17,
        color:'rgba(64, 64, 64,0.9)',
        marginLeft:10,
        fontStyle:'italic'
       },
       
       info:{
          borderBottomWidth:1,
          borderBottomColor:'#D3AA35',
          width:220,
          marginBottom:40,
          backgroundColor: 'rgba(211, 170, 53,0.3)',
          height:40,
          justifyContent:'center',
          borderRadius:8,
          
       },
      
 });
  
  
  
  