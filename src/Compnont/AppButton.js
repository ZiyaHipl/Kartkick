import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Fonts from "./Fonts";
import Colors from "../Compnont/Colors";

export default class AppButton extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onClick}
       
          style={[
            styles.Btn,
            {
              backgroundColor: this.props.Background,
              borderColor: this.props.borderColor,
              borderWidth: this.props.borderWidth,
              marginHorizontal: this.props.M_Hor,
              marginVertical: this.props.M_Ver,
              borderRadius: this.props.borderRadius,
              paddingHorizontal: this.props.paddinghor,
              paddingVertical: this.props.paddingver,
            },
          ]}
        >
          <Text style={{ fontSize: this.props.fontSize, fontFamily: this.props.fontFamily, color: this.props.textolor }}>{this.props.title}</Text>
      </TouchableOpacity >

    );
  }
}
const styles = StyleSheet.create({
  Btn: { justifyContent: "center", alignItems: "center", },
});
