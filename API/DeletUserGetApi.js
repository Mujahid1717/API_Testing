import { StyleSheet, Text, View, FlatList } from 'react-native';
import {React,useEffect, useState} from 'react';
import { Button } from 'react-native';

 const DeleteUserGetApi = ()=>{
  const [data,setData] = useState([]);

  const getAPIData = async() =>{
    const url = 'http://10.0.2.2:3000/users';
    let result = await fetch(url,{
      method:'GET',
      headers:{'content-type':'application/json'},
    });
    result = await result.json();
    if(result){
    setData(result);
    }
}
const deleteUser = async (id) =>{
  const url = 'http://10.0.2.2:3000/users';
  // console.warn(`${url}/${id}`)
  let result = await fetch(`${url}/${id}`,{
    method:'delete',
    headers:{'content-type':'application/json'}
    })
    result = await result.json();
    if (result){
      console.warn('user deleted')
      getAPIData();
    }
}
useEffect (()=>{
  getAPIData();
},[])
  
  return (
    
    <View style={{flex:1}}>
          <Text style={styles.headerText}>API Testing</Text>    
      {
        data.length ?<FlatList 
         data = {data}
         renderItem = {({item})=><View style={styles.dataWrapper}>
          <View style={{flex:1}}><Text style={{fontSize:14}}> {item.name}</Text></View>
          <View style={{flex:1}}><Text style={{fontSize:14}}>{item.age}</Text></View>
          <View style={{flex:1}}><Text style={{fontSize:14}}>{item.email}</Text></View>
          <View style={{flex:1,marginTop:10}}><Button title='Delete' onPress={()=>deleteUser(item.id)}></Button></View>
          <View style={{flex:1,marginHorizontal:4,marginTop:10}}><Button title='Update'></Button></View>
         </View>}
        /> 
        :<Text>no data found</Text>
      }       
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
  dataWrapper:{
    flex:1,
    flexDirection:'row',
    borderWidth:1,
    borderColor:'orange',
    padding:5,
    margin:5,
    paddingHorizontal:10,
    backgroundColor:'orange',
  }
  
});
export default DeleteUserGetApi;
