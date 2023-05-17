import { useState } from 'react';
import { Image, Text, View, TextInput, Alert, ScrollView,ImageBackground} from 'react-native';




export default function Apropos(props:any) {
  
  return (
    
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        
            <View>
            <ImageBackground style={{marginTop: 10,marginLeft: 30,width:165, height:100}}source={require('../../assets/model.webp')}>
            
            <View style={{marginLeft:75, marginTop:20, width:200}}>
                  <Text style={{fontSize:18, color:'#D3AA35', fontWeight:'bold'}}> 
                  Qui somme-nous ?{'\n'}{'\n'}
                  </Text>

            </View>
            
             </ImageBackground> 
             <View style={styles.caseinfo}>
             <Text  style={styles.info} > 
            

               Nous somme des étudiants en troisième année en Licence Informatique et Applications à l'université de Paris Cité. 
               Nous sommes une équipe composée de quatre développeurs: BIRABOURAME Hemavathi, RAMOUL Racha, BEGGAR Arezki et BOUAKI Sani Jean Arthur.
               
               
             </Text>
             </View>



             <ImageBackground style={{marginTop: 10, marginLeft: 30,width:165, height:100}}source={require('../../assets/model.webp')}>
            
                  <View style={{marginLeft:75, marginTop:10, width:200}}>
                        <Text style={{fontSize:18, color:'#D3AA35', fontWeight:'bold'}}> 
                        Pourquoi l'application iDoEvent ?{'\n'}{'\n'}
                        </Text>

                  </View>
            
             </ImageBackground> 
             <View style={styles.caseinfo}>
               <Text style={styles.info}>
               
                En dehors des travaux pratiques, nous devions réaliser un projet de programmation en groupe dans le but d'approfondir nos compétences en développement.
                Le projet qui nous a été assigné est donc iDoEvent, une application mobile pour android et iOS.
               </Text>
             </View>


             <ImageBackground style={{marginTop: 10, marginLeft: 30,width:165, height:100}}source={require('../../assets/model.webp')}>
            
                <View style={{marginLeft:75, marginTop:10, width:200}}>
                      <Text style={{fontSize:18, color:'#D3AA35', fontWeight:'bold'}}> 
                      Quel est le but de l'application ?{'\n'}{'\n'}
                      </Text>

                </View>
            
             </ImageBackground> 
             <View style={styles.caseinfodernier}>
             <Text style={styles.info}>
                  iDoEvent est une application de réservation d'établissements pour différents événements. 
                  Elle permet aux propriétaires de rendre visible leurs établissements et de faciliter la réservation de ces derniers.
                  De cette manière, les clients à la recherche d'un endroit pour organiser un événements pourront facilement chercher et réserver en quelques clics.
              </Text>
              </View>
            
            </View>
     </ScrollView>
    </View>
  );
}


import {StyleSheet, Dimensions } from 'react-native';
import { BackgroundImage } from 'react-native-elements/dist/config';

const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(251, 238, 174,0.3)',
    
      },
      scroll: {
        width: width - 15,
        
       },

       info:{
        fontSize:15,
        
        },
      caseinfo: {
        marginLeft:20,
        backgroundColor: 'white',
        borderRadius:15, 
        padding: 15
      },
      caseinfodernier: {
        
        marginLeft:20,
        backgroundColor: 'white',
        borderRadius:15, 
        padding: 15,
        marginBottom:60,
      },
      infodernier:{
        fontSize:15,
        margin: 12,
        marginLeft:20,
        backgroundColor: 'white',
        borderRadius:15, 
        padding: 15,
        marginBottom:100,
        },

        view:{
          backgroundColor: 'rgba(251, 238, 174,0.1)',

          },
    
      
 });
  
  
  
  