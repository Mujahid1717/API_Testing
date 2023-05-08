import { StyleSheet, Text, View, FlatList, ScrollView,Button, TextInput } from 'react-native';
import {React,useEffect, useState} from 'react';

 const FormDataPostApi = ()=>{
  const [name,setName] = useState('');
  const [age,setAge] = useState(0);
  const [email,setEmail] = useState('');
  
  const saveAPIData =  async () => {
    const url = "http://10.0.2.2:3000/users";
    let result = await fetch(url ,{
      method:'POST',
      headers:{'content-type':"application/json"},
      body:JSON.stringify({name:name,age:age,email:email})
    })
    result =  await result.json();
    console.warn(result)
  }
  return (
    
    <View>
          <Text style={styles.headerText}>API Testing</Text>
          <TextInput placeholder = "Enter Name" 
            style = {styles.input}
            value = {name}
            onChangeText={(text)=>setName(text)}
          />
          <TextInput placeholder = "Enter Age" 
            style = {styles.input}
            value = {age}
            onChangeText={(text)=>setAge(text)}
          />
          <TextInput placeholder = "Enter Email" 
            style = {styles.input}
            value = {email}
            onChangeText={(text)=>setEmail(text)}
          />
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
  },
  input:{
    borderColor:'gray',
    borderWidth:1,
    margin:20,
    fontSize:20
  }
});
export default FormDataPostApi;
