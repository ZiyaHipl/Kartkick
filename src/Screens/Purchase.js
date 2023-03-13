import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  DeviceEventEmitter
} from "react-native";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";

export default class Purchase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listPurchase: [
        {
          txtListHader: "Household Summary",
          txtTotalSpending: "Total Spending",
          txtSpendingMoney: "$ 39.56",
          txtTotalSaving: "Total Saving",
          txtSavingMoney: "$ 2.00",
          txtCouponsUsed: "Coupons Used",
          txtCouponsUsedNumber: "3",
          txtPromotionsUsed: "Promotions Used",
          txtPromotionsUsedNumber: "2",
          txtTotalStore: "Total Store visited",
          txtTotalStoreNumber: "3",
        },
        {
          txtListHader: "Neighbor Summary",
          txtTotalSpending: "Total Spending",
          txtSpendingMoney: "$ 39.56",
          txtTotalSaving: "Total Saving",
          txtSavingMoney: "$ 2.00",
          txtCouponsUsed: "Coupons Used",
          txtCouponsUsedNumber: "3",
          txtPromotionsUsed: "Promotions Used",
          txtPromotionsUsedNumber: "2",
          txtTotalStore: "Total Store visited",
          txtTotalStoreNumber: "3",
        },
      ],
    };
    AppHeader({
      ...this,
      logo: false,
      leftIcon: images.back,
      leftClick: () => { this.goBack() },
      title: 'Purchase',
      rightIcon: images.menu,
      rightClick: () => {  this.goAccount()}
    });
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  goAccount=()=>{
    this.props.navigation.navigate('MyAccount')
  }

  goFalseScreen = (value) => {
    DeviceEventEmitter.emit('tabStateChange', { type: value });
    this.props.navigation.navigate('ShoppingList',{type: value })
  }

  renderPurchase = ({ item, index }) => {
    return (
      <View>
        <View style={{ height: (index == 0) ? 0 : 15, backgroundColor: Colors.white }} />
        <View>
          <Image source={images.Path_img}
            style={{ height: 30, width: 200 }} />
          <View style={{ position: 'absolute', paddingHorizontal: 15 }}>
            <Text style={styles.txtListHader}>{item.txtListHader}</Text>
          </View>
        </View>
        {/* <View style={{ width: 180, backgroundColor: Colors.lightLilacTwo, alignItems: "center", }}>
          <Text style={styles.txtListHader}>{item.txtListHader}</Text>
        </View> */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 14,
            marginHorizontal: 15,
            alignItems: "center",
          }}
        >
          <Text style={styles.txtTotalSpending}>{item.txtTotalSpending}</Text>
          {item.txtListHader == 'Household Summary'?
          <Text style={styles.txtSpendingMoney}>$ {this.props.route.params?Number(this.props.route.params.TotalPrice).toFixed(2):0}</Text>
          :<Text style={styles.txtSpendingMoney}>$ {this.props.route.params?Number(this.props.route.params.TotalPrice2).toFixed(2):0}</Text>}
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 4,
            marginHorizontal: 15,
            alignItems: "center",
          }}
        >
          <Text style={styles.txtTotalSaving}>{item.txtTotalSaving}</Text>
          <Text style={styles.txtSavingMoney}>{item.txtSavingMoney}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 4,
            marginHorizontal: 15,
            alignItems: "center",
          }}
        >
          <Text style={styles.txtOtherDetail}>{item.txtCouponsUsed}</Text>
          <Text style={styles.txtOtherNumber}>{item.txtCouponsUsedNumber}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 4,
            marginHorizontal: 15,
            alignItems: "center",
          }}
        >
          <Text style={styles.txtOtherDetail}>{item.txtPromotionsUsed}</Text>
          <Text style={styles.txtOtherNumber}>
            {item.txtPromotionsUsedNumber}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 4,
            marginHorizontal: 15,
            alignItems: "center",
          }}
        >
          <Text style={styles.txtOtherDetail}>{item.txtTotalStore}</Text>
          <Text style={styles.txtOtherNumber}>{item.txtTotalStoreNumber}</Text>
        </View>

        <Text ellipsizeMode="clip" numberOfLines={1} style={{ color: 'black',marginTop:15 }}>
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - - - - - - - - - -
    </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.viewMain}>
        <View style={styles.haderView}>
          <Text style={styles.txtHaderView}>Summary</Text>
        </View>

        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 12,
              marginHorizontal: 22,
            }}
          >
            <Image style={styles.iconSummary} source={images.summary_dark} />
            <Text style={styles.txtSummary}>Summary</Text>

            <TouchableOpacity
              onPress={() => {
                this.goFalseScreen(true);
              }}
              style={{ alignItems: "center" }}
            >
              <Image style={styles.iconHousehold} source={images.household} />
              <Text style={styles.txtHousehold}>Household</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.goFalseScreen(false) }} style={{ alignItems: "center", marginLeft: 24 }}>
              <Image
                style={styles.iconNeighbour}
                source={images.neighbor_shopping}
              />
              <Text style={styles.txtNeighbour}>Neighbor</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardView}>
            <FlatList
              data={this.state.listPurchase}
              renderItem={this.renderPurchase}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewMain: { flex: 1, backgroundColor: Colors.white },
  haderView: {
    flexDirection: "row",
    backgroundColor: Colors.barney,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  txtHaderView: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.Candara,
  },
  iconSummary: { width: 21, height: 14, resizeMode: "contain" },
  txtSummary: {
    flex: 1,
    fontFamily: Fonts.Candarab,
    fontSize: 12,
    color: Colors.darkishPurple,
    marginLeft: 3,
  },
  iconHousehold: { width: 13, height: 14, resizeMode: "contain" },
  txtHousehold: {
    fontFamily: Fonts.Candarab,
    fontSize: 12,
    color: Colors.darkishPurple,
    marginTop: 4,
  },
  iconNeighbour: { width: 16, height: 14, resizeMode: "contain" },
  txtNeighbour: {
    fontFamily: Fonts.Candarab,
    fontSize: 12,
    color: Colors.darkishPurple,
    marginTop: 4,
  },
  cardView: {
    backgroundColor: Colors.white,
    borderRadius: 25,
    paddingVertical: 26,
    elevation: 3,
    marginTop: 22,
    marginHorizontal: 16,
    marginBottom: 20, elevation: 5, shadowOpacity: 0.25, shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  txtListHader: {
    fontSize: 16,
    fontFamily: Fonts.Candarab,
    color: Colors.darkishPurple,
    paddingVertical: 4,
  },
  txtTotalSpending: {
    flex: 0.8,
    fontFamily: Fonts.Candarab,
    fontSize: 14,
    color: Colors.amethystTwo,
  },
  txtSpendingMoney: {
    flex: 0.2,
    fontWeight: "bold",
    fontSize: 14,
    color: Colors.grape,
  },
  txtTotalSaving: {
    flex: 0.8,
    fontFamily: Fonts.Candarab,
    fontSize: 14,
    color: Colors.palePurple,
  },
  txtSavingMoney: {
    flex: 0.2,
    fontWeight: "bold",
    fontSize: 14,
    color: Colors.grape,
  },
  txtOtherDetail: {
    flex: 0.8,
    fontFamily: Fonts.Candara,
    fontSize: 14,
    color: Colors.grape,
  },
  txtOtherNumber: {
    flex: 0.2,
    fontFamily: Fonts.Candara,
    fontSize: 14,
    color: Colors.grape,
  },
});
