import React, {useContext, useState} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Image,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';
import * as yup from 'yup';
import { Formik } from 'formik';

const RegisterScreen = ({navigation}) => {
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [country_id, setCountry_id] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const {isLoading, register} = useContext(AuthContext);
  const SignInSchema = yup.object().shape({
    fname: yup.string().required('Firstname is required'),
    lname: yup.string().required('lastName is required'),
    country_id: yup.string().min(1,'Country_id must be atleast 1 digits ').max(1,'Country_id must be atmost 9 digits ').matches(/^[1-9]|10$/,"Enter digits only").required('Country_id is required'),
    phone: yup.string().required('Phone is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(3, 'Password must be at least 3 characters').required('Password is required'),

    });

  return (
    <LinearGradient
      start={{x: 0.0, y: 0.4}}
      end={{x: 0.5, y: 1.0}}
      location={[0, 1]}
      colors={['#2D97DA', '#2249D6']}
      style={{flex: 1.2, flexDirection: 'column'}}>
      
      <KeyboardAvoidingView style={{flex: 1}}>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator = {false}>
          <Spinner visible={isLoading} />
          <View>
            <View className="flex">
              <View className="flex-row justify-start">
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                  <ArrowLeftIcon size="28" color="black" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-center">
                <Image
                  source={require('../assets/welcome.png')}
                  style={{width: 165, height: 110}}
                />
              </View>
            </View>
            <Formik initialValues={{
            fname:"",
            lname:"",
            country_id:"",
            phone:"",
            email:"",
            password: "",

          }}
          validationSchema={SignInSchema}
          onSubmit={values =>{
            setFname(values.fname)
            setLname(values.lname)
            setCountry_id(values.country_id)
            setPhone(values.phone)
            setEmail(values.email)
            setPassword(values.password)
            register(fname, lname, country_id, phone, email, password);
            
          }
          }
          >
             {({values,errors,touched,handleSubmit,handleChange,setFieldTouched,isValid}) =>(
            <View
              className="flex-1 bg-white px-8 pt-8"
              style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
              <View className="form space-y-2">
                <Text className="text-black font-bold ml-4">First Name</Text>
                <TextInput
                  className="p-4 bg-gray-100 font-bold text-gray-700 rounded-2xl mb-3"
                  placeholderTextColor = "gray"
                  placeholder="Enter First Name"
                  value={values.fname}
                  onChangeText={handleChange('fname')}
                  onBlur={() =>{setFieldTouched('fname')}}
                />
                { touched.fname && errors.fname && <Text style={styles.errorTxt}>{errors.fname}</Text>}
                <Text className="text-black font-bold ml-4">Last Name</Text>
                <TextInput
                  className="p-4 bg-gray-100 font-bold text-gray-700 rounded-2xl mb-3"
                  placeholderTextColor = "gray"
                  placeholder="Enter Last Name"
                  value={values.lname}
                  onChangeText={handleChange('lname')}
                  onBlur={() =>{setFieldTouched('lname')}}
                />
                { touched.lname && errors.lname && <Text style={styles.errorTxt}>{errors.lname}</Text>}
                <Text className="text-black font-bold ml-4">Country</Text>
                <TextInput
                  className="p-4 bg-gray-100 font-bold text-gray-700 rounded-2xl mb-3"
            
                  placeholderTextColor = "gray"
                  placeholder="Enter Country"
                  value={values.country_id}
                  onChangeText={handleChange('country_id')}
                  onBlur={() =>{setFieldTouched('country_id')}}
                  keyboardType='phone-pad'
                />
                { touched.country_id && errors.country_id && <Text style={styles.errorTxt}>{errors.country_id}</Text>}
                <Text className="text-black font-bold ml-4">Phone No</Text>
                <TextInput
                  className="p-4 bg-gray-100 font-bold text-gray-700 rounded-2xl mb-3"
                 
                  placeholderTextColor = "gray"
                  placeholder="Enter Phone Number"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={() =>{setFieldTouched('phone')}}
                  keyboardType='phone-pad'
                />
                { touched.phone && errors.phone && <Text style={styles.errorTxt}>{errors.phone}</Text>}
                <Text className="text-black font-bold ml-4">Email Address</Text>
                <TextInput
                  className="p-4 bg-gray-100 font-bold text-gray-700 rounded-2xl mb-3"
                  
                  placeholder="Enter email"
                  placeholderTextColor = "gray"
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={() =>{setFieldTouched('email')}}
                  keyboardType='email-address'
                  
                />
                { touched.email && errors.email && <Text style={styles.errorTxt}>{errors.email}</Text>}
                <Text className="text-black font-bold ml-4">Password</Text>
                <TextInput
                  className="p-4 bg-gray-100 font-bold text-gray-700 rounded-2xl mb-8"
                  secureTextEntry
                  placeholderTextColor = "gray"
                  placeholder="Enter password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={() =>{setFieldTouched('password')}}
                />
                { touched.password && errors.password && <Text style={styles.errorTxt}>{errors.password}</Text>}

                <TouchableOpacity
                  className="py-3 bg-yellow-400 rounded-xl"
                  style ={{backgroundColor:isValid? "green":"yellow"}}
                  onPress={handleSubmit}
                  disabled= {!isValid}
                  >
                  <Text className="font-xl font-bold text-center text-gray-700">
                    Register
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-center m-7">
                <Text className="text-gray-500 font-semibold px-2 ">
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text className="font-semibold text-yellow-500">Login</Text>
                </TouchableOpacity>
              </View>
            </View>
            )}
            </Formik>
          </View>
        </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
      
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

export default RegisterScreen;
