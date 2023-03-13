import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";

const { width, height } = Dimensions.get("window");
export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headData: [
        { searchItem: "Tomato", id: 1 },
        { searchItem: "Onion", id: 2 },
        { searchItem: "Leafy Vegetables", id: 3 },
        { searchItem: "Root Vegetables", id: 4 },
      ],
      searchData: [
        { id: 1, isSelect: false },
        { id: 2, isSelect: true },
        { id: 3, isSelect: false },
        { id: 4, isSelect: false },
        { id: 5, isSelect: false },
        { id: 6, isSelect: false },
      ],
      seleHead: 1,
    };
    AppHeader({
      ...this,
      logo: false,
      leftIcon: images.back,
      leftClick: () => {this.goBack()},
      title:'Search Results',
      rightIcon: images.menu,
      rightClick:()=>{this.menuClick()},
      // search: false,
    });
  }

  menuClick=()=>{
    this.props.navigation.navigate('MyAccount')
  }

  goBack=()=>{
    this.props.navigation.goBack()
  }

  onFavretItem = (index) => {
    let selected = [...this.state.searchData];
    selected[index].isSelect = !selected[index].isSelect;
    this.setState({ searchData: selected });
  };

  onSelectHead = (item) => {
    this.setState({ seleHead: item.id });
  };

  onTabFilter = () => {
    this.props.navigation.navigate("Filter");
  };

  onTabList = () => {
    this.props.navigation.navigate("ProductDetail");
  };

  headerList = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => {this.onSelectHead(item);  }} style={styles.headView}>
        <Text style={ this.state.seleHead == item.id ? styles.actText : styles.headText } >
          {item.searchItem}
        </Text>
      </TouchableOpacity>
    );
  };

  searchList = ({ item, index }) => {
    return (
      <TouchableOpacity  onPress={() => {  this.onTabList();  }} style={styles.boxView}  >
        <Image  style={styles.listIcon}  source={images.searchresults_1} resizeMode={"stretch"} />
        <View style={{ position: "absolute", top: 6, right: 10 }}>
          <View>
            <Image style={styles.cardIcon} source={images.cart_yellow} />
          </View>
          <TouchableOpacity onPress={() => { this.onFavretItem(index); }}  >
            <Image
              style={[styles.cardIcon, { marginTop: 5 }]}
              source={item.isSelect ? images.fav_dark : images.fav_yellow}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.ribbinView}>
          <Text style={styles.wineText}>Organic Wine Tomatoes..</Text>
          <Image style={styles.ribbinIcon} source={images.ribbon_purple} />
          <View style={styles.positionView}>
            <Text style={styles.dolorText}>$ 1.45 </Text>
          </View>
        </View>
        <View  style={{  marginTop: 12, flexDirection: "row",  justifyContent: "space-between",  }}>
          <View style={styles.walmartView}>
            <Image  style={styles.walmartIcon}  source={images.wallmart_productdetail} />
            <Text style={styles.walmartText}>WallMart </Text>
          </View>
          <View style={styles.pickerView}>
            <Text style={styles.kgText}>500 g</Text>
            <Image style={styles.downIcon} source={images.dropdown_purple} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={this.state.headData}
            renderItem={this.headerList}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.searchView}>
          <Text style={[styles.searchText, { fontFamily: Fonts.Candara }]}>  Search Results of{" "}   <Text style={[styles.searchText, { fontFamily: Fonts.Candarab }]}>  Tomatoes  </Text>
          </Text>
          <TouchableOpacity  onPress={() => { this.onTabFilter();  }}  >
            <Image style={styles.filterIcon} source={images.filter} />
          </TouchableOpacity>
        </View>
        {/* <View style={{ backgroundColor: "red" }}> */}
        <View style={{ flex: 1, marginTop: 15 }}>
          <FlatList
            numColumns={2}
            data={this.state.searchData}
            renderItem={this.searchList}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  actText: {
    fontSize: 14,
    fontFamily: Fonts.Candarab,
    color: Colors.barney,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    overflow:'hidden'
  },
  headText: {
    fontSize: 14,
    fontFamily: Fonts.Candarab,
    color: Colors.greyishPurple,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  headView: {
    backgroundColor: Colors.lightLilac,
    paddingVertical: 9,
    paddingLeft: 10,
    alignItems: "center",
  },
  searchText: { marginLeft: 23, fontSize: 18, color: Colors.darkishPurple },
  searchView: {
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterIcon: { height: 18, width: 18, resizeMode: "contain", marginRight: 16 },
  listIcon: {
    height: 136,
    width: (width - 32) / 2,
    // left: -10,
    // top: -8
  },
  cardIcon: { height: 30, width: 30, resizeMode: "contain" },
  wineText: {
    fontSize: 10,
    fontWeight: "800",
    left: 5,
    color: Colors.darkIndigo,
  },
  ribbinIcon: { height: 21, width: 48, resizeMode: "contain" },
  ribbinView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  positionView: {
    position: "absolute",
    top: 0,
    right: 0,
    alignItems: "center",
  },
  dolorText: { right: 3, top: 2, fontSize: 12, color: Colors.white },
  walmartView: { flexDirection: "row", marginLeft: 5, alignItems: "center" },
  walmartIcon: { height: 11, width: 11, resizeMode: "contain" },
  walmartText: { fontSize: 10, color: Colors.barney, left: 2 },
  pickerView: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    marginRight: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    paddingVertical: 3,
    borderColor: Colors.barney,
  },
  kgText: {
    marginRight: 19,
    fontSize: 11,
    color: Colors.barney,
    right: 5,
    textAlign: "center",
  },
  downIcon: { height: 5, width: 7, resizeMode: "contain" },
  boxView: {
    backgroundColor: Colors.white,
    width: (width - 32) / 2,
    paddingBottom: 10,
    elevation: 5,
    borderWidth: 0.5,
    borderRadius: 15,
    marginHorizontal: 8,
    marginVertical: 5,
    overflow: "hidden",
  },
});
