import {  View, Text,  Pressable, Alert,  ImageBackground, ActivityIndicator} from 'react-native';

import React,{ useState, useEffect } from 'react';
import {stylesDemandeReservation, width} from '../styles';
import { AntDesign,MaterialIcons } from '@expo/vector-icons';

import {ADRESSE_IP} from '../../settings';
import {auth} from '../../firebaseConfig';
import {FlatList} from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';



export default function PageDemandesReservations(props:any) {
  
  interface Reservation{
    id: String,
    nomEtab: String,
    mailEtab: String,
    numeroEtab: String,
    adresseEtab: String,
    jour: Number,
    mois: Number,
    annee: Number,
    hDebut: String,
    hFin: String,
    nbPersonnes: Number,
    status: String,
    message: String,
    theme: String
  }

  const[reservation, setReservation ] = useState<Reservation[]>([]);
  const[reservationEnAttente, setReservationEnAttente]= useState<Reservation[]>([]);
  const[reservationAccepte, setReservationAccepte]= useState<Reservation[]>([]);
  const[loading, setLoading]= useState(true);
  const[statut, setStatut] = useState(props.route.params? props.route.params.statut : [true,true] ); //statut[0]= en attente && statut[1]= accepté
  

  useEffect(() => {
      getReservations(), 2000
  }, []);


    const reserv =()=>{
    if(statut[0] && statut[1]){
      return reservation;
    }
    else if(statut[0]){
      return reservationEnAttente;
    }
    else if(statut[1]){
      return reservationAccepte;
    }
    else{
      return [];
    }
  }



  const getReservations =()=>{
    fetch(`http://${ADRESSE_IP}:5000/accueil/utilisateur/demandesReservation/${auth.currentUser?.email}`)
    .then(response=> response.json())
    .then(data=> {

      const reservation_tmp_enAttente : Reservation[]= [];
      const reservation_tmp_accepte : Reservation[]= [];

      for(let i=0; i<data.reservation.length;i++){
        
                let reserv : Reservation;
                reserv={
                  id: data.reservation[i]._id,
                  nomEtab: data.reservation[i].etablissement.nomEtablissement,
                  mailEtab: data.reservation[i].etablissement.mailEtablissement,
                  numeroEtab: data.reservation[i].etablissement.numeroEtablissement,
                  adresseEtab: data.reservation[i].etablissement.adresseEtablissement,
                  jour:  data.reservation[i].date[0],
                  mois: data.reservation[i].date[1],
                  annee:  data.reservation[i].date[2],
                  hDebut: data.reservation[i].horaireDebut,
                  hFin: data.reservation[i].horaireFin,
                  nbPersonnes: data.reservation[i].nbPersonnes,
                  status: data.reservation[i].status,
                  message: data.reservation[i].message,
                  theme: data.reservation[i].theme
                  
                }; 
                  
                if(reserv.status=='en attente'){
                      reservation_tmp_enAttente.push(reserv);
                   }
                   else{
                      reservation_tmp_accepte.push(reserv);
                   }
                    
        }
       let reservation_tmp=reservation_tmp_enAttente.concat(reservation_tmp_accepte);
        setReservation(reservation_tmp);
        setReservationEnAttente(reservation_tmp_enAttente);
        setReservationAccepte(reservation_tmp_accepte);
      
        setLoading(false);

               
      
      } 
    )
    .catch(err=>console.log(err))

  }

  const cancelReservation =(id: String)=>{
    Alert.alert(
      'Confirmation',
      "Annuler la réservation...",
      [

        { text: "Non", style: 'cancel', onPress: () => {}},
        {
          text: 'Oui',
          style: 'destructive',
          onPress: () => {
                        fetch(`http://${ADRESSE_IP}:5000/accueil/utilisateur/demandesReservation/cancel/${id}`,{
                          method: 'DELETE',
                        })
                        .catch(err=>console.log(err));
                        props.navigation.goBack();
                        props.navigation.navigate("DemandesReservationUser",{statut: statut});
                       
                        
          },
        },
      ]
    );
  }


  return (
    <View style={stylesDemandeReservation.container}>

    <View style={{flexDirection:'row',height:40,alignItems:'center',paddingLeft:100, backgroundColor:'white'}}>
          <Checkbox 
                  style={{}} 
                  value={statut[0]} 
                  onValueChange={() => setStatut([!statut[0],statut[1] ])}
                  color={statut[0] ? 'grey' : undefined}
                  
          />

          <Text> en attente </Text>

          <Checkbox 
                  style={{marginLeft:20}} 
                  value={statut[1]} 
                  onValueChange={() => setStatut([statut[0],!statut[1] ])}
                  color={statut[1] ? 'grey' : undefined}
  
          />

          <Text> accepté </Text>

       </View>


      <View style={{paddingTop: 15, paddingBottom:40}}>
       
       { loading &&
      <ActivityIndicator size="large" color="#CDBFF5" style={{alignItems:'center', paddingTop:300}}/>
       }

       {  (statut[0] || statut[1]) && 
          <FlatList data={reserv()} renderItem = {({item}) => ( 
                
                        
                    <View style={stylesDemandeReservation.item}>
                        <View >
                            <View>
                            <Pressable onPress={()=>cancelReservation(item.id)} style={{margin: 2,flexDirection:'row-reverse'}}> 
                                <Text>
                                <MaterialIcons name="cancel" size={30} color="#C13F3F" /> 
                                </Text>
                            </Pressable>
                            
                            <Text style={stylesDemandeReservation.nomEtabli}>
                              
                            {item.status== "en attente" ? 
                              <MaterialIcons name="timer" size={24} color="#FDBE13" />
                            :  <AntDesign name="checkcircle" size={20} color="green" />
                           
                            }
                              {'\t'} {item.nomEtab}
                            </Text>
                              
                            </View>

        
                              
                            <View style={stylesDemandeReservation.view}>    

                            <View style={stylesDemandeReservation.viewChamps}>
                               
                                  <View style={stylesDemandeReservation.viewTitle}>
                                  <Text style={stylesDemandeReservation.title}>Mail:</Text>
                                  </View>

                                  <View style={stylesDemandeReservation.viewInfos}>
                                  <Text style={stylesDemandeReservation.infos}>{(item.mailEtab)}</Text>
                                  </View>
                               
                                
                                
                            </View>

                            <View style={stylesDemandeReservation.viewChamps}>

                                  <View style={stylesDemandeReservation.viewTitle}>
                                  <Text style={stylesDemandeReservation.title}>Numero:</Text>
                                  </View>

                                  <View style={stylesDemandeReservation.viewInfos}>
                                  <Text style={stylesDemandeReservation.infos}>{(item.numeroEtab)}</Text>
                                  </View>
                               
                            </View>

                              <View style={stylesDemandeReservation.viewChamps}>

                                <View style={stylesDemandeReservation.viewTitle}>
                                  <Text style={stylesDemandeReservation.title}>Adresse:</Text>
                                </View>

                                  <View style={stylesDemandeReservation.viewInfos}>
                                  <Text style={stylesDemandeReservation.infos}>{(item.adresseEtab)}</Text>
                                  </View>
                                
                              </View>

                              <View style={stylesDemandeReservation.viewChamps}>

                              <View style={stylesDemandeReservation.viewTitle}>
                                  <Text style={stylesDemandeReservation.title}>Date:</Text>
                                </View>

                                  <View style={stylesDemandeReservation.viewInfos}>
                                  <Text style={stylesDemandeReservation.infos}>{(item.jour.toString())}/{(item.mois.toString())}/{(item.annee.toString())}</Text>
                                  </View>
                              
                              </View>

                              <View style={stylesDemandeReservation.viewChamps}>

                              <View style={stylesDemandeReservation.viewTitle}>
                                  <Text style={stylesDemandeReservation.title}>Heure:</Text>
                                </View>

                                  <View style={stylesDemandeReservation.viewInfos}>
                                  <Text style={stylesDemandeReservation.infos}>{(item.hDebut)} - {(item.hFin)}</Text>
                                  </View>
                              
                              </View>

                              <View style={stylesDemandeReservation.viewChamps}>

                                  <View style={stylesDemandeReservation.viewTitle}>
                                  <Text style={stylesDemandeReservation.title}>Thème:</Text>
                                  </View>

                                  <View style={stylesDemandeReservation.viewInfos}>
                                  <Text style={stylesDemandeReservation.infos}>{(item.theme)}</Text>
                                  </View>
                               
                            </View>

                              <View style={stylesDemandeReservation.viewChamps}>

                                <View style={stylesDemandeReservation.viewTitle}>
                                  <Text style={stylesDemandeReservation.title}>Personnes:</Text>
                                </View>

                                <View style={stylesDemandeReservation.viewInfos}>
                                  <Text style={stylesDemandeReservation.infos}>{(item.nbPersonnes.toString())}</Text>
                                </View>
                              
                              </View>

                              <View style={stylesDemandeReservation.viewChamps}>

                                <View style={stylesDemandeReservation.viewTitle}>
                                  <Text style={stylesDemandeReservation.title}>Statut:</Text>
                                </View>

                                <View style={stylesDemandeReservation.viewInfos}>
                                  <Text style={stylesDemandeReservation.infos}>{(item.status)}</Text>
                                </View>
                      
                              </View>
                            </View>

                            <View style={stylesDemandeReservation.view2}>    
                              <Text style={stylesDemandeReservation.title}>Commentaire: {(item.message)}</Text>
                            </View> 
                            
                      </View>
                    
                    </View>
                              
                
                          
                        )}

                        
                        ItemSeparatorComponent={() => <View style={{margin: 6}}/>}
          />
              
              }

{
        !loading && reservation.length==0 && 
                <View style={{borderRadius:10,alignItems: 'center',margin: 20,height:100,width:360 ,paddingTop:18  ,marginTop:270}} >
                        <Text style={{fontSize: 20,fontStyle:'italic',fontWeight:'bold', color: '#CEAE51'}}>Aucune demande de réservation</Text>
                        <Text style={{fontSize: 20,fontStyle:'italic',fontWeight:'bold', color: '#CEAE51'}}>pour le moment.</Text>
                </View>
       }
       {
        !loading && statut[0] && !statut[1] && reservation.length!=0 && reservationEnAttente.length==0 && 
                <View style={{borderRadius:10,alignItems: 'center',margin: 20,height:100,width:360 ,paddingTop:18  ,marginTop:270}} >
                        <Text style={{fontSize: 20,fontStyle:'italic',fontWeight:'bold', color: '#CEAE51'}}>Aucune réservation en attente</Text>
                        <Text style={{fontSize: 20,fontStyle:'italic',fontWeight:'bold', color: '#CEAE51'}}>pour le moment.</Text>
                </View>
       }
       {
        !loading && !statut[0] && statut[1]  && reservation.length!=0 && reservationAccepte.length==0 && 
                <View style={{borderRadius:10,alignItems: 'center',margin: 20,height:100,width:360 ,paddingTop:18  ,marginTop:270}} >
                        <Text style={{fontSize: 20,fontStyle:'italic',fontWeight:'bold', color: '#CEAE51'}}>Aucune réservation acceptée</Text>
                        <Text style={{fontSize: 20,fontStyle:'italic',fontWeight:'bold', color: '#CEAE51'}}>pour le moment.</Text>
                </View>
       }
      {
        !loading && !statut[0] && !statut[1]  && reservation.length!=0 &&  
                <View style={{borderRadius:10,alignItems: 'center',margin: 20,height:100,width:360 ,paddingTop:18  ,marginTop:270}} >
                        <Text style={{fontSize: 20,fontStyle:'italic',fontWeight:'bold', color: '#CEAE51'}}>Cliquez sur l'un des deux statuts</Text>
                        <Text style={{fontSize: 20,fontStyle:'italic',fontWeight:'bold', color: '#CEAE51'}}>afin d'afficher les réservations</Text>
                        <Text style={{fontSize: 20,fontStyle:'italic',fontWeight:'bold', color: '#CEAE51'}}>correspondantes.</Text>
                </View>
       }

          </View>

    </View>
  );
}

