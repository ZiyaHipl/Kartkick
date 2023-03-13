import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import images from "../Compnont/ImagePath";
import Fonts from "../Compnont/Fonts";
import Colors from "../Compnont/Colors";
import AppHeader from "../Compnont/AppHeader";
import { TextInput } from "react-native-gesture-handler";
import StoreCatList from "./StoreCatList";
import Helper from "../Lib/Helper";
import ApiUrl from "../Lib/ApiUrl";

const { width, height } = Dimensions.get('window')
export default class StoreCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelect: true,
      SelectData: false,
      search: '',
      Selectitem: 0,
      StoreList: [],
      favList: [],
    };
    AppHeader({
      ...this,
      logo: false,
      leftIcon: images.back,
      leftClick: () => { this.goBack() },
      title: 'Store Cards',
      rightHide: true,
    });
  }

  goBack = () => {
    this.props.navigation.goBack()
  }
  // StoreCatList = (itemId) => {
  //   this.props.navigation.navigate('StoreCatList', { Store_Cat: itemId })
  // }
  SelectStore = (item) => {
    this.setState({ Selectitem: item.store.id, Additem: item, })
  }

  all_Store_List = ({ item, index }) => {
    return (
      <View style={[styles.mainView, { borderWidth: 1, borderColor: this.state.SelectData == true ? Colors.barney : 'transparent' }]}>
        <View style={styles.tinView}>
          <TouchableOpacity onPress={() => this.SelectStore(item)}  >
            <Image style={[styles.tinIcon, { tintColor: this.state.Selectitem == item.store.id ? Colors.purple : Colors.warmGrey, }]} source={images.radiobutton_checked} />
          </TouchableOpacity>

          <View style={{ width: "70%" }}>
            <Text style={styles.targetText}>{item.store.name}</Text>
          </View>
        </View>
        <View style={styles.borderView} />
        <View style={styles.numberView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.numberText}>1234564567</Text>
            <Image style={[styles.numberIcon, { marginLeft: 10, }]} source={images.Storecards} />
          </View>
          <TouchableOpacity onPress={() => { this.Add_like(item, index) }} style={{ flexDirection: 'row' }}>
            <Image style={[styles.numberIcon]} source={item.like == true ? images.heart_purpal : images.heart_grey} />
          </TouchableOpacity>

        </View>
      </View>
    );
  };

  all_Store_Fav = ({ item, index }) => {
    return (
      <View style={styles.mainView}>
        <View style={styles.tinView}>
          <TouchableOpacity onPress={() => this.SelectStore(item)}>
            <Image style={[styles.tinIcon, { tintColor: this.state.Selectitem == item.store.id ? Colors.purple : Colors.warmGrey, }]} source={images.radiobutton_checked} />
          </TouchableOpacity>

          <View style={{ width: "70%" }}>
            <Text style={styles.targetText}>{item.store.name}</Text>
          </View>
        </View>
        <View style={styles.borderView} />
        <View style={styles.numberView}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.numberText}>1234564567</Text>
            {/* <Image style={[styles.numberIcon, { marginLeft: 10, }]} source={images.storecards} /> */}
          </View>
          <TouchableOpacity onPress={() => { this.Add_like(item, index) }} style={{ flexDirection: 'row' }}>
            <Image style={[styles.numberIcon]} source={item.like == true ? images.heart_purpal : images.heart_grey} />
          </TouchableOpacity>

        </View>
      </View>
    );
  };


  adNewCard = () => {
    if (this.state.Selectitem) {
      this.props.navigation.navigate('AddStoreCards', { StoreCard: this.state.Additem })
    } else {
      this.setState({ SelectData: true }, () => {
        setTimeout(() => { this.setState({ SelectData: false }) }, 1000)
        Helper.showToast('Please Select Store')
      })
    }
  }
  ChangeTab = (Value) => {
    this.setState({ isSelect: Value == 'All' ? true : false });
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { this.adNewCard() }} style={styles.headView}>
          <Image style={styles.addIcon} source={images.add} />
          <Text style={styles.addText}>Add new Cards</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <TouchableOpacity
            onPress={() => { this.ChangeTab('All') }}
            style={{ flex: 0.5, alignItems: "center" }} >
            <Text style={this.state.isSelect ? styles.selectBtn : styles.unSelectBtn} > All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { this.ChangeTab('Favorites') }}
            style={{ flex: 0.5, alignItems: "center" }} >
            <Text style={this.state.isSelect ? styles.unSelectBtn : styles.selectBtn}>Favorites</Text>
          </TouchableOpacity>
        </View>
        {this.state.isSelect ? (
          <FlatList
            style={{ marginTop: 10 }}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            data={this.state.StoreList}
            renderItem={this.all_Store_List}
          />
        ) : (
          <View>
            {this.state.favList.length > 0 ?
              <FlatList
                style={{ marginTop: 10 }}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                data={this.state.favList}
                renderItem={this.all_Store_Fav}

              /> :
              <View style={{ height: "90%", justifyContent: 'center', alignItems: 'center' }}>

                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16, }}>Item Not Found</Text></View>}
          </View>
        )}
      </View>
    );
  }
  componentDidMount = () => {
    this.Getstore()
    this.GetstoreFav()
  }
  Getstore = () => {
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.store, method: "GET", data: '' }).then((respoanse) => {
      Helper.hideLoader()
      console.log('Getstore', respoanse)

      if (respoanse.status) {
        this.setState({ StoreList: respoanse.data })
      }
      else { }
    });
  }

  GetstoreFav = () => {
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.StoreFav, method: "GET", data: '' }).then((respoanse) => {
      Helper.hideLoader()
      if (respoanse.status) {
        console.log('Like_respoanselllll', respoanse)
        this.setState({ favList: respoanse.data })
      }
      else { }
    });
  }
  Add_like = (item, index) => {
    var data = {
      store: item.store.id,
      like: item.like == true ? 0 : 1,
    }
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.like, method: "POST", data: data }).then((respoanse) => {
      if (respoanse.status == true) {
        this.Getstore()
        this.GetstoreFav()
      }
    });
  }

}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  headView: {
    backgroundColor: Colors.barney,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
  },
  addIcon: { height: 26, width: 26, resizeMode: "contain" },
  addText: {
    fontSize: 18,
    fontFamily: Fonts.Candaral,
    color: Colors.white,
    left: 5,
  },
  selectBtn: {
    fontSize: 18,
    fontFamily: Fonts.Candarab,
    color: Colors.white,
    backgroundColor: Colors.barney,
    width: (width - 32) / 2,
    textAlign: "center",
    paddingVertical: 15,
    borderRadius: 25,
    overflow: 'hidden'
  },
  unSelectBtn: {
    fontSize: 18,
    fontFamily: Fonts.Candarab,
    color: Colors.barney,
    width: (width - 32) / 2,
    textAlign: "center",
    paddingVertical: 15,
    borderRadius: 25,
    borderWidth: 0.5,
    borderColor: Colors.barney,
  },
  listIcon: {
    height: 47,
    width: 108,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 5,
  },
  borderView: { height: 1, backgroundColor: Colors.greyishThree, marginTop: 3 },
  bestText: {
    fontSize: 18,
    fontFamily: Fonts.Candarab,
    color: Colors.purplishGrey,
    marginTop: 10,
  },
  dotedBorder: {
    borderStyle: "dotted",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
  },
  numberView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    alignItems: "center",
    marginTop: 10,

  },
  numberText: { fontSize: 14, fontWeight: "bold", color: Colors.warmGreyFour },
  numberIcon: { height: 20, width: 20, resizeMode: "contain" },
  mainView: {
    backgroundColor: Colors.white,
    width: (width - 42) / 2,
    paddingVertical: 10,
    borderRadius: 15,
    marginHorizontal: 10,
    marginVertical: 10,
    elevation: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
  },
  tinIcon: {
    height: 27,
    width: 27,
    resizeMode: "contain",

  },
  tinView: {
    paddingVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  targetText: {
    fontSize: 16,
    fontFamily: Fonts.Candarab,
    color: Colors.purplishGrey,
    left: 6,
  },
  // rderWidth: 0.5, borderRadius: 25, borderColor: Colors.barney }  searchView: { marginTop: 10, marginHorizontal: 15, bo
});
