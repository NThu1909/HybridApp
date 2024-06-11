import React, { Component, useState } from "react";
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

var db = SQLite.openDatabase("db.orders");
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property: "",
      bedrooms: "",
      datetime: "",
      monthlyrentprice: "",
      furniture: "",
      note: "",
      reporter: "",
    };
    this.dbCheck();
  }
  dbCheck() {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS orders(ID INTEGER PRIMARY KEY AUTOINCREMENT, property TEXT, bedroom TEXT, datetime TEXT, monthlyrentprice INTEGER, furniture TEXT, note TEXT, reporter TEXT)"
      );
    });
  }
  create = () => {
    if (this.state.property == "" || this.state.bedrooms == "" || this.state.datetime == "" || this.state.reporter == "" || this.state.monthlyrentprice == "" ) {
      Alert.alert("Error Message", "Fields are empty")
    } else if (this.state.property == "" || this.state.bedrooms == "" || this.state.datetime.length < 8 || this.state.reporter == "" || this.state.monthlyrentprice == "") {
      Alert.alert("Error Message", "Invalid input")
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT property FROM orders WHERE property = ?",
          [this.state.property],
          (txObj, res) => {
            var check = res.rows.length
            if (check <= 0) {
              db.transaction((tx) => {
                tx.executeSql(
                  "INSERT INTO orders(property, bedroom, datetime, monthlyrentprice, furniture, note, reporter) values (?, ?, ?, ?, ?, ?, ?)",
                  [this.state.property, this.state.bedrooms, this.state.datetime, this.state.monthlyrentprice, this.state.furniture, this.state.note, this.state.reporter,],
                );
              });
              this.props.navigation.replace('Home')
            }
            else {
              alert("Order already exists !!!")
            }
          },
          (txObj, error) => console.log("Error ", error)
        );
      });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/nhatreo.jpg")} style={styles.backgroundImagehome}>
          <Text style={styles.logo}>Please fill out the form!
          </Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.Textinput}
              placeholder="Property type..."
              placeholderTextColor="#4B0082"
              onChangeText={value => this.setState({ property: value })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.Textinput}
              placeholder="Bedrooms type..."
              placeholderTextColor="#4B0082"
              onChangeText={value => this.setState({ bedrooms: value })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.Textinput}
              placeholder="Date and time..."
              placeholderTextColor="#4B0082"
              onChangeText={value => this.setState({ datetime: value })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.Textinput}
              keyboardType = 'numeric'
              placeholder="Monthly rent price..."
              placeholderTextColor="#4B0082"
              onChangeText={value => this.setState({ monthlyrentprice: value })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.Textinput}
              placeholder="Furniture types..."
              placeholderTextColor="#4B0082"
              onChangeText={value => this.setState({ furniture: value })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.Textinput}
              placeholder="Notes..."
              placeholderTextColor="#4B0082"
              onChangeText={value => this.setState({ note: value })}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.Textinput}
              placeholder="Name of the reporter..."
              placeholderTextColor="#4B0082"
              onChangeText={value => this.setState({ reporter: value })}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={() => this.create()}>
            <Text style={styles.linkText}>Accept</Text>

          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Orders")}>
            <Text style={styles.linkText}>
              Click here to View
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
    marginTop: 20,
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
    fontWeight: "bold",
  },
});