import React,{  Component } from 'react';
import {LogBox,TouchableOpacity, Image,Pressable, Text, View, TextInput, Alert, ScrollView, Animated} from 'react-native';
import Checkbox from 'expo-checkbox';
import {stylesGererModif} from '../styles';
import * as ImagePicker from 'expo-image-picker';
import {auth,storage} from '../../firebaseConfig';
import {ADRESSE_IP} from '../../settings';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AntDesign } from '@expo/vector-icons';
import Props from '../Props';

export default class GererModifEtablissement extends Component<Props> {
  
  constructor(props: any){
    super(props)
  }

  //recuperer les infos dans la base de données et les mettre dans les input correspondant
  state={

    messageError: "",
    ButtonEnLigne: true,
    
    nom: "",
    capaciteMax: "",

    mariage: false,
    anniversaire: false,
    soiree: false,
    dinerEntreprise: false,
    autre: false, //mariage, anniversaire...

    adresse: "", //non modifiable
    numero: "",           
    description: "",

    defaultImage: require('../../assets/add_photo_logo.png'),
    image: ['','','',''],
    imageTmp: ['','','',''],

    hideButton: false,
    hasGalleryPermission: null,
    isDeleteImageVisible: false
  }

  componentDidMount =()=> {
    LogBox.ignoreLogs(['Key "cancelled" in the image picker result is deprecated and will be removed in SDK 48, use "canceled" instead']);
        (async()=>{
          const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
          this.setState({hasGalleryPermission: galleryStatus.status === 'granted'});
        })
        this.getEstablishment();
       
   
  }


  sauvegarder=()=>{
    if(this.validation()){
      this.uploadImageAsync();

    }
    else{
      this.setState({hideButton: false})
    }

  }
 
  getEstablishment = ()=>{
    fetch(`http://${ADRESSE_IP}:5000/accueil/etablissement/menu/gerer/modification/${auth.currentUser?.email}`)
    .then(response=> response.json())
    .then(data=> this.setState({
                    
                    ButtonEnLigne: parseInt(data.etablissement.maxCapacity) == 0,

                    nom:data.etablissement.name,
                    capaciteMax: data.etablissement.maxCapacity,
                    adresse: data.etablissement.address.addressNumber+" "+data.etablissement.address.addressName+", "+data.etablissement.address.postalCode,
                    numero: data.etablissement.phone,
                    description: data.etablissement.description,
                   
                    mariage: data.etablissement.theme[0]=='Mariage',
                    anniversaire: data.etablissement.theme[1]=='Anniversaire',
                    soiree: data.etablissement.theme[2]=='Soiree',
                    dinerEntreprise: data.etablissement.theme[3]=="Diner d'entreprise",
                    autre: data.etablissement.theme[4]=='Autre',

                    image: data.etablissement.image,
                    imageTmp:data.etablissement.image

                  }) 
                  
    ).catch(err=>console.log(err))

}




