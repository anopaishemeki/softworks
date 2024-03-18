import React, {useContext, useState} from 'react';
import {
  StatusBar,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  
  Image, KeyboardAvoidingView, ScrollView,
  Button,
  Alert
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient'
import * as yup from 'yup';
import { Formik } from 'formik';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const {isLoading, login} = useContext(AuthContext);

  const LogInSchema = yup.object().shape({
   
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(3, 'Password must be at least 3 characters').required('Password is required'),
    });

    
     

  return (
   
    <LinearGradient start={{x:0.0,y:0.4}} end={{x:0.5,y:1.0}} location={[0,1]} colors={['#2D97DA','#2249D6']} style={{flex:1.2,flexDirection:'column'}} >
     <SafeAreaView>
    <KeyboardAvoidingView >
      <StatusBar barStyle='light-content' translucent={true} backgroundColor='transparent' />
      
      <ScrollView showsVerticalScrollIndicator ={false} >
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
          <Formik initialValues={{
            email:"",
            password: "",
          }}
          validationSchema={LogInSchema}
          onSubmit={values =>{
            
            setEmail(values.email)
            setPassword(values.password)
            login(email, password)}
          }
          >
            {({values,errors,touched,handleSubmit,handleChange,setFieldTouched,isValid}) =>(
          <View
            className="flex-1 bg-white px-8 pt-8"
            style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 ,borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
          >
            <View className="form space-y-2">
              <Text className="text-black font-bold ml-4">Email Address</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 font-bold rounded-2xl "
                value={values.email}
                autoCapitalize={false}
                onChangeText={handleChange('email')}
                placeholder="Enter Email"
                placeholderTextColor = "gray"
                onBlur={() =>{setFieldTouched('email')}}
              />
              { touched.email && errors.email && <Text style={styles.errorTxt}>{errors.email}</Text>}
              <Text className="text-black font-bold ml-4">Password</Text>
              <TextInput
                className="p-4 bg-gray-100 text-gray-700 font-bold rounded-2xl "
                secureTextEntry
                autoCapitalize={false}
                value={values.password}
                onChangeText={handleChange('password')}
                placeholderTextColor = "gray"
                placeholder="Enter Password"
                onBlur={() =>{setFieldTouched('password');}}
              />
              {touched.password && errors.password && <Text style={styles.errorTxt}>{errors.password}</Text>}
             
              <TouchableOpacity style ={{backgroundColor:isValid? "green":"yellow"}} className="py-3 rounded-xl"
               onPress={handleSubmit}
               disabled= {!isValid}
               >
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
          )}
          </Formik>
        </View>
       
      
    </View>
  
    </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    errorTxt: {
        fontSize: 12,
        color: "#FF0D10",
        textAlign: 'center',
    },
}); 



export default LoginScreen;
