import React,{  Component } from 'react';
import {Pressable, Text, View, TextInput, Alert, Image,StyleSheet} from 'react-native';
import {auth} from '../../firebaseConfig';
import {ADRESSE_IP} from '../../settings';
import Props from '../Props';
import {width} from '../styles';


export default class ModifInfos extends Component<Props> {
  
  constructor(props: any){
    super(props)
  }

  //recuperer les infos dans la base de données et les mettre dans les input correspondant
  state={

    messageError: "",
    ButtonEnLigne: true,
    nom: "",
    prenom: "",
    telephone: ""        
  }

  componentDidMount =()=> {
        this.getUtilisateur();
  }
  sauvegarder=()=>{
    if(this.validation()){
      this.updateUtilisateur();
    }
    else{
      
    }
  }
 
  getUtilisateur = ()=>{
    fetch(`http://${ADRESSE_IP}:5000/accueil/utilisateur/menu/modifierInfos/${auth.currentUser?.email}`)
    .then(response=> response.json())
    .then(data=> this.setState({
                    nom:data.utilisateur.nom,
                    prenom:data.utilisateur.prenom,
                    telephone: data.utilisateur.telephone,
                  }) 
                  
    ).catch(err=>console.log(err))

}



  updateUtilisateur =()=>{
    fetch(`http://${ADRESSE_IP}:5000/accueil/utilisateur/menu/modifierInfos/${auth.currentUser?.email}`,{
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          nom: this.state.nom,
          prenom : this.state.prenom,
          telephone: this.state.telephone
      })
    })
    .then(()=>{
      Alert.alert('',"Modification effectuée !",[ {text: 'OK',style: 'destructive', onPress: () => this.props.navigation.navigate('MenuUtilisateur'),  }, ]);
    })
    .catch(error => {
      alert(error.message);
    })
  }


  //===========================================
  //==========VALIDATION=======================
  //===========================================

  validationNumero = () : boolean =>{
    if(this.state.telephone.length == 0){
      alert("Le champ numero de téléphone est vide.");
      return false;
    }

    else if(this.state.telephone.length != 10 || this.state.telephone.charAt(0)!= '0'){
      alert("Entrez un numero de téléphone valide.");

      return false;
    }
    else{
      return true;
    }
    
  }

  validationNom = () : boolean =>{
    if(this.state.nom.length==0){
      this.setState({
        messageError : "Le champ nom est vide."
      });
      return false;
    }
    else if(this.state.nom.length > 20) {
      this.setState({
        messageError : "Le champ nom est trop long."
      });
      return false;
    }
    else if((this.state.nom.includes("0") || this.state.nom.includes("1") || this.state.nom.includes("2") || this.state.nom.includes("3") || this.state.nom.includes("4") || this.state.nom.includes("5")  || this.state.nom.includes("6") || this.state.nom.includes("7") || this.state.nom.includes("8") || this.state.nom.includes("9"))){
      this.setState({
        messageError : "Le champ nom ne doit pas contenir des chiffres."
      });
      return false;
    }  
    else{
      return true;
    }
  }

  validationPrenom = () : boolean =>{
    if(this.state.prenom.length== 0){
      this.setState({
        messageError : "Le champ prenom est vide."
      });
      return false;
    }
    else if(this.state.prenom.length > 20){
      this.setState({
        messageError : "Le champ prenom est trop long."
      });
      return false;
    }
    else if((this.state.prenom.includes("0") || this.state.prenom.includes("1") || this.state.prenom.includes("2") || this.state.prenom.includes("3") || this.state.prenom.includes("4") || this.state.prenom.includes("5")  || this.state.prenom.includes("6") || this.state.prenom.includes("7") || this.state.prenom.includes("8") || this.state.prenom.includes("9"))){
      this.setState({
        messageError : "Le champ prenom ne doit pas contenir des chiffres."
      });
      return false;
    }
    else{
      return true;
    }
  }

  validation=()=>{
    return this.validationNom()  && this.validationPrenom() && this.validationNumero() ;
  }

 

  render(){
    return (
    
      <View style={styles.container}>

        
            <View style={{flexDirection:'row'}}>
              
                <View style={{marginTop:130,alignItems:'center',  width:(width+115)/2}}>
                        
                    
                        <Text style={styles.text}>Nom: </Text>
                    
                            <View style={styles.info}>
                              <TextInput style={styles.text2}
                                          value= {this.state.nom}
                                          onChangeText={nom=> this.setState({nom})}
                                          placeholder='ex: Descartes'/>
                            </View>


                       
                        <Text style={styles.text}>Prénom:</Text>
                      
                              <View style={styles.info}>
                              <TextInput style={styles.text2}
                                          value= {this.state.prenom}
                                          onChangeText={prenom => this.setState({prenom})}
                                          placeholder='ex: Rene'/>
                              </View>

     
                        <Text style={styles.text}>Numéro de téléphone:</Text>
                 
                                <View style={styles.info}>
                              <TextInput style={styles.text2}
                                        keyboardType= 'number-pad'
                                        value= {this.state.telephone}
                                        onChangeText={telephone => this.setState({telephone})}
                                        placeholder='ex: 0612345346'
                              />
                               </View>

                        <Pressable onPress={()=>this.props.navigation.navigate("ModifierMdpUser")}>
                          <Text style={styles.textmdp}>Modifier mon mot de passe</Text>
                        </Pressable>

                        <View style= {{alignItems:'center'}}>
                            <Pressable style={styles.button1} onPress={()=>this.sauvegarder()}>
                            <Text style={styles.buttontext}> Mettre à jour </Text>
                            </Pressable>
                        </View>
                      

                  </View>
                 
                 <View style={{ height:700, width: width-(width+115)/2}}>

                    <Image style={{width:180, height:600}} source={require('../../assets/feuille.jpg')}/> 

                 </View>
              
              </View>
              
      
      </View>
    );
  }
}

  
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingTop: 10,
  
    },

     text:{
      fontSize:17,
      fontWeight:'300',
      marginBottom:10,
      
     },
     textmdp:{
      fontSize:16,
      fontWeight:'300',
      textAlign:'center',
      color:'blue',
      textDecorationLine: 'underline',
     },
     text2:{
      fontSize:17,
      color:'rgba(64, 64, 64,0.9)',
      marginLeft:10,
     },
     
     info:{
        borderBottomWidth:1,
        borderColor:'#D3AA35',
        width:180,
        marginBottom:40,
        backgroundColor: '#F9F9F9',
        height:40,
        justifyContent:'center',
        borderRadius:8,
        
     },

     button1:{
      backgroundColor:  '#CDB07D',
      borderRadius:20,
      height: 80,
      width: 190,
      justifyContent:'center',
      elevation:11,
      marginTop:40,
  
    },

    buttontext:{
      textAlign:'center',
      color:'white',
      fontSize:22,    
    },
    
});



