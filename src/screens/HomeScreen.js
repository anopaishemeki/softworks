import React, {useContext, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, TextInput, TouchableOpacity,StatusBar, View,Image, FlatList,KeyboardAvoidingView, ScrollView} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Search,Dashboard} from '../screens'
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

import {dummyData} from '../constants'
import { ProfitIndicator,ActionCenter } from '../components'
const Tab = createBottomTabNavigator();

const HomeScreen = ({navigation}) => {
  const {userInfo, isLoading, logout, fetchProducts, fetchCountries,products,countries} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [country_id, setCountry_id] = useState("");
  const [phone, setPhone] = useState("");
  var a;
  const [password, setPassword] = useState("");
  useEffect(() => {
    fetchProducts()
    fetchCountries();
    console.log("Fetching products : " +products)
    

    console.log('length:'+products);
    console.log('length:'+dummyData.coins);
  },[]);

  function getCountryById(id) {
    // Find the item with the given ID
    const item = countries.find(item => item.id === id);
    if (item) {
      return item.name;
  } else {
      return "";
  }
  }

  return (
    // <View style={styles.container}>
    //   <Spinner visible={isLoading} />
      
    //   <Text style={styles.welcome}>Welcome {userInfo.customer.name}</Text>
    //   <Button title="Logout" color="red" onPress={logout} />
    // </View>


<View style={{flex:1}} >
    <Spinner visible={isLoading} />
            {/* Statusbar */}
            <StatusBar barStyle='light-content' translucent={true} backgroundColor='transparent' />
            {/* Header section */}
            <LinearGradient start={{x:0.0,y:0.4}} end={{x:0.5,y:1.0}} location={[0,1]} colors={['#2D97DA','#2249D6']} style={{flex:1.2,flexDirection:'column'}} >
                <View style={{flexDirection:'column',marginTop:hp('10%'),paddingHorizontal:'5%', paddingBottom:20}} >
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'flex-start'}} >
                    {/* Welcome message and name */}
                    <View style={{flexDirection:'column'}} >
                        <Text style={{fontFamily:'Roboto-Regular',fontSize:16,color:'#fff'}} >Welcome Back</Text>
                        <Text style={{fontFamily:'Roboto-Medium',color:'#fff',fontSize:22}} >{userInfo.customer.name}</Text>
                    </View>

                    {/* Bell icon and profile pic */}
                    <TouchableOpacity
                      onPress={()=>{logout()}}
                      >
                    <View style={{flexDirection:'row',alignItems:'center'}} >
                        {/* <Icon name='logout' size={30} color="#fff" /> */}
                        <Image source={require('../assets/images/avatar.jpg')} resizeMode='cover' style={{width:40,height:40,borderRadius:20,marginLeft:15}} />
                    </View>
                    </TouchableOpacity>
                </View>

                
                
            </View>

            
            
            
            <View style={{flex:2.5,backgroundColor:'#fff',paddingHorizontal:wp('5%'), borderTopLeftRadius:50, borderTopRightRadius:50, paddingTop:10}} >
                
        

                
                

                
                <View style={{flex:1,flexDirection:'column'}} >
                   
                    <Text style={{fontFamily:'Roboto-Bold',fontSize:22,color:'#333', textAlign: 'center', padding:10}} >Products</Text>

                   
                    <FlatList
                        keyExtractor={(item)=>item.id}
                        data={products}
                        renderItem={({item})=>(
                            <View style={{flexDirection:'row',height:hp('10%'),width:'100%',borderWidth:1,borderColor:'#ddd',borderRadius:15,justifyContent:'space-between',paddingRight:10,marginBottom:10}} >
                                
                                <View style={{flexDirection:'row',alignItems:'center'}} >
                                    
                                    <Image style={{height:'65%'}} resizeMode="contain" source={dummyData.image1.image} />

                                    
                                    <View style={{flexDirection:'column',justifyContent:'flex-start'}} >
                                        <Text style={{fontFamily:'Roboto-Medium',color:'#333',fontSize:20}} >{item.name}</Text>
                                    </View>
                                </View>


                              
                                <View style={{flexDirection:'column',backgroundColor:'#fff',alignContent:'center',justifyContent:'center'}} >
                                    
                                    <Text style={{fontFamily:'Roboto-Medium',fontSize:14,color:'#333'}} >${item.price}</Text>

                                    
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}} >
                                        <Text style={{color: 'green',fontFamily:'Roboto-Bold',fontSize:12}} >{item.weight} KG</Text>
                                        
                                        

                                    </View>
                                    <Text style={{fontFamily:'Roboto-Medium',fontSize:14,color:'#333'}} >{getCountryById(item.id)}</Text>
                                </View>

                            </View>
                        )}
                    />

                </View>
                


            </View>
            </LinearGradient>
            
        </View>

  
   
)};



export default HomeScreen;
