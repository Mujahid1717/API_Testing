import { StyleSheet, Text, View, FlatList,Modal, TextInput } from 'react-native';
import {React,useEffect, useState} from 'react';
import { Button } from 'react-native';

 const PopulateDataDialog = ()=>{
  const [data,setData] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [selectedUser,setSelectedUser]= useState(undefined)

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

}
const UpdateModal = (props)=>{
  const [name,setName] = useState();
  const [age,setAge] = useState();
  const [email,setEmail] = useState();

  useEffect(()=>{
    if(props.selectedUser){
      setName(props.selectedUser.name);
      setAge(props.selectedUser.age.toString());
      setEmail(props.selectedUser.email);
    }
  },[props.selectedUser])

  return(<View style={styles.centeredView}>
    <View style ={styles.modalView}>
        <TextInput style={styles.input} value={name}/>
        <TextInput style={styles.input} value ={age}/>
        <TextInput style={styles.input} value = {email}/>
        <View style={{marginBottom:15}}><Button  title = "update"/></View>
        <Button title="close" onPress={()=>props.setShowModal(false)}/>
    </View>
  </View>)
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
          <View style={{flex:1,marginHorizontal:4,marginTop:10}}><Button title='Update' onPress={()=>updateUser(item)}></Button></View>
         </View>}
        /> 
        :<Text>no data found</Text>
      } 
      <Modal visible= {showModal} transparent= {true}>
        <UpdateModal setShowModal = {setShowModal} selectedUser = {selectedUser}/>
        
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
    borderColor:'orange',
    padding:5,
    margin:5,
    paddingHorizontal:5,
    backgroundColor:'orange',
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
export default PopulateDataDialog;
