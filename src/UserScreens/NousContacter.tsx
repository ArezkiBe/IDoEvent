
import { Text, View,ScrollView, Image} from 'react-native';




export default function NousContacter(props:any) {
  
  return (
    
    <View style={styles.container}>
      
      <ScrollView style={styles.scroll}>
        
            <View style={{alignItems:'center'}}>
              <View style={styles.viewInfos}>
                    <Text style={styles.text}>RAMOUL Racha:</Text>
                    <Text style={{fontSize:18}}>  rachaafaf15@gmail.com{'\n'}</Text>
              </View>

              <View style={styles.viewInfos}>
                    <Text style={styles.text}>BOUAKI Sani Jean Arthur:</Text>
                    <Text style={{fontSize:18}}>204bouaki.Arthur@gmail.com {'\n'}</Text>
              </View>

              <View style={styles.viewInfos}>
                  <Text style={styles.text}>BEGGAR Arezki:</Text>
                  <Text style={{fontSize:18}}>beggararezki@gmail.com{'\n'}</Text>
              </View>

              <View style={styles.viewInfosdernier}>
                <Text style={styles.text}>BIRABOURAME Hemavathi:</Text>
                <Text style={{fontSize:18}}>hema932001@gmail.com{'\n'}</Text>
              </View>   
            
            </View>
            <View style={{ flexDirection:'row-reverse'}}>
            </View>
     </ScrollView>
    </View>
  );
}
import {StyleSheet, Dimensions } from 'react-native';

const width=Dimensions.get('window').width;
const height=Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 90,    
      },
      scroll: {
        width: width - 15,
        
       },

       text: {
        fontSize:18, 
        textAlign:'center',
         width:350,
         //borderBottomWidth:2,
        //borderBottomColor:'#FAEBC4'
       },

       viewInfos:{
        width:300,
        alignItems:'center',
        padding:10,
        borderBottomWidth: 1,
        marginTop:20,
        borderBottomColor:'#CEAE51'
       },
       viewInfosdernier:{
        width:300,
        alignItems:'center',
        padding:20,
        marginTop:20,
        
       }
    
      
 });
  
  
  
  