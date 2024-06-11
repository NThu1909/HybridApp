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

var db = SQLite.openDatabase("db.orders");

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
    };
    this.fetchData();
  }
  fetchData = () => {
    const { keyID } = this.props.route.params;
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM orders where ID = ?", [keyID],
        (txObj, { rows: { _array } }) => this.setState({ data: _array }),
        (txObj, error) => console.log("Error ", error)
      );
    });
  };
  edit = () => {
    const { keyID } = this.props.route.params;
    if (
      
      this.state.note == ""
    ) {
      Alert.alert("Error Message", "Fields are empty");
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE orders set note = ? where ID = ?",
          [
            this.state.note,
            keyID,
          ],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              console.log("edit passed");
            }
          }
        );
      });
      Alert.alert("Message", "Edit successful");
      this.props.navigation.navigate("Orders", { keyID });
    } 
  };
  render() {
    const { keyID } = this.props.route.params;
    return (
      <View style={{ flex: 1 }}>
        {this.state.data && this.state.data.map((data) => (
          <View style={{ flex: 1 }} key={data.ID}>
            <View style={styles.container}>
              <ImageBackground source={require("../assets/nhamongtay.png")} style={styles.backgroundImagehome}>
                <Text style={styles.logo}>Edit Notes!! </Text>
                <View style={styles.outView}>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.Textinput}
                      placeholder="Notes..."
                      placeholderTextColor="#4B0082"
                      onChangeText={value => this.setState({ note: value })}
                    />
                  </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => this.edit()}>
                  <Text style={styles.linkText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Orders")}
                >
                  <Text style={styles.linkText}>
                    Back to Orders Information
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
    marginBottom: 20, // cach voi button duoi
    marginTop: 15,
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
    color: "#339900",
  },
});