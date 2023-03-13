import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, Image } from "react-native";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppHeader from "../Compnont/AppHeader";
import Helper from "../Lib/Helper";
import ApiUrl from '../Lib/ApiUrl';
import AlertMsg from '../Lib/AlertMsg';
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";

export default class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfCategoriesNew: [
        { id: 1, type: "My Profile", routh: 'Profile' },
        { id: 2, type: "Address Book", routh: 'Address' },
        { id: 3, type: "Manage members", routh: 'FamilyNeighbor' },
        { id: 4, type: "Subscriptions", routh: 'Suscriptions' },
        { id: 4, type: "Favorites", routh: 'FavoritesScreen' },
        { id: 5, type: "Support and Contact", routh: 'Complaint' },
        { id: 6, type: "Notifications", icon: images.on_name, iconOff: images.off_name, routh: '' },
        { id: 7, type: "Update Mobile", routh: 'UpdateMobileNu' },
        { id: 8, type: "Signout", routh: 'login' },
      ],
      toggle: true,
    };
    AppHeader({
      ...this, leftHeide: false, logo: false, leftIcon: images.back, leftClick: () => { this.goBack() },
      title: 'My Account', rightClick: () => { alert("okk"); }, rightHide: true,
    });
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  listClickItem = (item) => {
    if (item.routh == 'login') {
      this._logOut()
    } else {
      this.props.navigation.navigate(item.routh)
    }
  }

  iconNotification = () => {
    this.setState({ toggle: !this.state.toggle });
  };

  renderFunctionForType = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => { this.listClickItem(item) }} style={styles.flView}>
        <Text style={styles.textCat}>{item.type}</Text>
        {item.icon ? (
          <TouchableOpacity onPress={() => this.iconNotification()}>
            <Image
              style={{ width: 60, height: 35, resizeMode: "contain" ,marginTop:6}}
              source={this.state.toggle ? item.icon : item.iconOff}
            />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
    );
  };

  appLogout = () => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
        return false;
      } else {
        Helper.showLoader();
        Helper.makeRequest({ url: ApiUrl.LOG_OUT, method: "POST" }).then((response) => {
          console.log("response", JSON.stringify(response))
          if (response.status_code == 200) {
            AsyncStorage.removeItem('userdata');
            AsyncStorage.removeItem('token');
            // AsyncStorage.removeItem('addPlan');
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: "AfterLogout" }],
            });
            Helper.showToast(response.message)
            Helper.hideLoader();
          }
          else {
            Helper.hideLoader();
            this.props.navigation.reset({
              index: 0,
              routes: [{ name: "AfterLogout" }],
            });
            Helper.showToast(response.message);
          }
        }).catch(response => {
          Helper.hideLoader();
          console.log('error', JSON.stringify(response.message))
          // Helper.showToast(err.error_message);

        })
      }
    })
  }

  _logOut = () => {
    Helper.confirmPopUp("Are you sure you want to sign out.", (status) => {
      if (status) {
        this.appLogout()
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={styles.topView}>
          <FlatList
            scrollEnabled={false}
            style={styles.view1}
            extraData={this.state}
            keyExtractor={(item) => item.id}
            data={this.state.listOfCategoriesNew}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  marginVertical: 7,
                  borderWidth: 0.5,
                  borderColor: "#707070",
                  opacity: 0.46,
                }}
              />
            )}
            renderItem={this.renderFunctionForType}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view1: { marginHorizontal: 16, borderWidth: 1, borderRadius: 14, borderColor: Colors.white2, marginTop: 15, paddingBottom: 5 },
  topView: { marginTop: 15 },
  img: { width: 150, height: 150, resizeMode: "contain", marginVertical: 15, paddingTop: 15 },
  texttop: { fontSize: 35, lineHeight: 38, fontFamily: Fonts.Candarab, color: Colors.barney },
  icon: { width: 21, height: 20, resizeMode: "contain" },
  flView: { flexDirection: "row", paddingHorizontal: 15, alignItems: 'center' },
  textCat: { flex: 1, fontSize: 18, lineHeight: 43, fontFamily: Fonts.Candarab, color: Colors.darkishPurple },
});
