import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [products, setProducts] = useState({});
  const [countries, setCountries] = useState({});
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);

  const register = async (fname, lname, country_id, phone, email, password) => {
    setIsLoading(true);
    setError(false);
    console.log(fname, lname, country_id, phone, email, password);

    await axios
      .post(`${BASE_URL}/customer/signup`, {
        fname,
        lname,
        country_id,
        phone,
        email,
        password,
      })
      .then(res => {
        setIsLoading(false);
        setError(false);
        console.log(res.data);
      })
      .catch(e => {
        setError(true);
        console.log(`register error ${e?.message}`);
        setIsLoading(false);
      });
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError(false);

    await axios
      .post(`${BASE_URL}/customer/signin`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        console.log(userInfo);
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
      })
      .catch(e => {
        setError(true);
        console.log(`login error ${e?.message}`);
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