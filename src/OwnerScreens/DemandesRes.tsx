import {  View, Text,  Pressable, Alert, ActivityIndicator } from 'react-native';

import React,{ useState, useEffect } from 'react';
import {stylesReservation, width} from '../styles';
import { AntDesign,MaterialIcons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import {ADRESSE_IP} from '../../settings';
import {auth} from '../../firebaseConfig';
import {FlatList} from 'react-native-gesture-handler';
import Props from '../Props'

/**
 * 
 * @returns affichage de la page 'historique'
 */

export default function Historique(props: Props) {
  
  interface Reservation{
    id : String,
    nomUser: String,
    prenomUser: String,
    mailUser: String,
    numeroUser: String,
    theme: String,
    jour: Number,
    mois: Number,
    annee: Number,
    hDebut: String,
    hFin: String,
    nbPersonnes: Number,
    status: String,
    message: String
  }

  const[reservation, setReservation ] = useState<Reservation[]>([]);
  const[reservationEnAttente, setReservationEnAttente]= useState<Reservation[]>([]);
  const[reservationAccepte, setReservationAccepte]= useState<Reservation[]>([])
  const[loading, setLoading]= useState(true);
  const[statut, setStatut] = useState(props.route.params? props.route.params.statut : [true,true] ); //statut[0]= en attente && statut[1]= accepté



  useEffect(()=> {

    getReservations();

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

  /**
   * Requete get afin de récuperer les informations des réservations acceptées et en attente
   */
  const getReservations =()=>{
    fetch(`http://${ADRESSE_IP}:5000/accueil/etablissement/reservation/${auth.currentUser?.email}`)
    .then(response=> response.json())
    .then(data=> {

      const reservation_tmp_enAttente : Reservation[]= [];
      const reservation_tmp_accepte : Reservation[]= [];
      

      for(let i=0; i<data.reservation.length;i++){
        
                let reserv : Reservation;
                reserv={
                  id: data.reservation[i]._id,
                  nomUser: data.reservation[i].utilisateur.nom,
                  prenomUser: data.reservation[i].utilisateur.prenom,
                  mailUser: data.reservation[i].utilisateur.mailUser,
                  numeroUser: data.reservation[i].utilisateur.numeroUser,
                  theme: data.reservation[i].theme,
                  jour:  data.reservation[i].date[0],
                  mois: data.reservation[i].date[1],
                  annee:  data.reservation[i].date[2],
                  hDebut: data.reservation[i].horaireDebut,
                  hFin: data.reservation[i].horaireFin,
                  nbPersonnes: data.reservation[i].nbPersonnes,
                  status: data.reservation[i].status,
                  message: data.reservation[i].message
                  
                }; 
                   if(reserv.status=='en attente'){
                      reservation_tmp_enAttente.push(reserv);
                   }
                   else{
                      reservation_tmp_accepte.push(reserv);
                   }
                    
                    
        }
        //reservation.pop();

       let reservation_tmp=reservation_tmp_enAttente.concat(reservation_tmp_accepte);
        setReservation(reservation_tmp);
        setReservationEnAttente(reservation_tmp_enAttente);
        setReservationAccepte(reservation_tmp_accepte);
      
        setLoading(false);
      
      } 
    )
    .catch(err=>console.log(err))

  }

  /**
   * Effectuer une requete patch afin d'accepter une reservation
   * @param id : ID de la réservation séléctionnée
   */
  const acceptReservation =(id: String)=>{
    Alert.alert(
      'Confirmation',
      `Accepter la demande de réservation...`,
      [

          { text: "Non", style: 'cancel', onPress: () => {}},
          {
              text: 'Oui',
              onPress: () => {
                fetch(`http://${ADRESSE_IP}:5000/accueil/etablissement/reservation/${id}`,{
                            method: 'PATCH',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                              status: "accepté"
                            })
                })
                .catch(err=>console.log(err));
                props.navigation.goBack();
               props.navigation.navigate("DemandesRes",{statut: statut});
             }

          },
        
      ]
    );
  }
  
    /**
   * Effectuer une requete patch afin de refuser une reservation
   * @param id : ID de la réservation séléctionnée
   */
  const refuseReservation =(id: String)=>{
    Alert.alert(
      'Confirmation',
      (reservation[0].status=="en attente" ? "Refuser la demande de réservation...": "Annuler la réservation..."),
      [

        { text: "Non", style: 'cancel', onPress: () => {}},
        {
          text: 'Oui',
          style: 'destructive',
          onPress: () => {
                        fetch(`http://${ADRESSE_IP}:5000/accueil/etablissement/reservation/${id}`,{
                          method: 'PATCH',
                          headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify({
                            status: reservation[0].status=="en attente" ? "refusé": "annulé"
                          })
                        })
                        .catch(err=>console.log(err))
                        props.navigation.goBack();
                        props.navigation.navigate("DemandesRes",{statut: statut});

          },
        },
      ]
    );
  }



  return (
    <View style={stylesReservation.container}>
       <View style={{flexDirection:'row',height:40,alignItems:'center',paddingLeft:100, backgroundColor:'white'}}>
          <Checkbox 
                  style={{}} 
                  value={statut[0]} 
                  onValueChange={() => setStatut([!statut[0],statut[1] ])}
                  color={statut[0] ? '#CEAE51' : undefined}
                  
          />

          <Text> en attente </Text>

          <Checkbox 
                  style={{marginLeft:20}} 
                  value={statut[1]} 
                  onValueChange={() => setStatut([statut[0],!statut[1] ])}
                  color={statut[1] ? '#CEAE51' : undefined}
  
          />

          <Text> accepté </Text>

       </View>


      <View style={{paddingTop: 15, paddingBottom:40}}>
       
       { loading &&
      <ActivityIndicator size="large" color="#CEAE51" style={{alignItems:'center', paddingTop:300}}/>
       }  
       
       {  (statut[0] || statut[1]) &&
          <FlatList data={reserv()} renderItem = {({item}) => ( 
              
                        
                    <View style={stylesReservation.item}>
                        <View style={{ alignItems:'center'}} >
                            

                          <View style={{justifyContent: 'space-between',width: width-40,flexDirection:'row'}}>
                            
                            <Pressable onPress={()=>refuseReservation(item.id)} style={stylesReservation.button1}> 
                                <Text>
                                <MaterialIcons name="cancel" size={35} color="#C13F3F" /> 
                                </Text>
                            </Pressable>
                            { item.status=="en attente" &&
                            <Pressable onPress={()=>acceptReservation(item.id)} style={stylesReservation.button2}> 
                                <Text>
                                <AntDesign name="checkcircle" size={30} color="green" />
                                </Text>
                            </Pressable>
                            }
                          </View>
                            
                           
                            <Text style={stylesReservation.nomPrenom}>
                            
                          
                              {'\t'} {item.nomUser} {item.prenomUser}
                              
                            </Text>
                            
                        </View>
                              
                            <View style={stylesReservation.view}>    

                                <View style={stylesReservation.viewChamps}>
                                  
                                  <View style={stylesReservation.viewTitle}>
                                      <Text style={stylesReservation.title}>Mail :</Text>
                                  </View>

                                  <View style={stylesReservation.viewInfos}>
                                      <Text style={stylesReservation.infos}>{(item.mailUser)}</Text>
                                </View>
                            
                            </View>
  

                                <View style={stylesReservation.viewChamps}>
                                  
                                  <View style={stylesReservation.viewTitle}>
                                      <Text style={stylesReservation.title}>Numero :</Text>
                                  </View>

                                  <View style={stylesReservation.viewInfos}>
                                      <Text style={stylesReservation.infos}>{(item.numeroUser)}</Text>
                                </View>
                            
                            </View>                            
                                

                            <View style={stylesReservation.viewChamps}>
                              
                              <View style={stylesReservation.viewTitle}>
                                  <Text style={stylesReservation.title}>Thème :</Text>
                              </View>

                              <View style={stylesReservation.viewInfos}>
                                  <Text style={stylesReservation.infos}>{(item.theme)}</Text>
                              </View>

                            </View>


                              <View style={stylesReservation.viewChamps}>
                                
                                <View style={stylesReservation.viewTitle}>
                                    <Text style={stylesReservation.title}>Date :</Text>
                                </View>

                                <View style={stylesReservation.viewInfos}>
                                    <Text style={stylesReservation.infos}>{(item.jour.toString())}/{(item.mois.toString())}/{(item.annee.toString())}</Text>
                                </View>

                              </View>

                              <View style={stylesReservation.viewChamps}>
                                
                                <View style={stylesReservation.viewTitle}>
                                    <Text style={stylesReservation.title}>Heure :</Text>
                                </View>

                                <View style={stylesReservation.viewInfos}>
                                    <Text style={stylesReservation.infos}>{(item.hDebut)} - {(item.hFin)}</Text>
                                </View>

                              </View>


                              <View style={stylesReservation.viewChamps}>
                                
                                <View style={stylesReservation.viewTitle}>
                                    <Text style={stylesReservation.title}>Personnes :</Text>
                                </View>

                                <View style={stylesReservation.viewInfos}>
                                    <Text style={stylesReservation.infos}>{(item.nbPersonnes.toString())}</Text>
                                </View>

                              </View>


                              <View style={stylesReservation.viewChamps}>
                                
                                <View style={stylesReservation.viewTitle}>
                                    <Text style={stylesReservation.title}>Statut :</Text>
                                </View>

                                <View style={stylesReservation.viewInfos}>
                                    <Text style={stylesReservation.infos}>
                                      {(item.status)}{'\t'}
                                    
                                    {item.status== "en attente" ?
                              <MaterialIcons name="timer" size={18} color="#FDBE13" />
                            : <AntDesign name="checkcircle" size={18} color="green" />
                            }
                       
                                </Text>
                                </View>

                              </View>


          
                      
                            </View> 

                            <View style={stylesReservation.view2}>
                                 <Text style={stylesReservation.title}>Commentaire: {(item.message)}</Text>
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

  