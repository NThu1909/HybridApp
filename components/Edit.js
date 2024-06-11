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
import * as SQLite from "expo-sqlite";

var db = SQLite.openDatabase("db.account");

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          email:"",
          password:"",
          firstname:"",
          lastname: "",
          data: null,
    
          passwordC:"",
          hidePass: true,
          hidePassC: true,
          test: '',
        };
        this.fetchData();
      }
    fetchData = () => {
        const {keyId} = this.props.route.params;
        db.transaction((tx) => {
            tx.executeSql(
            "SELECT * FROM account where id = ?", [keyId],
            (txObj, { rows: { _array } }) => this.setState({ data: _array }),
            (txObj, error) => console.log("Error ", error)
            );
        });
    };
    edit = () => {
        const { keyId } = this.props.route.params;
        if (
          this.state.password == "" ||
          this.state.firstname == "" ||
          this.state.lastname == "" 
        ) {
          Alert.alert("Error Message", "Fields are empty");
        } else if (this.state.password == this.state.passwordC) {
          db.transaction((tx) => {
            tx.executeSql(
              "UPDATE Account set password = ?, firstname = ?, lastname = ? where id = ?",
              [
                this.state.password,
                this.state.firstname,
                this.state.lastname,
                keyId,
              ],
              (txObj, resultSet) => {
                if (resultSet.rowsAffected > 0) {
                  console.log("edit passed");
                }
              }
            );
          });
          Alert.alert("Message", "Edit successful");
          this.props.navigation.navigate("UserInfo", {keyId});
        } else {
          Alert.alert("Error Message", "Confirm password incorrect");
        }
      };
    render(){
        const {keyId} = this.props.route.params;
    return (
        <View style={{flex:1}}>
        {this.state.data && this.state.data.map((data) => (
          <View style={{flex:1}} key={data.id}>
        <View style={styles.container}>
          <ImageBackground source={require("../assets/backgroundhome.jpg")} style={styles.backgroundImagehome}>
          <Text style={styles.logo}>Edit Users Information!! </Text>
          <View style={styles.outView}>
          <View style={styles.inputView}>
              
            <TextInput
              defaultValue = {data.firstname}
              autoFocus={false}
              style={styles.Textinput}
              // value={this.state.firstname}
              placeholder="First name..."
              placeholderTextColor="#4B0082"
              onChangeText={value => this.setState({firstname:value})}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              defaultValue = {data.lastname}
              autoFocus={false}
              style={styles.Textinput}
              // value={this.state.lastname}
              placeholder="Last name..."
              placeholderTextColor="#4B0082"
              onChangeText={value => this.setState({lastname:value})}/>
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
          </View>
          <TouchableOpacity style={styles.button} onPress={() => this.edit()}>
            <Text style={styles.linkText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}
          >
              <Text style={styles.linkText}>
                Back to User's Information
              </Text>
          </TouchableOpacity>
          </ImageBackground>
        </View>
        </View>
         ))}
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
      marginTop: 110,
      padding: 25, // khoang cach ben trai
  
    },
    outView: {
        width: "100%",
        alignItems: "center",
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
      marginBottom: 22,
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
      color: "#6A5ACD",
    },
  });