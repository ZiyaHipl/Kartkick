import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SplashScreen from 'react-native-splash-screen';
import AppButton from "../Compnont/AppButton";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import Inpute from "../Compnont/Inpute";
import Helper from "../Lib/Helper";
import ApiUrl from '../Lib/ApiUrl';
import AlertMsg from '../Lib/AlertMsg';
import NetInfo from "@react-native-community/netinfo";
import { validators } from '../Lib/validationFunctions';
import Config from "../Lib/Config";

export default class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: "",
      remember: false,
      isFeel: false,
      userdata: {}
    };

    Helper.registerNavigator(this.props.navigation)
  }

  async componentDidMount() {
    SplashScreen.hide()
    await Helper.getData('userdata').then(async (responseData) => {
      if (responseData === null || responseData === 'undefined' || responseData === '') {
      }
    })
    Helper.getData('is_remember').then(async (responseData) => {
      if (responseData === null || responseData === 'undefined' || responseData === '') {
      } else {
        var mobile = await Helper.getData('remember_mobile')
        this.setState({ remember: responseData, mobile: mobile });
      }
    })
  }

  onRememberSelect = () => {
    this.setState({ remember: !this.state.remember });
  };

  _goLogin() {
    Keyboard.dismiss()
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
        return false;
      } else {
        if (
          validators.checkPhoneNumber("Mobile Number", 7, 15, this.state.mobile.trim())
        ) {
          console.log("device_token is  here==========>", Helper.device_token);
          var data = {
            mobile: this.state.mobile.trim(),
            registration_id:Helper.device_token,
            device_type:Helper.device_type
          }
          Helper.showLoader()
          console.log("login data as flow==================>", data);
          Helper.makeRequest({ url:ApiUrl.LOGIN, method: "POST", data: data }).then((response) => {
            console.log('===>loginApi', JSON.stringify(response))
            if (response.status) {
              if (this.state.remember) {
                Helper.setData('is_remember', true)
                Helper.setData('remember_mobile', this.state.mobile.trim())
                Helper.hideLoader()
              }
              else {
                Helper.setData('is_remember', false)
                Helper.setData('remember_mobile', '')
                Helper.hideLoader()
              }
              this.props.navigation.navigate('OtpScreen', {
                mobile: this.state.mobile.trim(),
              })
              Helper.showToast(response.message)
              Helper.hideLoader()
            }
            else {
              Helper.hideLoader()
              Helper.showToast(response.error_message);
            }
          }).catch(err => {
            this.hideLoader()
            console.log('catchcatchcatchcatchcatch')
          })
        }
      }
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView extraScrollHeight={20} enableOnAndroid>
          <View>
            <Image style={styles.logoIcon} source={images.logo} />
          </View>
          <View style={styles.mainView}>
            <View style={styles.contryView}>
              <Text style={styles.countryTetx}>+ {Config.default_phone_code}</Text>
            </View>
            <View style={{ flex: 0.9, }}>
              <Inpute
                lable
                rightIcon
                rightIcon={this.state.mobile.length >9 ? images.Group_green : null}
                inputLable={"Mobile Number"}
                placeholder={"Mobile Number"}
                value={this.state.mobile}
                onChangeText={(text) => { this.setState({ mobile: text.replace(/[^0-9]/g, '') }); }}
                placeholderTextColor={Colors.heather}
                returnKeyType={"done"}
                keyboardType={"numeric"}
                borderBottomWidth={1}
                marginTop={0}
                maxLength={10}
                color={Colors.wormGray}
                width={"90%"}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => { this.onRememberSelect(); }}
            style={[styles.checkView, {width:'40%',}]}>
            <Image
              style={styles.checkIcon}
              source={this.state.remember ? images.signup_checked : images.signup_unchecked}
            />
            <Text style={styles.meText}>Remember Me</Text>
          </TouchableOpacity>
          <View style={{ marginTop: 30, }}>
            <AppButton
              onClick={() => { this._goLogin(); }}
              Background={Colors.barney}
              borderRadius={30}
              paddinghor={100}
              paddingver={17}
              M_Hor={25}
              M_Ver={16}
              title={"Submit"}
              fontSize={24}
              textolor={"white"}
              fontFamily={Fonts.Candara}
            />
          </View>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', }}>Don't have Account?</Text>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate('SignUpScraan') }}>
              <Text style={{ color: Colors.barney, fontWeight: 'bold', marginLeft: 5 }}>Sign Up</Text>
            </TouchableOpacity>
          </View> */}
          <View>
            <Image style={styles.bottomImg} resizeMode={'contain'}
              source={images.confirmation} />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  logoIcon: { height: 80, width: 180, resizeMode: "contain", alignSelf: "center", marginTop: 60, },
  checkIcon: { height: 18, width: 18, resizeMode: "contain", marginLeft: 15 },
  meText: { fontSize: 14, fontFamily: Fonts.Candara, color: Colors.pissYellow, left: 10, },
  checkView: { marginTop: 20, marginHorizontal: 14, flexDirection: "row" },
  bottomImg: { height: 200, width: 200, alignSelf: "center", },
  countryTetx: { top: 12, fontSize: 18, fontFamily: Fonts.Candara, color: Colors.heather },
  contryView: { alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: Colors.wormGray, },
  mainView: { marginTop: 50, marginHorizontal: 10, flexDirection: 'row', left: 20 }
});
