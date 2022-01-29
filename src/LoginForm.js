import { View, Text, ActivityIndicator } from "react-native";
import React, { Component } from "react";
import { Input, Button } from "react-native-elements";

import firebase from "firebase";

export class LoginForm extends Component {
  // constructor(props) {
  //   super(props);

  // this.
  state = {
    email: "",
    password: "",
    error: " ",
    loading: false,
  };
  // this.onSignUp = this.onSignUp.bind(this);

  onSignUp() {
    const { email, password } = this.state;
    this.setState({ error: "", loading: true });
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(this.onLogSuccess.bind(this))
      .catch(() => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(this.onLogSuccess.bind(this))
          .catch(this.onLogFail.bind(this));
      });
  }

  onLogFail() {
    this.setState({
      error: "Email ou mot de passe invalide",
      loading: false,
      email: "",
      password: "",
    });
  }

  onLogSuccess() {
    this.setState({
      email: "",
      password: "",
      error: "",
      loading: false,
    });
  }

  renderButton() {
    if (this.state.loading) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="small" color="green" />
        </View>
      );
    }
    return (
      <Button
        onPress={this.onSignUp.bind(this)}
        title="Login"
        buttonStyle={{
          backgroundColor: "black",
          borderWidth: 2,
          borderColor: "white",
          borderRadius: 30,
        }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        titleStyle={{ fontWeight: "bold" }}
      />
    );
  }

  render() {
    return (
      <>
        <View
          style={{
            marginTop: 200,
            marginHorizontal: 15,
          }}
        >
          <Text style={{ color: "red", textAlign: "center", fontSize : 18 }}>
            {this.state.error}
          </Text>
          <Input
            value={this.state.email}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(email) => this.setState({ email })}
            placeholder="Email"
            leftIcon={{ type: "font-awesome", name: "envelope-square" }}
          />

          <Input
            value={this.state.password}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({ password })}
            placeholder="Mot de passe"
            leftIcon={{ type: "font-awesome", name: "lock" }}
          />
          {this.renderButton()}
        </View>
      </>
    );
  }
}

export default LoginForm;
