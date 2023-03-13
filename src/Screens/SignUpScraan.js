import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppButton from "../Compnont/AppButton";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import Inpute from "../Compnont/Inpute";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Helper from "../Lib/Helper";
import ApiUrl from '../Lib/ApiUrl';
import AlertMsg from '../Lib/AlertMsg';
import NetInfo from "@react-native-community/netinfo";
import { validators } from '../Lib/validationFunctions';
import SplashScreen from 'react-native-splash-screen'
import { CommonActions } from '@react-navigation/native';

export default class SignUpScraan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      istop: false,
      addPlan: "",
      fname: '', lName: '', email: '', mobile: '', password: '', address: '',
      appNumber: '', STTATE: '', zipCode: '', agree: false, date: '', startdate: '',
      isDatePickerVisible: false, userdata: '',
    };

    AppHeader({
      ...this, leftHeide: false, logo: true, leftIcon: false, leftClick: () => { },
      Logo: images.logo, rightClick: () => { alert("okk"); }, rightHide: true,
    });
  }

  componentDidMount() {
    SplashScreen.hide()
    Helper.getData('userdata').then((responseData) => {
      if (responseData === null || responseData === 'undefined' || responseData === '') {
        return;
      }
      this.setState({
        userdata: responseData,
        mobile: responseData.mobile,
      })
    })
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  onAgreeSelect = () => {
    this.setState({ agree: !this.state.agree });
  };

  handleConfirmStart = (date) => {
    this.setState({
      startdate: moment(date).format("YYYY-MM-DD"),
      startText: moment(date).format("h:mm a"),
      isDatePickerVisible: false,
    });
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  signUpApi() {
    Keyboard.dismiss()
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
        return false;
      } else {
        if (
          validators.checkAlphabet("First Name", 2, 45, Helper.setTrim(this.state.fname)) &&
          validators.checkAlphabet("Last Name", 2, 45, Helper.setTrim(this.state.lName)) &&
          validators.checkEmail("Email", (this.state.email)) &&
          validators.checkPhoneNumber("Mobile Number", 7, 15, Helper.setTrim(this.state.mobile)) &&
          validators.checkRequire("date of birth", this.state.startdate) &&
          validators.checkNotNull("Address", 2, 45, this.state.address) &&
          validators.checkNotNull("State", 2, 45, Helper.setTrim(this.state.STTATE)) &&
          validators.checkNotNull("Zip Code", 3, 8, Helper.setTrim(this.state.zipCode))
        ) {
          var data = {
            first_name: this.state.fname.trim(),
            last_name: this.state.lName.trim(),
            email: this.state.email.trim(),
            mobile: this.state.mobile.trim(),
            dob: this.state.startdate,
            address: this.state.address,
            state: this.state.STTATE.trim(),
            zipCode: this.state.zipCode.trim(),
            registration_id: Helper.device_token,
            device_type: Helper.device_type
          }
          if (!this.state.agree) {
            Helper.showToast('Please Accept Terms and Conditions')
            return
          }
          console.log("sign up data as flow =======>  ", data);
          Helper.showLoader()
          Helper.makeRequest({ url: ApiUrl.SIGNUP_1 + this.state.userdata.id + ApiUrl.SIGNUP_2, method: "PUT", data: data }).then((response) => {
            console.log('===>signup', JSON.stringify(response))
            if (response.code == true) {
              Helper.setData('userdata', response.data)
              this.onSkip()
              // this.props.navigation.reset({
              //   index: 0,
              //   routes: [{ name: "HomeTabs" }],
              // });
              Helper.hideLoader()
            }
            else {
              Helper.hideLoader()
              Helper.showToast(response.message);
            }
          }).catch(err => {
            this.hideLoader()
          })
        }
      }
    })
  }
  onFocuslable = (value) => {
    this.setState({ istop: value })
  }

  onSkip = () => {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: 'Suscriptions',
              params: { title: 'PurchasePlan' },
            },
          ],
        })
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView extraScrollHeight={120}>
          <Text style={styles.infoText}>Personal info</Text>
          <Inpute
            lable2={"First Name"}
            modeBox
            placeholder={" "}
            value={this.state.fname}
            onChangeText={(text) => { this.setState({ fname: text.replace(/[^^a-zA-Z]/g, '') }) }}
            placeholderTextColor={Colors.heather}
            setfocus={(input) => { this.fname = input; }}
            getfocus={() => { this.lName.focus(); }}
            returnKeyType={"next"}
            onFocus={() => { this.onFocuslable('fname') }}
            Top={this.state.fname == '' ? this.state.istop == 'fname' ? -10 : -40 : null}
          />

          <Inpute
            lable2={"Last name"}
            modeBox
            placeholder={" "}
            value={this.state.lName}
            onChangeText={(text) => { this.setState({ lName: text.replace(/[^^a-zA-Z]/g, '') }); }}
            setfocus={(input) => { this.lName = input; }}
            getfocus={() => { this.email.focus(); }}
            placeholderTextColor={Colors.heather}
            returnKeyType={"next"}
            onFocus={() => { this.onFocuslable('lName') }}
            Top={this.state.lName == '' ? this.state.istop == 'lName' ? -10 : -40 : null}
          />

          <Inpute
            lable2={"Email Address"}
            modeBox
            placeholder={" "}
            value={this.state.email}
            onChangeText={(text) => { this.setState({ email: text }); }}
            setfocus={(input) => { this.email = input; }}
            placeholderTextColor={Colors.heather}
            returnKeyType={"next"}
            keyboardType={"email-address"}
            onFocus={() => { this.onFocuslable('email') }}
            Top={this.state.email == '' ? this.state.istop == 'email' ? -10 : -40 : null}
          />
          <View style={{ marginHorizontal: 20, borderBottomColor: 'black', borderBottomWidth: 0.5 }}>
            <Text style={{ fontSize: 18, fontFamily: Fonts.Candarab, color: Colors.barney, marginTop: 10 }}>Mobile Number</Text>
            <Text style={{
              color: 'black', fontSize: 18, fontFamily: Fonts.Candara, paddingVertical: 7, marginBottom: 5
            }}>{this.state.mobile}</Text>
          </View>
          <Text style={styles.dateTextOfCss}>Date of birth</Text>
          <TouchableOpacity onPress={() => { this.setState({ isDatePickerVisible: true }); }}
            style={styles.dobMAinView}>
            <TextInput
              style={styles.placeholderText}
              placeholder="YYYY-MM-DD "
              value={this.state.startdate}
              onChangeText={(text) => { this.setState({ Profile: text }) }}
              editable={false}
              keyboardType={'number-pad'}
            />
            <View>
              <Image
                style={styles.selectDateIcon}
                source={images.selectdate}
              />
            </View>
            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="date"
              maximumDate={new Date()}
              onConfirm={this.handleConfirmStart}
              onCancel={() => this.hideDatePicker()}
            />
          </TouchableOpacity>

          <Inpute
            lable2={"Address"}
            modeBox
            placeholder={" "}
            value={this.state.address}
            onChangeText={(text) => { this.setState({ address: text }); }}
            setfocus={(input) => { this.address = input; }}
            getfocus={() => { this.appNumber.focus(); }}
            placeholderTextColor={Colors.heather}
            returnKeyType={"next"}
            onFocus={() => { this.onFocuslable('address') }}
            Top={this.state.address == '' ? this.state.istop == 'address' ? -10 : -40 : null}
          />

          <Inpute
            lable2={"Address Line 2"}
            modeBox
            placeholder={" "}
            value={this.state.appNumber}
            onChangeText={(text) => { this.setState({ appNumber: text }); }}
            setfocus={(input) => { this.appNumber = input; }}
            getfocus={() => { this.STTATE.focus(); }}
            placeholderTextColor={Colors.heather}
            returnKeyType={"next"}
            onFocus={() => { this.onFocuslable('appNumber') }}
            Top={this.state.appNumber == '' ? this.state.istop == 'appNumber' ? -10 : -40 : null}
          />

          <Inpute
            lable2={"State"}
            modeBox
            placeholder={" "}
            value={this.state.STTATE}
            onChangeText={(text) => { this.setState({ STTATE: text }); }}
            setfocus={(input) => { this.STTATE = input; }}
            getfocus={() => { this.zipCode.focus(); }}
            placeholderTextColor={Colors.heather}
            returnKeyType={"next"}
            onFocus={() => { this.onFocuslable('STTATE') }}
            Top={this.state.STTATE == '' ? this.state.istop == 'STTATE' ? -10 : -40 : null}
          />

          <Inpute
            lable2={"Zip Code"}
            modeBox
            placeholder={" "}
            value={this.state.zipCode}
            onChangeText={(text) => { this.setState({ zipCode: text.replace(/[^a-zA-Z\-0-9]/g, "") }); }}
            setfocus={(input) => { this.zipCode = input; }}
            placeholderTextColor={Colors.heather}
            returnKeyType={"done"}
            onFocus={() => { this.onFocuslable('zipCode') }}
            Top={this.state.zipCode == '' ? this.state.istop == 'zipCode' ? -10 : -40 : null}
          />

          <View style={[styles.agreeView,]}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', width: '65%' }}
              onPress={() => { this.onAgreeSelect(); }}
            >
              <Image
                style={styles.checkIcon}
                source={this.state.agree ? images.signup_checked : images.signup_unchecked}
              />
              <Text style={styles.agreeText}>
                I agree with Terms and Conditions
            </Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 30 }}>
            <AppButton
              onClick={() => this.signUpApi()}
              Background={Colors.barney}
              borderRadius={30}
              paddinghor={10}
              paddingver={17}
              M_Hor={20}
              M_Ver={16}
              title={"Create Account"}
              fontSize={24}
              textolor={"white"}
              fontFamily={Fonts.Candara}
            />
          </View>

          <View style={{ alignItems: 'flex-end', marginVertical: 20 }}>
            <TouchableOpacity onPress={() => { this.onSkip() }}>
              <Text style={styles.skipText}>{`SKIP`}</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View >
    );
  }


}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  infoText: { fontSize: 24, fontFamily: Fonts.Candara, marginHorizontal: 20, marginTop: 25 },
  checkIcon: { height: 18, width: 18, resizeMode: "contain" },
  agreeText: { fontSize: 14, fontFamily: Fonts.Candara, marginLeft: 10, color: '#000' },
  agreeView: { marginHorizontal: 20, marginTop: 30 },
  dobMAinView: {
    borderBottomWidth: 0.7, flexDirection: "row", justifyContent: "space-between",
    alignItems: "center", borderBottomColor: 'black', marginHorizontal: 20,
  },
  selectDateIcon: { height: 20, width: 18, resizeMode: "contain", },
  placeholderText: { width: 250, height: 40, color: 'black', fontFamily: Fonts.Candara, fontSize: 18, },
  dateTextOfCss: { fontSize: 19, marginTop: 10, fontFamily: Fonts.Candarab, color: Colors.barney, marginHorizontal: 20 },
  skipText: { fontSize: 20, color: Colors.barney, marginRight: 25, fontFamily: Fonts.Candarab }
});
