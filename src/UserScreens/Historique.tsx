import {  View, Text,  Pressable, Alert,  ImageBackground, ActivityIndicator} from 'react-native'
import React,{ useState, useEffect } from 'react';
import {stylesHistorique, width} from '../styles';
import { AntDesign,MaterialCommunityIcons,MaterialIcons } from '@expo/vector-icons';
import {ADRESSE_IP} from '../../settings';
import {auth} from '../../firebaseConfig';
import {FlatList} from 'react-native-gesture-handler';



export default function Historique(props:any) {
  
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

  const[reservation, setReservation ] = useState<Reservation[]>([])
  const[loading, setLoading]= useState(true);
  const date= new Date();

  useEffect(() => {

    setInterval(()=>
      getReservations(), 2000
    )

  }, []);

  


  const getReservations =()=>{
    fetch(`http://${ADRESSE_IP}:5000/accueil/utilisateur/historique/${auth.currentUser?.email}`)
    .then(response=> response.json())
    .then( data=> {

      const reservation_tmp : Reservation[]= [];

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
                   
                    reservation_tmp.push(reserv);
                    
        }
        reservation.pop();
        setReservation(reservation_tmp);
        setLoading(false)

               
      
      } 
    )
    .catch(err=>console.log(err))

  }

  const eraseReservation =(id: String)=>{

      Alert.alert(
      'Confirmation',
      "Effacer de l'historique...",
      [

        { text: "Non", style: 'cancel', onPress: () => {}},
        {
          text: 'Oui',
          style: 'destructive',
          onPress: () => {
                        fetch(`http://${ADRESSE_IP}:5000/accueil/utilisateur/historique/cancel/${id}`,{
                          method: 'DELETE',
                        })
                        .catch(err=>console.log(err));
                       
                        
          },
        },
      ]
      );

  }


  return (
    <View style={stylesHistorique.container}>
      
      <View style={{paddingTop: 20}}>
       
       { loading &&
      <ActivityIndicator size="large" color="#E7D07D" style={{alignItems:'center', paddingTop:300}}/>
       }

      {
        !loading && reservation.length==0 && 
                    <View style={{alignItems: 'center',margin: 20,width:360 ,marginTop:300}} >
                              <Text style={{fontSize: 20,fontStyle:'italic',fontWeight:'bold', color: '#899DBE'}}>Votre historique est vide.</Text>
                    </View>
       }
          <FlatList data={reservation} renderItem = {({item}) => ( 
                
                        
                    <View style={stylesHistorique.item}>
                        <View >
                            <View>
                            <Pressable onPress={()=>eraseReservation(item.id)} style={{marginRight: 4,marginTop: 4,flexDirection:'row-reverse'}}> 
                                <Text>
                                <MaterialIcons name="cancel" size={30} color="#C13F3F" /> 
                                </Text>
                            </Pressable>
                            
                            <Text style={stylesHistorique.nomEtabli}>
                              
                            {item.status== "refusé" ? 
                                <MaterialCommunityIcons name="cancel" size={20} color="#C13F3F" />
                            :  (item.status== "accepté" ? 
                                  <AntDesign name="checkcircle" size={20} color="green" />
                                : <MaterialCommunityIcons name="book-cancel-outline" size={22} color="#67AAD0" />
                                )
                           
                            }
                              {'\t'} {item.nomEtab}
                            </Text>
                              
                            </View>

        
                              
                            <View style={stylesHistorique.view}>    

                            <View style={stylesHistorique.viewChamps}>
                               
                                  <View style={stylesHistorique.viewTitle}>
                                  <Text style={stylesHistorique.title}>Mail :</Text>
                                  </View>

                                  <View style={stylesHistorique.viewInfos}>
                                  <Text style={stylesHistorique.infos}>{(item.mailEtab)}</Text>
                                  </View>
                               
                                
                                
                            </View>

                            <View style={stylesHistorique.viewChamps}>

                                  <View style={stylesHistorique.viewTitle}>
                                  <Text style={stylesHistorique.title}>Numero:</Text>
                                  </View>

                                  <View style={stylesHistorique.viewInfos}>
                                  <Text style={stylesHistorique.infos}>{(item.numeroEtab)}</Text>
                                  </View>
                               
                            </View>

                              <View style={stylesHistorique.viewChamps}>

                                <View style={stylesHistorique.viewTitle}>
                                  <Text style={stylesHistorique.title}>Adresse:</Text>
                                </View>

                                  <View style={stylesHistorique.viewInfos}>
                                  <Text style={stylesHistorique.infos}>{(item.adresseEtab)}</Text>
                                  </View>
                                
                              </View>

                              <View style={stylesHistorique.viewChamps}>

                              <View style={stylesHistorique.viewTitle}>
                                  <Text style={stylesHistorique.title}>Date:</Text>
                                </View>

                                  <View style={stylesHistorique.viewInfos}>
                                  <Text style={stylesHistorique.infos}>{(item.jour.toString())}/{(item.mois.toString())}/{(item.annee.toString())}</Text>
                                  </View>
                              
                              </View>

                              <View style={stylesHistorique.viewChamps}>

                              <View style={stylesHistorique.viewTitle}>
                                  <Text style={stylesHistorique.title}>Heure:</Text>
                                </View>

                                  <View style={stylesHistorique.viewInfos}>
                                  <Text style={stylesHistorique.infos}>{(item.hDebut)} - {(item.hFin)}</Text>
                                  </View>
                              
                              </View>

                              <View style={stylesHistorique.viewChamps}>

                              <View style={stylesHistorique.viewTitle}>
                              <Text style={stylesHistorique.title}>Thème:</Text>
                              </View>

                              <View style={stylesHistorique.viewInfos}>
                              <Text style={stylesHistorique.infos}>{(item.theme)}</Text>
                              </View>

                              </View>

                              <View style={stylesHistorique.viewChamps}>

                                <View style={stylesHistorique.viewTitle}>
                                  <Text style={stylesHistorique.title}>Personnes:</Text>
                                </View>

                                <View style={stylesHistorique.viewInfos}>
                                  <Text style={stylesHistorique.infos}>{(item.nbPersonnes.toString())}</Text>
                                </View>
                              
                              </View>

                              <View style={stylesHistorique.viewChamps}>

                                <View style={stylesHistorique.viewTitle}>
                                  <Text style={stylesHistorique.title}>Statut:</Text>
                                </View>

                                <View style={stylesHistorique.viewInfos}>
                                  <Text style={stylesHistorique.infos}>{(item.status)}</Text>
                                </View>
                      
                              </View>
                            </View>

                            <View style={stylesHistorique.view2}>    
                              <Text style={stylesHistorique.title}>Commentaire:{(item.message)}</Text>
                            </View> 
                            
                      </View>
                    
                    
                    </View>
                              
                
                          
                        )}

                      
                        ItemSeparatorComponent={() => <View style={{margin: 6}}/>}
          />
          </View>
    </View>
  );
}

  