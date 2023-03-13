import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Productitem:'',
      like: false,
      count: 0,
    };
    AppHeader({
      ...this,
      logo: false,
      leftIcon: images.back,
      leftClick: () => {this.goBack()},
      title:'Product Detail',
      rightIcon: images.menu,
      rightClick:()=>{this.menuClick()},
      search: true,
      notification:false,
      searchIcon: images.cart_purple_nav,
      searchClick: ()=>{this.onClickSearch()}
    });
  }

  onClickSearch=()=>{
    this.props.navigation.navigate('ShoppingTab')
  }

  goBack=()=>{
    this.props.navigation.goBack()
  }

  menuClick=()=>{
    this.props.navigation.navigate('MyAccount')
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  decrement = () => {
    if(this.state.count <=0){
      return
    }else{
    this.setState({
      count: this.state.count - 1,
    });}
  };

  onChangeLike = () => {
    this.setState({ like: !this.state.like });
  };


  render() {
    return (
      <ScrollView>
        <View style={styles.viewMain}>
          <View style={styles.headView}>
            <Text style={styles.productName}>Organic Wine Tomatoes</Text>

            <TouchableOpacity
              onPress={() => {
                this.onChangeLike();
              }}
              style={{ marginRight: 6 }}
            >
              <Image
                source={this.state.like ? images.fav_dark : images.fav_purple}
                style={styles.iconLike}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image source={images.cart_purple} style={styles.iconLike} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginLeft: 16,
              alignItems: "center",
            }}
          >
            <Image
              style={styles.iconWallMart}
              source={images.wallmart_productdetail}
            />
            <Text style={styles.txtWallMart}>WallMart</Text>
          </View>

          <View style={{ marginTop: 35, paddingHorizontal: 70 }}>
            <Image
              style={styles.productImg}
              source={images.product_detail_img}
            />
          </View>

          <View
            style={{
              alignSelf: "flex-end",
              marginRight: 16,
              alignItems: "center",
            }}
          >
            <Text style={{ color: Colors.greyishTwo }}>$ 3.45</Text>
            <View
              style={{
                height: 1,
                width: 42,
                backgroundColor: Colors.greyishTwo,
                position: "absolute",
                marginTop: 10,
              }}
            ></View>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 16,
              alignItems: "center",
            }}
          >
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Image source={images.discount} style={styles.iconDiscount} />
              <Text style={styles.txtOff}>$ 2 OFF</Text>
            </View>
            <Text style={styles.txtProductWeight}>500 gm</Text>
            <Text style={styles.txtMoney}>$ 1.45</Text>
          </View>
          <View style={styles.boder}></View>
          <Text style={styles.txtDescriptions}>Descriptions</Text>
          <Text style={styles.txtDescriptionDetail}>
            You’ve been buying the same ol’ grocery store tomato sauce for
            years, but have you ever thought of making your own? It’s actually
            really simple! Here’s a recipe for a Red Wine Tomato Sauce that will
            kick those grocery store brands to the curb.
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 16,
              marginTop: 22,
              alignItems: "center",
            }}
          >
            <Text style={styles.txtAddQuantity}>Add Quantity</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  this.decrement();
                }}
                style={styles.btnMinus}
              >
                <View style={styles.boderMinus}></View>
              </TouchableOpacity>
              <Text style={styles.txtCount}>{this.state.count}</Text>
              <TouchableOpacity
                onPress={() => {
                  this.increment();
                }}
                style={styles.btnPlus}
              >
                <Image
                  style={{ height: 30, width: 30, resizeMode: "contain" }}
                  source={images.plus_color}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity onPress={()=>{this.onClickSearch()}} style={styles.btnAddShopping}>
            <Image
              style={{ width: 23, height: 23, resizeMode: "contain" }}
              source={images.cart_white}
            />
            <Text style={styles.txtAddShopping}>ADD TO SHOPPING LIST</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  componentDidMount = () => {
      this.GetProductDetails()
   }

 GetProductDetails=()=>{

  }

}

const styles = StyleSheet.create({
  viewMain: { flex: 1, backgroundColor: Colors.white },
  productName: {
    flex: 1,
    color: Colors.darkIndigo,
    fontSize: 18,
    fontFamily: Fonts.Candarab,
  },
  iconLike: { width: 25, height: 25, resizeMode: "contain" },
  iconWallMart: { width: 22, height: 20, resizeMode: "contain" },
  txtWallMart: {
    fontFamily: Fonts.Candara,
    fontSize: 18,
    color: Colors.barney,
    marginLeft: 9,
  },
  productImg: { width: "100%", height: 220, resizeMode: "contain" },
  iconDiscount: { width: 23, height: 23, resizeMode: "contain" },
  txtOff: {
    color: Colors.grassGreen,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 6,
  },
  txtProductWeight: {
    fontSize: 13,
    color: Colors.barney,
    borderColor: Colors.barney,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  txtMoney: {
    flex: 1,
    color: Colors.darkIndigo,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "right",
  },
  boder: {
    backgroundColor: Colors.wormGray,
    height: 1,
    marginHorizontal: 16,
    marginTop: 24,
  },
  txtDescriptions: {
    color: Colors.barney,
    fontSize: 18,
    fontFamily: Fonts.Candara,
    marginLeft: 16,
    marginTop: 16,
  },
  txtDescriptionDetail: {
    color: Colors.slateGrey,
    fontFamily: Fonts.Candara,
    fontSize: 12,
    marginHorizontal: 16,
    lineHeight: 16,
    marginTop: 5,
  },
  txtAddQuantity: {
    flex: 1,
    fontFamily: Fonts.Candara,
    fontSize: 18,
    color: Colors.barney,
  },
  btnMinus: {
    backgroundColor: Colors.veryLightPurple,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  boderMinus: {
    backgroundColor: Colors.barney,
    width: 18,
    height: 4,
    marginVertical: 13,
    marginLeft: 8,
    marginRight: 5,
  },
  txtCount: {
    fontFamily: Fonts.Candara,
    fontSize: 16,
    color: Colors.barney,
    paddingHorizontal: 12,
  },
  btnPlus: {
    backgroundColor: Colors.veryLightPurple,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  btnAddShopping: {
    flexDirection: "row",
    backgroundColor: Colors.barney,
    borderRadius: 26,
    marginHorizontal: 16,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    marginBottom: 30,
  },
  txtAddShopping: {
    fontSize: 14,
    fontFamily: Fonts.Candarab,
    color: Colors.white,
    marginLeft: 4,
  },
  headView: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 11,
    alignItems: "center",
  },
});
