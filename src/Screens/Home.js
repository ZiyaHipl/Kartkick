import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity, DeviceEventEmitter } from "react-native";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import SplashScreen from 'react-native-splash-screen'
import firebase from '@react-native-firebase/app'
import messaging from '@react-native-firebase/messaging';
import Helper from "../Lib/Helper";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 0, icon: images.storemembership, disp: 'Store\n Membership', routh: 'StoreCards', color: Colors.purple },
        { id: 1, icon: images.family, disp: 'Family &\n Neighbours', routh: 'FamilyNeighbor', color: Colors.tealBlue },
        { id: 2, icon: images.coupon, disp: 'Coupons & \n Promotions', routh: 'CouponsScreen', color: Colors.coralPink },
        { id: 3, icon: images.shopping_list, disp: 'Shopping\n List', routh: 'ShoppingTab', color: Colors.sapphire },
        { id: 4, icon: images.shoppinghistory, disp: 'Shopping\n History', routh: 'HistoryView', color: Colors.darkGreyBlue },
        { id: 5, icon: images.pantry, disp: 'Pantry', routh: 'Pantry', color: Colors.pumpkinOrange },
      ],
      NotificationLength:''
    };

    AppHeader({
      ...this, leftHeide: true, logo: true, Logo: images.logo,
      right: true,
      rightClick: () => { this.headerClick() }, rightIcon: images.menu,
      search: true,
      notification:true,
      notificationCount:Helper.notificationCount,
      searchIcon: images.notifications1,
      searchClick: () => { this.searchClick() }
    });
  }

  componentDidMount() {
    // Helper.getData('notificationCount').then(async (value) => {
    //   this.setState({ NotificationLength: value })
    // })
    this.createNotificationListenersNew();
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000);

  }

  async createNotificationListenersNew() {
    await messaging().setBackgroundMessageHandler(async notification => {
      console.log('--------------Notification 11:', notification)
      //let notiData = notification.data;
      //this.notificationNavigate(notiData);
    });
    //When the application is running, but in the background
    await messaging().onNotificationOpenedApp(async notification => {
      console.log('--------------Notification 22:', notification)
      let notiData = notification.data;
      this.notificationNavigate(notiData);
    })
    // notification app kill
    await messaging().getInitialNotification().then(async remoteMessage => {
      console.log('--------------Notification 33:', remoteMessage)
      let notiData = remoteMessage.data;
      this.notificationNavigate(notiData);
    });
  }

  notificationNavigate = (data) => {
    // console.log('--------------Notification Data :', data)

    // if (data != null) {
    //   var type = data.type;
    //   var dicto = data.dictionary;
    //   //console.log(dicto,'notificationOpen.notification.data.dictionary.id');

    //   var newdec = JSON.parse(dicto);
    //   console.log('newdec id', newdec.id)

    //   console.log(Helper.NotiType, '-----', type)
    //   console.log(Helper.NotiId, '-----', newdec.id)


    //   if (type == 'Chat') {
    this.props.navigation.navigate('Notification')

    // }

    // }

  }

  searchClick = () => {
    this.props.navigation.navigate('Notification')
  }


  headerClick = () => {
    this.props.navigation.navigate('MyAccount')
  }

  detailsClick = (item) => {
    if (item.routh == 'Pantry') {
      this.props.navigation.navigate('StoreCatList', { Store_Cat: '' })
    } else {
      this.props.navigation.navigate(item.routh)
    }


  }

  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => { this.detailsClick(item) }} style={[styles.fristView, { flexDirection: item.id % 2 == 0 ? 'row' : 'row-reverse', backgroundColor: item.color }]}>
        <Image style={styles.iconImg} source={item.icon} />
        <View>
          <Text style={styles.listText}>{item.disp}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={{ alignItems: "center" }}>
          <Text style={[styles.headeText, { fontFamily: Fonts.Candara }]}>
            Let's get
            <Text style={[styles.headeText, { fontFamily: Fonts.Candarab }]}>
              {" "}
              Kartkicking!
            </Text>
          </Text>
        </View>
        <FlatList style={{ marginTop: 9 }}
          data={this.state.data}
          renderItem={this.renderItem} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headeText: { fontSize: 24, color: Colors.greyishBrown, marginTop: 15 },
  iconImg: { height: 80, width: 80, resizeMode: "contain" },
  fristView: {
    // backgroundColor: Colors.indigoTwo,
    borderRadius: 10,
    marginHorizontal: 19,
    paddingVertical: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8
  },
  listText: { fontSize: 22, fontFamily: Fonts.Candarab, color: Colors.white, lineHeight: 27 },
});
