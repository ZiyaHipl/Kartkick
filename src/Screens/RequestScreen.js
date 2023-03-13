import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppButton from "../Compnont/AppButton";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import Inpute from "../Compnont/Inpute";

export default class RequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mail: "",
      number: "",
      title: "",
      discrption: "",
    };
    AppHeader({
      ...this,
      logo: false,
      leftIcon: images.back,
      leftClick: () => {
        this.goBack();
      },
      title: "Request",
      rightHide: true,
    });
  }

  goBack=()=>{
    this.props.navigation.goBack()
  }

  onFocuslable = (value) => {
    this.setState({ istop: value })
  }

  render() {
    return (
      <View style={styles.containView}>
        <KeyboardAwareScrollView
          extraScrollHeight={100}
          style={{ flex: 1 }}
          enableOnAndroid
        >
          <View>
            <Inpute
              lable2={"Name"}
              modeBox
              placeholder={""}
              value={this.state.name}
              onChangeText={(text) => {
                this.setState({ name: text });
              }}
              setfocus={(input) => {
                this.name = input;
              }}
              getfocus={() => {
                this.mail.focus();
              }}
              placeholderTextColor={Colors.heather}
              returnKeyType={"next"}
              onFocus={() =>{this.onFocuslable('name')}}
              Top={this.state.name==''?this.state.istop=='name'?-10:-40:null}
              fontFamily1={Fonts.Candara}
              fontFamily={Fonts.Candara}
              borderBottomColor={Colors.barney}
            />
            <Inpute
              lable2={"E-mail"}
              modeBox
              placeholder={""}
              value={this.state.mail}
              onChangeText={(text) => {
                this.setState({ mail: text });
              }}
              placeholderTextColor={Colors.heather}
              returnKeyType={"next"}
              onFocus={() =>{this.onFocuslable('mail')}}
              Top={this.state.mail==''?this.state.istop=='mail'?-10:-40:null}
              setfocus={(input) => {
                this.mail = input;
              }}
              getfocus={() => {
                this.number.focus();
              }}
              fontFamily1={Fonts.Candara}
              fontFamily={Fonts.Candara}
              borderBottomColor={Colors.barney}

            />
            <Inpute
              lable2={"Mobile number"}
              modeBox
              placeholder={""}
              value={this.state.number}
              onChangeText={(text) => {
                this.setState({ number: text.replace(/[^0-9]/g, "") });
              }}
              placeholderTextColor={Colors.heather}
              returnKeyType={"next"}
              onFocus={() =>{this.onFocuslable('number')}}
              Top={this.state.number==''?this.state.istop=='number'?-10:-40:null}
              keyboardType={"numeric"}
              setfocus={(input) => {
                this.number = input;
              }}
              getfocus={() => {
                this.title.focus();
              }}
              fontFamily1={Fonts.Candara}
              fontFamily={Fonts.Candara}
              borderBottomColor={Colors.barney}

            />
            <Inpute
              lable2={"Title"}
              modeBox
              placeholder={""}
              value={this.state.title}
              onChangeText={(text) => {
                this.setState({ title: text });
              }}
              placeholderTextColor={Colors.heather}
              setfocus={(input) => {
                this.title = input;
              }}
              getfocus={() => {
                this.discrption.focus();
              }}
              returnKeyType={"next"}
              onFocus={() =>{this.onFocuslable('title')}}
              Top={this.state.title==''?this.state.istop=='title'?-10:-40:null}
              fontFamily1={Fonts.Candara}
              fontFamily={Fonts.Candara}
              borderBottomColor={Colors.barney}

            />
            <Text style={styles.lableText}>Write Your Comments here</Text>
            <View style={styles.inputView}>
              <TextInput style={{ paddingLeft:15, marginTop:4, width:'100%'}}
                placeholder=""
                onChangeText={(text) => {
                  this.setState({discrption: text});
                }}
                value={this.state.discrption}
                ref={(input) => {
                  this.discrption = input;
                }}
                returnKeyType={"done"}
              borderBottomColor={Colors.barney}

              />
            </View>
          </View>
          <View style={{ marginTop: 30 }}>
            <AppButton
              onClick={() => {this.goBack()}}
              Background={Colors.barney}
              borderRadius={30}
              paddinghor={0}
              paddingver={20}
              M_Hor={30}
              M_Ver={10}
              title={"Submit Request"}
              fontSize={18}
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
  containView: { flex: 1, backgroundColor: Colors.white },
  lableText: {
    marginHorizontal: 20,
    fontSize: 18,
    fontFamily: Fonts.Candara,
    color: Colors.barney,
    marginTop: 30,
  },
  inputView: {
    marginHorizontal: 20,
    height: 90,
    marginTop: 20,
    borderWidth: 0.5,
    borderRadius: 20,borderColor:Colors.barney
  },
});
