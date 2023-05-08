import { StyleSheet, Text, View, FlatList, ScrollView } from 'react-native';
import {React,useEffect, useState} from 'react';

 const ListDataMap = ()=>{
  const [data,setData] = useState([]);

  const getAPIData = async() =>{
      const url = 'https://jsonplaceholder.typicode.com/posts';
      let result = await fetch(url);
      result = await result.json();
      setData(result);

  }
  useEffect (()=>{
    getAPIData();
  },[])

  return (
    <ScrollView>
      <Text style={styles.headerText}>API Testing</Text>
      {/* {
        data.length ?<FlatList 
         data = {data}
         renderItem = {({item})=><View style ={styles.dataStyle}>
          <Text style={{fontSize:20,backgroundColor:'orange'}}>{item.id}</Text>
          <Text style={{fontSize:18}}>{item.userId}</Text>
          <Text style={{fontSize:18}}>{item.title}</Text>
          <Text style={{fontSize:18}}>{item.body}</Text>
         </View>}
        /> 
        :<Text>no data found</Text>
      } */}
      {
        data.length?
        data.map((item)=><View style= {styles.dataStyle}>
           <Text style={{fontSize:20,backgroundColor:'grey'}}>{item.id}</Text>
          <Text style={{fontSize:18}}>{item.userId}</Text>
          <Text style={{fontSize:18}}>{item.title}</Text>
          <Text style={{fontSize:18}}>{item.body}</Text>
        </View>
        )
        :null

      }
      
    </ScrollView>
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
export default ListDataMap;
