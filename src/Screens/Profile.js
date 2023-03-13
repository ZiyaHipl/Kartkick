import React, { Component } from "react";
import { Text, View, StyleSheet, Image, Keyboard, Modal, TouchableOpacity, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import Inpute from "../Compnont/Inpute";
import AppButton from "../Compnont/AppButton";
import AppHeader from "../Compnont/AppHeader";
import CameraController from "../Lib/CameraController";
import Helper from "../Lib/Helper";
import ApiUrl from '../Lib/ApiUrl';
import AlertMsg from '../Lib/AlertMsg';
import NetInfo from "@react-native-community/netinfo";
import { validators } from '../Lib/validationFunctions';
import Config from "../Lib/Config";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Fname: "", Lname: "", mobile: "", email: "",
      date: "", isDatePickerVisible: false, startdate: "",
      imagesPath: '', userdata: '',
      modalVisibleAccept: false,
      phone: "",
    };
    AppHeader({
      ...this, leftHeide: false, logo: false, leftIcon: images.back, leftClick: () => { this.goBack() },
      title: 'My Profile', rightHide: true,
    });
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      Helper.getData('userdata').then((responseData) => {
        if (responseData === null || responseData === 'undefined' || responseData === '') {
          return;
        }
        this.setState({
          userdata: responseData,
          Fname: responseData.first_name,
          Lname: responseData.last_name,
          mobile: responseData.mobile,
          email: responseData.email,
          startdate: responseData.dob,
          imagesPath:responseData.profile_image
        }, () => { console.log("============>userdatatata", JSON.stringify(responseData)) })
      })
    })
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

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

  selectImgCrop = () => {
    CameraController.open((response) => {
      console.log('=====cropImage', JSON.stringify(response.path))
      if (response.path) {
        this.setState({ imagesPath: response.path })
      }
    });
  }

  saveProfile() {
    Keyboard.dismiss()
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
        return false;
      } else {
        if (
          validators.checkAlphabet("First Name", 2, 45, Helper.setTrim(this.state.Fname)) &&
          validators.checkAlphabet("Last Name", 2, 45, Helper.setTrim(this.state.Lname)) &&
          validators.checkEmail("Email", (this.state.email)) &&
          validators.checkPhoneNumber("Mobile Number", 7, 15, Helper.setTrim(this.state.mobile)) &&
          validators.checkRequire("Date", this.state.startdate)
        ) {
          let tempdata = new FormData();
          tempdata.append('first_name', this.state.Fname.trim());
          tempdata.append('last_name', this.state.Lname.trim());
          tempdata.append('mobile', this.state.mobile.trim());
          tempdata.append('email', this.state.email.trim());
          tempdata.append('dob', this.state.startdate.trim());
          if (this.state.imagesPath) {
            tempdata.append('profile_image', {
              uri: this.state.imagesPath,
              name: 'profile.jpg',
              type: 'image/jpg'
            })
          }
          console.log(tempdata,"tempdatatempdata")
          Helper.showLoader()
          Helper.makeRequest({ url: ApiUrl.SIGNUP_1 + this.state.userdata.id + ApiUrl.SIGNUP_2, method: "PUTUPLOAD", data: tempdata }).then((response) => {
            console.log('===>profile=============', JSON.stringify(response))
            if (response.code) {
              Helper.setData('userdata', response.data)
              Helper.setData('token', response.data.auth_token)
              this.props.navigation.goBack();
              Helper.showToast("Profile updated successfully.")
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
      }
    })
  }

  sendOtp = () => {
    this.setState({ modalVisibleAccept: false })
    this.props.navigation.navigate("OtpScreen", { type: "edit", phone: this.state.phone })
  }

  _sendOtpModal = () => {
    return (
      <Modal
        animationType={"slide"}
        visible={this.state.modalVisibleAccept}
        transparent={true}
        onRequestClose={() => { this.setState({ modalVisibleAccept: false }) }}>
        <View style={styles.ViewOffModal}>
          <View style={styles.modalMainView}>

            <View style={{ alignItems: 'flex-end' }}>
              <TouchableOpacity onPress={() => { this.setState({ modalVisibleAccept: false }) }}>
                <Image source={images.close_black}
                  style={styles.selectDateIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.mainView}>
              <View style={styles.contryView}>
                <Text style={styles.countryTetx}>+ {Config.default_phone_code}</Text>
              </View>
              <View style={{ flex: 1, }}>
                <Inpute
                  lable
                  rightIcon
                  rightIcon={this.state.phone.length > 9 ? images.Group_green : null}
                  inputLable={"Mobile Number"}
                  placeholder={"Mobile Number"}
                  value={this.state.phone}
                  onChangeText={(text) => { this.setState({ phone: text.replace(/[^0-9]/g, '') }); }}
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
            <View style={{ marginTop: 10, }}>
              <AppButton
                onClick={() => { this.sendOtp(); }}
                Background={Colors.barney}
                borderRadius={30}
                paddingver={10}
                M_Ver={16}
                title={"Send Otp"}
                fontSize={20}
                textolor={"white"}
                fontFamily={Fonts.Candara}
              />
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <View style={styles.containView}>
        <KeyboardAwareScrollView
          // extraScrollHeight={100}
          style={{ flex: 1 }}
          // enableOnAndroid
        >
          {/* <View>
          <ProgressCircle
            percent={30}
            radius={50}
            borderWidth={8}
            color={Colors.barney}
            shadowColor="#999"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 18, color: Colors.barney }}>{'30%'}</Text>
          </ProgressCircle>
          </View> */}
          <View style={styles.boxMainView}>
            <View>
              <View style={{ alignSelf: 'center', top: -40 }}>
                <TouchableOpacity
                  onPress={() => { this.selectImgCrop() }}>
                  <View style={styles.profileView}>
                    <Image
                      style={styles.profileImg}
                      resizeMode={this.state.imagesPath ? 'cover' : 'contain'}
                      source={this.state.imagesPath ? { uri: this.state.imagesPath } : images.Group_User}
                    />
                  </View>
                  <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                    <Image style={styles.cameraIcon}
                      source={images.camera} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ top: -40 }}>
              <Inpute
                lableColor={Colors.darkishPurple}
                lable2={"First Name"}
                modeBox
                placeholder={""}
                value={this.state.Fname}
                onChangeText={(text) => { this.setState({ Fname: text.replace(/[^^a-zA-Z]/g, '') }); }}
                setfocus={(input) => { this.Fname = input; }}
                getfocus={() => { this.Lname.focus(); }}
                color={Colors.barney}
                returnKeyType={"next"}
                marginTop={0}
              />
              <Inpute
                lableColor={Colors.darkishPurple}
                lable2={"Last Name"}
                modeBox
                placeholder={""}
                value={this.state.Lname}
                onChangeText={(text) => { this.setState({ Lname: text.replace(/[^^a-zA-Z]/g, '') }); }}
                setfocus={(input) => { this.Lname = input; }}
                getfocus={() => { this.mobile.focus(); }}
                color={Colors.barney}
                returnKeyType={"done"}
                marginTop={0}
              />
              {/* <TouchableOpacity onPress={() => { this.setState({ modalVisibleAccept: false }) }}> */}
                <Inpute
                  lableColor={Colors.darkishPurple}
                  lable2={"Your Mobile Number"}
                  modeBox
                  placeholder={""}
                  value={this.state.mobile}
                  onChangeText={(text) => { this.setState({ mobile: text.replace(/[^0-9]/g, "") }); }}
                  setfocus={(input) => { this.mobile = input; }}
                  getfocus={() => { this.email.focus(); }}
                  keyboardType={"numeric"}
                  color={Colors.barney}
                  returnKeyType={"next"}
                  marginTop={0}
                  maxLength={12}
                  // editable={false}
                />
              {/* </TouchableOpacity> */}
              <Inpute
                lableColor={Colors.darkishPurple}
                lable2={"Your Email ID"}
                modeBox
                placeholder={""}
                value={this.state.email}
                onChangeText={(text) => { this.setState({ email: text }); }}
                setfocus={(input) => { this.email = input; }}
                color={Colors.barney}
                returnKeyType={"done"}
                marginTop={0}
              />
              <View style={{ marginHorizontal: 17, marginTop: 10 }}>
                <Text style={this.state.startdate ? styles.actTableText : styles.lableText}>Date of birth</Text>
                <TouchableOpacity onPress={() => { this.setState({ isDatePickerVisible: true }); }}
                  style={styles.dobMAinView}>
                  <TextInput
                    style={styles.placeholderText}
                    placeholder=""
                    value={this.state.startdate}
                    onChangeText={(text) => { this.setState({ startdate: text }) }}
                    editable={false}
                    keyboardType={'number-pad'}
                  />
                  <View>
                    <Image style={styles.selectDateIcon}
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
              </View>
            </View>
          </View>
          <View style={{ marginTop: 15 }}>
            <AppButton
              onClick={() => { this.saveProfile() }}
              Background={Colors.barney}
              borderRadius={30}
              paddinghor={0}
              paddingver={15}
              M_Hor={30}
              M_Ver={10}
              title={"Save Changes"}
              fontSize={18}
              textolor={"white"}
              fontFamily={Fonts.Candara}
            />
          </View>
          {this._sendOtpModal()}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containView: { flex: 1, backgroundColor: Colors.white },
  profileView: { height: 82, width: 82, borderWidth: 5, borderColor: Colors.easterPurple, borderRadius: 82 / 2, },
  profileImg: { height: 71, width: 71, borderRadius: 71 / 2 },
  boxMainView: {
    marginTop: 60, backgroundColor: Colors.white, marginHorizontal: 18, paddingBottom: 20, borderRadius: 20, elevation: 5, shadowOpacity: 0.25, shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cameraIcon: { height: 30, width: 30, resizeMode: "contain", },
  selectDateIcon: { height: 20, width: 18, resizeMode: "contain", },
  dobMAinView: { borderBottomWidth: 0.5, flexDirection: "row", justifyContent: "space-between", alignItems: "center", },
  placeholderText: { color: Colors.barney, fontFamily: Fonts.Candarali, fontSize: 20, width: '50%' },
  lableText: { fontSize: 20, fontFamily: Fonts.Candarali, top: 20, color: Colors.darkishPurple, fontFamily: Fonts.Candarab, },
  actTableText: { fontSize: 20, fontFamily: Fonts.Candarali, top: 0, color: Colors.darkishPurple, fontFamily: Fonts.Candarab, },
  ViewOffModal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', alignItems: 'center' },
  modalMainView: { backgroundColor: Colors.white, paddingVertical: 20, paddingHorizontal: 25, borderRadius: 7, width: "90%", marginTop: 70 },
  countryTetx: { top: 12, fontSize: 18, fontFamily: Fonts.Candara, color: Colors.heather },
  contryView: { alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: Colors.wormGray, },
  mainView: { marginTop: 20, flexDirection: 'row', }
});
