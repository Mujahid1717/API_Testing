import { StyleSheet, Text, View } from 'react-native';
import {React,useEffect, useState} from 'react';

const singleDataAPI = () => {
  useEffect(()=>{
    getApiData();

  },[])
  const [data,setData] = useState(undefined)

  const getApiData = async() =>{
    //calling api
    const url = "https://jsonplaceholder.typicode.com/posts/1";
    let result = await fetch(url);
    result = await result.json();
     setData(result)
  }
  return (
    <View>
      <Text style={styles.headerText}>API Testing</Text>
      {
        data?<View>
          <Text style = {{fontSize:30}}>{data.id}</Text>
          <Text style = {{fontSize:30}}>{data.userId}</Text>
          <Text style = {{fontSize:30}}>{data.title}</Text>
          <Text style = {{fontSize:30}}>{data.body}</Text>
        </View> :null
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
  }
});
export default singleDataAPI;