import React, { Component } from "react";
import { Text, Modal, View, StyleSheet, Image, FlatList, TouchableOpacity, ActivityIndicator, } from "react-native";
import Colors from "../Compnont/Colors";
import images from "../Compnont/ImagePath";
import Fonts from "../Compnont/Fonts";
import AppHeader from "../Compnont/AppHeader";
import Helper from "../Lib/Helper";
import ApiUrl from "../Lib/ApiUrl";
import AppButton from "../Compnont/AppButton";
import ModalComan from "../Compnont/ModalComan";
import Config from "../Lib/Config";

export default class StoreItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchList: [],
      NotFound: false,
      isSearch: false,
      isPulsshow: false,
      modalVisible: false,
      CatgoryData: [],
      iselectStore: '',
      itemModal: [],
      SearchBy: [],
      noDataFound: false,
      bannerList:[],

      inerData: [
        { rightIcon: images.arrow_right, routh: 'SearchResults' },
        { rightIconColor: images.arrow_right, routh: '' },
      ],
      isSelect: "",
    };
    AppHeader({
      ...this,
      logo: false,
      // leftIcon: images.back,
      leftClick: () => { this.goBack() },
      title: 'Product Search',
      rightIcon: images.menu,
      rightClick: () => { this.menuClick() },
      search: true,
      notification: false,
      searchIcon: images.search,
      searchClick: () => { this.onClickSearch() }
    });
  }

  onClickSearch = () => {
    this.props.navigation.navigate('Search')
    // this.setState({ isSearch: !this.state.isSearch })
  }

  menuClick = () => {
    this.props.navigation.navigate('MyAccount')
  }

  goBack = () => {
    this.props.navigation.goBack()
  }



  openListNavigation = (item) => {
    this.props.navigation.navigate(item.routh)
  }

  itemShowe(item, index) {
    this.props.navigation.navigate('StoreCatList', { Store_Cat: item, Cat_type: 'StoreCatgory' })

  }

  onTabSearch = () => {
  }

  productList = ({ item, index }) => {
    return (
      <View style={styles.mainBoxView}>

        {/* <View style={{ flex: 0.5, alignItems: "center" }}>
            <Image style={styles.benrIcon} source={item.productImg} />
          </View> */}
        <TouchableOpacity onPress={() => { this.itemShowe(item, index); }} style={styles.arrowView}  >
          <Text style={[styles.cookText, { flex: 1, }]}>{item.category}</Text>
          <View style={{ flex: 0.5, alignItems: 'flex-end', justifyContent: 'center', }}>
            <Image style={[styles.downArrow]} source={images.arrow_right} />
          </View>
        </TouchableOpacity>
        {/* <Text style={styles.discText}>  Seeds & Pulse, Oils & Ghee, Spices  </Text> */}
        {/* {this.state.isSelect == item.id && (
          <View style={styles.isOpenView}>
            <FlatList
              data={this.state.inerData}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => { this.openListNavigation(item) }} style={styles.arrawView}>
                  <Text style={styles.fareshText}>Fresh Vegetables</Text>
                  {item.rightIcon ? (<Image style={styles.rightArr} source={item.rightIcon} />) : null}
                  {item.rightIconColor ? (<Image style={[styles.rightArr, { tintColor: Colors.barney }]} source={item.rightIconColor} />) : null}
                </TouchableOpacity>
              )}
            />
          </View>
        )} */}
      </View>
    );
  };

  Searchitem = (value) => {
    this.setState({ SearchText: value }, () => {
      //   Helper.makeRequest({ url: ApiUrl.store_Product_search+value, method: "GET", data: '' }).then((respoanse) => {
      //    console.log('respoanse===>',respoanse)
      //     if (respoanse.results.length > 0 ) {
      //         this.setState({ SearchList: respoanse.results }, () => {})
      //     }
      //     else {
      //     }
      // });
    })

  }


  renderModalList = ({ item }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => { this.selectItem(item.store); }} style={{ paddingHorizontal: 21, alignItems: "center", flexDirection: "row", borderBottomColor: 'grey', borderBottomWidth: 0.5, }}  >
          <Image style={styles.radioIcon} source={this.state.iselectStore == item.store.id ? images.radiobutton_checked : images.radio_button} />
          <Text style={this.state.iselectStore == item.store.id ? styles.radioActiveTxt : styles.radioUnactiveTxt} > {item.store.name}  </Text>
        </TouchableOpacity>
        {item.boderModal == true && (<View style={{ backgroundColor: Colors.pinkishGreyTwo, height: 0.5 }} ></View>)}
      </View>
    );
  };

  render() {
    console.log('this.state.itemModal', JSON.stringify(Config.baseImgurl+this.state.bannerList[0]?.banner_image))
    return (
      <View style={styles.container}>
        {/* {this.state.isSearch&&
        <View style={[styles.searchView, {}]}>
          <View style={{ flex: 0.15, alignItems: "center" }}>
            <Image style={styles.searchIcon} source={images.search} />
          </View>
          <View style={{ flex: 0.7 }}>
            <TextInput
              style={styles.placeText}
              placeholder="Search Category"
              onChangeText={(value) => this.Searchitem(value)}
              value={this.state.SearchText}
              editable={true}
            />
          </View>

          <View style={{ flex: 0.15, alignItems: "center" }}>
            <Text style={styles.searchText}>Search</Text>
          </View>
        </View>} */}

        <View >
          <Image style={styles.bannerImg} resizeMode={"contain"} source={{uri:Config.baseImgurl+this.state.bannerList[0]?.banner_image}} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5, marginRight: 10, }}>
            <Text style={styles.shopText}>Shop by Categories in Pantry</Text>
            <TouchableOpacity onPress={() => { this.showModal() }} style={styles.Cartview}>
              <Image style={[styles.CartImg, { tintColor: '#fff' }]} resizeMode={"contain"} source={images.wallmart_purple} />

            </TouchableOpacity>

          </View>
        </View>


        {this.state.CatgoryData.length > 0 ?
          <View style={{ flex: 1, marginTop: 10, overflow: "hidden" }}>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.state.CatgoryData}
              renderItem={this.productList}
              keyExtractor={(item, index) => index.toString()}
              extraData={this.state}
            />
            <View style={{ height: 20 }}></View>
          </View> :
          <View style={{ flex: 1, height: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
            {this.state.NotFound &&
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16, }}>Item Not Found</Text>
            }
          </View>
        }


        <ModalComan
          ColseModal={() => { this.ColseModal() }}
          item={this.state.itemModal}
          title={"START TRIP"}
          modalVisible={this.state.modalVisible}
          showModal={(isvalue) => { this.showModal(isvalue) }}
          heideModal={(isvalue) => { this.heideModal(isvalue) }}
          SubmitStore={(data) => { this.SubmitStore(data) }}
          selectItem={(items) => { this.selectItem(items) }}
          iselectStore={this.state.iselectStore}
          searchText={() => this.searchText.bind(this)}
          notFound={this.state.noDataFound}
        />

      </View>
    );
  }



  searchText = (e) => {
    let text = e.toLowerCase();
    let trucks = this.state.SearchBy
    let filteredName = trucks.filter((item) => {
      return item.store?.name.toLowerCase().match(text)
    })
    if (!text || text === '') {
      this.setState({ itemModal: filteredName, noDataFound: false })
    }
    else if (Array.isArray(filteredName)) {
      this.setState({ itemModal: filteredName, noDataFound: false })

      if (filteredName.length == 0) {
        this.setState({ noDataFound: true })
      }
    }
  }
  showModal() {
    //this.setState({ modalVisible: true }); 
    this.Getstore(false)
  }

  heideModal() { this.setState({ modalVisible: false }); }

  ColseModal() {
    this.heideModal()
    this.setState({ itemModal: '' })
    this.props.navigation.navigate("Home")
  }
  selectItem = (select) => {
    this.setState({ iselectStore: select.id, });
  };
  SubmitStore = () => {
    if (!this.state.iselectStore) {
      alert('Please Select Store')
      return;
    }
    this.setState({ modalVisible: false }, () => {
      this.GetCatgorylist(this.state.iselectStore,)
    })
  }

  componentDidMount = () => {
    // this.focusListener = this.props.navigation.addListener("focus", () => {
    //   this.Getstore()
    // });
    this.Getstore()
    this.GetBannerList()
  }

  Getstore = (isLoding = true) => {
    if (isLoding) {
      Helper.showLoader()
    }

    Helper.makeRequest({ url: ApiUrl.store, method: "GET", data: '' }).then((respoanse) => {
      Helper.hideLoader()
      if (respoanse.status) {
        this.setState({ itemModal: respoanse.data, SearchBy: respoanse.data }, () => {
          this.setState({ modalVisible: true })
        })
      }
      else { }
    });
  }

  GetBannerList = () => {
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.getBanner, method: "GET", data: '' }).then((respoanse) => {
      Helper.hideLoader()
      if (respoanse.status) {
        this.setState({bannerList:respoanse.data})
        console.log('-------response',JSON.stringify(respoanse.data))
        // this.setState({ itemModal: respoanse.data, SearchBy: respoanse.data }, () => {
        //   this.setState({ modalVisible: true })
        // })
      }
      else { }
    });
  }
  GetCatgorylist = (categoryId) => {
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.store_category + categoryId, method: "GET", data: '' }).then((respoanse) => {
      Helper.hideLoader()
      if (respoanse.status) {
        if (respoanse.data.length > 0) {

          this.state.CatgoryData = respoanse.data
          this.state.NotFound = false
        } else {
          this.state.CatgoryData = ''
          this.state.NotFound = true
        }
        this.setState({})

      }
      else { }
    });
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  searchView: {
    marginHorizontal: 7,
    marginTop: 10,
    flexDirection: "row",
    borderWidth: 0.5,
    borderRadius: 15,
    alignItems: "center",
    borderColor: Colors.lightBlueGrey,
  },
  searchIcon: { height: 20, width: 20, resizeMode: "contain" },
  placeText: { height: 40, fontSize: 15 },
  searchText: {
    fontSize: 15,
    color: Colors.barney,
    fontFamily: Fonts.Candarab,
    right: 10,
  },
  bannerImg: { height: 153, width: "100%", marginTop: 10 },
  CartImg: { height: 15, width: 15, },

  shopText: {
    fontSize: 20,
    fontFamily: Fonts.Candarab,
    marginHorizontal: 16,
    marginTop: 5,
    color: "#521678",
  },
  mainBoxView: {
    marginHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.greyishFour,
    marginVertical: 10,
    paddingVertical: 10, paddingHorizontal: 10,
    backgroundColor: Colors.white,
  },
  benrIcon: { height: 64, width: 64, resizeMode: "contain", top: -5 },
  arrowView: { flex: 1, flexDirection: "row", },
  cookText: { fontSize: 18, fontFamily: Fonts.Candarab },
  downArrow: { height: 18, width: 18, resizeMode: "contain", },
  discText: { fontSize: 12, fontFamily: Fonts.Candara },
  isOpenView: { paddingVertical: 0, marginTop: 5 },
  fareshText: {
    fontSize: 18,
    fontFamily: Fonts.Candarab,
    marginHorizontal: 18, color: "#000"
  },
  rightArr: { height: 16, width: 10, marginHorizontal: 18 },
  arrawView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.5,
    paddingVertical: 17,
    borderTopColor: '#41b201'
  },
  Pulsview: { flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center' },
  ImagwPuls: { width: 75, height: 75, resizeMode: 'contain' },
  Addshopitem: { fontSize: 16, color: Colors.barney, fontFamily: Fonts.Candarab, },
  modalContainView: { flex: 1, justifyContent: "center", backgroundColor: "#ffffffe0", },
  modalView: { backgroundColor: "white", borderColor: Colors.barney, borderWidth: 1, borderRadius: 20, paddingVertical: 6, marginHorizontal: 30, },
  modalViewSubstitues: { backgroundColor: "white", borderColor: Colors.wormGray, borderWidth: 1, borderRadius: 24, marginHorizontal: 16, },
  iconClose: { width: 28, height: 28, resizeMode: "contain" },
  txtSorting: { fontFamily: Fonts.Candarab, fontSize: 24, color: Colors.barney, marginTop: -10, alignSelf: "center", },
  radioActiveTxt: { fontSize: 16, fontFamily: Fonts.Candara, color: Colors.barney, marginLeft: 12, paddingVertical: 12, },
  radioUnactiveTxt: { fontSize: 16, fontFamily: Fonts.Candara, color: Colors.greyishPurple, marginLeft: 12, paddingVertical: 12, },
  radioIcon: { width: 22, height: 22, resizeMode: "contain" },
  Cartview: { backgroundColor: Colors.barney, paddingHorizontal: 10, paddingVertical: 10, borderRadius: 20 }

});
