import React,{Component} from 'react';
import { ImageBackground, StyleSheet, Text, View, Pressable,  Dimensions, Image, StatusBar } from 'react-native';
import{NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import PageConnexionUtil from './src/UserScreens/PageConnexionUtil';
import PageConnexionEtab from './src/OwnerScreens/PageConnexionEtab';
import MenuUtilisateur from './src/UserScreens/MenuUtilisateur';
import InscriptionUser from './src/UserScreens/inscriptionUserScreen';
import InscriptionOwner from './src/OwnerScreens/inscriptionOwnerScreen';
import Favoris from './src/UserScreens/Favoris';
import PageDemandesReservations from './src/UserScreens/DemandesReservation'
import Historique from './src/UserScreens/Historique';
import MenuEtabli from './src/OwnerScreens/MenuEtabli';
import Calendrier from './src/OwnerScreens/Calendrier';
import Gerer from './src/OwnerScreens/Gerer'
import GererModifEtablissement from './src/OwnerScreens/GererModifEtablissement';
import DemandesRes from './src/OwnerScreens/DemandesRes';
import ApercuProfil from './src/UserScreens/ApercuProfil';
import ModifInfos from './src/UserScreens/ModifInfos';
import Apropos from './src/UserScreens/Apropos';
import NousContacter from './src/UserScreens/NousContacter';
import ApercuProfilE from './src/OwnerScreens/ApercuProfilE';
import ModifInfosE from './src/OwnerScreens/ModifInfosE';
import PagesEtabli from './src/UserScreens/PagesEtabli';
import Filtrer from './src/UserScreens/Filtrer';
import Etabli from './src/UserScreens/Etabli';
import Reserver from './src/UserScreens/Reserver';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import ModifierMdpUser from './src/UserScreens/ModifierMdpUser';







//ECRAN DACCUEIL ET STACK

const Accueil=(props: any)=>{
  return(
  
    <ImageBackground style={styles.imgBackground } 
              
       source={require('./assets/fond.jpg')}>
    <View>
      
      
      <Text style={styles.title}>  iDoEvent </Text> 
    <View style={styles.slogan}><Text style={styles.sloganText}>
    Trouvez le lieu idéal 
    pour votre évènement en quelques clics seulement !
    </Text></View>
    <Pressable style={styles.button1} onPress={()=>props.navigation.navigate("PageConnexionEtab")}>
    <Text style={styles.buttontext}>
      Propriétaire
    </Text>
    </Pressable>

    <Pressable style={styles.button2} onPress={()=>props.navigation.navigate("PageConnexionUtil")}>
    <Text style={styles.buttontext}>
      Client
    </Text>
    </Pressable>

    </View>
    </ImageBackground>
  );
}

const queryClient = new QueryClient();

const Stack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Accueil: undefined;
  PageConnexionUtil: undefined;
  InscriptionUser: undefined;
  MenuUtilisateur: undefined;
  Apropos: undefined;
  NousContacter: undefined;
  ApercuProfil: undefined;
  ModifInfos: undefined;
  ModifierMdpUser: undefined;
  
  
  PagesEtabli: {
    type_evenement : String
    distance : Number
    capacite_max : String
    codePostal : String
  };
  Filtrer: undefined;
  Etabli: {
    item : any
  };
  Reserver: undefined;
  Favoris: undefined;
  Historique: undefined;
  PageConnexionEtab: undefined;
  InscriptionOwner: undefined;
  MenuEtabli: undefined;
  AproposEtab: undefined;
  NousContacterEtab: undefined;
  ApercuProfilE: undefined;
  ModifInfosE: undefined;
  Calendrier: undefined;
  name: undefined;
  Gerer: undefined;
  enLigne: undefined;
  Modifier: undefined;
  DemandesRes: undefined;
};

