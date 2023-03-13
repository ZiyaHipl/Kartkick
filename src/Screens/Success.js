import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import AppButton from "../Compnont/AppButton";
import Helper from "../Lib/Helper";

export default class Success extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
    };
  }

  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      Helper.getData('userdata').then((responseData) => {
        if (responseData === null || responseData === 'undefined' || responseData === '') {
        } else {
          this.state.first_name = responseData.first_name
          this.setState({});
        }
      })
    })
  }

  onSignup = () => {
    if (this.state.first_name == "") {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "SignUpScraan" }],
      });
    } else {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "HomeTabs" }],
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={styles.topView}>
          <Image style={styles.img} source={images.confirmedverification} />
        </View>
        <View style={styles.topView}>
          <Text style={styles.textCon}>Confirmed</Text>
          <Text style={styles.textVer}>VERIFICATION SUCCESSFUL !</Text>
        </View>
        <View>
          <AppButton
            onClick={() => { this.onSignup() }}
            Background={Colors.barney}
            borderRadius={30}
            paddinghor={100}
            paddingver={18}
            M_Hor={30}
            M_Ver={16}
            title={"Continue"}
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
  topView: { marginTop: 20, alignItems: "center", paddingTop: 10 },
  img: { width: 266, height: 266, resizeMode: "contain" },
  textCon: { fontSize: 20, lineHeight: 24, fontFamily: Fonts.Candarab, color: Colors.barney, },
  textVer: { fontSize: 20, lineHeight: 24, fontFamily: Fonts.Candara, color: Colors.barney, },
});
