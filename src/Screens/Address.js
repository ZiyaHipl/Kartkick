import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";

import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import AppHeader from "../Compnont/AppHeader";
export default class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfAdderss: [
        { text: "1011 US Hwy, 72 East, Athens,\n AL 35611." },
        { text: "1011 US Hwy, 72 East, Athens,\n AL 35611." },
      ],
    };
    AppHeader({
      ...this,
      leftHeide: false,
      logo: false,
      leftIcon: images.back,
      leftClick: () => {
        this.goBack();
      },
      title: "Address book",
      rightClick: () => {
        alert("okk");
      },
      rightHide: true,
    });
  }
  goBack = () => {
    this.props.navigation.goBack();
  };

  addAddress=()=>{
      this.props.navigation.navigate('Account')
  }

  itemToRender = ({ item }) => {
    return (
      <View style={styles.listView}>
        <Text style={styles.listText}>{item.text}</Text>
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <TouchableOpacity onPress={()=>{this.addAddress()}} style={styles.touchTop}>
          <Image style={styles.plushIcon} source={images.addnew_yellow} />
          <Text style={styles.textAdd}>Add New Address</Text>
        </TouchableOpacity>
        <View>
          <FlatList
            data={this.state.listOfAdderss}
            renderItem={this.itemToRender}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  touchTop: {
    backgroundColor: Colors.barney,
    borderRadius: 30,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    justifyContent: "center",
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  plushIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  textAdd: {
    fontSize: 24,
    lineHeight: 29,
    color: Colors.white,
    fontFamily: Fonts.Candara,
    marginLeft: 5,
  },
  listView: {
    borderRadius: 14,
    marginHorizontal: 17,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 10,
    borderWidth: 1,
    marginBottom: 5,
    borderColor: Colors.white2,
  },
  listText: {
    fontSize: 18,
    lineHeight: 31,
    color: Colors.darkishPurple,
  },
});
