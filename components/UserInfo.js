import React, { Component, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ImageBackground,
} from "react-native";
import * as SQLite from "expo-sqlite";

import { MaterialIcons as Icon } from '@expo/vector-icons';

var db = SQLite.openDatabase("db.account");

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        };
        this.fetchData();
    }
    fetchData = () => {
        db.transaction((tx) => {
            tx.executeSql(
            "SELECT * FROM account",
            null,
            (txObj, { rows: { _array } }) => this.setState({ data: _array }),
            (txObj, error) => console.log("Error ", error)
            );
        });
    };
    handleDelete = (id) => {
        console.log("delete called");
        Alert.alert(
        "Alert",
        "Are you sure to delete account " + id + "?",
        [
            {
                text: "Cancel",
                onPress: () => console.log("delete cancel"),
                style: "cancel",
            },
            {
                text: "OK",
                onPress: () => {
                    console.log("delete confirm");
                    this.delete(id);
                },
            },
        ],
        { cancelable: false }
        );
    };
    delete = (id) => {
        db.transaction((tx) => {
            tx.executeSql("DELETE FROM account WHERE id = ? ", [id],
                (txObj, resultSet) => {
                    if (resultSet.rowsAffected > 0) {
                        let newList = this.state.data.filter((data) => {
                        if (data.id === id) return false;
                        else return true;
                        });
                        this.setState({ data: newList });
                    }
                }
            );
        });
    };
   
  render(){
        // const {keyLogin} = this.props.route.params
        return (
          <View style={styles.container}>
            <ImageBackground source={require("../assets/backgroundhome.jpg")} style={styles.backgroundImagehome}>
                <Text style={styles.logo}>Information of users </Text>
                <ScrollView style={styles.scroll}>
                {this.state.data && this.state.data.map((data) => (
                    <View key={data.id}>
                  
                        <View style={styles.frame}>
                        <Image source= {require('../assets/icon2.png')} style={styles.img}/> 
                        <View style={{paddingLeft: 10, flex:1}}>
                            <Text style={styles.text}>Username: {data.email}</Text>
                            <Text style={styles.text}>Password: {data.password}</Text>
                            <Text style={styles.text}>Firstname: {data.firstname}</Text>
                            <Text style={styles.text}>Lastname: {data.lastname} </Text>
                            <Text style={styles.id}>[{data.id}]</Text>
                        </View>
                    </View>
              
                    <View style={styles.del}>
                        <TouchableOpacity style={styles.signUpBtn}  onPress={() => this.handleDelete(data.id)}>
                            <Text style={styles.textDel}>DELETE</Text>
                        </TouchableOpacity> 

                        <TouchableOpacity style={styles.editBtn}
                            onPress={()=>this.props.navigation.replace('Edit', {keyId: data.id})} >
                            <Text style={styles.textDel}>EDIT</Text>
                        </TouchableOpacity>

                    </View>

                    </View>
                ))}
                </ScrollView>
            
            </ImageBackground>
          </View>
        );
      }   
} 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#deedff',
        alignItems: 'center',
      },
      img: {
        borderWidth: 1,
        height: 100,
        width: 100,
        padding: 10,
        overflow: 'hidden'
      },
      backgroundImagehome: {
        width: "100%",
        height: "100%",
        alignItems: "center",
      },
      logo: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#4B0082",
        marginBottom: 40, // cach voi button duoi
        marginTop: 20,
        padding: 25, // khoang cach ben trai
    
      },
      frame:{
        borderWidth: 2,
        borderRadius: 5,
        marginBottom: 10,
        borderColor: "#3269ad",
        padding: 10,
        width: "100%",
        flexDirection: 'row'
      },
      scroll:{
        borderWidth: 0,
        borderColor: "#3269ad",
        width: "90%",
        paddingTop: 10
      }, 
      text: {
        borderWidth: 0,
        fontWeight:"bold",
        fontSize:15,
        color: "#3269ad",
        marginTop: 0,
      },
      del: {
        position: "absolute",
        borderWidth: 0,
        fontWeight:"bold",
        fontSize:15,
        color: "#3269ad",
        right: 10,
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      id: {
        position: "absolute",
        right: 10,

      },
      editBtn:
      {
        borderRadius:5,
        backgroundColor: "#3269ad",
        padding: 3,
        alignItems:"center",
        justifyContent:"center",
      },
      signUpBtn:{
        borderRadius:5,
        backgroundColor: "#3269ad",
        padding: 3,
        alignItems:"center",
        justifyContent:"center",
      },
      
});