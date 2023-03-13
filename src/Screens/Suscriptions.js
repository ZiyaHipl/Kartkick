import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import ApiUrl from "../Lib/ApiUrl";
import Helper from "../Lib/Helper";

export default class Suscriptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planLIst: [],
      Subcriptionplanlist: "",
      title: this.props.route.params ? this.props.route.params.title : ''
    };
    AppHeader({ ...this, logo: false, leftIcon: this.state.title == "" && images.back, leftClick: () => { this.goBack() }, title: 'Subscriptions', rightHide: true, });
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  componentDidMount() {
    this.GetSubscription()
  }

  NavigateToNext = () => {
    if (this.state.Subcriptionplanlist == "") {
      Helper.showToast('Please Select Plan')
      return;
    } else {
      this.props.navigation.reset({
        index: 0,
        routes: [{ name: "HomeTabs" }],
      });
      // this.props.navigation.navigate("HomeTabs")
    }
  }
  parchesDetail = (item) => {
    this.addPlan(item)
    // this.props.navigation.navigate("AddPayment");
  };
  GetSubscription = () => {
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.Subscription, method: "GET", data: '' }).then((respoanse) => {
      Helper.hideLoader()
      if (respoanse.status) {
        this.setState({ planLIst: respoanse.data?.Subcriptionplanlist })
        this.setState({ Subcriptionplanlist: respoanse.data?.selectedsubrciption.subscriptions })
        // this.setState({ StoreList: respoanse.data })
      }
      else {
        Helper.hideLoader()
        Helper.showToast(respoanse.error_message);
      }
    });
  }


  addPlan = (item) => {
    Helper.showLoader()
    let data = {
      subscriptions: item.item?.id
    }
    Helper.makeRequest({ url: ApiUrl.addPlanApi, method: "POST", data: data }).then((respoanse) => {
      console.log('sdfsdfdsdfs',JSON.stringify(respoanse))
      Helper.hideLoader()
      if (respoanse) {
        this.GetSubscription()
        // Helper.setData("addPlan",item.item?.id)
        // Helper.setData('addplanId',respoanse.data?.Purchase_by)
        Helper.showToast(respoanse.message)
      }
      else {
        Helper.hideLoader()
        Helper.showToast(respoanse.error_message);
      }
    });
  }
  itemSuscriptions(item) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => { this.parchesDetail(item) }}>
          <Image source={this.state.Subcriptionplanlist == item.item?.id ? images.radiobutton_checked : images.radio_button} style={styles.radioIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.parchesDetail(item);
          }}
          style={{ flex: 1, marginHorizontal: 8, }}
        >
          <ImageBackground style={styles.backGroungImg} source={(item.item?.membership_type == "Basic" ? images.subscription_basic : null) || (item.item?.membership_type == 'Gold' ? images.subscription_gold : null) || (item.item?.membership_type == 'Silver ' ? images.subscription_silver : null) || (item.item?.membership_type == 'Bronze' ? images.subscription_bronze : null)}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ flex: 1, marginTop: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.txtLevelName}>{item.item?.membership_type}</Text>
                  {/* {this.state.Subcriptionplanlist == item.item?.id &&
                    <Image source={images.mark_purple} style={{ height: 15, width: 15, tintColor: Colors.white, resizeMode: 'contain', left: 5 }} />} */}
                </View>
                <Text style={styles.txtLevelDetail}>{item.item?.descriptions}</Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={styles.txtMoney}>{item.item?.price}</Text>
                <Image style={{ width: 19, height: 21 }} source={item.item?.membership_type ? images.Shape23 : null} />
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    )
  }


  render() {
    return (
      <ScrollView style={styles.viewMain}>
        <Text style={styles.txtLevel}>Choose your level</Text>
        {this.state.planLIst.length > 0 &&
          <View>
            <FlatList
              style={{ paddingVertical: 10, }}
              data={this.state.planLIst}
              renderItem={(item) => this.itemSuscriptions(item)}
            />
            {this.state.title == "PurchasePlan" &&
              <TouchableOpacity onPress={() => { this.NavigateToNext() }}>
                <Text style={styles.NextTxt}>NEXT</Text>
              </TouchableOpacity>}
          </View>}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewMain: { flex: 1, backgroundColor: Colors.white },
  radioIcon: { width: 22, height: 22, resizeMode: "contain", marginHorizontal: 8 },
  NextTxt: { margin: 15, fontSize: 25, fontFamily: Fonts.Candara, color: Colors.barney, textAlign: 'center', marginTop: 30 },
  txtLevel: {
    alignSelf: "center",
    fontSize: 18,
    fontFamily: Fonts.Candara,
    color: Colors.darkishPurple,
    marginTop: 22,
  },
  txtMoney: { fontFamily: Fonts.Candarab, fontSize: 18, color: Colors.white },
  txtLevelName: {
    fontFamily: Fonts.Candarab,
    fontSize: 22,
    color: Colors.white,
  },
  txtLevelDetail: {
    fontSize: 14,
    fontFamily: Fonts.Candara,
    color: Colors.white,
  },
  backGroungImg: {
    height: 120,
    paddingLeft: 16,
    paddingRight: 10,
    paddingVertical: 10,
  },
});
