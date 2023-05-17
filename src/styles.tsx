import {StyleSheet, Dimensions } from 'react-native';


const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

const stylesInscription = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
    paddingTop: 20,
    //padding: 40

  },

  button1:{
    backgroundColor:  '#6297BB',
    borderRadius:20,
    borderColor:'#6297BB',
    borderWidth:1,
    height: 80,
    width: 230,
    justifyContent:'center',
    marginTop: 40,
    //left: width/5 ,
    left: (width/2) - (230/2),
    elevation:11,
    marginBottom:40

  },
  buttontext:{
    textAlign:'center',
    color:'white',
    //textTransform: 'uppercase',
    fontSize:28,    
  },
  text:{
      marginTop: 10,
      paddingLeft: 13
  },
  input: {
      height: 40,
      width: width-50,
      margin: 12,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderWidth: 1,
      padding: 10,
      
    },

    inputNumberAdress: {
      height: 40,
      width: 70,
      margin: 12,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderWidth: 1,
      borderRadius:5,
      padding: 10,
      
    },

    inputAddress: {
      height: 40,
      width: width-250,
      margin: 12,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,      
      borderWidth: 1,
      borderRadius:5,
      padding: 10,
      //backgroundColor:'#F9F9F9',
      
    },

    inputCodeAdress: {
      height: 40,
      width: width-325,
      margin: 12,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderWidth: 1,
      borderRadius:5,
      padding: 10,
      //backgroundColor:'#F9F9F9',
      
    },

    scroll: {
     width: width - 15,
     
    }
});


  const stylesInscriptionOwner = StyleSheet.create({
    button1:{
      backgroundColor:  '#D6A9B7',
        borderRadius:20,
        borderColor:'#6297BB',
        height: 80,
        width: 230,
        justifyContent:'center',
        marginTop: 40,
        left: (width/2) - (230/2),
        elevation:11,
        marginBottom:40
    },
  })

  const stylesReserver = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      //justifyContent: 'center',
      paddingTop: 20,
      //padding: 40
  
    },
  
    button1:{
      backgroundColor:  '#6297BB',
      borderRadius:20,
      borderColor:'#6297BB',
      borderWidth:1,
      height: 80,
      width: 230,
      justifyContent:'center',
      marginTop: 20,
      //left: width/5 ,
      left: (width/2) - (230/2),
      elevation:11,
      marginBottom:40

    },
    buttontext:{
      textAlign:'center',
      color:'white',
      //textTransform: 'uppercase',
      fontSize:22,    
    },
    text:{
        marginTop: 5,
        paddingLeft: 13,
    },
    input: {
        height: 40,
        width: width-50,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius:5,
        borderColor:'gray',
        
      },
      inputDate: {
        height: 45,
        width: width-345,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        borderRadius:5,
        borderColor:'gray',
        
      },
      inputMessage: {
        height: 90,
        width: width-50,
        margin: 10,
        borderWidth: 1,
        padding: 10,
        paddingTop:1,
        borderRadius:5,
        borderColor:'gray',
        
      },

      scroll: {
       width: width - 15,
       
      },

      
  });

  const stylesGerer = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgba(229, 206, 165,0.3)',
      //alignItems: 'center',
      //justifyContent: 'center',
      //paddingTop: 20,
      //padding: 40
  
    },
  
    button1:{
      backgroundColor:  '#575A5D',
      borderRadius:20,
      borderWidth:0,
      height: 70,
      width: 200,
      justifyContent:'center',
      marginBottom:20,
      marginTop:30,
      
  
    },
    buttontext:{
      textAlign:'center',
      color:'white',
      //textTransform: 'uppercase',
      fontSize:25
    },
    text1:{
      marginTop: 8,
      margin:20,
      fontSize: 15,
      color: '#575A5D'
      
  },
    text:{
        marginTop: 20,
        marginLeft:20,
        marginRight:20,
        fontSize: 17,
        color:'#575A5D',
        alignContent:'center'
        
    },
  
    scroll: {
       width: width - 15,
       
    },

    ensemble:{
        backgroundColor: 'rgba(243, 245, 246,0.7)' ,
        margin:25,
        marginLeft:50,
        width: 380,
        height:200,
        borderRadius: 20,      
        borderStyle:'solid',
        borderWidth: 0,
        alignItems: 'center',
        alignContent:'center',
        alignSelf:'center',
        
    },

     
  })

  const stylesGererModif = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      //alignItems: 'center',
      //justifyContent: 'center',
      paddingTop: 20,
      //padding: 40
  
    },
  
    button1:{
      backgroundColor:  '#CDB07D',
      borderRadius:20,
      //borderColor:'#6297BB',
      borderWidth:0,
      height: 80,
      width: 230,
      justifyContent:'center',
      marginTop: 40,
      //left: width/5 ,
      left: (width/2) - (230/2),
      elevation:11,
      marginBottom:40
  
    },
    buttontext:{
      textAlign:'center',
      color:'white',
      //textTransform: 'uppercase',
      fontSize:28,    
    },
    text:{
        marginTop: 10,
        paddingLeft: 13,
        fontSize: 15,
        color: '#98815B'
        
    },
    input: {
        height: 50,
        width: width-50,
        margin: 12,
        padding: 10,
        borderWidth:1,
        borderColor: '#CECECE',
        borderRadius: 15,
        
      },

      inputArea: {
        height: 100,
        width: width-50,
        margin: 12,
        flexDirection: 'row',
        top: 1,
        paddingLeft: 12,
        paddingVertical: 1,
        borderWidth:1,
        borderColor: '#CECECE',
        borderRadius: 15,
        
      },

      inputNonModif: {
        height: 50,
        width: width-50,
        margin: 12,
        padding: 10,
        borderWidth:1,
        borderColor: '#CECECE',
        borderRadius: 15,
        color:'#7F7F7F',
        backgroundColor: 'rgba(233, 232, 230, 0.3)'
      },
  
      scroll: {
       width: width - 15,
       
      },

      checkbox: {
        marginLeft: 20
      },

      checkboxText: {
        marginLeft: 5
      },

      ensemble:{
        backgroundColor: 'rgba(229, 206, 165, 0.2)' ,
        marginTop:10,
        width: 260,
        height:230,
        borderRadius: 20,
        right: -20,
      
        //textAlign:'center',        
        borderStyle:'solid',
        borderWidth: 0,
      },
      cadre:{
        elevation: 8,
         backgroundColor: '#F0F0F2',
         padding: 25,
         height: 100,
         width: 100, 
         margin: 10, 
         borderRadius: 15,
         marginBottom: 20
      },

      defaultImageWithOpacity: {
        width: 50,
         height: 50,
         opacity:0.1
      },

      defaultImageWithoutOpacity: {
        width: 50,
         height: 50,
      },


      cadreSansPadding:{
        elevation: 8,
         backgroundColor: '#F0F0F2',
         //padding: 25,
         height: 100,
         width: 100, 
         margin: 10, 
         borderRadius: 15,
         marginBottom: 20
      },

      image: {
        
         height: 100,
         width: 100, 
         borderRadius: 15
      }
  });

  const stylesHistorique = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EAEFEF',
      },
      scroll: {
        width: width - 15,
        
        
       },
       item: {
        backgroundColor:  'rgba(231, 208, 125,0.9)', 
        //padding: 20,
        marginVertical: 10,
        marginHorizontal: 16,
        borderRadius: 8,
        //height:360,
        alignItems:'center',
      },
      title: {
        fontSize: 15,
        marginTop:5,
        fontStyle:'italic'
        
      },
      
      viewTitle: {
        width:100,
         paddingTop:5
      },
  
      viewInfos: {
        width: width-156,
         paddingTop:5
      },
  
      infos: {
        fontSize: 16,
        marginTop:5,
        
      },
      nomEtabli: {
        fontSize: 25,
        paddingLeft:10
       // fontStyle:'italic'
      },
  
      view:{
        backgroundColor: 'rgba(235, 226, 191,1)',
        width: width-50,
        paddingBottom:5,
        paddingLeft:5,
        margin: 5,
        borderRadius: 5
        
      },
  
      
      viewChamps:{
        width: width-50,
        flexDirection:'row',
      },
  
      view2:{
        backgroundColor: 'rgba(235, 226, 191,1)',
        width: width-50,
        paddingBottom:5,
        paddingLeft:5,
        margin: 5,
        marginBottom: 15,
        borderRadius: 5
        
      },
  
      /*button: {
        backgroundColor: 'lightblue',
        width: 100,
        height:40
      }*/
      
  }); 

  
