import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  ScrollView,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
  DeviceEventEmitter,
  Modal,
  RefreshControl,
  TextInput,
  Dimensions
} from "react-native";

import AppButton from "../Compnont/AppButton";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import Colors from "../Compnont/Colors";
import Swipeout from "react-native-swipeout";
import AppHeader from "../Compnont/AppHeader";
import SwipableRow from "../Compnont/SwipableRow";
import Helper from "../Lib/Helper";
import ApiUrl from "../Lib/ApiUrl";
import SubStituesModel from '../Compnont/SubStituesModel'
import SwipeScreen from "../Compnont/SwipeScreen";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Config from "../Lib/Config";

const ScreenHeight = Dimensions.get('window').height
export default class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      isPulsshow: false,
      search: '',
      refreshing: false,
      household: true,
      isSubStitues: false,
      isaddmore: false,
      GotoStore: false,
      selectedItem: false,
      isNotFound: false,
      TotalPrice: 0,
      noDataFound: false,
      TotalPrice2: 0,
      SearchBy: [],
      reletData: [],
      isSelected: '',
      listData: [],
      PushData: [],
      token: '',
      listOfData: [
        // { icon: images.shoppinglist_1, type: "Green Apple", price: "1.45", number: 0, },
        // { icon: images.shoppinglist_1, type: "Green Apple", price: "1.45", number: 0, },
        // { icon: images.shoppinglist_1, type: "Green Apple", price: "1.45", number: 0, },
        // { icon: images.shoppinglist_1, type: "Green Apple", price: "1.45", number: 0, },
      ],
      tempData: [],
      newData: [],
      datalist: [],
      neighbourlist: [],
      ShoppintAddlist: [],
      listOfSelectSubstitues: [
        {
          imgSubstitues: images.previouslyselected_1,
          store: "Wallmart",
          price: "1.45",
          number: 0,
        },
        {
          imgSubstitues: images.previouslyselected_2,
          store: "Wallmart",
          price: "1.45",
          number: 0,
        },
      ],
      itemModal: [],
      modalVisible: false,
      modalSelectedSubstitues: false,
      modalSelected: false,
      iselectStore: '',
      bottomBtn: true,
      isSelect: false
      // cartcount:'',
    };
    Helper.getData('cartcount').then(async (value) => {
      this.setState({ cartcount: value })
      // alert(this.state.cartcount)
    })
  }

  searchClick = () => {
    this.props.navigation.navigate('Notification')
  }

  AddIconClick = () => {
    this.props.navigation.navigate("MyAccount");
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  componentWillMount() {
    this.tabStateChange = DeviceEventEmitter.addListener(
      "tabStateChange",
      (data) => {
        if (data.type == true) {
          this.household("Householdlist")
        }
        if (data.type == false) {
          this.household("Neighbor")
        }
      })
  }

  addToCart = () => {
    if (this.state.tempData.length == 0) {
      Helper.showToast('Please Select Product');
      return;
    }
    var data = {
      Itemlist_id: this.state.tempData
    }
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.AddToCart, method: "POST", data: data }).then((respoanse) => {
      if (respoanse.status == true) {
        this.setState({ modalSelectedSubstitues: false });
        Helper.showToast(respoanse.message)
        this.props.navigation.navigate("CartFamily"),
          Helper.hideLoader()
      }
    });
  }

  SelectDataForReplace = () => {
    let itemData = this.state.PushData
    if (this.state.isSelected == '') {
      alert('Please Select Product')
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", 'Token  ' + this.state.token);

    var data = new FormData();
    data.append("Itemlist_id", itemData.Itemlist_id);
    data.append("items", itemData.sub_category.id);
    data.append("quantity", itemData.quntity);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
      redirect: 'follow'
    };
    Helper.showLoader()
    fetch("http://18.116.64.183/api/v1/store/substitute-item-add-itemlist", requestOptions)
      .then(response => response.text())
      .then(response => {
        this.setState({ modalSelectedSubstitues: false, isSelected: '' })
        this.GetShoppinglist()
        Helper.hideLoader()
      })
      .catch(error => console.log('error', error));
  }

  increment = (item, index) => {
    var listData = this.state.listOfData;
    listData[index].quantity = (listData[index].quantity) + 1;
    this.setState({ listOfData: listData });
  };

  decrement = (item, index) => {
    // console.log('===>', this.state.listOfData[index].number)
    if (this.state.listOfData[index].quantity <= 1) {
      return
    } else {
      var listData = this.state.listOfData;
      listData[index].quantity = listData[index].quantity - 1;
      this.setState({ listOfData: listData },);
    }
  };

  goSummary = (TotalPrice, TotalPrice2) => {
    this.props.navigation.navigate("Purchase", { TotalPrice, TotalPrice2 });
  };

  functionToRender = ({ item, index }) => {
    return (
      <View style={styles.mainView1}>
        <View>
          <Image style={styles.icon1} source={item.items?.image} />
        </View>
        <View style={{ marginLeft: 5 }}>
          <Text numberOfLines={1} style={styles.textType}>{item?.items?.sub_category}</Text>
          <Text style={styles.textPrice}>${
            item.items?.price ? (Number(item.items?.price) * Number(item.quantity)).toFixed(2) : 0}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
            <TouchableOpacity onPress={() => { this.decrement(item, index); }}  >
              <Image style={styles.touch1} source={images.minus} />
            </TouchableOpacity>
            <Text style={styles.textNumber1}>{item?.quantity}</Text>
            <TouchableOpacity
              onPress={() => { this.increment(item, index); }}  >
              <Image style={styles.touch1} source={images.plus} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  increment1 = (item, index) => {
    var listData1 = this.state.ShoppintAddlist;
    listData1[index].sub_category.quantity = Number(listData1[index].sub_category.quantity) + 1;
    this.setState({ ShoppintAddlist: listData1 }, () => {
      this.Itemlist_update(listData1[index])
    });
  };

  decrement1 = (item, index) => {
    if (this.state.ShoppintAddlist[index].sub_category.quantity == 1) {
      this.Removeitem(item)
      return false
    } else {
      var listData1 = this.state.ShoppintAddlist;
      listData1[index].sub_category.quantity = Number(listData1[index].sub_category.quantity) - 1;
      this.setState({ ShoppintAddlist: listData1 }, () => {
        this.Itemlist_update(listData1[index])
      });
    }
  };


  onOpenHandle(item, index) {
    let listOfDataDown = [...this.state.listOfDataDown];
    listOfDataDown[index].isOpeen = true;
    this.setState({ listOfDataDown });
  }

  onCloseHandle(index) {
    let listOfDataDown = [...this.state.listOfDataDown];
    listOfDataDown[index].isOpeen = false;
    this.setState({ listOfDataDown });
  }

  addToCard = () => {
    // this.props.navigation.navigate("CartFamily");
  };

  selectItem = (select, item) => {
    this.setState({ iselectStore: select.id, Storedata: select, selectedItem: item });
  };

  showModal() {
    this.setState({ modalVisible: true });
  }

  heideModal() {
    this.setState({ modalVisible: false });
  }

  SubmitStore = () => {
    if (!this.state.iselectStore) {
      alert('Please Select Store')
    } else {
      // this.setState({ iselectStore: '' });
      this.heideModal()
      this.Getneighbour()
      // this.household()
    }
  }

  renderModalList = ({ item }) => {
    return (
      <View>
        <TouchableOpacity onPress={() => { this.selectItem(item.store, item); }} style={{ paddingHorizontal: 21, alignItems: "center", flexDirection: "row", borderBottomColor: 'grey', borderBottomWidth: 0.5, }}  >
          <Image style={styles.radioIcon} source={this.state.iselectStore == item.store.id ? images.radiobutton_checked : images.radio_button} />
          <Text style={this.state.iselectStore == item.store.id ? styles.radioActiveTxt : styles.radioUnactiveTxt} > {item.store.name}</Text>
        </TouchableOpacity>
        {item.boderModal == true && (<View style={{ backgroundColor: Colors.pinkishGreyTwo, height: 0.5 }} ></View>)}
      </View>
    );
  };


  searchText = (e) => {
    let text = e.toLowerCase();
    let trucks = this.state.SearchBy
    let filteredName = trucks.filter((item) => {
      return item.store?.name.toLowerCase().match(text)
    })
    if (!text || text === '') {
      this.setState({ itemModal: filteredName, noDataFound: false, })
    }
    else if (Array.isArray(filteredName)) {
      this.setState({ itemModal: filteredName, noDataFound: false, })

      if (filteredName.length == 0) {
        this.setState({ noDataFound: true })

      }
    }
  }

  renderModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.modalContainView}>
            <View style={styles.modalView}>
              <TouchableOpacity style={{ alignSelf: "flex-end", marginRight: 10, marginTop: 10, }} onPress={() => { this.heideModal(); }}   >
                <Image style={styles.iconClose} source={images.close} />
              </TouchableOpacity>

              <Text style={styles.txtSorting}>Select Store</Text>
              <View style={[styles.searchView, { justifyContent: "center" }]}>
                <TextInput style={{ paddingLeft: 15, color: Colors.barney, fontSize: 14, }}
                  placeholder="Search"
                  placeholderTextColor={Colors.barney}
                  onChangeText={this.searchText.bind(this)}
                // onChangeText={(text) => { this.setState({ search: text }) }}
                // value={this.state.search}
                />
              </View>

              {this.state.noDataFound == true &&
                <View style={{ alignItems: 'center', marginTop: 60 }}>
                  <Text style={{ color: Colors.barney, fontSize: 18, fontWeight: 'bold' }}>Not Found</Text>
                </View>}
              <FlatList
                style={{ marginTop: 10 }}
                data={this.state.itemModal}
                renderItem={this.renderModalList}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
              />
              {/* {this.state.itemModal && this.state.noDataFound  == true &&
              <ActivityIndicator animating={true} size="large" color={'#000'} />} */}


              <View style={{ marginTop: 20 }}>
                <AppButton
                  onClick={() => { this.SubmitStore() }}
                  Background={Colors.barney}
                  borderRadius={30}
                  paddingver={15}
                  M_Hor={80}
                  M_Ver={30}
                  title={"Submit"}
                  fontSize={18}
                  textolor={"white"}
                  fontFamily={Fonts.Candara}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    );
  }


  FlatListItemSeparator = () => {
    return (
      <View
        style={{ margin: 15 }}
      />
    );
  }

  directChange = (item, index, value) => {
    var listData1 = this.state.ShoppintAddlist;
    listData1[index].sub_category.quantity = Number(value.replace(/[^0-9]/g, ''))
    this.setState({ ShoppintAddlist: listData1 }, () => {
      setTimeout(() => {
        this.Itemlist_update(listData1[index])
      }, 2000);
    });
  }
  showModalSelectedSubstitues() {
    this.setState({ modalSelectedSubstitues: true, });
  }
  showModalSelected() {
    this.setState({ modalSelected: true });
  }

  onPressStitues = () => {
    this.setState({ isSubStitues: true })
  }

  heideModalSelectedSubstitues() {
    this.setState({ modalSelectedSubstitues: false });
  }

  heideModalSelected() {
    this.setState({ modalSelected: false });
  }

  increment2 = (item, index) => {
    var listData1 = this.state.reletData;
    listData1[index].quntity = listData1[index].quntity + 1;
    this.setState({ reletData: listData1 });
  };

  decrement2 = (item, index) => {
    if (this.state.reletData[index].quntity <= 0) {
      return
    } else {
      var listData1 = this.state.reletData;
      listData1[index].quntity = listData1[index].quntity - 1;
      this.setState({ reletData: listData1 });
    };
  }
  ProductDetails = (item, index) => {
    let newIndex = this.state.tempData.indexOf(item.sub_category.id);
    if (newIndex > -1) {
      this.state.tempData.splice(newIndex, 1);
    } else {
      this.state.tempData.push(item.sub_category.id);
    }
    this.setState({});
    console.log("-------Sending: " + JSON.stringify(this.state.tempData))
  }

  SelectProduct = (item) => {
    if (this.state.isSelected == item.sub_category.id) {
      this.state.isSelected = ""
      this.state.PushData = []
    } else {
      this.state.isSelected = item.sub_category.id
      this.state.PushData = item
    }
    this.setState({})
    console.log('-----PushData', JSON.stringify(this.state.PushData))
  }
  // this.props.navigation.navigate('ShoppingListDetalis', { Product: item.sub_category.items.id })

  Product = (item, index) => {
    // alert(JSON.stringify(item))
    this.props.navigation.navigate('ShoppingListDetalis', { Product: item.sub_category.items.id })
  }
  renderSelectSubstitues = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this.SelectProduct(item)} style={{ flexDirection: "row", borderColor: this.state.isSelected == item.sub_category.id ? Colors.barney : Colors.greyishFour, borderWidth: 1, borderRadius: 10, marginHorizontal: 10, marginTop: 10, paddingVertical: 10, }} >
        <Image style={{ width: 66, height: 60, resizeMode: "contain" }} source={{ uri: Config.baseImgurl + item.sub_category.image }} />

        <View style={{ marginLeft: 10, flex: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.productName}>{item.sub_category?.sub_category}</Text>
            {/* <Text style={styles.productName}> 1 Lbs</Text> */}
          </View>
          <View style={{ flexDirection: "row" }}>
            <Image style={styles.storeIcon} source={images.wallmart_purple} />
            <Text style={[styles.textStore, { color: Colors.easterPurple }]}>{item.sub_category?.store.name}</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 9 }}  >
            <TouchableOpacity onPress={() => { this.decrement3(item, index); }}  >
              <Image style={styles.touch2} source={images.minus} />
            </TouchableOpacity>

            <Text style={styles.number2}>{item.quntity}</Text>
            <TouchableOpacity onPress={() => { this.increment3(item, index); }}  >
              <Image style={styles.touch2} source={images.plus} />
            </TouchableOpacity>
          </View>

          <ImageBackground style={{ width: 67, height: 27, resizeMode: "contain", position: "absolute", bottom: 0, right: 0, }} source={images.ribbon}  >
            <Text style={{ marginTop: 3, alignSelf: "center", fontSize: 16, lineHeight: 20, color: Colors.white, }} >
              {item.quntity != 0 ? (Number(item.sub_category?.price) * Number(item.quntity)).toFixed(2) : "0.00"}
              {/* {item.quntity == 0 ? '0.00' : (Number(item.sub_category?.price) * Number(item.quntity)).toFixed(2)} */}
            </Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };
  modalSelectedSubstitues() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalSelectedSubstitues}
      >
        <View style={styles.modalContainView}>
          <View style={styles.modalViewSubstitues}>
            <Text style={styles.txtSelectSubstitues}>
              Previously selected substitues
            </Text>
            {this.state.reletData == "" ?
              <View style={{ height: ScreenHeight / 6, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: Colors.barney, fontFamily: Fonts.Candara, fontSize: 18 }}>No Data Found</Text>
              </View> :
              <View style={{ height: ScreenHeight / 2 }}>
                <FlatList
                  style={{ marginTop: 15 }}
                  showsHorizontalScrollIndicator={false}
                  data={this.state.reletData}
                  extraData={this.state}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={this.renderSelectSubstitues}
                />
              </View>}

            <View style={{ marginTop: 20 }}>
              <AppButton
                onClick={() => {
                  this.SelectDataForReplace();
                }}
                Background={Colors.barney}
                borderRadius={23}
                paddingver={15}
                title={"SEND"}
                fontSize={16}
                textolor={"white"}
                fontFamily={Fonts.Candarab}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
  replaceProduct = (item) => {
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.replaceData + item.sub_category?.id, method: "GET", data: '' }).then((response) => {
      Helper.hideLoader()
      if (response.status) {
        this.setState({ reletData: response.data })
        this.setState({ modalSelectedSubstitues: true, newData: [] })
        Helper.hideLoader()
      }
      else { }
    });
  }
  getNeigbourList = () => {
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.get_connectedNeighbour, method: "GET", data: '' }).then((respoanse) => {
      Helper.hideLoader()
      if (respoanse.status) {
        this.setState({ listOfData: respoanse.data })
        var newArray = []
        this.state.listOfData.map((item, index) => {
          newArray.push(item[0])
        })
        this.setState({ listOfData: newArray, isNotFound: true })
        console.log('___________??????', this.state.listOfData)
        Helper.hideLoader()
      }
      else { }
    });
  }
  household = (val) => {
    if (val == 'Neighbor') {
      this.getNeigbourList();
    }
    this.setState({ household: val == 'Householdlist' ? true : false })
  }

  onRefresh = () => {
    this.setState({ refreshing: false })
    this.GetShoppinglist()
  }
  render() {
    let TempPriceArray = [];
    let priceArray = [];
    let TotalPrice = 0;
    let TotalPrice2 = 0;

    {
      this.state.ShoppintAddlist && this.state.ShoppintAddlist.forEach(element => {
        TempPriceArray.push((Number(element.sub_category.quantity) * Number(element.sub_category.items.price)).toFixed(2))
      });

      for (let i = 0; i < TempPriceArray.length; i++) {
        TotalPrice = TotalPrice + Number(TempPriceArray[i]);
      }
    }

    {
      this.state.listOfData && this.state.listOfData.forEach(element => {
        priceArray.push((Number(element.item.quantity) * Number(element.item.items.price)).toFixed(2))
      });


      for (let i = 0; i < priceArray.length; i++) {
        TotalPrice2 = TotalPrice2 + Number(priceArray[i]);
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.topView}>
          <TouchableOpacity onPress={() => { this.household('Householdlist') }} style={{ flexDirection: "row", alignItems: "center", flex: 0.8, paddingTop: 20, }} >
            <Image style={styles.IconTop} source={images.household} />
            <Text style={styles.textHouseHold}>  Household List</Text>
          </TouchableOpacity>
          {this.state.ShoppintAddlist.length > 0 &&
            <TouchableOpacity onPress={() => { this.household('Neighbor') }} style={{ justifyContent: "center", alignItems: "center" }}  >
              <Image style={styles.IconTop} source={images.neighbor_shopping} />
              <Text style={styles.textNeighbour}>Neighbor</Text>
            </TouchableOpacity>}

          {this.state.ShoppintAddlist.length > 0 &&
            <TouchableOpacity onPress={() => { this.goSummary(TotalPrice, TotalPrice2); }} style={{ justifyContent: "center", alignItems: "center" }} >
              <Image style={styles.IconTop} source={images.summary} />
              <Text style={styles.textNeighbour}>Summary</Text>
            </TouchableOpacity>}
        </View>

        {this.state.ShoppintAddlist.length <= 0 && this.state.isPulsshow ?
          <View style={styles.Pulsview}>
            <TouchableOpacity onPress={() => { this.showModal() }} >
              <Image style={[styles.ImagwPuls,]} source={images.add_purple} />
            </TouchableOpacity>
            <View style={{ marginTop: 20, }}>
              <Text style={styles.Addshopitem}>Add Items to Shopping list</Text>

            </View>
          </View> : null}
        {/* {this.state.listOfData == '' &&
          <View>
            <Text style={styles.textPantry}>Pantry Suggestion</Text>

            <View>
              <FlatList
                style={styles.FL1}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.listOfData}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={this.functionToRender}
              />
            </View>
          </View> */}
        {/* } */}

        {this.state.household ?
          <View style={{ flex: 1, }}>
            {this.state.ShoppintAddlist.length > 0 &&
              <View style={{ flex: 1, }}>
                <KeyboardAwareScrollView>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.ShoppintAddlist}
                    extraData={this.state}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                      <SwipableRow item={item}
                        index={index}
                        tempData={this.state.tempData}
                        // onPressSubSittues={()=>onPressStitues()}
                        ProductDetails={this.ProductDetails}
                        decrement1={this.decrement1}
                        increment1={this.increment1}
                        directChange={this.directChange}
                        Removeitem={(data) => { this.Removeitem(data) }}
                        is_private={(data, index) => { this.is_private(data, index) }}
                        showModalSelectedSubstitues={() => this.replaceProduct(item)}
                      />
                    }
                  />
                </KeyboardAwareScrollView>
                <View>
                  <View style={{ flexDirection: "row", marginTop: 15 }}>
                    <View style={{ flex: 0.5 }}>
                      <AppButton
                        onClick={() => { this.goTosStore() }}
                        Background={Colors.pissYellow}
                        paddingver={15} title={"GO TO STORE"}
                        fontSize={16} textolor={Colors.white} fontFamily={Fonts.Candarab}
                      />
                    </View>
                    <View style={{ flex: 0.5 }}>
                      <AppButton
                        onClick={() => { this.addToCart(); }}
                        Background={Colors.barney}
                        paddingver={15} title={"ADD TO CART"}
                        fontSize={16} textolor={Colors.white} fontFamily={Fonts.Candarab}
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 20 }}>
                    <AppButton
                      onClick={() => { this.showModal(); this.setState({ isaddmore: true }) }}
                      Background={Colors.barney}
                      paddingver={15} title={"ADD MORE"} fontSize={16}
                      textolor={Colors.white} fontFamily={Fonts.Candarab}
                    />
                  </View>
                </View>
              </View>}

          </View> : this.state.listOfData.length == 0 && this.state.isNotFound ?
            <View style={{ flex: 1, height: '100%', marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16, }}>Item Not Found</Text>
            </View> :
            <View>
              <Text style={styles.textPantry}>Pantry Suggestion</Text>
              <FlatList
                //  style={styles.FL1}
                //  horizontal
                showsHorizontalScrollIndicator={false}
                data={this.state.listOfData}
                extraData={this.state}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) =>
                  <SwipeScreen
                    item={item}
                    index={index}
                    // onPressSubSittues={()=>onPressStitues()}
                    // Product={this.Product}
                    // decrement={this.decrement}
                    // increment={this.increment}
                    // Remove={(data) => { this.Remove(data) }}
                    // neighbour_private={(data, index) => { this.neighbour_private(data, index) }}
                    showModalSelected={() => this.setState({ modalSelected: true })}
                  />
                } />
            </View>
          //   <View style={{flex:1}}>
          //    <FlatList
          //    showsVerticalScrollIndicator={false}
          //    data={this.state.datalist}
          //    extraData={this.state}
          //    ItemSeparatorComponent = { this.FlatListItemSeparator }
          //    keyExtractor={(item, index) => index.toString()}
          //    renderItem={({ item, index }) =>
          //     // <View style={{marginTop:20,marginHorizontal:15}}>
          //     //   <View style={{flexDirection:'row',alignItems:'center',}}>
          //     //     <Image source ={images.Group_User}  style={{height:50,marginRight:20, width:50,resizeMode:'contain',borderRadius:25}}/>
          //     //     {/* <Image source ={item.profile_image != ''? item.profile_image : images.Group_User}  style={{height:50,marginRight:20, width:50,resizeMode:'contain',borderRadius:25}}/> */}
          //     //     <Text>{item.first_name}</Text>
          //     //   </View>
          //     // </View>
          //    }
          //  />
          //  </View>
        }

        {/* : 
            <View style={{ marginTop: 20 }}>
              <AppButton
                onClick={() => { }}
                Background={Colors.barney}
                paddingver={15}
                title={"ADD TO CART"}
                fontSize={16}
                textolor={Colors.white}
                fontFamily={Fonts.Candarab}
              />
            </View>
          } */}

        {this.renderModal()}
        {this.modalSelectedSubstitues()}
        {/* <SubStituesModel
          visible={this.state.isSubStitues}
          // onPressSubSittues={alert('ll')}
        /> */}

      </View>
    );
  }
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener("focus", () => {
      this.Getstore()
      this.setState({ tempData: [] })
    });

    Helper.getData('token').then(async (value) => {
      this.state.token = value
    })
    AppHeader({
      ...this,
      logo: false,
      // leftIcon: images.back,
      leftClick: () => {
        this.goBack();
      },
      title: "Shopping List",
      count: this.state.cartcount ? this.state.cartcount : 0,
      rightIcon: images.menu,
      rightClick: () => {
        this.AddIconClick();
      },
      search: true,
      notification: true,
      notificationCount: Helper.notificationCount,
      searchIcon: images.notifications1,
      searchClick: () => { this.searchClick() }
    });
    this.Getstore()
    this.GetShoppinglist('isnot')
    this.listener = DeviceEventEmitter.addListener('AddToShopping', () => {
      this.GetShoppinglist('isnot')
    });
    this.listener = DeviceEventEmitter.addListener('cart', () => {
      this.GetShoppinglist()
      // this.Getstore()
      // this.setState({ tempData: []})
    });
    // this.Getneighbour()

  }

  Getstore = () => {
    Helper.makeRequest({ url: ApiUrl.store, method: "GET", data: '' }).then((respoanse) => {
      console.log("ApiUrl.store", JSON.stringify(respoanse))
      Helper.hideLoader()
      if (respoanse.status) {
        this.setState({ itemModal: respoanse.data, SearchBy: respoanse.data })
      }
      else { }
    });
  }


  Getneighbour = () => {
    if (this.state.selectedItem) {
      var data = {
        store_id: this.state.selectedItem.store.id
      }
      Helper.makeRequest({ url: ApiUrl.neighbourList + 'store_id=' + this.state.selectedItem.store.id, method: "GET", data: '' }).then((respoanse) => {
        console.log("ApiUrl.store12", JSON.stringify(respoanse.data))
        Helper.hideLoader()
        if (respoanse.status) {
          this.setState({ datalist: respoanse.data })
          // if (this.state.GotoStore && this.state.datalist == '') {
          //   this.setState({ GotoStore: false })
          //   Helper.showToast('No Neighbor Available')
          //   return;
          //   this.props.navigation.navigate('NotifyNeighborPopup', { datalist: this.state.datalist })
          // }
          if (this.state.isaddmore || this.state.ShoppintAddlist.length <= 0 && this.state.isPulsshow) {
            this.setState({ isaddmore: false })
            this.props.navigation.navigate('StoreCatList', { Store_Cat: this.state.Storedata, Cat_type: 'Store' })
          }
        }
        else { }
      });
    }
  }

  goTosStore = () => {
    if (this.state.datalist == '') {
      alert('No Neighbor Available')
      return;
      this.props.navigation.navigate('NotifyNeighborPopup', { datalist: this.state.datalist })
    }
  }
  GetShoppinglist = (val, index) => {
    if (val == 'isnot') {
      Helper.showLoader()
    }
    Helper.makeRequest({ url: ApiUrl.shoppinglist_item_details, method: "GET", data: '' }).then((respoanse) => {
      console.log('sdcm,dsvm,n', JSON.stringify(respoanse))
      Helper.hideLoader()
      if (respoanse.status) {
        if (respoanse.data.length > 0) {
          Helper.setData('cartcount', respoanse.data.length)
          DeviceEventEmitter.emit('cartcount', respoanse.data.length);
          this.state.ShoppintAddlist = respoanse.data
          this.state.isPulsshow = false

        } else {
          Helper.setData('cartcount', respoanse.data.length)
          DeviceEventEmitter.emit('cartcount', respoanse.data.length);
          this.state.ShoppintAddlist = ''
          this.state.isPulsshow = true
        }
        this.setState({})

      }
      else { }
    });
  }
  // GetShoppinglist = (val, index) => {
  //   if (val == 'isnot') {
  //     Helper.showLoader()
  //   }
  //   Helper.makeRequest({ url: ApiUrl.shoppinglist_item_details, method: "GET", data: '' }).then((respoanse) => {
  //     Helper.hideLoader()
  //     if (respoanse.status) {
  //       this.setState({listdata:respoanse.data})
  //       let newArray=[]
  //       this.state.listdata.map((item,index)=>{
  //         newArray.push(item)
  //       })
  //       this.setState({listdata:newArray[0]})
  //       console.log('++++++',JSON.stringify(this.state.listdata))
  //       if (respoanse.data.length > 0 && this.state.listdata.quantity > 0) {
  //         Helper.setData('cartcount', respoanse.data.length)
  //         DeviceEventEmitter.emit('cartcount', respoanse.data.length);
  //         this.state.ShoppintAddlist = respoanse.data
  //         this.state.isPulsshow = false

  //       } else {
  //         Helper.setData('cartcount', respoanse.data.length)
  //         DeviceEventEmitter.emit('cartcount', respoanse.data.length);
  //         this.state.ShoppintAddlist = ''
  //         this.state.isPulsshow = true
  //       }
  //       this.setState({})

  //     }
  //     else { }
  //   });
  // }

  Itemlist_update = (ItemData) => {
    var data = {
      quantity: ItemData.sub_category.quantity
    }
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.store_Itemlist_update + ItemData.sub_category.id + '/', method: "PATCH", data: data }).then((respoanse) => {
      Helper.hideLoader()
      if (respoanse.status) {
        if (respoanse.data.quantity == 0) {
          this.GetShoppinglist()
        }
      }
      else { }
    });

  }

  relatedItemlist_update = (ItemData) => {
    console.log('-----', JSON.stringify(ItemData))
    var data = {
      quantity: ItemData.quntity
    }
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.store_Itemlist_update + ItemData.Itemlist_id + '/', method: "PATCH", data: data }).then((respoanse) => {
      Helper.hideLoader()
      if (respoanse.status) {
        // if (respoanse.data.quantity == 0) {
        //   this.GetShoppinglist()
        // }
      }
      else { }
    });

  }

  increment3 = (item, index) => {
    var relatedData = this.state.reletData;
    relatedData[index].quntity = Number(relatedData[index].quntity) + 1;
    this.setState({ reletData: relatedData }, () => {
      this.relatedItemlist_update(relatedData[index])
    });
  };

  decrement3 = (item, index) => {
    if (this.state.reletData[index].quntity == 0) {
      // this.Removeitem(item)
      return false
    } else {
      var relatedData = this.state.reletData;
      relatedData[index].quntity = Number(relatedData[index].quntity) - 1;
      this.setState({ reletData: relatedData }, () => {
        this.relatedItemlist_update(relatedData[index])
      });
    }
  };

  Removeitem = (item) => {
    Helper.confirmPopUp("Are you sure you want to Remove this item.", (status) => {
      if (status) {
        Helper.showLoader()
        Helper.makeRequest({ url: ApiUrl.shoppinglist_item_delete + item.sub_category.id + '/', method: "DELETE", data: '' }).then((respoanse) => {
          Helper.hideLoader()
          if (respoanse.status) {
            this.GetShoppinglist()
          }
          else { }
        });
      }
    });
  }

  Remove = (item) => {
    Helper.confirmPopUp("Are you sure you want to Remove this item.", (status) => {
      if (status) {
        Helper.showLoader()
        Helper.makeRequest({ url: ApiUrl.shoppinglist_item_delete + item.items?.id + '/', method: "DELETE", data: '' }).then((respoanse) => {
          Helper.hideLoader()
          if (respoanse.status) {
            this.getNeigbourList()
          }
          else { }
        });
      }
    });
  }

  is_private = (item, index) => {
    if (!item.sub_category.is_private) {
      Helper.confirmPopUp('Are you sure you want to Private this Product ?', (status) => {
        if (status) {
          this.PrivateConfrim(item, index)
        }
      });
    } else {
      this.PrivateConfrim(item, index)
    }

  }

  neighbour_private = (item, index) => {
    if (!item.is_private) {
      Helper.confirmPopUp('Are you sure you want to Private this Product ?', (status) => {
        if (status) {
          this.neighbou_PrivateConfrim(item, index)
        }
      });
    } else {
      this.neighbou_PrivateConfrim(item, index)
    }

  }

  PrivateConfrim = (item, index) => {
    var data = {
      is_private: item.sub_category.is_private ? 0 : 1
    }
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.store_Itemlist_update + item.sub_category.id + '/', method: "PATCH", data: data }).then((respoanse) => {
      console.log('store_Itemlist_update', respoanse)
      Helper.hideLoader()
      var listData1 = this.state.ShoppintAddlist;
      listData1[index].sub_category.is_private = item.sub_category.is_private ? false : true;
      this.setState({ ShoppintAddlist: listData1 });
    });
  }

  neighbou_PrivateConfrim = (item, index) => {
    var data = {
      is_private: item.is_private ? 0 : 1
    }
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.store_Itemlist_update + item.id + '/', method: "PATCH", data: data }).then((respoanse) => {
      console.log('store_Itemlist_update', respoanse)
      Helper.hideLoader()
      var listData1 = this.state.listOfData;
      listData1[index].is_private = item.is_private ? false : true;
      this.setState({ listOfData: listData1 });
    });
  }



}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  Pulsview: { height: '90%', alignItems: 'center', justifyContent: 'center' },
  Pluscon: { width: 200, height: 200, borderRadius: 15, borderColor: Colors.palePurple, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  ImagwPuls: { width: 75, height: 75, resizeMode: 'contain' },

  topView: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 15, paddingHorizontal: 17,
  },
  IconTop: { width: 20, height: 20, resizeMode: "contain" },
  mainView1: {
    flexDirection: "row",
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 15,
  },
  icon1: { width: 70, height: 80, resizeMode: "contain" },
  textType: {
    fontSize: 10,
    width: "90%",
    lineHeight: 10,
    marginTop: 8,
    color: "rgb(77,77,77)",
  },
  textPrice: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 10,
    color: "rgb(77,77,77)",
    fontFamily: Fonts.Candarab,
  },
  touch1: { width: 20, height: 20, resizeMode: "contain" },
  textNumber1: { paddingHorizontal: 8, backgroundColor: Colors.white },
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
    alignSelf: "center",
    marginTop: 15,
  },
  textPantry: {
    marginTop: 16,
    paddingHorizontal: 17,
    fontSize: 14,
    lineHeight: 17,
    color: Colors.barney,
    fontFamily: Fonts.Candarab,
  },
  // FL1: {
  //   marginTop: 20,
  //   backgroundColor: "rgb(248,248,248)",
  //   paddingHorizontal: 17,
  //   paddingVertical: 20,
  // },
  Addshopitem: { fontSize: 16, color: Colors.barney, fontFamily: Fonts.Candarab, },

  textHouseHold: { fontSize: 12, lineHeight: 14, color: Colors.darkishPurple, fontFamily: Fonts.Candarab, },
  textNeighbour: { fontSize: 12, lineHeight: 14, color: "rgb(160,87,206)", fontFamily: Fonts.Candarab, },
  textType1: { fontSize: 12, lineHeight: 12, color: Colors.indigo },
  textStore: { fontSize: 12, lineHeight: 12, color: "rgb(88,88,88)" },
  searchView: { margin: 20, borderRadius: 30, top: 8, borderWidth: 0.5, height: 45, borderColor: Colors.barney },
  slideBttnview: {
    backgroundColor: Colors.barney,
    paddingVertical: 25,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  removeText: {
    fontSize: 12,
    fontFamily: Fonts.Candaral,
    color: Colors.white,
    top: 5,
  },
  removeIcon: { height: 20, width: 25, resizeMode: "contain" },
  slideBttnviewLeft: {
    backgroundColor: Colors.pissYellow,
    paddingVertical: 30,
    marginTop: 17,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  modalContainView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffffe0",
  },
  modalView: {
    backgroundColor: "white",
    borderColor: Colors.barney,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    marginHorizontal: 30,
  },
  modalViewSubstitues: {
    backgroundColor: "white",
    borderColor: Colors.wormGray,
    borderWidth: 1,
    borderRadius: 24,
    marginHorizontal: 16,
  },
  iconClose: { width: 28, height: 28, resizeMode: "contain" },
  txtSorting: {
    fontFamily: Fonts.Candarab,
    fontSize: 24,
    color: Colors.barney,
    marginTop: -10,
    alignSelf: "center",
  },
  radioIcon: { width: 22, height: 22, resizeMode: "contain" },
  radioActiveTxt: { fontSize: 16, fontFamily: Fonts.Candara, color: Colors.barney, marginLeft: 12, paddingVertical: 12, },
  radioUnactiveTxt: { fontSize: 16, fontFamily: Fonts.Candara, color: Colors.greyishPurple, marginLeft: 12, paddingVertical: 12, },
  txtSelectSubstitues: {
    fontFamily: Fonts.Candarab,
    fontSize: 18,
    color: Colors.barney,
    marginTop: 23,
    alignSelf: "center",
  },
  productName: {
    fontSize: 12,
    fontFamily: Fonts.Candarab,
    color: Colors.indigo,
  },
});
