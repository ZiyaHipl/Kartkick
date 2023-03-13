import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableHighlightBase,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";

import Fonts from "../Compnont/Fonts";
import Colors from "../Compnont/Colors";
import images from "../Compnont/ImagePath";
import AppHeader from "../Compnont/AppHeader";
import ApiUrl from "../Lib/ApiUrl";
import Helper from "../Lib/Helper";
import Config from "../Lib/Config";
import LoadImage from "../Lib/LoadImage";

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NotFound: false,
      listOfData: [
        {
          id: 1,
          text: "You have received new connection \n Request from ",
          textDark: "Mark Charles",
        },
        {
          id: 2,
          text: "You have received new connection \n Request from ",
          textDark: "Mitchel Harricane",
        },
      ],
    };
    AppHeader({
      ...this,
      logo: false,
      leftIcon: images.back,
      leftClick: () => {
        this.goBack();
      },
      title: "Notification",
      rightIcon: images.menu,
      rightClick: () => { this.menuClick() },
    });
  }

  componentDidMount() {
    this.GetNotificationList()
  }

  menuClick = () => {
    this.props.navigation.navigate("MyAccount");
  };


  goBack = () => {
    this.props.navigation.goBack();
  };


  GetNotificationList = () => {
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.getNotification, method: "GET", data: '' }).then((respoanse) => {
      console.log('==>>>=====', JSON.stringify(respoanse))
      Helper.hideLoader()
      if (respoanse.status) {
        this.setState({ listOfData: respoanse.data, NotFound: true })
        Helper.setData('notificationCount', respoanse.data.length)
        DeviceEventEmitter.emit('notificationCount', respoanse.data.length);
        console.log('Notificationstatus67878678', JSON.stringify(respoanse.data))
      } else {
        this.setState({ NotFound: false })
      }
    });
  }

  notifyStatus = (item, status) => {
    Helper.showLoader()
    var data = {
      status: status,
      notification_id: item.id
    }
    Helper.makeRequest({ url: ApiUrl.notifyStatus + item.UserInvitation_id + '/', method: "PATCH", data: data }).then((respoanse) => {
      console.log('sdfsdfdsdfs3223433', JSON.stringify(respoanse))
      Helper.hideLoader()
      if (respoanse.status) {
        this.GetNotificationList()
        Helper.showToast(respoanse.message)
      }
      else {
        Helper.hideLoader()
        Helper.showToast(respoanse.error_message);
      }
    });
  }

  itemToRender = ({ item, index }) => {
    return (
      <View>
        <View style={{ flexDirection: "row",alignItems:'center' }}>
          {item.sender &&
            <LoadImage style={styles.img} source={item.sender?.profile_image ? { uri: Config.baseImgurl + item.sender?.profile_image } : images.Group_User} />}
          {/* <Image style={styles.img} source={{ uri: Config.baseImgurl + item.sender?.profile_image}} /> */}
          <View style={{ marginLeft: 15, flex: 1 }}>
            <Text numberOfLines={3} style={[styles.textdark, { width: "100%", fontFamily: Fonts.Candara }]}>{item.message}<Text style={{ fontFamily: Fonts.Candarab, lineHeight: 23 }}> {item.sender?.first_name}</Text></Text>
            {item.NotificationStatus == "REQUESTED" &&
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <TouchableOpacity onPress={() => { this.notifyStatus(item, 'REJECT') }} style={styles.v1}>
                  <Text style={styles.reject}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.notifyStatus(item, 'ACCEPT') }} style={styles.v2}>
                  <Text style={styles.accept}>Accept</Text>
                </TouchableOpacity>
              </View>}
          </View>
        </View>
        {item.message &&
          <View style={[styles.itemSeperator,]} />}
      </View>

    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.state.listOfData.length <= 0 ?
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: Fonts.Candarab, fontSize: 18, color: Colors.barney }}>Not data Found</Text>
          </View> :
          <FlatList
            style={{ marginTop: 30, marginHorizontal: 16 }}
            data={this.state.listOfData}
            renderItem={this.itemToRender}
          // ItemSeparatorComponent={() => <View style={[styles.itemSeperator,]} />}
          />}
        {/* <View style={styles.itemSeperators} /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, },
  itemSeperator: {
    height: 1,
    backgroundColor: Colors.voiletBlue,
    opacity: 0.5,
    width: "100%",
    marginVertical: 15,
  },
  itemSeperators: {
    height: 1,
    backgroundColor: Colors.voiletBlue,
    opacity: 0.5,
    marginTop: 15
  },
  img: { width: 60, height: 60, resizeMode: "cover", borderRadius: 60 / 2, overflow: "hidden" },
  text1: {
    fontSize: 16,
    fontFamily: Fonts.Candara,
    color: Colors.lightEggplant,
  },
  textdark: {
    fontSize: 18,
    fontFamily: Fonts.Candarab,
    color: Colors.lightEggplant,
  },
  reject: {
    fontSize: 16,
    lineHeight: 16,
    color: Colors.lightEggplant,
    fontFamily: Fonts.Candara,
    marginTop: 3,
  },
  accept: {
    fontSize: 16,
    lineHeight: 16,
    color: Colors.brightGreen,
    fontFamily: Fonts.Candara,
    marginTop: 3,
  },
  v1: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  v2: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
    borderColor: Colors.trueGreen,
  },
});
