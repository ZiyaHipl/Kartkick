import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions, Keyboard } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import AppButton from '../Compnont/AppButton'
import ApiUrl from '../Lib/ApiUrl';
import AlertMsg from '../Lib/AlertMsg';
import NetInfo from "@react-native-community/netinfo";
import Helper from "../Lib/Helper";
import { validators } from "../Lib/validationFunctions";

const { width, height } = Dimensions.get('window')
export default class OtpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp1: "1", otp2: "2", otp3: "3", otp4: "4",
      count: 60,
      resend: false,
      mobile: this.props.route.params.mobile ? this.props.route.params.mobile : null,
      type: this.props.route.params.type ? this.props.route.params.type : null,
      phone: this.props.route.params.phone ? this.props.route.params.phone : null,
    };
  }

  componentDidMount() {
    this.countingStart()
  }

  countingStart() {
    this.timeCounter = setInterval(() => this.onStartCounting(), 1000);
    setTimeout(() => {
      clearInterval(this.timeCounter)
      this.setState({ resend: true })
    }, 60000);
  }

  onStartCounting = () => {
    if (this.state.count > 0) { this.setState({ count: this.state.count - 1 }) }
  }

  creatOtp() {
    if (!this.state.type) {
      Keyboard.dismiss()
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
          return false;
        } else {
          if (
            this.state.otp1 == "" || this.state.otp2 == "" || this.state.otp3 == "" || this.state.otp4 == ""
          ) {
            Helper.showToast("Please enter OTP")
            return
          } else {
            var finalOtp = this.state.otp1 + this.state.otp2 + this.state.otp3 + this.state.otp4;
            var data = {
              mobile: this.state.mobile,
              otp: finalOtp,
            }
            Helper.showLoader()
            Helper.makeRequest({ url: ApiUrl.SEND_OTP, method: "POST", data: data }).then((response) => {
              console.log('===>Otp', JSON.stringify(response))
              if (response.status) {
                Helper.hideLoader()
                this.props.navigation.replace('Success',)
                Helper.setData('userdata', response.data)
                console.log('++++++++++',JSON.stringify(Helper.setData('userdata'))+'----------'+JSON.stringify(Helper.setData('token')))
                Helper.setData('token', response.data.auth_token)
              }
              else {
                Helper.showToast(response.message);
                Helper.hideLoader()
              }
            }).catch(err => {
              this.hideLoader()
            })
          }
        }
      })
    } else {
      this.props.navigation.goBack()
    }
  }

  resendCode = () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
        return false;
      } else {
        var data = {
          mobile: this.state.mobile,
        }
        Helper.showLoader()
        Helper.makeRequest({ url: ApiUrl.LOGIN, method: "POST", data: data }).then((response) => {
          console.log('===>Resend////////////////', JSON.stringify(response))
          if (response.status) {
            this.setState({ count: 60 }, () => {
              this.countingStart()
            })
            Helper.hideLoader()
          }
          else {
            Helper.hideLoader()
            Helper.showToast(response.error_message);
          }
        }).catch(err => {
          this.hideLoader()
        })
      }
    })
  }


  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.verifyView}>
          <Text style={styles.verifiyText}>Verification Code</Text>
          <Text style={styles.codeText}>
            Please type the verification code sent to your number
          </Text>
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputeStyle}
            placeholder=" "
            maxLength={1}
            value={this.state.otp1}
            onChangeText={(text) => { this.setState({ otp1: text.replace(/[^0-9]/g, "") }); }}
            ref={(input) => { this.otp1 = input; }}
            onSubmitEditing={() => { this.otp2.focus(); }}
            returnKeyType={"next"}
            keyboardType={"numeric"}
          />
          <TextInput
            style={styles.inputeStyle}
            placeholder=" "
            maxLength={1}
            value={this.state.otp2}
            onChangeText={(text) => { this.setState({ otp2: text.replace(/[^0-9]/g, "") }); }}
            ref={(input) => { this.otp2 = input; }}
            onSubmitEditing={() => { this.otp3.focus(); }}
            returnKeyType={"next"}
            keyboardType={"numeric"}
          />
          <TextInput
            style={styles.inputeStyle}
            placeholder=" "
            maxLength={1}
            maxLength={1}
            value={this.state.otp3}
            onChangeText={(text) => { this.setState({ otp3: text.replace(/[^0-9]/g, "") }); }}
            ref={(input) => { this.otp3 = input; }}
            onSubmitEditing={() => { this.otp4.focus(); }}
            returnKeyType={"next"}
            keyboardType={"numeric"}
          />
          <TextInput
            style={styles.inputeStyle}
            placeholder=" "
            maxLength={1}
            value={this.state.otp4}
            onChangeText={(text) => { this.setState({ otp4: text.replace(/[^0-9]/g, "") }); }}
            ref={(input) => { this.otp4 = input; }}
            returnKeyType={"next"}
            keyboardType={"numeric"}
          />
        </View>
        <View style={styles.timeView}>
          <Text style={styles.timeText}>00:{this.state.count}</Text>
          {this.state.resend ? <TouchableOpacity onPress={() => this.resendCode()}>
            <Text style={styles.timeText}>Resend Code</Text>
          </TouchableOpacity>
            : null}
        </View>
        <View style={{ marginTop: 40 }}>
          <AppButton
            onClick={() => { this.creatOtp() }}
            Background={Colors.barney}
            borderRadius={30}
            paddinghor={100}
            paddingver={17}
            M_Hor={30}
            M_Ver={16}
            title={"Continue"}
            fontSize={24}
            textolor={"white"}
            fontFamily={Fonts.Candara}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  verifiyText: { fontSize: 30, fontFamily: Fonts.Candara, color: Colors.barneyTwo, },
  codeText: { fontSize: 24, fontFamily: Fonts.Candara, lineHeight: 29, marginTop: 10, color: Colors.brownishGrey },
  verifyView: { marginHorizontal: 23, marginTop: 80 },
  inputeStyle: { height: 45, borderBottomWidth: 1, borderColor: Colors.barney, width: (width - 100) / 5, textAlign: "center", },
  inputView: { marginHorizontal: 20, flexDirection: "row", justifyContent: "space-between", marginTop: 40, },
  timeText: { fontSize: 18, fontFamily: Fonts.Candara, color: Colors.barneyTwo, },
  timeView: { marginHorizontal: 23, flexDirection: "row", justifyContent: "space-between", marginTop: 30, },
});
