import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "../Compnont/Colors";
import Inpute from "../Compnont/Inpute";
import AppButton from '../Compnont/AppButton'
import Fonts from "../Compnont/Fonts";
import AppHeader from "../Compnont/AppHeader";
import images from "../Compnont/ImagePath";

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      address: "",
      ApartNumber: "",
      city: "",
      STTAtee: "",
      pincode: "",
    };
    AppHeader({
      ...this,
      leftHeide: false,
      logo: false,
      leftIcon: images.back,
      leftClick: () => { this.goBack() },
      title: 'Add New Address',
      rightClick: () => {
      },
      rightHide: true,
    });
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  saveClick = () => {
    this.props.navigation.goBack()
  }

  onFocuslable = (value) => {
    this.setState({ istop: value })
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <KeyboardAwareScrollView
          extraScrollHeight={50}
          style={{ flex: 1 }}
          enableOnAndroid
        >
          <View style={styles.mainBoxView}>
            <Inpute
              lable2={"Enter Full Name"}
              modeBox
              lableColor={Colors.darkishPurple}
              placeholder={""}
              value={this.state.fullName}
              onChangeText={(text) => {
                this.setState({ fullName: text });
              }}
              setfocus={(input) => {
                this.fullName = input;
              }}
              getfocus={() => {
                this.address.focus();
              }}
              placeholderTextColor={Colors.heather}
              returnKeyType={"next"}
              onFocus={() =>{this.onFocuslable('fullName')}}
              Top={this.state.fullName==''?this.state.istop=='fullName'?-10:-40:null}
            />
            <Inpute
              lable2={"Address"}
              modeBox
              lableColor={Colors.darkishPurple}
              placeholder={""}
              value={this.state.address}
              onChangeText={(text) => {
                this.setState({ address: text });
              }}
              setfocus={(input) => {
                this.address = input;
              }}
              getfocus={() => {
                this.ApartNumber.focus();
              }}
              placeholderTextColor={Colors.heather}
              returnKeyType={"next"}
              onFocus={() =>{this.onFocuslable('address')}}
              Top={this.state.address==''?this.state.istop=='address'?-10:-40:null}
            />
            <Inpute
              lable2={"Apartment Number"}
              modeBox
              lableColor={Colors.darkishPurple}
              placeholder={""}
              value={this.state.ApartNumber}
              onChangeText={(text) => {
                this.setState({ ApartNumber: text });
              }}
              setfocus={(input) => {
                this.ApartNumber = input;
              }}
              getfocus={() => {
                this.city.focus();
              }}
              placeholderTextColor={Colors.heather}
              returnKeyType={"next"}
              onFocus={() =>{this.onFocuslable('ApartNumber')}}
              Top={this.state.ApartNumber==''?this.state.istop=='ApartNumber'?-10:-40:null}
            />
            <Inpute
              lable2={"City"}
              modeBox
              lableColor={Colors.darkishPurple}
              placeholder={""}
              value={this.state.city}
              onChangeText={(text) => {
                this.setState({ city: text });
              }}
              setfocus={(input) => {
                this.city = input;
              }}
              getfocus={() => {
                this.STTAtee.focus();
              }}
              placeholderTextColor={Colors.heather}
              returnKeyType={"next"}
              onFocus={() =>{this.onFocuslable('city')}}
              Top={this.state.city==''?this.state.istop=='city'?-10:-40:null}
            />
            <Inpute
              lable2={"State"}
              modeBox
              lableColor={Colors.darkishPurple}
              placeholder={""}
              value={this.state.STTAtee}
              onChangeText={(text) => {
                this.setState({ STTAtee: text });
              }}
              setfocus={(input) => {
                this.STTAtee = input;
              }}
              getfocus={() => {
                this.pincode.focus();
              }}
              placeholderTextColor={Colors.heather}
              returnKeyType={"next"}
              onFocus={() =>{this.onFocuslable('STTAtee')}}
              Top={this.state.STTAtee==''?this.state.istop=='STTAtee'?-10:-40:null}
            />
            <Inpute
              lable2={"Pincode"}
              modeBox
              lableColor={Colors.darkishPurple}
              placeholder={""}
              value={this.state.pincode}
              onChangeText={(text) => {
                this.setState({ pincode: text.replace(/[^0-9]/g, "") });
              }}
              setfocus={(input) => {
                this.pincode = input;
              }}
              placeholderTextColor={Colors.heather}
              returnKeyType={"done"}
              keyboardType={"numeric"}
              onFocus={() =>{this.onFocuslable('pincode')}}
              Top={this.state.pincode==''?this.state.istop=='pincode'?-10:-40:null}
            />
          </View>
          <View style={{ marginTop: 30 }}>
            <AppButton
              onClick={() => { this.saveClick() }}
              Background={Colors.barney}
              borderRadius={30}
              paddinghor={20}
              paddingver={17}
              M_Hor={30}
              M_Ver={16}
              title={"Save Changes"}
              fontSize={24}
              textolor={"white"}
              fontFamily={Fonts.Candara}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainBoxView: {
    marginTop: 20,
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    borderRadius: 20,
    elevation: 2,
    paddingBottom: 20,elevation: 5, shadowOpacity: 0.25, shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
