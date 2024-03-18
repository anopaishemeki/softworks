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

const RegisterScreen = ({navigation}) => {
  const [fname, setFname] = useState(null);
  const [lname, setLname] = useState(null);
  const [country_id, setCountry_id] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const {isLoading, register} = useContext(AuthContext);

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

            <View
              className="flex-1 bg-white px-8 pt-8"
              style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
              <View className="form space-y-2">
                <Text className="text-black font-bold ml-4">First Name</Text>
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  value={fname}
                  placeholderTextColor = "gray"
                  placeholder="Enter First Name"
                  onChangeText={text => setFname(text)}
                />
                <Text className="text-black font-bold ml-4">Last Name</Text>
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  value={lname}
                  placeholderTextColor = "gray"
                  placeholder="Enter Last Name"
                  onChangeText={text => setLname(text)}
                />
                <Text className="text-black font-bold ml-4">Country</Text>
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  value={country_id}
                  placeholderTextColor = "gray"
                  placeholder="Enter Country"
                  onChangeText={text => setCountry_id(text)}
                />
                <Text className="text-black font-bold ml-4">Phone No</Text>
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  value={phone}
                  placeholderTextColor = "gray"
                  placeholder="Enter Phone Number"
                  onChangeText={text => setPhone(text)}
                />
                <Text className="text-black font-bold ml-4">Email Address</Text>
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                  value={email}
                  placeholder="Enter email"
                  placeholderTextColor = "gray"
                  onChangeText={text => setEmail(text)}
                />
                <Text className="text-black font-bold ml-4">Password</Text>
                <TextInput
                  className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-8"
                  secureTextEntry
                  value={password}
                  placeholderTextColor = "gray"
                  placeholder="Enter password"
                  onChangeText={text => setPassword(text)}
                />

                <TouchableOpacity
                  className="py-3 bg-yellow-400 rounded-xl"
                  onPress={() => {
                    register(fname, lname, country_id, phone, email, password);
                  }}>
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
          </View>
        </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
      
    </LinearGradient>
  );
};

export default RegisterScreen;
