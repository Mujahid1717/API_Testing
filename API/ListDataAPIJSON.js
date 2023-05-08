import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import {React,useEffect, useState} from 'react';

 const JsonServer = ()=>{
  const [data,setData] = useState([]);

  const getAPIData = async() =>{
      const url = 'http://10.0.2.2:3000/users';
      let result = await fetch(url);
      result = await result.json();
      setData(result);

  }
  useEffect (()=>{
    getAPIData();
  },[])

  return (
    // <ScrollView>
    <View>
            <Text style={styles.headerText}>API Testing</Text>
      {
        data.length ?<FlatList 
         data = {data}
         renderItem = {({item})=><View style ={styles.dataStyle}>
          <Text style={{fontSize:20,backgroundColor:'orange'}}>{item.id}</Text>
          <Text style={{fontSize:18}}> Name:{item.name}</Text>
          <Text style={{fontSize:18}}>Age:{item.age}</Text>
          <Text style={{fontSize:18}}>Email:{item.email}</Text>
         </View>}
        /> 
        :<Text>no data found</Text>
      }
      {/* {
        data.length?
        data.map((item)=><View style= {styles.dataStyle}>
           <Text style={{fontSize:20,backgroundColor:'grey'}}>{item.id}</Text>
          <Text style={{fontSize:18}}> ID:{item.id}</Text>
          <Text style={{fontSize:18}}> Name:{item.name}</Text>
          <Text style={{fontSize:18}}>Age:{item.age}</Text>
          <Text style={{fontSize:18}}>Email:{item.email}</Text>
        </View>
        )
        :null

      } */}
      
    {/* </ScrollView> */}
    </View>

  );
};
const styles = StyleSheet.create({
  headerText:{
    fontSize:24,
    fontWeight:'600',
    marginHorizontal:100,
    marginVertical:30
  },
  dataStyle:{
    borderBottomColor:'orange',
    borderBottomWidth:2,
    padding:10
  }
});
export default JsonServer;
