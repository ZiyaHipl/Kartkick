import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import Colors from "../Compnont/Colors";
import Inpute from "../Compnont/Inpute";
import Fonts from "../Compnont/Fonts";
import AppButton from "../Compnont/AppButton";
import AppHeader from "../Compnont/AppHeader";
import images from "../Compnont/ImagePath";

const { width, height } = Dimensions.get("window");
export default class CreditsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: "",
      date: "",
      cvv: "",
      name: "",
    };
    AppHeader({
      ...this,
      logo: false,
      leftIcon: images.back,
      leftClick: () => {
        this.goBack();
      },
      title: "Credits / Debit",
      rightHide: true,
    });
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  payWithCard = () => {
    this.props.navigation.navigate("ThankYou");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.topText}>Pay with Credits/ Debits</Text>
        <View style={styles.boxView}>
          <View style={{ marginHorizontal: 12 }}>
            <Inpute
              placeholder={"1234 - 5678 - 9012 - 5456"}
              value={this.state.cardNumber}
              onChangeText={(text) => {
                this.setState({ cardNumber: text });
              }}
              setfocus={(input) => {
                this.cardNumber = input;
              }}
              getfocus={() => {
                this.date.focus();
              }}
              placeholderTextColor={Colors.heather}
              fontFamily={Fonts.Candaraz}
              returnKeyType={"next"}
              keyboardType={"numeric"}
              borderBottomWidth={1}
              marginTop={0}
            />
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <View style={{ flex: 0.5, marginHorizontal: 8 }}>
                <View style={styles.inputView}>
                  <TextInput
                    style={{ fontSize: 15, top:-9 }}
                    placeholder="MM/YY"
                    keyboardType={"number-pad"}
                    onChangeText={(text) => {
                      this.setState({ date: text });
                    }}
                    ref={(input) => {
                      this.date = input;
                    }}
                    onSubmitEditing={() => {
                      this.cvv.focus();
                    }}
                    value={this.state.date}
                    returnKeyType={"next"}
                  />
                </View>
              </View>
              <View style={{ flex: 0.5, marginHorizontal: 8 }}>
                <View style={styles.inputView}>
                  <TextInput
                    style={{ fontSize: 15, top:-9 }}
                    placeholder="CVV"
                    keyboardType={"number-pad"}
                    onChangeText={(text) => {
                      this.setState({ cvv: text });
                    }}
                    ref={(input) => {
                      this.cvv = input;
                    }}
                    onSubmitEditing={() => {
                      this.name.focus();
                    }}
                    value={this.state.cvv}
                    returnKeyType={"next"}
                  />
                </View>
              </View>
            </View>
            <Inpute
              placeholder={"Name "}
              value={this.state.name}
              onChangeText={(text) => {
                this.setState({ name: text });
              }}
              placeholderTextColor={Colors.heather}
              fontFamily={Fonts.Candaraz}
              setfocus={(input) => {
                this.name = input;
              }}
              returnKeyType={"done"}
              borderBottomWidth={1}
              marginTop={15}
            />
          </View>
        </View>
        <View style={{ marginTop: 30 }}>
          <AppButton
            onClick={() => {
              this.payWithCard();
            }}
            Background={Colors.barney}
            borderRadius={30}
            paddinghor={20}
            paddingver={17}
            M_Hor={20}
            M_Ver={16}
            title={"Pay $ 2.99"}
            fontSize={24}
            textolor={"white"}
            fontFamily={Fonts.Candara}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  topText: {
    fontSize: 18,
    fontFamily: Fonts.Candara,
    color: Colors.darkishPurple,
    textAlign: "center",
    marginTop: 28,
  },
  boxView: {
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    marginTop: 20,
    elevation: 7,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    paddingBottom: 20,
    borderRadius: 10,
  },
  inputView: { borderBottomWidth: 0.5, alignItems: "center", marginTop:15 }
});
