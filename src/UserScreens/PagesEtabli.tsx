import React, { useState, useEffect } from 'react';
import { Image, Pressable, Text, View, TextInput, Alert, ScrollView, ActivityIndicator,StyleSheet, Dimensions} from 'react-native';
import * as Location from 'expo-location'
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FlatList } from 'react-native-gesture-handler';
import { UseGetAllEtablissements } from './hooks/getAllEtabllissementsQuery';
import { RootStackParamList } from '../../App';
import {width} from '../styles';


type Props = NativeStackScreenProps<RootStackParamList, "PagesEtabli">;

export default function PagesEtabli({route, navigation} : Props) {

  const [longitude,setLongitude] = useState (Number)
  const [latitude,setLatitude] = useState (Number)
  const [longitude2,setLongitude2] = useState (Number)
  const [latitude2,setLatitude2] = useState (Number)
  
  let foregroundSubscription :any = null
  
  const{data, isLoading, refetch}= UseGetAllEtablissements(latitude2? latitude2 : 48.855530, longitude2? longitude2 : 2.331290, route.params.distance, route.params.type_evenement, route.params.capacite_max, route.params.codePostal);

  useEffect(() => {   
    const requestPermissions = async () => {
      let foreground = await Location.requestForegroundPermissionsAsync();
      if (!foreground.granted) {
        console.log("Please grant location permissions");
        return;
      }
    }
    requestPermissions()
    startForegroundUpdate()    
  }, []) 

  const startForegroundUpdate = async () => {
    let a = 0;
    const { granted } = await Location.getForegroundPermissionsAsync()
    if (!granted) {
      console.log("location tracking denied")
      return
    }

    foregroundSubscription?.remove()

    foregroundSubscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        timeInterval : 1000,
      },
      location => {
        
        setLatitude(location.coords.latitude)
        setLongitude(location.coords.longitude)
        if (a==0){
          setLatitude2(location.coords.latitude)
          setLongitude2(location.coords.longitude)
          a = a+1
        }
      }
    )
  }


  return (
    
    <View style={styles.container}>
      
            <View style={{flexDirection:'row',paddingBottom:5}}>
             <Pressable onPress={ ()=>navigation.navigate("Filtrer")}>
                <View style={{backgroundColor:"rgba(101, 199, 91,0.6)", width: 80,height:40, borderRadius:10, alignItems:"center",marginLeft:10}}><Text style={{fontSize:20,marginTop:5}}> Filtrer</Text></View> 
            </Pressable>
            <Pressable onPress={() => {refetch(), setLatitude2(latitude), setLongitude2(longitude)} }>
                <View style={{backgroundColor:"rgba(101, 199, 91,0.6)", width: 200,height:40, borderRadius:10, alignItems:"center",marginLeft:15}}><Text style={{fontSize:20,marginTop:5}}> Rafraichir la page</Text></View>
                
            </Pressable>
            
            </View>

            <View style={{alignItems:'center', paddingTop: 5, marginBottom:30}}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#C7E4BE" style={{alignItems:'center', paddingTop:300}}/>
            ) : !latitude ? (
              <ActivityIndicator size="large" color="#C7E4BE" style={{alignItems:'center', paddingTop:300}}/>
            ) :data ? (
              data.length== 0 ? (
                <View style={{alignItems: 'center',margin: 20,width:360 ,marginTop:300}} >
                <Text style={{fontSize: 20,fontStyle:'italic',fontWeight:'bold', color: '#CEAE51'}}>Aucun résultat.</Text>
                </View>
              ) : (
              <FlatList data={data} renderItem = {({ item }) => ( 
                <View>
                    <Pressable onPress={ ()=>navigation.navigate("Etabli",{item})}>
                      <View style={styles.item}>
                        
                        <View>
                           <Text style={styles.nomEtabli}>{(item.name)}</Text>
                        </View>
                        <View style={styles.image}>
                          {item.image[0].length?
                            <Image style={styles.imagee} source={{uri: (item.image[0])}} />
                            : (item.image[1].length ?
                              <Image style={styles.imagee} source={{uri: (item.image[1])}} />
                              : item.image[2].length ?
                              <Image style={styles.imagee} source={{uri: (item.image[2])}} />
                              : item.image[3].length?
                              <Image style={styles.imagee} source={{uri: (item.image[3])}} />
                              :
                              <Image style={styles.imagee} source={require('../../assets/default.png')} />
                              )
                          }
                          
                        </View>

                        <View style={styles.viewChamps}>

                                  <View style={styles.viewTitle}>
                                  <Text style={styles.title}>Type d'évènement: </Text>
                                  </View>

                                  <View style={styles.viewInfos}>
                                    <Text style={styles.infos}>
                                  {(item.theme[0])}{item.theme[0] && item.theme[1] || item.theme[0] && item.theme[2] || item.theme[0] && item.theme[3] || item.theme[0] && item.theme[4]? ', ' : ''}
                                  {(item.theme[1])}{item.theme[1] && item.theme[2] || item.theme[1] && item.theme[3] || item.theme[1] && item.theme[4] ? ', ' : ''}
                                  {(item.theme[2])}{item.theme[2] && item.theme[3] || item.theme[2] && item.theme[4]? ', ' : ''}
                                  {(item.theme[3])}{item.theme[3] && item.theme[4]? ', ' : ''}
                                  {(item.theme[4])} 
                                  </Text>
                                  </View>
                               
                        </View>

                        <View style={styles.viewChamps}>

                                  <View style={styles.viewTitle}>
                                  <Text style={styles.title}>Distance: </Text>
                                  </View>

                                  <View style={styles.viewInfos}>
                                    <Text style={styles.infos}>
                                        {(item.distance)} mètres
                                    </Text>
                                  </View>
                               
                        </View>

                      </View>
                    </Pressable>
                           
                </View>
                       
                    )}
                  keyExtractor={(item, id) => id.toString()}
                  ItemSeparatorComponent={() => <View style={{margin: 6}}/>}
                  extraData = {data}
                />
            )) : (
              <Text>Une erreur est survenue.</Text>
            )}
            </View>

 

     </View>
    
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEFEF',
        paddingTop: 20,
        paddingBottom: 40
    
      },
      scroll: {
        width: width,        
       },
       item: {
        backgroundColor: 'rgba(251, 238, 174,0.6)',
        paddingTop: 20,
        width:width-30,
        borderRadius: 8,
        alignItems:'center',
        borderWidth:0.5,
        borderColor:"lightgrey"
      },
      title: {
        fontSize: 15,
        marginTop:5,
        fontStyle:'italic'
        
      },
      nomEtabli: {
        fontSize: 30,
        marginBottom:10,
      
      },
      image:{
        height:180,
        width:180,
        borderWidth:1,
        borderRadius:15,
        borderColor:'#D6E7C6',
        alignItems:'center',
      },

      imagee:{
        width:180,
        height:180,
        borderColor:'lightgrey',
        borderWidth: 1,
        borderRadius:15,
        
      },

      view2: {
        width: width-50,
        paddingBottom:5,
        paddingLeft:5,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5
      },

      viewTitle: {
        width:160,
         paddingBottom:5,
         paddingTop:5
      },
  
      viewInfos: {
        width: width-205,
         paddingTop:5,
        
      },
  
      infos: {
        fontSize: 15,
        marginTop:5,
        
      },

      viewChamps:{
        width: width-48,
        flexDirection:'row',
        marginBottom:8,
      },
 });
  
  
  


  
