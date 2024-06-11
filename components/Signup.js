import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
} from "react-native";
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

var db = SQLite.openDatabase("db.account");

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:"",
      password:"",
      firstname:"",
      lastname:"",
      data: null,

      passwordC:"",
      hidePass: true,
      hidePassC: true,
      test: '',
    };
    this.dbCheck();
  }
  dbCheck() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS account(id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, firstname TEXT, lastname TEXT)"
      );
    });
  }
  create = () => {
    if(this.state.email == "" || this.state.password == "" || this.state.passwordC == "" || this.state.firstname == "" || this.state.lastname == ""){
      Alert.alert("Error Message", "Fields are empty")
    } else if (this.state.email.length < 5 || this.state.password == "" || this.state.passwordC == "" || this.state.firstname == "" || this.state.lastname == ""){
      Alert.alert("Error Message", "Invalid input")
    } else if (this.state.password != this.state.passwordC){
      Alert.alert("Error Message", "Password is not correct")
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT email FROM account WHERE email = ?",
          [this.state.email],
          (txObj, res) => {
            var check = res.rows.length
            if(check <= 0)
            {
              db.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO account(email, password, firstname, lastname) values (?, ?, ?, ?)",
                  [this.state.email, this.state.password, this.state.firstname, this.state.lastname,],
                );
              });
              this.props.navigation.replace('Login')
            }
            else{
              alert("Email existed !!!")
            }
          },
          (txObj, error) => console.log("Error ", error)
        );
      });
    }
  };
  render(){
        return (
          <View style={styles.container}>
            <ImageBackground source={require("../assets/findhome.jpg")} style={styles.backgroundImagehome}>
            <Text style={styles.logo}>Please fill in registration information! </Text>
            <View style={styles.inputView}>
              <TextInput
                style={styles.Textinput}
                // value={this.state.firstname}
                placeholder="First name..."
                placeholderTextColor="#4B0082"
                onChangeText={value => this.setState({firstname:value})}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.Textinput}
                // value={this.state.lastname}
                placeholder="Last name..."
                placeholderTextColor="#4B0082"
                onChangeText={value => this.setState({lastname:value})}/>
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.Textinput}
                // value={this.state.email}
                placeholder="Username..."
                placeholderTextColor="#4B0082"
                onChangeText={value => this.setState({email:value})}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                secureTextEntry={this.state.hidePass}
                style={styles.Textinput}
                // value={this.state.password}
                placeholder="Password..."
                placeholderTextColor="#4B0082"
                onChangeText={value => this.setState({password:value})}  
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                secureTextEntry={this.state.hidePassC}
                style={styles.Textinput}
                // value={this.state.password}
                placeholder="Confirm Password..."
                placeholderTextColor="#4B0082"
                onChangeText={value => this.setState({passwordC:value})}  
              />
              
            </View>
            <TouchableOpacity style={styles.button} onPress={() => this.create()}>
              <Text style={styles.linkText}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate("UserInfo")}>
              <Text style={styles.linkText}>View Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Login")}
            >
              <Text style={styles.linkText}>
                Already registered? Click here to Login
              </Text>
            </TouchableOpacity>
            </ImageBackground>
          </View>
        );
      }  
}  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#4B0082",
    marginBottom: 40, // cach voi button duoi
    marginTop: 30,
    padding: 25, // khoang cach ben trai

  },
  backgroundImagehome: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#4682B4",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
    borderColor: "#A9CCE3",
    borderWidth: 1,
  },
  Textinput: {
    height: 50,
    color: "#A52A2A",
  },
  forgot: {
    color: "#CC9900",
    fontSize: 17,
  },
  button: {
    width: "40%",
    backgroundColor: "#663399",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  linkText: {
    color: "#339900",
    fontWeight: "bold"
  },
});