export default class App extends Component {
  render(){
    return (
      
      <QueryClientProvider client = {queryClient}>
        <StatusBar translucent backgroundColor="transparent" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={ {headerBackTitle:'Back',headerTitleAlign:'center'}}>
              
              <Stack.Screen name="Accueil" component={Accueil} options={{headerShown: false}} />
              
              {/*COTE UTILISATEUR*/}
              <Stack.Screen name="PageConnexionUtil" component={PageConnexionUtil} options={{headerStyle:{backgroundColor: '#B6C8D4'},  headerTitle:'Connexion'}}/>
              <Stack.Screen name="InscriptionUser" component={InscriptionUser} options={{headerStyle:{backgroundColor: '#B6C8D4'},  headerTitle:'Inscription'}}/>

              <Stack.Screen name="MenuUtilisateur" component={MenuUtilisateur} options={{ headerShown: false }}/>

              <Stack.Screen name="Apropos" component={Apropos} options={{headerStyle:{backgroundColor: '#5e7cc5'},headerTitle:'À propos'}}/>
              <Stack.Screen name="NousContacter" component={NousContacter} options={{headerStyle:{backgroundColor: '#5e7cc5'},headerTitle:'Nous Contacter'}}/>
              <Stack.Screen name="ApercuProfil" component={ApercuProfil} options={{headerStyle:{backgroundColor: '#5e7cc5'},headerTitle:'Profil',headerTintColor: 'black'}}/>
              <Stack.Screen name="ModifInfos" component={ModifInfos} options={{headerStyle:{backgroundColor: '#5e7cc5'},headerTitle:'Modifier',headerTintColor: 'black'}}/>
              <Stack.Screen name="ModifierMdpUser" component={ModifierMdpUser} options={{headerStyle:{backgroundColor: '#5e7cc5'},headerTitle:'Modifier mot de passe',headerTintColor: 'black'}}/>

              <Stack.Screen name="PagesEtabli" component={PagesEtabli} options={{headerStyle:{backgroundColor: 'rgba(159, 202, 168,0.7)'},headerTitle:'Établissements'}}/>
              <Stack.Screen name="Filtrer" component={Filtrer} options={{headerStyle:{backgroundColor: 'rgba(159, 202, 168,0.7)'}}}/>
              <Stack.Screen name="Etabli" component={Etabli} options={{headerStyle:{backgroundColor: 'rgba(159, 202, 168,0.7)'},headerTitle:'Détails'}}/>
              <Stack.Screen name="Reserver" component={Reserver} options={{headerStyle:{backgroundColor: 'rgba(159, 202, 168,0.7)'},headerTitle:'Réserver'}}/> 
              <Stack.Screen name="Favoris" component={Favoris} options={{headerStyle:{backgroundColor: '#E9A9BC'}}}/>
              <Stack.Screen name="DemandesReservationUser" component={PageDemandesReservations} options={{headerStyle:{backgroundColor: '#E7D07D'}, headerTitle:'Demandes de réservation'}}/>
              <Stack.Screen name="Historique" component={Historique} options={{headerStyle:{backgroundColor: '#A0A2CB'}, headerTitle:'Historique de réservations'}}/>
             
             
             {/*COTE PROPRIETAIRE*/}

              <Stack.Screen name="PageConnexionEtab" component={PageConnexionEtab} options={{headerStyle:{backgroundColor: '#F6D9E2'},  headerTitle:'Connexion'}}/>
              <Stack.Screen name="InscriptionOwner" component={InscriptionOwner} options={{headerStyle:{backgroundColor: '#F6D9E2'},  headerTitle:'Inscription'}}/>

            
              <Stack.Screen name="MenuEtabli" component={MenuEtabli} options={{ headerShown: false }}/>
              
              <Stack.Screen name="AproposEtab" component={Apropos} options={{headerStyle:{backgroundColor: '#D4AA94'},headerTitle:'À propos'}}/>
              <Stack.Screen name="NousContacterEtab" component={NousContacter} options={{headerStyle:{backgroundColor: '#D4AA94'},headerTitle:'Nous Contacter'}}/>
              <Stack.Screen name="ApercuProfilE" component={ApercuProfilE} options={{headerStyle:{backgroundColor: '#D4AA94'},headerTitle:'Profil'}}/>
              <Stack.Screen name="ModifInfosE" component={ModifInfosE} options={{headerStyle:{backgroundColor: '#D4AA94'},headerTitle:'Modifier mot de passe'}}/>
              
              
              <Stack.Screen name="Calendrier" component={Calendrier} options={{headerStyle:{backgroundColor: '#FBE87B'}}}/>
              <Stack.Screen name="Gerer" component={Gerer} options={{headerStyle:{backgroundColor: '#E5CEA5'}, headerTitle: 'Gérer'}}/>
              <Stack.Screen name="enLigne" component={GererModifEtablissement} options={{headerStyle:{backgroundColor: '#E5CEA5'}, headerTitle: 'Mise en ligne'}}/>
              <Stack.Screen name="Modifier" component={GererModifEtablissement} options={{headerStyle:{backgroundColor: '#E5CEA5'}, headerTitle: 'Modification'}}/>
              <Stack.Screen name="DemandesRes" component={DemandesRes} options={{headerStyle:{backgroundColor: '#ACD8BC'},headerTitle: 'Demandes de réservation'}}/>
              

          </Stack.Navigator>
          
        </NavigationContainer>
      </QueryClientProvider>
    )
  }
}


//==============================
//============STYLES============
//==============================

const styles = StyleSheet.create({
  imgBackground:{
    flex:1,
    alignItems:'center',

  },
  
  title:{
    color:'#4A4681',
    fontSize:50,
    paddingTop:150,
    textAlign:'center',

  },

  button1:{
    backgroundColor:'rgba(230, 161, 182, 0.8)',
    borderColor:'#B19E41',
    alignItems:'center',
    borderRadius:20,
    height: 90,
    width: 230,
    paddingTop: 15,
    marginTop:50,
    marginLeft:62,
  },

  button2:{
    backgroundColor:'rgba(187, 196, 219, 0.8)',
    borderRadius:20,
    height:90,
    width: 230,
    paddingTop: 15,
    marginTop:30,
    marginLeft:62,
    borderColor:'#4C9E5E',
  },

  buttontext:{
    textAlign:'center',
    padding: 10,
    textTransform: 'uppercase',
    fontSize:25,    
    color:'#FFFFFF',
    

  },
  slogan:{
    backgroundColor: 'rgba(255,255,255,0.5)',
    height:150,
    width:350,
    marginTop:25,
    borderRadius:20,
    borderBottomLeftRadius: 0,
  },
  sloganText:{
    color: 'rgba(0,0,0,0.5)',
    fontSize:20,
    textAlign:'center',
    marginTop:40,
  }
  
});
