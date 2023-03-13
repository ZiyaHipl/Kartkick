import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import ApiUrl from "../Lib/ApiUrl";
import Helper from "../Lib/Helper";

let SortArray = [];

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noDataFound: true,
      searchKeyword: "",
      SearchListData: [],
    };
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  onClickItem(item) {
    if (item.sub_category) {
      this.props.navigation.navigate('SubCatDetails', { Product: item.id, backtype: '' })

    } else {
      this.props.navigation.navigate('StoreCatList', { Store_Cat: item, Cat_type: 'StoreCatgory' })

      // this.props.navigation.navigate('SubCatDetails', { Product: item.sub_category.id, backtype: '' })

    }
  }
  _renderCategoryItems = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => this.onClickItem(item)}
        style={styles.flView}>
        <View style={{ paddingHorizontal: 15, paddingVertical: 7 }}>
          <Text style={styles.textCat}>{item.sub_category ? item.sub_category : item.category}</Text>
        </View>
        <View style={{ width: "100%", height: 1, opacity: 0.16, backgroundColor: Colors.warmGrayTwo }} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{ padding: 20, flexDirection: "row", alignItems: "center" }}
        >
          <TouchableOpacity onPress={() => { this.goBack() }}>
            <Image
              style={{ width: 20, height: 20, resizeMode: "contain" }} source={images.back}
            />
          </TouchableOpacity>
          <View
            style={{ width: 1, height: 33, marginLeft: 20, backgroundColor: Colors.darkishPurple, }}
          />
          <TextInput
            style={{ marginLeft: 20, fontSize: 22, lineHeight: 30, }}
            placeholderTextColor={Colors.barney}
            placeholder={"Category, Product, etc."}
            returnKeyType="search"
            onChangeText={(value) => { this.searchApi(value); }}
          />
        </View>
        <View
          style={{
            width: "100%",
            height: 1,
            opacity: 0.16,
            backgroundColor: Colors.warmGrayTwo,
          }}
        />

        {this.state.SearchListData.length > 0 || this.state.noDataFound ?
          <FlatList
            style={styles.view1}
            extraData={this.state}
            keyExtractor={(item) => item.id}
            data={this.state.SearchListData}
            renderItem={this._renderCategoryItems}
            showsVerticalScrollIndicator={false}
          />
          :
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 18 }}>Not found</Text>
          </View>
        }
      </View>
    );
  }
  
  searchApi = (keyword) => {
    Helper.makeRequest({ url: ApiUrl.store_Product_search + "?search=" + keyword, method: "GET", data: '' }).then((respoanse) => {
      SortArray = [...respoanse.results.category, ...respoanse.results.product];
      if (SortArray <= 0) {
        this.state.noDataFound = false;
      }
      this.setState({
        SearchListData: [...respoanse.results.category, ...respoanse.results.product]
      })
      // if (respoanse.code == 200) {
      // }
    });
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  textCat: {
    fontSize: 18,
    lineHeight: 43,
    fontFamily: Fonts.Candarab,
    color: "#8d5bac",
  },
});
