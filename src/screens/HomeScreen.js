import React, {useContext, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  StatusBar,
  View,
  Image,
  FlatList,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {dummyData} from '../constants';

const HomeScreen = () => {
  const {
    userInfo,
    isLoading,
    logout,
    fetchProducts,
    fetchCountries,
    products,
    countries,
  } = useContext(AuthContext);

  useEffect(() => {
    fetchCountries();
    fetchProducts();

    

 
  }, []);

  function getCountryById(id) {
   
    const item = countries?.find(item => item?.id === id);
    console.log('initial data' + item);
    if (item) {
      return item?.name;
    } else {
      return '';
    }
  }

  return (
    <View style={{flex: 1}}>
      <Spinner visible={isLoading} />

      <StatusBar
        barStyle="light-content"
        translucent={true}
        backgroundColor="transparent"
      />

      <LinearGradient
        start={{x: 0.0, y: 0.4}}
        end={{x: 0.5, y: 1.0}}
        location={[0, 1]}
        colors={['#2D97DA', '#2249D6']}
        style={{flex: 1.2, flexDirection: 'column'}}>
        <View
          style={{
            flexDirection: 'column',
            marginTop: hp('10%'),
            paddingHorizontal: '5%',
            paddingBottom: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  fontFamily: 'Roboto-Regular',
                  fontSize: 16,
                  color: '#fff',
                  fontWeight: 'bold',
                }}>
                LoggedIn as:
              </Text>
              <Text
                style={{
                  fontFamily: 'Roboto-Medium',
                  color: '#fff',
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                {userInfo.customer.name}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                logout();
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../assets/images/logout.png')}
                  resizeMode="cover"
                  style={{width: 40, height: 40}}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flex: 2.5,
            backgroundColor: '#fff',
            paddingHorizontal: wp('5%'),
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            paddingTop: 10,
          }}>
          <View style={{flex: 1, flexDirection: 'column'}}>
            <Text
              style={{
                fontFamily: 'Roboto-Bold',
                fontSize: 22,
                color: 'black',
                textAlign: 'center',
                padding: 10,
                fontWeight: 'bold',
              }}>
              Products
            </Text>
            <Spinner visible={isLoading} />
            <FlatList
              keyExtractor={item => item.id}
              data={products}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    height: hp('10%'),
                    width: '100%',
                    borderWidth: 1,
                    borderColor: '#ddd',
                    borderRadius: 15,
                    justifyContent: 'space-between',
                    paddingRight: 10,
                    marginBottom: 10,
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{height: '65%'}}
                      resizeMode="contain"
                      source={dummyData.image1.image}
                    />

                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Roboto-Medium',
                          color: '#333',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'column',
                      backgroundColor: '#fff',
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 14,
                        color: '#333',
                      }}>
                      ${item.price}
                    </Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'green',
                          fontFamily: 'Roboto-Bold',
                          fontSize: 12,
                        }}>
                        {item.weight} KG
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontFamily: 'Roboto-Medium',
                        fontSize: 14,
                        color: '#333',
                      }}>
                      {getCountryById(item?.country_id)}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default HomeScreen;
