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
export default class Complaint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfAdderss: [
        {
          text: "Shopping list",
          text1: "I have send wrong list to my neighbor peter sam.",
          date: "05 Nov 2020",
        },
        {
          text: "Shopping list",
          text1: "I have send wrong list to my neighbor peter sam.",
          date: "05 Nov 2020",
        },
      ],
    };
    AppHeader({
      ...this,
      logo: false,
      leftIcon: images.back,
      leftClick: () => {
        this.goBack();
      },
      title: "Support",
      rightHide: true,
    });
  }
  goBack = () => {
    this.props.navigation.goBack()
  }

  onRequest = () => {
    this.props.navigation.navigate('RequestScreen')
  }

  itemToRender = ({ item }) => {
    return (
      <View style={styles.listView}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={styles.listText}>{item.text}</Text>
          <Text style={styles.listText1}>{item.date}</Text>
        </View>

        <View style={{width:'90%' }}>
          <Text numberOfLines={2} style={[styles.textDate,]}>{item.text1}</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <TouchableOpacity onPress={() => { this.onRequest() }} style={styles.touchTop}>
          <Text style={styles.textReq}>Request Support</Text>
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
  textReq: {
    fontSize: 18,
    lineHeight: 22,
    color: Colors.white,
    fontFamily: Fonts.Candara,
    marginLeft: 5,
  },
  listView: {
    borderRadius: 14,
    marginHorizontal: 17,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    marginTop: 10,
    marginBottom: 5, elevation: 5, shadowOpacity: 0.25, shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  listText: {
    fontSize: 21,
    lineHeight: 21,
    color: Colors.barney,
    fontFamily: Fonts.Candarab,
  },
  listText1: {
    fontSize: 16,
    lineHeight: 15,
    color: Colors.warmGrayFive,
    fontFamily: Fonts.Candarab,
  },
  textDate: {
    fontSize: 16,
    lineHeight: 18,
    color: Colors.deepLavender,
    fontFamily: Fonts.Candara,
    marginTop: 8
  },
});
