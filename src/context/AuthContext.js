import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [registerInfo, setRegisterInfo] = useState({});
  const [products, setProducts] = useState({});
  const [countries, setCountries] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = async (fname, lname, country_id, phone, email, password) => {
    setIsLoading(true);
    setError(false);
    console.log(fname, lname, country_id, phone, email, password);

    await fetch(`${BASE_URL}/customer/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fname,
        lname,
        country_id,
        phone,
        email,
        password,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(JSON.stringify(responseData));
        setRegisterInfo(responseData);
        setIsLoading(false);
        setError(true);
        console.log(responseData);
      });
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError(false);

    await fetch(`${BASE_URL}/customer/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => response.json())
      .then(responseData => {
        console.log(JSON.stringify(responseData));
        let userInfo = responseData;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      });
  };

  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem('userInfo');
    setUserInfo({});
    setIsLoading(false);
  };

  const fetchProducts = async () => {
    await axios
      .get(`${BASE_URL}/products`, {
        headers: {Authorization: `Bearer ${userInfo.token}`},
      })
      .then(res => {
        setProducts(res.data);
        console.log(products);
      });
  };
  const fetchCountries = async () => {
    await axios
      .get(`${BASE_URL}/countries`, {
        headers: {Authorization: `Bearer ${userInfo.token}`},
      })
      .then(res => {
        setCountries(res.data);
        console.log(countries);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      console.log(userInfo);
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        registerInfo,
        splashLoading,
        register,
        login,
        logout,
        fetchProducts,
        fetchCountries,
        products,
        countries,
        error,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
