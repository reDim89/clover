import React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput } from 'react-native-elements'


const SignUpForm = props => (
  <View>
    <FormLabel>
      Login
    </FormLabel>
    <FormInput
      autoCapitalize="none"
      autoFocus
      onChangeText={text => props.onChangeUsername(text)}
    />
    <FormLabel>
      Password
    </FormLabel>
    <FormInput
      secureTextEntry
      onChangeText={text => props.onChangePassword(text)}
    />
    <FormLabel>
      Email (used only to confirm signup)
    </FormLabel>
    <FormInput
      autoCapitalize="none"
      textContentType="emailAddress"
      onChangeText={text => props.onChangeEmail(text)}
    />
  </View>
);

export default SignUpForm;
