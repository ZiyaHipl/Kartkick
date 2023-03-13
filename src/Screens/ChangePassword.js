import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import Inpute from "../Compnont/Inpute";
import AppButton from '../Compnont/AppButton'
import AppHeader from "../Compnont/AppHeader";
import images from "../Compnont/ImagePath";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPasswors: "",
    };
    AppHeader({
      ...this,
      logo: false,
      leftIcon: images.back,
      leftClick: () => {this.goBack()},
      title:'Change Password',
      rightHide: true,
    });
  }

  goBack=()=>{
    this.props.navigation.goBack()
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
            <View style={{ bottom: 10 }}>
              <Inpute
                lable2={"Enter Old Password"}
                modeBox
                fontFamily={Fonts.Candaraz}
                lableColor={Colors.darkishPurple}
                placeholder={""}
                value={this.state.oldPassword}
                onChangeText={(text) => {
                  this.setState({ oldPassword: text });
                }}
                setfocus={(input) => {
                  this.oldPassword = input;
                }}
                getfocus={() => {
                  this.newPasswors.focus();
                }}
                placeholderTextColor={Colors.heather}
                returnKeyType={"next"}
                marginTop={0}
              />
              <Inpute
                lable2={"Enter New Password"}
                modeBox
                fontFamily={Fonts.Candaraz}
                lableColor={Colors.darkishPurple}
                placeholder={""}
                value={this.state.newPasswors}
                onChangeText={(text) => {
                  this.setState({ newPasswors: text });
                }}
                setfocus={(input) => {
                  this.newPasswors = input;
                }}
                placeholderTextColor={Colors.heather}
                returnKeyType={"done"}
                marginTop={0}
              />
            </View>
          </View>
          <View style={{marginTop:15}}>
            <AppButton
              onClick={() => {this.goBack()}}
              Background={Colors.barney}
              borderRadius={30}
              paddinghor={20}
              paddingver={15}
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
    marginHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "white",
    marginTop: 20,
    paddingBottom: 30,
    borderRadius: 20,elevation:5
  },
});
