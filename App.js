import React, { Component } from "react";

import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Input, Button } from "react-native-elements";

import * as firebase from "firebase";

import LoginForm from "./src/LoginForm";
import Loading from "./src/Loading";

const firebaseConfig = {
  apiKey: "AIzaSyAst9c0tsdOEPk0BM4GiOP0kbt2RpSuots",
  authDomain: "authentifier-e99ac.firebaseapp.com",
  projectId: "authentifier-e99ac",
  storageBucket: "authentifier-e99ac.appspot.com",
  messagingSenderId: "667004086334",
  appId: "1:667004086334:web:a3e549b5a0192ceecb896f",
  measurementId: "G-MNHFY4KG7X",
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export class App extends Component {
  _isMount = false;
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }
  componentDidMount() {
    this._isMount = true;
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }
  
  componentWillUnmount() {
    this._isMount = false;
  }

  onLogout() {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      
    }).catch((error) => {
      // An error happened.
      <Text style={{textAlign:'center', color:"red"}}>Oups une erreur s'est produite</Text>
    });
    
  }

  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return <Loading />;
    }
    if (!loggedIn) {
      return (
        <SafeAreaProvider>
          <View>
            <View style={styles.view}>
              <Text style={styles.textStyle}>Authentification</Text>
            </View>
            <LoginForm />
          </View>
        </SafeAreaProvider>
      );
    }
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Text>Félicitation, Vous ètes connecté</Text>
          <Button
            onPress={this.onLogout.bind(this)}
            title="Log Out"
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
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  view: {
    // backgroundColor: "cyan",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    paddingTop: 15,
    marginTop: 25,
    // shaddowColor: '#000',
    // shaddowOffset: {witdh: 0, height: 2},
    // shaddowOpacity: 2,
    position: "relative",
  },
  textStyle: {
    fontSize: 25,
  },
});

export default App;
