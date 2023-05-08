import { StyleSheet, Text, View, FlatList,Button, TextInput } from 'react-native';
import {React,useEffect, useState} from 'react';

 const App = ()=>{
  const [name,setName] = useState('');
  const [age,setAge] = useState(0);
  const [email,setEmail] = useState('');

  const [nameError,setNameError] = useState(false);
  const [ageError,setAgeError] = useState(false);
  const [emailError,setEmailError] = useState(false);

  // const clearData = () => {
  //   setName('');
  //   setAge('');
  //   setEmail('');
  // }
  const saveAPIData =  async () => {

  //  if(!name){
  //   setNameError(true)
  //  }else{
  //   setNameError(false)
  //  }
  {!name? setNameError(true):setNameError(false)}
  //  if(!age){
  //   setAgeError(true)
  //  }else{
  //   setAgeError(false) 
  //  }
  {!age? setAgeError(true):setAgeError(false)}
  //  if(!email){
  //   setEmailError(true)
  //  }else{
  //   setEmailError(false)
  //  }
  {!email? setEmailError(true):setEmailError(false)}
   if(!name || !age || !email){
    return false
   }
    const url = "http://10.0.2.2:3000/users";
    let result = await fetch(url ,{
      method:'POST',
      headers:{'content-type':"application/json"},
      body:JSON.stringify({name,age,email})
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
          {nameError?<Text style={styles.errorText}>Please Enter the Name</Text>:null}
          <TextInput placeholder = "Enter Age" 
            style = {styles.input}
            value = {age}
            onChangeText={(text)=>setAge(text)}
          />
          {ageError?<Text style={styles.errorText}>Please Enter the Age</Text>:null}
          <TextInput placeholder = "Enter Email" 
            style = {styles.input}
            value = {email}
            onChangeText={(text)=>setEmail(text)}
          />
          {emailError?<Text style={styles.errorText}>Please Enter the Email</Text>:null}
          <View style = {styles.btn1}>
          <Button title = "save data" onPress = {saveAPIData}></Button>
          </View>
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
    fontSize:20,
    marginBottom:5,
    paddingHorizontal:10
    
  },
  errorText:{
    color:'red',
    marginLeft:20
  },
  btn1:{
    margin:20,
    
  }

});
export default App;
