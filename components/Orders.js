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

import { MaterialIcons as Icon } from "@expo/vector-icons";

var db = SQLite.openDatabase("db.orders");

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      SearchOrder: "",
    };
    this.fetchData();
  }
  fetchData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM orders",
        null,
        (txObj, { rows: { _array } }) => this.setState({ data: _array }),
        (txObj, error) => console.log("Error ", error)
      );
    });
  };
  handleDelete = (ID) => {
    console.log("delete called");
    Alert.alert(
      "Alert",
      "Are you sure to delete order ?",
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
            this.delete(ID);
          },
        },
      ],
      { cancelable: false }
    );
  };
  delete = (ID) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM orders WHERE ID = ? ",
        [ID],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let newList = this.state.data.filter((data) => {
              if (data.ID === ID) return false;
              else return true;
            });
            this.setState({ data: newList });
          }
        }
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/nhamongtay.png")}
          style={styles.backgroundImagehome}
        >
          <Text style={styles.logo}>Information of orders </Text>
          <View style={styles.borderSearch}>
            <TextInput
              style={styles.searchOrder}
              placeholder="Search..."
              onChangeText={value => this.setState({ SearchOrder: value })}></TextInput>
          </View>
          <ScrollView style={styles.scroll}>
            {this.state.data &&
              this.state.data.filter((data) => {
                if (this.state.SearchOrder == "") {
                  return data
                }
                else if (data.property.toLowerCase().includes(this.state.SearchOrder.toLowerCase())
                  || data.bedroom.toLowerCase().includes(this.state.SearchOrder.toLowerCase())
                  || data.datetime.toLowerCase().includes(this.state.SearchOrder.toLowerCase())
                  || data.reporter.toLowerCase().includes(this.state.SearchOrder.toLowerCase())) {
                  return data
                }
              }).map((data) => (
                <View key={data.ID}>
                  <View style={styles.frame}>
                    <Image
                      source={require("../assets/icon2.png")}
                      style={styles.img}
                    />
                    <View style={{ paddingLeft: 10, flex: 1 }}>
                      <Text style={styles.text}>Property: {data.property}</Text>
                      <Text style={styles.text}>Bedrooms: {data.bedroom}</Text>
                      <Text style={styles.text}>Datetime: {data.datetime}</Text>
                      <Text style={styles.text}>Price: {data.monthlyrentprice}</Text>
                      <Text style={styles.text}>Funiture: {data.furniture}</Text>
                      <Text style={styles.text}>Notes: {data.note}</Text>
                      <Text style={styles.text}>Reporter: {data.reporter}</Text>

                    </View>
                  </View>

                  <View style={styles.del}>
                    <TouchableOpacity
                      style={styles.signUpBtn}
                      onPress={() => this.handleDelete(data.ID)}
                    >
                      <Text style={styles.textDel}>DEL</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.editBtn}
                      onPress={() => this.props.navigation.replace('EditOrder', { keyID: data.ID })} >
                      <Text style={styles.textDel}>EDIT</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.editBtn}
                      onPress={() => this.props.navigation.replace('Note', { keyID: data.ID })} >
                      <Text style={styles.textDel}>NOTE</Text>
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
    backgroundColor: "#deedff",
    alignItems: "center",
  },
  img: {
    borderWidth: 1,
    height: 100,
    width: 100,
    padding: 10,
    overflow: "hidden",
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
    marginBottom: 2, // cach voi button duoi
    marginTop: 2,
    padding: 25, // khoang cach ben trai
  },
  borderSearch: {
    backgroundColor: "#FF66CC",
    width: "90%",
    height: 35,
    alignItems: "center",
    borderRadius: 30,
    marginBottom: 8,
    opacity: 0.6,
    marginTop: 0,
    marginBottom: 20,

  },
  searchOrder: {
    width: "90%",
  },
  frame: {
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#3269ad",
    padding: 10,
    width: "100%",
    flexDirection: "row",
  },
  scroll: {
    borderWidth: 0,
    borderColor: "#3269ad",
    width: "90%",
    paddingTop: 10,
  },
  text: {
    borderWidth: 0,
    fontWeight: "bold",
    fontSize: 15,
    color: "#3269ad",
    marginTop: 0,
    marginBottom: 10,
  },
  del: {
    position: "absolute",
    borderWidth: 0,
    fontWeight: "bold",
    fontSize: 15,
    color: "#3269ad",
    right: 10,
    bottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  id: {
    position: "absolute",
    right: 10,
  },
  editBtn: {
    borderRadius: 5,
    backgroundColor: "#3269ad",
    padding: 2,
    alignItems: "center",
    justifyContent: "center",
    
  },
  signUpBtn: {
    borderRadius: 5,
    backgroundColor: "#3269ad",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});