import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";

export default class ThankYou extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  afterPayment=()=>{
     this.props.navigation.reset({
                index: 0,
                routes: [{ name: "HomeTabs" }],
              });
      // this.props.navigation.navigate('StoreCards')
  }

  render() {
    return (
      <View style={{flex:1, backgroundColor: Colors.white}}>
        <View style={styles.topView}>
          <Text style={styles.texttop}>Thanks You</Text>
          <TouchableOpacity onPress={()=>{this.afterPayment()}} style={{ alignItems: "center" }}>
            <Image style={styles.img} source={images.Successfully} />
            <Text style={styles.textCon}>
              Your Subscription was added {"\n"}successfully
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  topView: { paddingTop: 80, alignItems: "center" },
  img: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginVertical: 15,
    paddingTop: 15,
  },
  textCon: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: "center",
    fontFamily: Fonts.Candara,
    color: Colors.barney,
  },
  texttop: {
    fontSize: 35,
    lineHeight: 38,
    fontFamily: Fonts.Candarab,
    color: Colors.barney,
  },
});
