import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Colors from "./Colors";
import Fonts from "./Fonts";
import images from "./ImagePath";

export default class Inpute extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        {this.props.modeBox ? (
          <View style={{ marginHorizontal: 20 }}>
            <Text
              style={[
                      styles.ActLable,
                      { 
                        bottom:this.props.Top,
                        fontFamily: this.props.fontFamily
                          ? this.props.fontFamily
                          : Fonts.Candarab,
                          color: this.props.lableColor ? this.props.lableColor : Colors.barney,
                      },] 
              }
            >
              {this.props.lable2}
            </Text>
            <TextInput
              style={[
                styles.modeInPute,
                { color:this.props.color,
                  width: this.props.width,
                  backgroundColor: this.props.backgroundColor,
                  borderBottomWidth: 0.5,
                  borderBottomColor:this.props.borderBottomColor,
                  marginBottom: this.props.marginBottom,
                  fontFamily: this.props.fontFamily ?  this.props.fontFamily  :  Fonts.Candara,
                },
              ]}
              placeholder={this.props.placeholder}
              value={this.props.value}
              color={this.props.color}
              placeholderTextColor={this.props.placeholderTextColor}
              returnKeyType={this.props.returnKeyType}
              onChangeText={this.props.onChangeText}
              ref={this.props.setfocus}
              onSubmitEditing={this.props.getfocus}
              keyboardType={this.props.keyboardType}
              secureTextEntry={this.props.secureTextEntry}
              editable={this.props.editable}
              fontweight={this.props.fontweight}
              placeholderStyle={this.props.placeholderStyle}
              blurOnSubmit={this.props.blurOnSubmit}
              maxLength={this.props.maxLength}
              onFocus={this.props.onFocus}


            />
          </View>
        ) : (
          <View>
            <View>
              {this.props.lable ? (
                <Text style={styles.lableText}>{this.props.inputLable}</Text>
              ) : null}
            </View>
            <View
              style={[
                styles.inputeMainView,
                {
                  marginHorizontal: this.props.marginHorizontal,
                  marginTop: this.props.marginTop,
                  borderWidth: this.props.borderWidth,
                  borderBottomWidth: this.props.borderBottomWidth,
                },
              ]}
            >
              {this.props.leftIcon ? (
                <TouchableOpacity>
                  <Image
                    style={styles.rightIcon}
                    source={this.props.leftIcon}
                  />
                </TouchableOpacity>
              ) : null}
              <TextInput
                style={[
                  styles.inPute,
                  {
                    width: this.props.width,
                    backgroundColor: this.props.backgroundColor,
                  },
                ]}
                placeholder={this.props.placeholder}
                value={this.props.value}
                color={this.props.color}
                placeholderTextColor={this.props.placeholderTextColor}
                returnKeyType={this.props.returnKeyType}
                onChangeText={this.props.onChangeText}
                ref={this.props.setfocus}
                onSubmitEditing={this.props.getfocus}
                keyboardType={this.props.keyboardType}
                secureTextEntry={this.props.secureTextEntry}
                editable={this.props.editable}
                fontweight={this.props.fontweight}
                placeholderStyle={this.props.placeholderStyle}
                blurOnSubmit={this.props.blurOnSubmit}
                maxLength={this.props.maxLength}
              />
              {this.props.rightIcon ? (
                <TouchableOpacity
                  style={{ marginLeft: "auto", marginRight: 15 }}
                >
                  <Image
                    style={{ height: 17, width: 18, resizeMode: "contain" }}
                    source={this.props.rightIcon}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputeMainView: {
    borderColor: Colors.wormGray,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
  },
  rightIcon: { height: 11, width: 16, resizeMode: "contain", marginLeft: 30 },
  inPute: {
    fontSize: 18,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  modeInPute: {
    fontSize: 18,
    fontFamily: Fonts.Candara,
    paddingVertical: 10,
    // paddingLeft: 20,
    paddingRight: 10,
  },
  lableText: {
    marginHorizontal: 0,
    fontSize: 20,
    fontFamily: Fonts.Candara,
    letterSpacing: 0.3,
    color: Colors.pissYellow,
    right:27
  },
  lableText1: {
    fontSize: 20,
  },
  ActLable: {
    fontSize: 20,marginTop:10
  },
});
