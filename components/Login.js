import React, { Component, useState } from "react";
import {
  Alert,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import {MaterialCommunityIcons as Icon} from '@expo/vector-icons';
import * as SQLite from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

var db = SQLite.openDatabase("db.account");

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          hidePass: true,
          icon: 'eye',
          backgroundColor: '',
          borderColor: '',
        };
    }
    loginValidate=()=>{
        if(this.state.email == "" || this.state.password == ""){
          Alert.alert("Error Message", "Fields are empty")
        } else if (this.state.email.length < 7 || this.state.email.length > 16 || this.state.password.length < 5 || this.state.password.length > 16) {
          Alert.alert("Error Message", "Invalid input value")
        } 
        else {
          var keyLogin = this.state.email;
          db.transaction((tx) => {
            tx.executeSql(
              "SELECT email FROM account WHERE email = ? and password = ?",
              [this.state.email, this.state.password],
              (txObj, res) => {
                var check = res.rows.length
                if(check <= 0)
                {
                  alert("Account not exist !")
                }
                else{
                  AsyncStorage.setItem("id", this.state.email);
                  this.props.navigation.navigate('Home', {keyLogin: keyLogin})
                }
              },
              (txObj, error) => console.log("Error ", error)
            );
          });
        }
      }
    render(){
    // const [textInputEmail, setTextInputEmail] = useState('');
    // const [textInputPassword, setTextInputPassword] = useState('');
    // const [ShowPasswordAvailable, ShowPasswordUnavailable] = useState('');
    return (
    <View style={styles.container}>
        <ImageBackground source={require("../assets/back.jpg")} style={styles.backgroundImage}>
            <Text style={styles.logo}>RentalZ</Text>
            <View style={styles.Viewinput} >
                <TextInput  
                    style={styles.inputText}
                    placeholder="Username..." 
                    placeholderTextColor="#003f5c"
                    onChangeText={value => this.setState({email:value})}/>
            </View>
            <View style={styles.Viewinput} >
                <TextInput  
                    secureTextEntry={this.state.hidePass}
                    style={styles.inputText}
                    placeholder="Password..." 
                    placeholderTextColor="#003f5c"
                    // secureTextEntry={ShowPasswordAvailable ? false : true}
                    onChangeText={value => this.setState({password:value})} />
                {/* <TouchableOpacity
                    style={styles.ShowPasswordBtn}
                    onPress={() => {
                        ShowPasswordUnavailable(!ShowPasswordAvailable);
                    }}>
                        {ShowPasswordAvailable ? (
                        <Image
                        source={require("../assets/matmo.png")}
                        style={styles.showPassword}></Image>
                    ) : (
                        <Image
                        source={require("../assets/matdong.png")}
                        style={styles.showPassword}></Image>
                    )}
                </TouchableOpacity> */}
            </View>
            <TouchableOpacity>
                <Text style={styles.forgot} onPress={() =>this.props.navigation.navigate('UserInfo')}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}
                onPress={()=>this.loginValidate()}>
                <Text style={styles.logintext}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signupBtn}
                onPress={() =>this.props.navigation.navigate('Signup')} >
                <Text style={styles.loginText}>Signup</Text>
            </TouchableOpacity>
            
        </ImageBackground>
        
    </View>
    );
  };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#003f5c",
        alignItems: "center",
        justifyContent: "center",
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        alignItems: "center",
    },
    logo: {
        fontWeight: "bold",
        fontSize: 45,
        color: "#CCFF00",
        marginBottom: 40,
        marginTop: 140,
    },
    Viewinput:{
        width:"85%",
        backgroundColor:"#00CCFF",
        borderRadius:25,//vien goc button
        height:50,
        marginBottom:20,//khoảng cách giữa hai button
        justifyContent:"center",//căn giữ chữ trong button email and pass
        padding:20//Khoảng cách chữ cách về phía bên trái 
      },
    inputText:{
        height:50,
        color:"white"
    },
    forgot:{
        color:"#CC9900",
        fontSize:17
    },
    showPassword:{
        width: 30,
        height:  30,
    },
    ShowPasswordBtn:{
        position: "absolute",
        right: 10,
    },
    loginBtn:{
        width:"40%",
        backgroundColor:"#00CC33",
        borderRadius:40,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:20
      },
      loginText:{
        color:"#CC9900",
        fontSize:17
      },
      logintext:{
        color:"white"  
      }

});