  updateEstablishment =()=>{
    fetch(`http://${ADRESSE_IP}:5000/accueil/etablissement/menu/gerer/modification/${auth.currentUser?.email}`,{
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name : this.state.nom,
        phone: this.state.numero,
        maxCapacity: this.state.capaciteMax,
        description: this.state.description,
        theme: [
                this.state.mariage ? "Mariage": "",
                this.state.anniversaire ? "Anniversaire": "",
                this.state.soiree ? "Soiree": "",
                this.state.dinerEntreprise ? "Diner d'entreprise": "",
                this.state.autre ? "Autre" : ""
               ],
        image: this.state.image
      })
    })
    .then(()=>{

      Alert.alert(
        '',
        `Modification effectuée ! `,
        [
          {
            text: 'OK',
            style: 'destructive',
            onPress: () => this.props.navigation.navigate('Gerer'),
          },
        ]
      );
    })
    .catch(error => {
      alert(error.message);
    })
  }

  pickImage = async (i: number)=>{
      console.log('IMAGETMP',this.state.imageTmp)

        let result= await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4,3],
          quality: 1,
        });


        if(!result.canceled ){

          let image= this.state.image;
          image[i]= result.assets[0].uri;
          this.setState({image})
          console.log("pickImage:", this.state.image[0]);
        }

    
    if(this.state.hasGalleryPermission===false){
      return alert('pas de permission accordée');
    }
  }
 

  
  uploadImageAsync =() =>{
    
    this.state.image.map(async(imageUri: string, index: number)=>{
      
      if(imageUri.includes('file')) {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const filename= `images/${auth.currentUser?.email}/image-${Date.now()}`;
        
        try{
          const storageRef = ref(storage, filename);
  
          await uploadBytes(storageRef, blob);
  
          const downloadURL = await getDownloadURL(storageRef);
  
          let image: Array<string>= this.state.image
          image[index]=  downloadURL
          this.setState({image})
          this.updateEstablishment();
          
        }
        catch(erreur : any){
          console.error(erreur);
        }

      }
      else{
        this.updateEstablishment();
      }
    })
    
  }


    
  deleteImage=(i: number )=>{
    Alert.alert(
      'Suppression',
      "Souhaitez-vous supprimer cette image ?",
      [
        { text: "Non", style: 'cancel', onPress: () => {} },
        {
          text: 'Oui',
          style: 'destructive',
          onPress: () => {
                
              if(this.state.image[i]){
                const deleteRef= ref(storage,this.state.image[i])
                try{
                  deleteObject(deleteRef).then(()=>{
                    let image= this.state.image;
                    image[i] = '' ;
                    this.setState({image});
                  }
                  )
                }
                catch(err: any){
                  console.log(err);
                }

              }

          }
        }
      ]
    );
  }
  
          
  
  

  //===========================================
  //==========VALIDATION=======================
  //===========================================

  validationNumero = () : boolean =>{
    if(this.state.numero.length == 0){
      this.setState({messageError: "Le champ numero de téléphone est vide."});
      return false;
    }

    else if(this.state.numero.length != 10 || this.state.numero.charAt(0)!= '0'){
      this.setState({messageError:"Entrez un numero de téléphone valide."});

      return false;
    }
    else{
      return true;
    }
    
  }

  validationNom = () : boolean =>{
    if(this.state.nom.length==0){
      this.setState({messageError:"Le nom de l'établissement est vide."});
      return false;
    }
    if(this.state.nom.length>=20) {
      this.setState({messageError:"Le nom de l'établissement est trop long."});
      return false;
    }
    else{
      return true;
    }
  }

  validationCapacite = () : boolean =>{
    if(parseInt(this.state.capaciteMax)<=0 ){
      this.setState({messageError:"La capacité maximale doit être supérieur à 0."});
      return false;
    }
    else  if(parseInt(this.state.capaciteMax) >= 999  ){
      this.setState({messageError:"La capacité maximale doit être compris entre 1 et 999."});
      return false;
    }
    else{
      return true;
    }
  }

  validationImage=()=>{
    if(!this.state.image[0].length){
      this.setState({messageError:"Une image doit être insérée."});
      return false;

    }
    return true;
  }

  validation=()=>{
    return this.validationNom() && this.validationNumero() && this.validationCapacite() && this.validationImage()  ;
  }

 

  render(){
    return (
    
      <View style={stylesGererModif.container}>

      { (this.state.messageError.length>0) && 
              <Text style={{fontSize: 15, color: '#C13F3F', paddingLeft: 10}}>   
                <View style={{height:30}} >
                  <Text>
                    <AntDesign name="exclamationcircleo"  size={20} color='#C13F3F' />  {'\t'}
                  </Text>
                
                </View> 

                <View style={{height:30}} >
                  <Text style={{color: '#C13F3F'}} >
                    {this.state.messageError}
                  </Text>
                
                </View>
                  
                
                
              </Text>
        }

        <ScrollView style={stylesGererModif.scroll}>
              <View style={{paddingTop: 15}}>

              <Text style={stylesGererModif.text}>Nom de l'établissement* : </Text>
                   
                    <TextInput style={stylesGererModif.input}
                                value= {this.state.nom}
                                onChangeText={nom => this.setState({nom})}
                                placeholder='ex: Noccio Bar'/>
    
                    <Text style={stylesGererModif.text}>Capacité maximale* :</Text>
                    <TextInput style={stylesGererModif.input}
                              keyboardType= 'number-pad'
                              value= {this.state.capaciteMax}
                              onChangeText={capaciteMax => this.setState({capaciteMax})}              
                              placeholder='ex: 50'/>
    
                    <Text style={stylesGererModif.text}>Adresse de l'établissement* :</Text>
                    <TextInput style={stylesGererModif.inputNonModif} 
                               editable={false}
                               value= {this.state.adresse}
                    />

                    <Text style={stylesGererModif.text}>Numero de téléphone* :</Text>
                    <TextInput style={stylesGererModif.input}
                              keyboardType= 'number-pad'
                              value= {this.state.numero}
                              onChangeText={numero => this.setState({numero})}
                              placeholder='ex: 0612345346'
                    />

                    <Text style={stylesGererModif.text}>Description :</Text>
                    <TextInput style={stylesGererModif.inputArea}
                              multiline= {true}
                              maxLength={500}
                              numberOfLines= {4}
                              value= {this.state.description}
                              onChangeText={description => this.setState({description})}
                              placeholder='Ajoutez des détails ! (500 caractères max.)'/>

                    <Text style={stylesGererModif.text}>Thème :</Text>

                    <View style={stylesGererModif.ensemble}> 

                    <View style={{flexDirection: 'row',  padding: 10, paddingTop: 20}}>

                          <Checkbox 
                            style={stylesGererModif.checkbox} 
                            value={this.state.mariage} 
                            onValueChange={() => this.setState({mariage: !this.state.mariage})}
                            color={this.state.mariage ? '#98815B' : undefined}
                          />

                          <Text style={stylesGererModif.checkboxText}> Mariage </Text>
                    </View>

                    <View style={{flexDirection: 'row',  padding: 10}}>
                          <Checkbox 
                            style={stylesGererModif.checkbox} 
                            value={this.state.anniversaire} 
                            onValueChange={() => this.setState({anniversaire: !this.state.anniversaire})}
                            color={this.state.anniversaire ? '#98815B' : undefined}
                          />

                          <Text style={stylesGererModif.checkboxText}> Anniversaire </Text>
                    </View>


                    <View style={{flexDirection: 'row',  padding: 10}}>
                          <Checkbox 
                            style={stylesGererModif.checkbox} 
                            value={this.state.soiree} 
                            onValueChange={() => this.setState({soiree: !this.state.soiree})}
                            color={this.state.soiree ? '#98815B' : undefined}
                          />

                          <Text style={stylesGererModif.checkboxText}> Soirée </Text>
                    </View>
                          
                    <View style={{flexDirection: 'row',  padding: 10}}>
                          <Checkbox 
                            style={stylesGererModif.checkbox} 
                            value={this.state.dinerEntreprise} 
                            onValueChange={() => this.setState({dinerEntreprise: !this.state.dinerEntreprise})}
                            color={this.state.dinerEntreprise ? '#98815B' : undefined}
                          />

                          <Text style={stylesGererModif.checkboxText}> Dîner d'entreprise </Text>
                    </View>

                    <View style={{flexDirection: 'row',  padding: 10}}>
                          <Checkbox 
                            style={stylesGererModif.checkbox} 
                            value={this.state.autre} 
                            onValueChange={() => this.setState({autre: !this.state.autre})}
                            color={this.state.autre ? '#98815B' : undefined}
                          />

                          <Text style={stylesGererModif.checkboxText}> Autre </Text>
                    </View>
      

                  </View>

                  <Text style={stylesGererModif.text}> Image : </Text>

                  <ScrollView horizontal= {true} style={{flexDirection: 'row', marginLeft:10}}>
                        <TouchableOpacity style={this.state.image[0] ? stylesGererModif.cadreSansPadding :stylesGererModif.cadre} onLongPress={()=>this.state.image[0] && this.deleteImage(0)} onPress ={()=> this.pickImage(0)} >
                        
                        {this.state.image[0] ? 
                            <Image source={{uri:this.state.image[0]}} style={stylesGererModif.image}/> 
                          : <Image style={stylesGererModif.defaultImageWithoutOpacity} source={this.state.defaultImage} /> 
                        }
                        
                        </TouchableOpacity>


                        <TouchableOpacity style={this.state.image[1] ? stylesGererModif.cadreSansPadding :stylesGererModif.cadre} onLongPress={()=>this.state.image[1] && this.deleteImage(1)} onPress ={()=> this.state.image[0] && this.pickImage(1)}>
                        
                        {this.state.image[1] ? 
                             <Image source={{uri:this.state.image[1]}} style={stylesGererModif.image}/> 
                          :  <Image style={this.state.image[0] ? stylesGererModif.defaultImageWithoutOpacity :stylesGererModif.defaultImageWithOpacity} source={this.state.defaultImage}/> 
                        }

                        </TouchableOpacity>

                        <TouchableOpacity style={this.state.image[2] ? stylesGererModif.cadreSansPadding :stylesGererModif.cadre} onLongPress={()=>this.state.image[2] && this.deleteImage(2)} onPress ={()=>this.state.image[1] && this.pickImage(2)}>
                        
                        {this.state.image[2] ? 
                             <Image source={{uri:this.state.image[2]}} style={stylesGererModif.image}/> 
                          :  <Image style={this.state.image[1] ? stylesGererModif.defaultImageWithoutOpacity :stylesGererModif.defaultImageWithOpacity} source={this.state.defaultImage}/> 
                        }

                        </TouchableOpacity>

                        <TouchableOpacity style={this.state.image[3] ? stylesGererModif.cadreSansPadding :stylesGererModif.cadre} onLongPress={()=>this.state.image[3] && this.deleteImage(3)} onPress ={()=>this.state.image[2] && this.pickImage(3)}>
                              
                        {this.state.image[3] ? 
                             <Image source={{uri:this.state.image[3]}} style={stylesGererModif.image}/> 
                          :  <Image style={this.state.image[2] ? stylesGererModif.defaultImageWithoutOpacity :stylesGererModif.defaultImageWithOpacity} source={this.state.defaultImage}/> 
                        }

                        </TouchableOpacity>

                      </ScrollView>
            
                   
                  <Pressable style={stylesGererModif.button1} disabled={this.state.hideButton} onPress={()=>{this.setState({hideButton: true});this.sauvegarder()}}>
                    <Text style={stylesGererModif.buttontext}> {this.state.ButtonEnLigne ? "Mettre en ligne" : "Sauvegarder"}  </Text>
                  </Pressable>
                  
              </View>
       </ScrollView>
      </View>
    );
  }
  
}
