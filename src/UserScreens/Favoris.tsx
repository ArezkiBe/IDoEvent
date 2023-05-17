import {View, Text,  Pressable, Alert,  Image, ActivityIndicator} from 'react-native'
import React,{ useState, useEffect } from 'react';
import {MaterialIcons } from '@expo/vector-icons';
import {ADRESSE_IP} from '../../settings';
import {auth} from '../../firebaseConfig';
import {FlatList} from 'react-native-gesture-handler';
import { stylesFavoris } from '../styles';
import Props from '../Props';

export default function Historique(props:Props) {
  
  interface Item {
    name: string,
    image:Array<string>,
    address: any,
    email:string,
    phone:string,
    maxCapacity:string,
    description:string,
    theme:Array<string>,
  
  }

  const[favoris, setFavoris ] = useState<Item[]>([])
  const[loading, setLoading]= useState(true);

  useEffect(() => {

    setInterval(()=>
      getFavorisForUser(), 2000
    )

  }, []);


  const getFavorisForUser =()=>{
    fetch(`http://${ADRESSE_IP}:5000/accueil/utilisateur/favoris/${auth.currentUser?.email}`)
    .then(response=> response.json())
    .then( data=> {

      const favoris_tmp : Item[]= [];

      for(let i=0; i<data.favoris.length;i++){
        
                let fav: Item;
             fav={
                  name: data.favoris[i].name,
                  email: data.favoris[i].email,
                  phone: data.favoris[i].phone,
                  address: data.favoris[i].address,
                  image: data.favoris[i].image,
                  theme: data.favoris[i].theme,
                  description: data.favoris[i].description,
                  maxCapacity: data.favoris[i].maxCapacity,

              
                }
                   
                    favoris_tmp.push(fav);
                    
        }
        favoris.pop();
        setFavoris(favoris_tmp);
        setLoading(false);
      } 
    )
    .catch(err=>console.log(err))

  }

  const eraseFavoris =(mailEtablissement: String)=>{

    Alert.alert(
    'Confirmation',
    "Effacer de la liste des favoris...",
    [

        { text: "Non", style: 'cancel', onPress: () => {}},
        {
          text: 'Oui',
          style: 'destructive',
          onPress: () => {
                        fetch(`http://${ADRESSE_IP}:5000/accueil/utilisateur/Favoris/delete/${mailEtablissement}/${auth.currentUser?.email}`,{
                          method: 'DELETE',
                        })
                        .catch(err=>console.log(err));
                       
                        
          },
        },
      ]
      );

}


  return (
    <View style={stylesFavoris.container}>

      <View style={{paddingTop: 20}}>
       
       { loading &&
      <ActivityIndicator size="large" color="rgba(163, 192, 214,0.8)" style={{alignItems:'center', paddingTop:300}}/>
       }

      {
        !loading && favoris.length==0 && 
                    <View style={{alignItems: 'center',margin: 20,width:360 ,marginTop:300}} >
                              <Text style={{textAlign:'center',fontSize: 20,fontStyle:'italic',fontWeight:'bold', color: '#CEAE51'}}>Vous n'avez aucun établissement en favoris.</Text>
                    </View>
       }
          <FlatList data={favoris} renderItem = {({item}) => ( 
                
                 <Pressable onPress={()=>props.navigation.navigate("Etabli",{item})}>  
                 
                <View style={stylesFavoris.item}>
                    <View >
                        <View>
                            <Pressable onPress={()=>eraseFavoris(item.email)} style={{marginLeft:320,marginTop: 6}}> 
                               <Text>
                                 <MaterialIcons name="cancel" size={30} color="#C13F3F" /> 
                               </Text>
                            </Pressable>

                            <Text style={stylesFavoris.nomEtabli}>
                             {item.name}
                           </Text>
                          
                        </View>
                        <View style={{}}>

                        {item.image[0].length?
                            <Image style={stylesFavoris.image} source={{uri: (item.image[0])}} />
                            : (item.image[1].length ?
                              <Image style={stylesFavoris.image} source={{uri: (item.image[1])}} />
                              : item.image[2].length ?
                              <Image style={stylesFavoris.image} source={{uri: (item.image[2])}} />
                              : item.image[3].length?
                              <Image style={stylesFavoris.image} source={{uri: (item.image[3])}} />
                              :
                              <Image style={stylesFavoris.image} source={require('../../assets/default.png')} />
                              )
                          }
                          
                        <View style={stylesFavoris.view}>    
            
                        


                        <View style={stylesFavoris.viewChamps}>
                           
                              <View style={stylesFavoris.viewTitle}>
                              <Text style={stylesFavoris.title}>Adresse:</Text>
                              </View>

                              <View style={stylesFavoris.viewInfos}>
                              <Text style={stylesFavoris.infos}>{item.address.addressNumber} {item.address.addressName}, {item.address.postalCode}</Text>
                              </View>
                           
                        </View>

                          

                     
                        </View>
                      </View>

                        
                        
                  </View>
                
                
                </View>
                
                </Pressable>    
            
                      
                    )}

                    ItemSeparatorComponent={() => <View style={{margin: 6}}/>}
                    
                  />
      
          </View>
    </View>
  );
}