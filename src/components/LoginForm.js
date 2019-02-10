/*
Простая вьюха, которая принимает в пропсы функции, меняющие стейт родительского контейнера.
Подробнее тут: https://rakeemthomas.com/React-Updating-State-from-Child-Components/,
 */

import React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements';

const LoginForm = (props) => (
  <View>
    <FormLabel>Login</FormLabel>
    <FormInput
      onChangeText={text => props.onChangeUsername(text)}
      autoCapitalize='none'
    />
    <FormLabel >Password</FormLabel>
    <FormInput
      onChangeText={text => props.onChangePass(text)}
      secureTextEntry
    />
  </View>
);

export default LoginForm;