const stylesDemandeReservation = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#EAEFEF',
      
  
    },
    scroll: {
      width: width - 15,
      
      
     },
     item: {
      backgroundColor:  '#D1C8E3', 
      marginVertical: 10,
      marginHorizontal: 16,
      borderRadius: 8,
      alignItems:'center',
    },
    title: {
      fontSize: 15,
      marginTop:5,
      fontStyle:'italic'
      
    },
    
    viewTitle: {
      width:100,
       paddingTop:5
    },

    viewInfos: {
      width: width-156,
       paddingTop:5
    },

    infos: {
      fontSize: 16,
      marginTop:5,
      
    },
    nomEtabli: {
      fontSize: 25,
      paddingLeft:10
    },

    view:{
      backgroundColor: 'rgba(225, 220, 236,1)',
      width: width-50,
      paddingBottom:5,
      paddingLeft:5,
      margin: 5,
      borderRadius: 5
      
    },

    
    viewChamps:{
      width: width-50,
      flexDirection:'row',
    },

    view2:{
      backgroundColor: 'rgba(225, 220, 236,1)',
      width: width-50,
      paddingBottom:5,
      paddingLeft:5,
      margin: 5,
      marginBottom: 15,
      borderRadius: 5
      
    },

    /*button: {
      backgroundColor: 'lightblue',
      width: 100,
      height:40
    }*/
    
});

