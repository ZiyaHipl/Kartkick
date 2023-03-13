import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
export default class AddPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfData: [
        { img: images.googlepay, text: "Pay with google ", routh: "" },
        { img: images.Image_13, text: "Pay with Venmo", routh: "" },
        { img: images.paypal_1, text: "Pay with PayPal", routh: "" },
        { img: images.JD_11_512, text: "Pay with Credits/Debits", routh: "CreditsCard" },
      ],
    };
    AppHeader({
      ...this,
      logo: false,
      leftIcon: images.back,
      leftClick: () => {
        this.goBack();
      },
      title: "Payment",
      rightHide: true,
    });
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  payClick = (item) => {
    this.props.navigation.navigate(item.routh);
  };

  renderFunction = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          this.payClick(item);
        }}
        style={styles.view1}
      >
        <Image style={styles.imgPay} source={item.img} />
        <Text style={styles.textPay}>{item.text}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={{ paddingHorizontal: 25, flex: 1, backgroundColor: Colors.white }}>
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <Text style={styles.textPayment}>Add payment Method</Text>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{ marginTop: 25 }}
            data={this.state.listOfData}
            renderItem={this.renderFunction}
          />
          <View style={{ height: 20 }} />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  textPayment: {
    fontSize: 18,
    fontFamily: Fonts.Candara,
    color: "rgb(78,26,110)",
  },
  imgPay: { width: 115, height: 51, resizeMode: "contain" },
  view1: {
    borderRadius: 13,
    borderColor: Colors.pinkishGrey,
    borderWidth: 0.5,
    padding: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textPay: {
    fontSize: 13,
    lineHeight: 15,
    fontFamily: Fonts.Candara,
    color: Colors.warmGrayTwo,
  },
});
