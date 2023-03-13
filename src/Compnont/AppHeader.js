import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  Text,
  Keyboard,
} from "react-native";
import Colors from "./Colors";
import Fonts from "./Fonts";
import images from "./ImagePath";

const AppHeader = (prop) => {

  return prop.props.navigation.setOptions({
    headerLeft: () =>
      !prop.leftHeide ? (
        <TouchableOpacity
          onPress={() => { Keyboard.dismiss(); prop.leftClick(); }} hitSlop={{ top: 0, bottom: 20, left: 50, right: 50, backgroundColor: "red", }}
          style={{ position: "absolute", left: 20, flexDirection: "row" }}  >
          <Image source={prop.leftIcon} style={{ height: 20, width: 20, resizeMode: "contain" }} />
        </TouchableOpacity>) : (<View style={{ width: 50 }}></View>),


    headerRight: () =>
      !prop.rightHide ? (
        <View style={{ flexDirection: 'row', }}>
          {prop.search ? (
            <View>
              <TouchableOpacity onPress={() => { prop.searchClick() }} style={{ right: 35 }}>
                <Image style={styles.searchIcon} source={prop.searchIcon} />
                {prop.notification == true &&
                  <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', top: -8, backgroundColor: Colors.pissYellow, height: 16, width: 16, paddingHorizontal: 0, paddingVertical: 0, borderRadius: 18 / 2, }} >
                    <Text style={[styles.TabLableCss,]}>{prop.notificationCount}</Text>
                  </View>}
                {/* <Text style={{position:'absolute',left:10,bottom:5}}>{prop.count}</Text> */}
              </TouchableOpacity>
            </View>
          ) : null}
          <TouchableOpacity onPress={() => prop.rightClick()} hitSlop={{ top: 0, bottom: 23, left: 0, right: 0 }} style={{ right: 20 }}  >
            <Image source={prop.rightIcon} style={{ width: 22, height: 22, resizeMode: "contain" }} />
          </TouchableOpacity>
        </View>) : (<View style={{ width: 50 }} />),

    headerTitle: () =>
      prop.logo == true ? (
        <Image style={{ height: 40, width: 300, resizeMode: "contain", alignSelf: "center", marginRight: prop.right ? 10 : 0 }}
          source={prop.Logo} />
      ) : (
        <Text style={{ textAlign: "center", fontSize: 22, fontFamily: Fonts.Candarab, color: Colors.barney, }} > {prop.title}  </Text>
      ),
    headerStyle: styles.headerShadow,
    headerTitleStyle: {
      alignSelf: "center",
      fontFamily: Fonts.segoeuib,
      top: 0,
      color: Colors.white,
    },
    headerLayoutPreset: "center",
  });
};

export default AppHeader;
const styles = StyleSheet.create({
  headerShadow: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 5,
  },
  title: {
    color: Colors.white,
    fontFamily: Fonts.KanitSemiBold,
  },
  searchIcon: { height: 22, width: 22, resizeMode: 'contain' }
});
