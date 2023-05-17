import { useEffect, useState } from 'react';
import { Pressable, Text, View, TextInput, Alert, ScrollView,} from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import {auth} from '../../firebaseConfig';
import {StyleSheet, Dimensions } from 'react-native';
import { ADRESSE_IP } from '../../settings';
import Reservation from 'react-native-calendars/src/agenda/reservation-list/reservation';
import React from 'react';
import moment from 'moment';
import { isModuleNamespaceObject } from 'util/types';



export default function Calendrier(props:any) {
  interface Reservation{
    nomUser: String,
    prenomUser: String,
    mailUser: String,
    numeroUser: String,
    theme: String,
    hDebut: string,
    hFin: String,
    nbPersonnes: Number,
    status: String,
    message: String,
    date:string,
  }
  type TransformedDataType = {
    [key: string]: Reservation[];
  };
 
  const[reservation, setReservation ] = useState<Reservation[]>([])
 
  const[loading, setLoading]= useState(true);

  const [items, setItems] = useState<{[key: string]: Reservation[]}>({});
  
  
  

  
  useEffect(() => {
    setInterval(()=>
      getReservations(), 2000
      
    )
  }, []);
  
  

  const getReservations =()=>{
 
    fetch(`http://${ADRESSE_IP}:5000/accueil/etablissement/reservation/${auth.currentUser?.email}`)
    .then(response=> response.json())
    .then(data=> {

      const reservation_tmp : Reservation[]= [];
     
      
      for(let i=0; i<data.reservation.length;i++){
        
                let reserv : Reservation;
                let day=data.reservation[i].date[0];
                let month=data.reservation[i].date[1];
                let year=data.reservation[i].date[2];
                
                reserv={
                  nomUser: data.reservation[i].utilisateur.nom,
                  prenomUser: data.reservation[i].utilisateur.prenom,
                  mailUser: data.reservation[i].utilisateur.mailUser,
                  numeroUser: data.reservation[i].utilisateur.numeroUser,
                  theme: data.reservation[i].theme,
                  hDebut: data.reservation[i].horaireDebut,
                  hFin: data.reservation[i].horaireFin,
                  nbPersonnes: data.reservation[i].nbPersonnes,
                  status: data.reservation[i].status,
                  message: data.reservation[i].message,
                  date:moment({ year, month: month - 1, day }).format('YYYY-MM-DD'),
                }; 
                if(reserv.status==="accepté"){
                  reservation_tmp.push(reserv);
                }
                
                       
        }
       
        reservation.pop();
        setReservation(reservation_tmp);
        setLoading(false)
      } 
      
    )
    .catch(err=>console.log(err))

  }
  
  
  const transformedData: TransformedDataType = {};
  reservation.forEach((data: Reservation) => {
    if (!transformedData[data.date]) {
      transformedData[data.date] = [data];
    } else {
      transformedData[data.date].push(data);
    }
  });
  
  const sortedList: TransformedDataType = {};

// Convert hDebut to a number and sort the events
for (const [date, events] of Object.entries(transformedData)) {
  sortedList[date] = events.sort((a, b) => {
    const aHDebut = parseInt(a.hDebut.split("h")[0], 10);
    const bHDebut = parseInt(b.hDebut.split("h")[0], 10);
    return aHDebut - bHDebut;
  });
}

// Convert hDebut back to a string
for (const [date, events] of Object.entries(sortedList)) {
  sortedList[date] = events.map((event) => {
    const hDebut = event.hDebut.replace("h", "");
    return { ...event, hDebut: `${hDebut}h` };
  });
}
  
  useEffect(()=>{
    
    setItems(transformedData)
    
	},[reservation])

  const renderItem = (item:any) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.hDebut} - {item.hFin}</Text>
        <Text>{item.theme}</Text>
        <Text>{item.nbPersonnes} personnes{'\n'}</Text>
        <Text>Nom et Prénom: {item.nomUser} {item.prenomUser}</Text>
        <Text>Contact: {'\n'}{item.numeroUser} {'\n'}{item.mailUser}{'\n'}</Text>
        <Text>Message du client:"{item.message}"</Text>


      </View>
    );
  };
 

  return (
    
    <View style={styles.container}>
      
      <View style={{paddingTop: 15, flex:1}}>
            <Agenda 
             items={items}
             renderItem={renderItem}
            
            
            markingType="custom"
            renderEmptyDate={() => {
              return <Text> </Text>;
             }}
             renderEmptyData={() => {
              return <View style={{backgroundColor:"white", margin: 20, alignItems:"center", borderRadius:5, height: 50,justifyContent:"center"}}><Text style={{fontSize:18}}>Pas de réservation prévue pour ce jour là </Text></View>;
             }}
             />
          
      </View>
     
    </View>
  );
}


const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

//=========================
//======STYLES=============
//=========================

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        //alignItems: 'center',
        //justifyContent: 'center',
        paddingTop: 40,
        //padding: 40
    
      },
      scroll: {
        width: width - 15,
        
       },
       itemContainer: {
        backgroundColor: 'white',
        margin: 5,
        marginTop:25,
        borderRadius: 15,
        padding:10,
        
        flex: 1,
      },
    
      
 });
  
  
  
  