const stylesFavoris = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#EAEFEF'
      
  
    },

     item: {
      backgroundColor:  'rgba(109, 175, 180,0.5)', 
      marginVertical: 10,
      marginHorizontal: 16,
      borderRadius: 5,
      alignItems:'center',
    },
    title: {
      fontSize: 15,
      marginTop:5,
      fontStyle:'italic'
      
    },
    
    viewTitle: {
      width:100,
       paddingTop:5
    },

    viewInfos: {
      width: width-156,
      paddingTop:5,
      marginBottom:5,
    },

    infos: {
      fontSize: 16,
      marginTop:5,
      
    },
    nomEtabli: {
      fontSize: 25,
      alignSelf:'center',
      marginBottom:10,
     // fontStyle:'italic'
    },

    view:{
      backgroundColor: 'rgba(211, 231, 232,1)',
      width: width-50,
      paddingBottom:5,
      paddingLeft:5,
      margin: 5,
      borderRadius: 5,
      marginBottom:10,
      
    },

    
    viewChamps:{
      width: width-150,
      flexDirection:'row',
    },

    view2:{
      backgroundColor: 'rgba(225, 220, 236,1)',
      width: width-50,
      paddingBottom:5,
      paddingLeft:5,
      margin: 5,
      marginBottom: 15,
      borderRadius: 5
      
    },

    image:{width:200,
      height:200,
       marginBottom:10,
        borderRadius:5,
        alignSelf:'center'}
});

const stylesReservation = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#EAEFEF',

  
    },
    scroll: {
      width: width - 15,
      
     },
     item: {
      backgroundColor:  'rgba(138, 202, 162,0.6)', 
      //padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 8,
      //height:360,
      width: width-32,
      alignItems:'center',
    },
    title: {
      fontSize: 15,
      //marginBottom:10,
      marginTop:5,
      fontStyle:'italic'
      
    },
    nomPrenom: {
      fontSize: 25,
      alignItems:'center',
      alignContent:'center',
      paddingBottom:10,
      
     // fontStyle:'italic'
    },

    view:{
      backgroundColor: '#E4F7E8',
      width: width-50,
      paddingBottom:5,
      paddingLeft:5,
      margin: 5,
      borderRadius: 5
      
    },


    view2:{
      backgroundColor: '#E4F7E8',
      width: width-50,
      paddingBottom:5,
      paddingLeft:5,
      margin: 5,
      marginBottom: 15,
      borderRadius: 5
      
    },

    viewTitle: {
      width:100,
      paddingTop:5,
      
    },

    viewInfos: {
      width: width-156,
       paddingTop:5
    },

    infos: {
      fontSize: 16,
      marginTop:5,
      
    },

    viewChamps:{
      width: width-50,
      flexDirection:'row',
    },

    button1: {
      //backgroundColor:'rgba(195, 222, 205,0.2)',
      width: 50,
      height:44,
      //margin: 2,
      marginTop: 5,
      alignItems:'center',
      padding:4
    },

    button2: {
      //backgroundColor:'rgba(195, 222, 205,0.2)',
      width: 50,
      height:41,
      marginTop: 5,
      alignItems:'center',
      padding:4
    }
    
    
});






export {stylesFavoris,stylesGererModif,stylesGerer, stylesInscription, stylesInscriptionOwner, stylesReserver, stylesHistorique,stylesDemandeReservation, stylesReservation,width, height}
