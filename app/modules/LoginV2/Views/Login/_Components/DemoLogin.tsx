import React from "react";
import { TouchableOpacity } from "react-native";

const DemoLogin = props => {
  const view = props.view;
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          view.onChangeText('christian.locatelli.dev@gmail.com', 'email');
          view.onChangeText('12345678', 'password');
        }}
        style={{
          backgroundColor: 'black',
          width: 50,
          height: 50,
          position: 'absolute',
          zIndex: 3,
          left: 15,
          top: 0,
          borderRadius: 25,
          opacity: 0.01,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          // view.onChangeText('test11@federicoferri.me', 'email');
          // view.onChangeText('Password1', 'password');
          view.onChangeText('jeannahrae@gmail.com', 'email');
          view.onChangeText('Akffjro123!', 'password');
        }}
        style={{
          backgroundColor: 'black',
          width: 50,
          height: 50,
          position: 'absolute',
          zIndex: 3,
          right: 180,
          top: 0,
          borderRadius: 25,
          opacity: 0.01,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          // view.onChangeText('federico@federicoferri.me', 'email');
          // view.onChangeText('password', 'password');
          // view.onChangeText('federico3.ferri@mail.polimi.it', 'email');
          // view.onChangeText('password', 'password');
        }}
        style={{
          backgroundColor: 'black',
          width: 50,
          height: 50,
          position: 'absolute',
          zIndex: 3,
          right: 15,
          top: 0,
          borderRadius: 25,
          opacity: 0.01,
        }}
      />
    </>
  );
};

export default DemoLogin;
