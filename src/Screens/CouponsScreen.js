import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import ApiUrl from "../Lib/ApiUrl";
import Helper from "../Lib/Helper";
import Coupons from "./Coupons";

export default class CouponsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promotions: true,
      search: '',
      StoreList: [
        { name: "Wallmart", id: 1 },
        { name: "Giant", id: 2 },
        { name: "Megamart", id: 3 },
        { name: "Stemart", id: 4 },
        { name: "Costco", id: 5 },
      ],
      selectData: 1,
      promotionsListdata: [
        {
          icon: images.PromotionsCoupons_2,
          name: "E-Plant Strawberry",
          id: 1,
          isSelect: false,
        },
        {
          icon: images.PromotionsCoupons_1,
          name: "Case De Amor Organic",
          id: 2,
          isSelect: false,
        },
        {
          icon: images.PromotionsCoupons_3,
          name: "Case De Amor Organic",
          id: 3,
          isSelect: false,
        },
      ],
    };
    AppHeader({
      ...this,
      logo: false,
      leftIcon: images.back,
      leftClick: () => {
        this.props.navigation.navigate("Home")
      },
      right:true,
      title: 'Promotions & Coupons',
      // title:'Store Cards',
      rightIcon: images.menu,
      rightClick: () => { this.menuClick() },
      search: true,
      notification:true,
      notificationCount:Helper.notificationCount,
      searchIcon: images.notifications1,
      searchClick: () => { this.searchClick() }
    });
  }

  searchClick = () => {
    this.props.navigation.navigate('Notification')
  }

  menuClick = () => {
    this.props.navigation.navigate("MyAccount");
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  onSelectText = (item) => {
    this.setState({ selectData: item.id },()=>{
      this.Getstore_Category(item.id)
    });
  };

  onFavpurple = (index) => {
    let selected = [...this.state.promotionsListdata];
    selected[index].isSelect = !selected[index].isSelect;
    this.setState({ promotionsListdata: selected });
  };

  selectViewList = ({ item }) => {
    return (
      <View style={styles.textListView}>
        <TouchableOpacity  onPress={() => {  this.onSelectText(item);  }}  >
          <Text  style={ this.state.selectData == item.id  ? styles.actListText : styles.listText }  >
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  promotionsList = ({ item, index }) => {
    return (
      <View style={styles.mainView}>
        <View  style={{ flex: 0.3, alignItems: "center", backgroundColor: Colors.white, justifyContent: 'center'  }}
        >
          {/* <View style={styles.iconView}> */}
          <Image style={styles.icon} source={images.PromotionsCoupons_2} />
          {/* </View> */}
        </View>
        <View style={{ flex: 0.7, backgroundColor: "white" }}>
          <View style={styles.nameView}>
            <View>
              <Text style={styles.eplantTetx}>{item.category}</Text>
              <Text style={styles.kgText}>Seeds, : 2.20 Lbs</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image style={styles.img} source={images.wallmart_purple} />
                <Text style={styles.wallmartText}>WallMart Store</Text>
              </View>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image style={styles.ribbin} source={images.ribbon_dark} />
              <View style={{ position: "absolute", top: 2 }}>
                <Text style={styles.cuText}>$ 2.5</Text>
                <Text style={styles.nonCutText}>$ 3.45</Text>
              </View>
            </View>
          </View>
          <View style={styles.lastViewL}>
            <Image style={styles.barcodeImg} source={images.barcode} />
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => { this.onFavpurple(index) }}>
                <Image style={styles.sameIcon} source={images.like} />
              </TouchableOpacity>
              <Image style={styles.sameIcon} source={images.cart_purple} />
            </View>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <Image source={images.ComingSoon} style={{height:"100%",width:"100%",resizeMode:"contain"}}/>
        {/* <View style={{ flexDirection: "row", marginTop: 20, justifyContent: 'space-between', marginHorizontal: 10 }}>
          <TouchableOpacity  onPress={() => {   this.setState({ promotions: true });  }}   style={{ alignItems: "center", }}  >
            <Text style={this.state.promotions ? styles.actBtnTExt : styles.btnText} >Promotions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { this.setState({ promotions: false }); }} style={{ alignItems: "center", }}  >
            <Text style={this.state.promotions ? styles.btnText : styles.actBtnTExt}  >  Coupons  </Text>
          </TouchableOpacity>
        </View>
        {this.state.promotions ? (
          <View>
            <View style={[styles.searchView, { height: 40, justifyContent: "center" }]}>
              <TextInput style={{ paddingLeft: 15, color: Colors.barney }}
                placeholder="Search"
                placeholderTextColor={Colors.barney}
                onChangeText={(text) => { this.setState({ search: text }) }}
                value={this.state.search}
              />
            </View>
            <View style={{ marginTop: 16 }}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.StoreList}
                renderItem={this.selectViewList}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
            <View>
              <FlatList
                data={this.state.promotionsListdata}
                renderItem={this.promotionsList}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        ) : (
          <Coupons />
        )} */}
      </View>
    );
  }

  componentDidMount=()=>{
    // this.Getstore()
  }
  Getstore=()=>{
    Helper.showLoader()
      Helper.makeRequest({ url:ApiUrl.store, method: "GET", data: '' }).then((respoanse) => {
        // console.log('get-store', respoanse,)
        Helper.hideLoader()
        if (respoanse.status) {
              this.state.catId=respoanse.data[0].id
              this.setState({StoreList:respoanse.data},()=>{
              this.Getstore_Category(this.state.catId)
              //  console.log(this.state.catId)
             })
        }
        else {
        }
  
      });
    }

    Getstore_Category=(categoryId)=>{
      Helper.showLoader()
        Helper.makeRequest({ url:ApiUrl.store_category+categoryId, method: "GET", data: '' }).then((respoanse) => {
         console.log('get-store', respoanse,)
          Helper.hideLoader()
          if (respoanse.status) {
              this.setState({promotionsListdata:respoanse.data})
          }
          else {
          }
        });
      }
  
}
const styles = StyleSheet.create({
  btnText: {
    borderWidth: 0.5,
    borderColor: Colors.barney,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 18,
    fontFamily: Fonts.Candarab,
    color: Colors.barney, paddingVertical: 10, paddingHorizontal: 40
  },
  searchView: { marginHorizontal: 20, borderRadius: 30, top: 8, borderWidth: 0.5, height: '9%', borderColor: Colors.barney },
  actBtnTExt: {
    borderWidth: 0.5,
    borderColor: Colors.barney,
    paddingVertical: 10,
    borderRadius: 20,
    fontSize: 18,
    fontFamily: Fonts.Candarab,
    color: Colors.white,
    backgroundColor: Colors.barney,
    overflow: 'hidden', paddingVertical: 10, paddingHorizontal: 40
  },
  listText: {
    fontSize: 14,
    fontFamily: Fonts.Candarab,
    color: Colors.greyishPurple,
  },
  actListText: {
    fontSize: 14,
    fontFamily: Fonts.Candarab,
    color: Colors.barney,
    paddingHorizontal: 12,
    backgroundColor: Colors.white,
    paddingVertical: 10,
    borderRadius: 10,
    overflow: 'hidden'
  },
  textListView: {
    backgroundColor: 'rgb(235, 215, 247)',
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  iconView: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { height: 80, width: 80, resizeMode: "contain", },
  eplantTetx: {
    fontSize: 12,
    fontFamily: Fonts.Candarab,
    color: Colors.indigo,
  },
  kgText: {
    fontSize: 12,
    fontFamily: Fonts.Candarab,
    color: Colors.indigo,
    marginTop: 2,
  },
  img: { height: 13, width: 13, resizeMode: "contain" },
  wallmartText: { fontSize: 10, color: Colors.barney, left: 5 },
  cuText: {
    fontSize: 12,
    color: Colors.neonYellow,
    textDecorationLine: "line-through",
  },
  ribbin: { height: 40, width: 79, resizeMode: "contain" },
  nonCutText: { fontSize: 14, color: Colors.white },
  nameView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainView: {
    marginTop: 10,
    marginHorizontal: 15,
    flexDirection: "row",
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.greyish,
    backgroundColor: Colors.white,
  },
  lastViewL: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 7,
  },
  barcodeImg: { height: 31, width: 65, resizeMode: "contain" },
  sameIcon: { height: 25, width: 25, resizeMode: "contain", marginRight: 5 },
});
