import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  ImageBackground,
  DeviceEventEmitter,
} from "react-native";

import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import AppButton from "../Compnont/AppButton";
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native-gesture-handler";
import AppHeader from "../Compnont/AppHeader";
import Helper from "../Lib/Helper";
import ApiUrl from "../Lib/ApiUrl";
import Config from "../Lib/Config";
import RemoveCart from "../Compnont/RemoveCart"
export default class CartFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Totalcount: 0,
      Totalquantity: 0,
      ListFamily: [],
      ListNeighbour: [],
      isshow: false,
      listOfOrder: [
        { text: "Total Number of Items", number: "3", number1: "2" },
        { text: "Est. Total Price", number: "$200", number1: "$100" },
        { text: "Est. Tax", number: "$10", number1: "$10" },
        { text: "Est. Discount", number: "$50", number1: "$10" },
      ],
      isOpen: true,
    };
    AppHeader({
      ...this,
      logo: false,
      leftIcon: images.back,
      leftClick: () => {
        this.goBack();
      },
      title: "Cart",
      rightIcon: images.menu,
      rightClick: () => { this.goAccount() }
    });
  }

  goAccount = () => {
    this.props.navigation.navigate('MyAccount')
  }

  goBack = () => {
    DeviceEventEmitter.emit('cart');
    this.props.navigation.goBack();
  };

  increment = (item, index) => {
    var listData1 = this.state.ListFamily;
    listData1[index].shoppinglist1.quantity = Number(listData1[index].shoppinglist1.quantity) + 1;
    // DeviceEventEmitter.emit("CartCount",Number(listData1[index].shoppinglist1.quantity))
    this.setState({ ListFamily: listData1 });
  };

  decrement = (item, index) => {
    if (this.state.ListFamily[index].shoppinglist1.quantity <= 1) { return }
    {
      var listDataNew = this.state.ListFamily;
      listDataNew[index].shoppinglist1.quantity = Number(listDataNew[index].shoppinglist1.quantity) - 1;
      // DeviceEventEmitter.emit("CartCount",Number(listDataNew[index].shoppinglist1.quantity))
      this.setState({ ListFamily: listDataNew });
    }
  };


  incrementNeighbour = (item, index) => {
    var listData11 = this.state.ListNeighbour;
    listData11[index].shoppinglist1.quantity = listData11[index].shoppinglist1.quantity + 1;
    this.setState({ ListNeighbour: listData11 });
  };

  decrementNeighbour = (item, index) => {
    if (this.state.ListNeighbour[index].number1 <= 0) {
      return
    } {
      var listDataNew1 = this.state.ListNeighbour;
      listDataNew1[index].shoppinglist1.quantity = listDataNew1[index].shoppinglist1.quantity - 1;
      this.setState({ ListNeighbour: listDataNew1 });
    }
  };

  renderOfItemList = ({ item }) => {
    return (
      <View style={{ flexDirection: "row", marginVertical: 7 }}>
        <Text style={styles.text12}>{item.text}</Text>
        <Text style={styles.text123}>
          {this.state.isOpen ? item.number : item.number1}
        </Text>
      </View>
    );
  };

  render() {
    let TempPriceArray = [];
    this.state.ListFamily.forEach(element => {
      TempPriceArray.push((Number(element.shoppinglist1.quantity) * Number(element.shoppinglist1.items.price)).toFixed(2))
    });

    let TotalPrice = 0;
    for (let i = 0; i < TempPriceArray.length; i++) {
      TotalPrice = TotalPrice + Number(TempPriceArray[i]);
    }

    return (
      <ScrollView style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={styles.topView}>
          <View style={{}}>
            <AppButton
              onClick={() => { this.setState({ isOpen: true }); }}
              Background={this.state.isOpen == true ? Colors.barney : Colors.white}
              borderRadius={30}
              paddinghor={50}
              paddingver={10}
              borderColor={this.state.isOpen == true ? null : Colors.barney}
              borderWidth={this.state.isOpen == true ? null : 1}
              M_Ver={10}
              title={"Family"}
              fontSize={22}
              textolor={this.state.isOpen == true ? Colors.white : Colors.barney}
              fontFamily={Fonts.Candarab}
              M_Hor={5}
            />
          </View>
          <View style={{}}>
            <AppButton
              onClick={() => { this.setState({ isOpen: false }); }}
              Background={this.state.isOpen == false ? Colors.barney : Colors.white}
              borderRadius={30}
              paddinghor={30}
              paddingver={10}
              borderColor={this.state.isOpen == false ? null : Colors.barney}
              borderWidth={this.state.isOpen == false ? null : 1}
              M_Ver={16}
              title={"Neighbor"}
              fontSize={22}
              textolor={this.state.isOpen == false ? Colors.white : Colors.barney}
              fontFamily={Fonts.Candarab}
            />
          </View>
        </View>
        {this.state.isOpen ?
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={this.state.ListFamily}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) =>
                <RemoveCart item={item}
                  index={index}
                  // onPressSubSittues={()=>onPressStitues()}
                  // ProductDetails={this.ProductDetails}
                  decrement1={this.decrement}
                  increment1={this.increment}
                  directChange={this.directChange}
                  Removeitem={(data) => { this.Removeitem(data) }}
                // is_private={(data, index) => { this.is_private(data, index) }}
                // showModalSelectedSubstitues={() => this.setState({ modalSelectedSubstitues: true })}
                />
              }
            />
          </View> :
          <View style={{ flex: 1, height: '100%', marginTop: 240, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16, }}>Item Not Found</Text>
          </View>
        }
        {/* {this.state.isOpen&&
        <View style={styles.viewCoupon}>
          <Image style={styles.iconCoupon} source={images.couponcode} />
          <TextInput
            style={styles.textInputCoupon}
            placeholder={"coupon code"}
          />
          <TouchableOpacity>
            <Text style={styles.applyCoupon}>Apply Coupon</Text>
          </TouchableOpacity>
        </View>} */}
        {this.state.isOpen && this.state.isshow ?
          <View style={styles.viewOrder}>
            <Text style={styles.textOrder}>Order Summary</Text>
            <View style={styles.line1} />
            <View>
              <View style={{ flexDirection: "row", marginVertical: 7 }}>
                <Text style={styles.text12}>Total Number of Items</Text>
                <Text style={styles.text123}>{this.state.ListFamily.length}</Text>
              </View>
              <View style={{ flexDirection: "row", marginVertical: 7 }}>
                <Text style={styles.text12}>Est. Total Price</Text>
                <Text style={styles.text123}>${TotalPrice.toFixed(2)}</Text>
              </View>

              {/* <View style={{ flexDirection: "row", marginVertical: 7 }}>
              <Text style={styles.text12}>Est. Tax</Text>
              <Text style={styles.text123}>3</Text>
            </View>

            <View style={{ flexDirection: "row", marginVertical: 7 }}>
              <Text style={styles.text12}>Est. Discount</Text>
              <Text style={styles.text123}>$50</Text>
            </View> */}
              {/* <FlatList
              data={this.state.listOfOrder}
              renderItem={this.renderOfItemList}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
            /> */}
            </View>
            <View style={styles.line2} />
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Text style={styles.grandtotal}>Grand Total</Text>
              <Text style={styles.total}>${TotalPrice.toFixed(2)} </Text>
            </View>
          </View> : null
        }
        {this.state.isOpen && this.state.isshow ?
          <View style={{ marginTop: 20, alignItems: "center" }}>
            <Text style={styles.welldone}>Well Done </Text>
            <Text style={styles.welldone1}>Everything looks good</Text>
          </View>
          : null}
        {this.state.isOpen && this.state.isshow ?
          <View>
            <AppButton
              onClick={() => { }}
              Background={Colors.barney}
              paddinghor={45}
              paddingver={20}
              M_Ver={16}
              title={"Checkout/Pay"}
              fontSize={21}
              textolor={Colors.white}
              fontFamily={Fonts.Candarab}
            />
          </View> : null}
      </ScrollView>
    );
  }
  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.GetAddCart()
    });
  }

  directChange = (item, index, value) => {
    var listData1 = this.state.ListFamily;
    listData1[index].shoppinglist1.quantity = Number(value.replace(/[^0-9]/g, ''));
    this.setState({ ListFamily: listData1 })
  }

  Removeitem = (item) => {
    console.log(JSON.stringify(item))
    Helper.confirmPopUp("Are you sure you want to Remove this item.", (status) => {
      if (status) {
        Helper.showLoader()
        Helper.makeRequest({ url: ApiUrl.AddCartDelete + item.id + '/', method: "DELETE", data: '' }).then((respoanse) => {
          Helper.hideLoader()
          if (respoanse.status) {
            this.GetAddCart()
          }
          else { }
        });
      }
    });
  }
  GetAddCart = () => {
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.store_addcart, method: "GET", }).then((respoanse) => {
      console.log('store_addcartstore_addcart', JSON.stringify(respoanse))
      Helper.hideLoader()
      if (respoanse.status) {
        this.setState({ ListFamily: respoanse.data, isshow: true, })
      }
      else { }
    });
  }

  is_private = (item, index) => {
    if (!item.shoppinglist1.is_private) {
      Helper.confirmPopUp('Are you sure you want to Private this Product ?', (status) => {
        if (status) {
          this.PrivateConfrim(item, index)
        }
      });
    } else {
      this.PrivateConfrim(item, index)
    }

  }

  PrivateConfrim = (item, index) => {
    var data = {
      is_private: item.shoppinglist1.is_private ? 0 : 1
    }
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.store_Itemlist_update + item.shoppinglist1.id + '/', method: "PATCH", data: data }).then((respoanse) => {
      console.log('store_Itemlist_update', respoanse)
      Helper.hideLoader()
      var listData1 = this.state.ListFamily;
      listData1[index].shoppinglist1.is_private = item.shoppinglist1.is_private ? false : true;
      this.setState({ ListFamily: listData1 });
    });
  }
}
const styles = StyleSheet.create({
  // topView: { flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between', marginTop: 15, alignItems:'center' },
  topView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 17,
  },
  mainView2: {
    borderWidth: 1,
    borderColor: "rgb(183,183,183)",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: "rgb(252,254,202)",
    marginTop: 15,
    paddingVertical: 15,
    marginHorizontal: 17,
  },
  mainView21: {
    borderWidth: 1,
    borderColor: "rgb(183,183,183)",
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: Colors.white,
    marginTop: 15,
    paddingVertical: 15,
    marginHorizontal: 17,
  },
  icon2: { width: 66, height: 60, resizeMode: "contain" },
  storeIcon: { width: 12, height: 10, resizeMode: "contain" },
  touch2: { width: 20, height: 20, resizeMode: "contain" },
  number2: { paddingHorizontal: 10, backgroundColor: Colors.white },
  ImageBack: { width: 60, height: 27, resizeMode: "contain" },
  lockIcon: {
    width: 21,
    height: 21,
    resizeMode: "contain",
    marginTop: 15,
  },
  textType1: { fontSize: 12, lineHeight: 12, color: Colors.indigo },
  textStore: { fontSize: 12, lineHeight: 12, color: "rgb(88,88,88)" },
  textPrice1: {
    marginTop: 3,
    alignSelf: "center",
    fontSize: 16,
    lineHeight: 20,
    color: Colors.white,
  },
  text12: { flex: 1, fontSize: 16, lineHeight: 18, fontFamily: Fonts.Candarab },
  text123: { fontSize: 16, lineHeight: 18, fontFamily: Fonts.Candarab },
  viewCoupon: {
    marginTop: 20,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Colors.greenApple,
    borderRadius: 40,
    paddingHorizontal: 15,
    marginHorizontal: 22,
  },
  iconCoupon: { width: 20, height: 20, resizeMode: "contain" },
  textInputCoupon: {
    fontSize: 16,
    flex: 1,
    marginLeft: 5,
    lineHeight: 19,
    height: 55
  },
  applyCoupon: {
    color: Colors.trueGreen2,
    fontSize: 18,
    lineHeight: 22,
    fontFamily: Fonts.Candarab,
  },
  viewOrder: { marginHorizontal: 22, marginTop: 20 },
  textOrder: {
    color: Colors.indigo,
    fontSize: 18,
    lineHeight: 22,
    fontFamily: Fonts.Candarab,
  },
  line1: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.warmGrayTwo,
    opacity: 0.36,
    marginTop: 7,
    marginBottom: 10,
  },
  line2: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.warmGrayTwo,
    opacity: 0.36,
  },
  grandtotal: {
    flex: 1,
    fontSize: 19,
    lineHeight: 34,
    color: Colors.trueGreen2,
    fontFamily: Fonts.Candarab,
  },
  total: {
    fontSize: 19,
    lineHeight: 34,
    color: Colors.trueGreen2,
    fontFamily: Fonts.Candarab,
  },
  welldone: {
    fontSize: 19,
    lineHeight: 20,
    color: Colors.darkIndigo,
    fontFamily: Fonts.Candarab,
  },
  welldone1: {
    fontSize: 16,
    lineHeight: 20,
    color: Colors.darkIndigo,
    fontFamily: Fonts.Candara,
  },
});
