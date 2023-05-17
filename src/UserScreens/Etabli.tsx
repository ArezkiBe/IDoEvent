import {useRef} from 'react';
import { Pressable, Text, View, Alert, ScrollView,Image, Animated, StyleSheet, Dimensions} from 'react-native';
import { RouteProp} from '@react-navigation/native';
import React from 'react';
import {auth} from '../../firebaseConfig';
import { ADRESSE_IP } from '../../settings';

interface Props {
  route: RouteProp<{ params: { item: Item } }, 'params'>;
  navigation: any
}

interface Item {
  name: string,
  image:Array<string>,
  address : any,
  email:string,
  phone:string,
  maxCapacity:string,
  description:string,
  theme:Array<string>,

}
const Etabli: React.FC<Props> = ({ route,navigation }) => {
  const { item } = route.params;
  
  const postFavoris=()=>{

    fetch(`http://${ADRESSE_IP}:5000/accueil/utilisateur/etabli/favoris/${route.params.item.email}/${auth.currentUser?.email}`, {

    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    }).then((res: Response)=> {
                  if(res.status!= 401){

                          Alert.alert("",
                        "L'établissement a bien été ajouté aux favoris!",
                        [
                        {
                          text: 'OK',
                          style: 'destructive',
                          onPress: () => {''}     
                          },
                        ]
                        )

                  }
                  else {

                        Alert.alert("",
                      "L'établissement est déjà dans vos favoris!",
                      [
                      {
                        text: 'OK',
                        style: 'destructive',
                        onPress: () => {''}     
                        },
                      ]
                      )
                  }
                  
                }
      )
    }
  
  const scrollX= useRef(new Animated.Value(0)).current;

  return (
    
    <View style={styles.container}>
      <ScrollView >
            <View style={{paddingTop: 15, width:400, marginTop: 5, borderRadius:10}}>
               <View >
                <Text style={styles.name}>{item.name}</Text>
               </View>

               <View  style={styles.cadre} >
                <ScrollView horizontal= {true} 
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled
                            onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],
                              {useNativeDriver: false}
                              )}
                            >
              
                        {item.image.map((imageUri: string)=>{
                          
                          return(
                            imageUri.includes('https') && 
                            <Image key={imageUri} style={styles.images} source={{uri: imageUri}}/>
                             
                          );
                        })}

               </ScrollView>
               <View style={{flexDirection:'row', paddingTop:1}}>
                        {
                          
                          item.image.map((imageUri,imageIndex)=>{
                            
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
                                <Animated.View  key={imageIndex} style={[styles.defilement, {width: widthInd}]}/>
                            );
                          })
                        }
               </View>
               </View>

                <View style={{ margin: 10}}>
               <View style={styles.info}>
                <Text style={styles.text}>Thème </Text>
                {item.theme.length!=0?
               <Text style={styles.entry}>{(item.theme[0])} {item.theme[0] && item.theme[1] || item.theme[0] && item.theme[2] || item.theme[0] && item.theme[3] || item.theme[0] && item.theme[4]? ', ' : ''}
                            {(item.theme[1])} {item.theme[1] && item.theme[2] || item.theme[1] && item.theme[3] || item.theme[1] && item.theme[4] ? ', ' : ''}
                            {(item.theme[2])} {item.theme[2] && item.theme[3] || item.theme[2] && item.theme[4]? ', ' : ''}
                            {(item.theme[3])} {item.theme[3] && item.theme[4]? ', ' : ''}
                            {(item.theme[4])} {'\n'}
                </Text>
                : <Text style={styles.entrynoInfo}>Aucun thème n'a été inscrit{'\n'}</Text>
                  }
               </View>
                 


               <View style={styles.info}>
               <Text style={styles.text}>Description </Text>
               {item.description.length!=0?
                  <Text style={styles.entry}>{item.description}{'\n'}</Text>
                : <Text style={styles.entrynoInfo}>Aucune description{'\n'}</Text>
                }
               </View>

               <View style={styles.info}>
               <Text style={styles.text}>Capacité </Text>
               <Text style={styles.entry}>{item.maxCapacity} personnes{'\n'}</Text>
               </View>

               <View style={styles.info}>
               <Text style={styles.text}>Adresse </Text>
               <Text style={styles.entry}>{item.address.addressNumber} {item.address.addressName}, {item.address.postalCode}{'\n'}</Text>
               </View>

               <View style={{marginBottom:20, alignItems:'center'}}>
               <Text style={styles.text}>Nous contacter </Text>
               <Text style={styles.entry}>{item.email}</Text>
               
               <Text style={styles.phoneText}>{item.phone}</Text>

               </View>
               </View>
                
                
            
            </View>
     </ScrollView>
       <View style={{alignItems:'center',flexDirection:'row'}}>
                <Pressable style={styles.button} onPress={ ()=>navigation.navigate("Reserver",{item})}>
                  <Text>Réserver</Text>
                </Pressable>

                <Pressable style={styles.buttonF} onPress={ ()=>postFavoris()}>
                  <Text>Ajouter aux favoris</Text>
                </Pressable>
                </View>
    </View>
  );
}

const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,     
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
          //marginHorizontal:15,
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

       button:{
        backgroundColor:  '#9FE6A6',
        borderRadius:20,
        height: 60,
        width: 160,
        justifyContent:'center',
        elevation:11,
        marginLeft:8,
        marginBottom:20,
        alignItems:'center',
      },
      
      buttonF:{
        backgroundColor:  '#F0E954',
        borderRadius:20,
        height: 60,
        width: 160,
        justifyContent:'center',
        elevation:11,
        marginLeft:30,
        marginBottom:20,
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
  
  
  
 export default Etabli;