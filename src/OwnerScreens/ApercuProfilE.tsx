import { useState,useEffect, useRef } from 'react';
import {Text, View, Image, ScrollView, Animated, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';
import {auth} from '../../firebaseConfig';
import {height, width} from '../styles'
import {ADRESSE_IP} from '../../settings'


/**
 * Fonction gérant l'affichage de la page
 * @returns affichage de la page 'aperçu du profil'
 */

export default function ApercuProfilE() {
  
  
  const [establishment,setEstablishment]=useState({
    name :null,
    image: [],
    theme: [],
    address: '',
    description: '',
    maxCapacity: '',
    email: auth.currentUser?.email,
    phone: null
  })

  const scrollX= useRef(new Animated.Value(0)).current;
  const[loading, setLoading]= useState(true);

/**
 * Requete get afin de récuperer les informations de l'établissement
 */
  const getEstablishment = ()=>{
      
      fetch(`http://${ADRESSE_IP}:5000/accueil/etablissement/menu/apercuProfil/${auth.currentUser?.email}`)
      .then(response=> response.json())
      .then(data=>  {setEstablishment({
        name:data.etablissement.name,
        theme: data.etablissement.theme,
        image: data.etablissement.image,
        address: data.etablissement.address.addressNumber+" "+data.etablissement.address.addressName+", "+data.etablissement.address.postalCode,
        description: data.etablissement.description,
        maxCapacity: data.etablissement.maxCapacity,
        email: data.etablissement.email,
        phone: data.etablissement.phone
        })
        setLoading(false);
      
      }
      )
      .catch(err=>console.log(err))
  
  }

  useEffect(()=>{
    getEstablishment();
  },[])
  

  return (
    
    <View style={styles.container}>
      <ScrollView >

      { loading &&
      <ActivityIndicator size="large" color="#CEAE51" style={{alignItems:'center', paddingTop:300}}/>
       }  
       {!loading &&
        <View>
        {parseInt(establishment.maxCapacity)==0 ?
             <View style={{alignItems: 'center',margin: 20,width:360 ,marginTop:300}} >
                    <Text style={{fontSize: 20,fontStyle:'italic',fontWeight:'bold', color: '#CEAE51'}}>Votre établissement n'a pas encore</Text>
                    <Text style={{fontSize: 20,fontStyle:'italic',fontWeight:'bold', color: '#CEAE51'}}>été mis en ligne.</Text>
            </View>
         
         :   <View style={{paddingTop: 15, width:400, marginTop: 5, borderRadius:10}}>
               <View>
                <Text style={styles.name}>{establishment.name}</Text>
               </View>
               
               <View  style={styles.cadre} >
                <ScrollView horizontal= {true} 
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled={true} 
                            onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],
                              {useNativeDriver: false}
                              )}
                              scrollEventThrottle={16}
                            >
              
                        {establishment.image.map((imageUri: string, imageIndex)=>{
                          return(
                            imageUri.includes('https') && 
                            <Image  key={imageUri} style={styles.images} source={{uri: imageUri}}/>
                             
                          );
                        })}

               </ScrollView>
               <View style={{flexDirection:'row', paddingTop:1}}>
                        {
                          
                          establishment.image.map((imageUri: string,imageIndex: number)=>{
                            
                            const widthInd= scrollX.interpolate({
                              inputRange:[
                                width *(imageIndex-1),
                                width* (imageIndex),
                                width*(imageIndex+1),
                              ],
                              outputRange: [8, 16, 8],
                              extrapolate: "clamp",
                            })

                            return(
                              imageUri.includes('https') && 
                                <Animated.View key={imageUri} style={[styles.defilement, {width: widthInd}]}/>
                            );
                          })
                        }
               </View>
               </View>
               

                <View style={{ margin: 10}}>
               <View style={styles.info}>
                <Text style={styles.text}>Thème </Text>
                {establishment.theme.length!=0?
               <Text style={styles.entry}>{(establishment.theme[0])} {establishment.theme[0] && establishment.theme[1] || establishment.theme[0] && establishment.theme[2] || establishment.theme[0] && establishment.theme[3] || establishment.theme[0] && establishment.theme[4]? ', ' : ''}
                            {(establishment.theme[1])} {establishment.theme[1] && establishment.theme[2] || establishment.theme[1] && establishment.theme[3] || establishment.theme[1] && establishment.theme[4] ? ', ' : ''}
                            {(establishment.theme[2])} {establishment.theme[2] && establishment.theme[3] || establishment.theme[2] && establishment.theme[4]? ', ' : ''}
                            {(establishment.theme[3])} {establishment.theme[3] && establishment.theme[4]? ', ' : ''}
                            {(establishment.theme[4])} {'\n'}
                </Text>
                : <Text style={styles.entrynoInfo}>Aucun thème n'a été inscrit{'\n'}</Text>
                  }
               </View>
                 


               <View style={styles.info}>
               <Text style={styles.text}>Description </Text>
               {establishment.description.length!=0?
                  <Text style={styles.entry}>{establishment.description}{'\n'}</Text>
                : <Text style={styles.entrynoInfo}>Aucune description{'\n'}</Text>
                }
               </View>

               <View style={styles.info}>
               <Text style={styles.text}>Capacité </Text>
               <Text style={styles.entry}>{establishment.maxCapacity} personnes{'\n'}</Text>
               </View>

               <View style={styles.info}>
               <Text style={styles.text}>Adresse </Text>
               <Text style={styles.entry}>{establishment.address}{'\n'}</Text>
               </View>

               <View style={{marginBottom:20, alignItems:'center'}}>
               <Text style={styles.text}>Nous contacter </Text>
               <Text style={styles.entry}>{establishment.email}</Text>
               
               <Text style={styles.phoneText}>{establishment.phone}</Text>

               </View>
               </View>
                
                
            
            </View>
        }
        </View>
        }
     </ScrollView>
     </View>
  );
}


//=========================
//======STYLES=============
//=========================

const styles = StyleSheet.create({
  container: {flex: 1,
  backgroundColor: 'rgba(251, 238, 174,0.2)',
  alignItems: 'center',
},

 text: {
  fontSize:16, 
  marginBottom:7,
  textAlign:'center',
   width:130,
   borderTopWidth:1,
   borderBottomWidth:1,
  borderColor:'#D3AA35'
 },

 phoneText: {
  borderRadius: 5,
  paddingRight:5,
  width:370,
  paddingLeft:5,
  textAlign:'center'
 },

 entrynoInfo: {

  borderRadius: 5,
  paddingTop: 10,
  paddingRight:5,
  width:370,
  paddingLeft:5,
  textAlign:'center',
  marginBottom: 10,
  fontStyle:'italic',
  color: 'grey'
 },

 entry: {
  borderRadius: 5,
  paddingTop: 10,
  paddingRight:5,
  width:370,
  paddingLeft:5,
  textAlign:'center',
  marginBottom: 10,

 },

 name:{
    fontSize:30,
    alignSelf:'center',
    marginBottom:15,
    fontWeight: '400',
 },

 cadre:{
    width:380,
    alignSelf:'center',
    height:270,
    marginBottom:15,
    alignItems:'center'
 },

 images:{
  width:380,
  height:270,

},


 info:{
    alignItems:'center',
    
 },

 

defilement: {
  width:8,
  height:8,
  borderRadius:4,
  backgroundColor:'#C7E4BE',
   marginHorizontal:5
  }

 });
  
