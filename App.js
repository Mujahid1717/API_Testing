import { StyleSheet, Text, View, FlatList,Modal, TextInput ,Alert } from 'react-native';
import {React,useEffect, useState} from 'react';
import { Button } from 'react-native';

 const App = ()=>{
  const [data,setData] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [selectedUser,setSelectedUser]= useState(undefined)
  const [name,setName] = useState();
  const [age,setAge] = useState();
  const [email,setEmail] = useState();


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
const updateUser = (data) =>{
  setShowModal(true);
  setSelectedUser(data);
  setName(data.name);
  setAge(data.age.toString());
  setEmail(data.email);

}
const UpdateModal = (props)=>{


  // useEffect(()=>{
  //   if(props.selectedUser){
  //     setName(props.selectedUser.name);
  //     setAge(props.selectedUser.age.toString());
  //     setEmail(props.selectedUser.email);
  //   }
  // },[])

  return(<View style={styles.centeredView}>
    <View style ={styles.modalView}>
        <TextInput style={styles.input} value={name}
        onChangeText={(text)=> setName(text)}/>
        <TextInput style={styles.input} value ={age}
        onChangeText={(text)=>setAge(text)}/>
        <TextInput style={styles.input} value = {email}
        onChangeText={(text)=>setEmail(text)}/>
        <View style={{marginBottom:15}}><Button  title = "save" onPress={updateDataUser}/></View>
        <Button title="close" onPress={()=>props.setShowModal(false)}/>
    </View>
  </View>)
}
const updateDataUser = async()=>{
    const url = 'http://10.0.2.2:3000/users';
    const id = selectedUser.id;
 
    let result = await fetch(`${url}/${id}`,{
    method:'PUT',
    headers:{'content-type':'application/json'},
    body:JSON.stringify({"name":name,"age":age,"email":email})
    })
    result = await result.json();
    if (result){
      Alert.alert('Data',"User Updated")
      getAPIData();
      setShowModal(false);
    }


}
const deleteUser = async (id) =>{
  const url = 'http://10.0.2.2:3000/users';

  let result = await fetch(`${url}/${id}`,{
    method:'delete',
    headers:{'content-type':'application/json'}
    })
    result = await result.json();
    if (result){
      Alert.alert('Error','Are You Sure to delete user')
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
          <View style={{flex:1}}><Text style={{fontSize:14}}> {item.name.toUpperCase()}</Text></View>
          <View style={{flex:1}}><Text style={{fontSize:14}}>{item.age}</Text></View>
          <View style={{flex:1}}><Text style={{fontSize:14}}>{item.email}</Text></View>
          <View style={{flex:1,marginTop:10}}><Button title='Delete' onPress={()=>deleteUser(item.id)}></Button></View>
          <View style={{flex:1,marginHorizontal:4,marginTop:10}}><Button title='Update' onPress={()=>updateUser(item)}></Button></View>
         </View>}
        /> 
        :<Text>no data found</Text>
      } 
      <Modal visible= {showModal} transparent= {true}>
        <UpdateModal setShowModal = {setShowModal} selectedUser = {selectedUser} getAPIData = {getAPIData}/>
        
      </Modal>      
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
    borderColor:'gray',
    padding:5,
    margin:5,
    paddingHorizontal:5,
    backgroundColor:'skyblue',
  },
  centeredView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }, 
  modalView:{
    backgroundColor:'#fff',
    padding:20,
    borderRadius:10,
    shadowColor:'black',
    shadowOpacity:'0.70',
    elevation:5
  },
  input:{
    borderWidth:1,
    borderColor:'skyblue',
    width:300,
    marginBottom:15,
    fontSize:20
  }
  
});
export default App;
