import React, {useContext, useState} from 'react';
import {
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Image, KeyboardAvoidingView, ScrollView
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);

  return (
   
    <LinearGradient start={{x:0.0,y:0.4}} end={{x:0.5,y:1.0}} location={[0,1]} colors={['#2D97DA','#2249D6']} style={{flex:1.2,flexDirection:'column'}} >
     <SafeAreaView>
    <KeyboardAvoidingView >
      <StatusBar barStyle='light-content' translucent={true} backgroundColor='transparent' />
      
      <ScrollView  >
      <Spinner visible={isLoading} />
        
          <View >

        <View >
          <View className="flex">
            <View className="flex-row justify-center">
              <Image
                source={require("../assets/welcome.png")}
                style={{ width: 250, height: 250 }}
              />
            </View>
          </View>
          <View
            className="flex-1 bg-white px-8 pt-8"
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 ,borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
          >
            <View className="form space-y-2">
              <Text className="text-gray-700 ml-4">Email Address</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                value={email}
                onChangeText={value => setEmail(value)}
                placeholder="Enter Email"
              />
              <Text className="text-gray-700 ml-4">Password</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-8"
                secureTextEntry
                onChangeText={value => setPassword(value)}
                
                placeholder="Enter Password"
              />
             
              <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl"
               onPress={()=>login(email, password)}>
                <Text className="font-xl font-bold text-center text-gray-700">
                  Login
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-center mt-7 mb-11">
              <Text className="text-gray-500 font-semibold px-2 ">
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
              >
                <Text className="font-semibold text-yellow-500">SignUp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
       
      
    </View>
  
    </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
    </LinearGradient>
  );
};



export default LoginScreen;
