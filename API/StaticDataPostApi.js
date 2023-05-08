import { StyleSheet, Text, View, FlatList, ScrollView,Button } from 'react-native';
import {React,useEffect, useState} from 'react';

 const StaticDataAPI = ()=>{

  const data = 
    {
      name:"tony",
      age:23,
      email:"tony@gmail.com"
    }
  
  const saveAPIData =  async () => {
    const url = "http://10.0.2.2:3000/users";
    let result = await fetch(url ,{
      method:'POST',
      headers:{'content-type':"application/json"},
      body:JSON.stringify(data)
    })
    result =  await result.json();
    console.warn(result)
  }
  return (
    
    <View>
          <Text style={styles.headerText}>API Testing</Text>
          <Button title = "save data" onPress = {saveAPIData}></Button>
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
export default StaticDataAPI;
