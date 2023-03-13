import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppButton from "../Compnont/AppButton";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import Inpute from "../Compnont/Inpute";
import ApiUrl from "../Lib/ApiUrl";
import Helper from "../Lib/Helper";
import { validators } from "../Lib/validationFunctions";

export default class AddStoreCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastname: "",
      address: "",
      ApartmentNumber: "",
      storeName:this.props.route.params.StoreCard ? this.props.route.params.StoreCard.store.name : null,
      phoneNumber: "",
      membershipNumber: "",
      StoreCardId:'',
      StoreCard:this.props.route.params.StoreCard ? this.props.route.params.StoreCard : null,
    };
    AppHeader({
      ...this, logo: false, leftIcon: images.back, leftClick: () => { this.goBack(); },title: "Add Store Cards", rightHide: true, });
  }
  goBack=()=>{
    this.props.navigation.goBack()
  }

  AddStoreCards = () => {
    if (
      validators.checkAlphabet("First Name", 2, 45, Helper.setTrim(this.state.firstName)) &&
      validators.checkAlphabet("Last Name", 2, 45, Helper.setTrim(this.state.lastname)) &&
      validators.checkNotNull("Address", 2, 45, this.state.address) &&
      validators.checkNotNull("Apartment Number", 2, 45, this.state.ApartmentNumber) &&
      validators.checkNotNull("Store Name", 2, 45, Helper.setTrim(this.state.storeName)) &&
      validators.checkPhoneNumber("Phone Number", 7, 15, Helper.setTrim(this.state.phoneNumber)) &&
      validators.checkNotNull("Membership Number", 3, 15, Helper.setTrim(this.state.membershipNumber))
    ) {
      Helper.showLoader()
      var data = {
        Store:this.state.StoreCard.store.id,
        first_name:this.state.firstName,
        last_name:this.state.lastname,
        Address:this.state.address,
        Apartment_number:this.state.ApartmentNumber,
        Register_phone_number:this.state.phoneNumber,
        Membership_Number:this.state.membershipNumber
      }
      // alert(JSON.stringify(data))
      if(this.state.StoreCardId){
        Helper.makeRequest({ url: ApiUrl.store_card_edit+this.state.StoreCardId+'/', method: "PUT", data: data}).then((respoanse) => {
          console.log('====>>store_card_edit',JSON.stringify(respoanse))
          if (respoanse.status) {
             Helper.hideLoader()
             this.props.navigation.goBack()
          }else{  Helper.hideLoader()  }
        });
      }else{
        Helper.makeRequest({ url: ApiUrl.store_card_create, method: "POST", data: data}).then((respoanse) => {
          console.log('====>>store_card_creat',JSON.stringify(respoanse))
          if (respoanse.status) {
             Helper.hideLoader()
             this.props.navigation.goBack()
          }else{  Helper.hideLoader()  }
        });
      }
     

    }
  }

  onFocuslable = (value) => {
    this.setState({ istop: value })
  }

  render() {
    return (
      <View style={styles.containView}>
        <KeyboardAwareScrollView
          // extraScrollHeight={100}
          style={{ flex: 1 }}
          // enableOnAndroid
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.boxView}>
            <Inpute
              lable2={"First Name"}
              modeBox
              placeholder={""}
              value={this.state.firstName}
              onChangeText={(text) => { this.setState({ firstName: text });  }}
              setfocus={(input) => { this.firstName = input; }}
              getfocus={() => { this.lastname.focus(); }}
              placeholderTextColor={Colors.heather}
              returnKeyType={"next"}
              onFocus={() => { this.onFocuslable('firstName') }}
              Top={this.state.firstName == '' ? this.state.istop == 'firstName' ? -10 : -40 : null}
            />
            <Inpute
              lable2={"Last name"}
              modeBox
              placeholder={""}
              value={this.state.lastname}
              onChangeText={(text) => { this.setState({ lastname: text }); }}
              setfocus={(input) => { this.lastname = input; }}
              getfocus={() => { this.address.focus(); }}
              placeholderTextColor={Colors.heather}
              returnKeyType={"next"}
              onFocus={() => { this.onFocuslable('lastname') }}
              Top={this.state.lastname == '' ? this.state.istop == 'lastname' ? -10 : -40 : null}
            />
            <Inpute
              lable2={"Address"}
              modeBox
              placeholder={""}
              value={this.state.address}
              onChangeText={(text) => { this.setState({ address: text });  }}
              setfocus={(input) => {  this.address = input;  }}
              getfocus={() => { this.ApartmentNumber.focus(); }}
              placeholderTextColor={Colors.heather}
              returnKeyType={"next"}
              onFocus={() => { this.onFocuslable('address') }}
              Top={this.state.address == '' ? this.state.istop == 'address' ? -10 : -40 : null}
            />
            <Inpute
              lable2={"Apartment Number"}
              modeBox
              placeholder={""}
              value={this.state.ApartmentNumber}
              onChangeText={(text) => {  this.setState({ ApartmentNumber: text }); }}
              setfocus={(input) => { this.ApartmentNumber = input; }}
              getfocus={() => {  this.storeName.focus();  }}
              placeholderTextColor={Colors.heather}
              returnKeyType={"next"}
              keyboardType={"numeric"}
              onFocus={() => { this.onFocuslable('ApartmentNumber') }}
              Top={this.state.ApartmentNumber == '' ? this.state.istop == 'ApartmentNumber' ? -10 : -40 : null}
            />
            <Inpute
              lable2={"Store Name"}
              modeBox
              color={Colors.heather}
              // placeholder={""}
              value={this.state.storeName}
              // onChangeText={(text) => {  this.setState({ storeName: text });  }}
              // setfocus={(input) => { this.storeName = input;  }}
              // getfocus={() => { this.phoneNumber.focus();  }}
              // placeholderTextColor={Colors.heather}
              // returnKeyType={"next"}
              editable={false}
              onFocus={() => { this.onFocuslable('storeName') }}
              Top={this.state.storeName == '' ? this.state.istop == 'storeName' ? -10 : -40 : null}
            />
            <Inpute
              lable2={"Registered Phone Number"}
              modeBox
              placeholder={""}
              value={this.state.phoneNumber}
              onChangeText={(text) => { this.setState({ phoneNumber: text.replace(/[^0-9]/g, "") });  }}
              setfocus={(input) => {  this.phoneNumber = input;  }}
              getfocus={() => {  this.membershipNumber.focus();  }}
              keyboardType={"numeric"}
              placeholderTextColor={Colors.heather}
              returnKeyType={"next"}
              maxLength={15}
              onFocus={() => { this.onFocuslable('phoneNumber') }}
              Top={this.state.phoneNumber == '' ? this.state.istop == 'phoneNumber' ? -10 : -40 : null}
            />
            <Inpute
              lable2={"Membership Number"}
              modeBox
              placeholder={""}
              keyboardType={"numeric"}
              value={this.state.membershipNumber}
              onChangeText={(text) => { this.setState({ membershipNumber: text }); }}
              setfocus={(input) => {  this.membershipNumber = input;  }}
              placeholderTextColor={Colors.heather}
              returnKeyType={"done"}
              maxLength={15}
              onFocus={() => { this.onFocuslable('membershipNumber') }}
              Top={this.state.membershipNumber == '' ? this.state.istop == 'membershipNumber' ? -10 : -40 : null}
            />
          </View>
          <View style={{ marginVertical: 20, marginBottom: 30 }}>
            <AppButton
              onClick={() => { this.AddStoreCards() }}
              Background={Colors.barney}
              borderRadius={30}
              paddinghor={0}
              paddingver={20}
              M_Hor={30}
              M_Ver={10}
              title={"Add Store Card"}
              fontSize={18}
              textolor={"white"}
              fontFamily={Fonts.Candara}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
  componentDidMount = () => {
    this.Card_Store_Details()
   
  } 
  Card_Store_Details=()=>{
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.store_card_details+this.state.StoreCard.store.id, method: "GET", data: '' }).then((respoanse) => {
      console.log('====>gggggg===',JSON.stringify(respoanse))
      Helper.hideLoader()
      if(respoanse.data.length>0){
        console.log('====>pok',)
        this.state.StoreCardId=respoanse.data[0].id
        this.state.firstName=respoanse.data[0].first_name
        this.state.lastname=respoanse.data[0].last_name
        this.state.address=respoanse.data[0].Address
        this.state.storeName=respoanse.data[0].Store.name
        this.state.ApartmentNumber=respoanse.data[0].Apartment_number
        this.state.phoneNumber=respoanse.data[0].Register_phone_number
        this.state.membershipNumber=respoanse.data[0].Membership_Number
        this.setState({},()=>{
          console.log('====>gggggg/////',this.state)
        })
      }else{
        console.log('====>pok111',)
      }
       
    });
  }
}
const styles = StyleSheet.create({
  containView: { flex: 1, backgroundColor: Colors.white },
  boxView: {
    backgroundColor: Colors.white,
    marginHorizontal: 10,
    marginTop: 25,
    borderRadius: 24,
    paddingBottom: 30, elevation: 5, shadowOpacity: 0.25, shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
