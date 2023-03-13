import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, ActivityIndicator, SafeAreaView, DeviceEventEmitter, ImageBackground, RefreshControl } from "react-native";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import ApiUrl from "../Lib/ApiUrl";
import Config from "../Lib/Config";
import Helper from "../Lib/Helper";
import LoadImage from "../Lib/LoadImage";
import { handleNavigation } from "../navigation/Routes";
import Coupons from "./Coupons";
const { width, height } = Dimensions.get("window");

export default class StoreCatList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            allindexitem: '',
            isLoading: false,
            isNextLoading: false,
            next_page_url: '',
            promotions: true,
            NotFound: false,
            search: '',
            Page: 1,
            ordering: this.props.route.params.ordering ? this.props.route.params.ordering : null,
            Categoryitem: this.props.route.params.Store_Cat ? this.props.route.params.Store_Cat : null,
            Catgory_id: this.props.route.params.Catgory_id ? this.props.route.params.Catgory_id : null,
            Cat_type: this.props.route.params.Cat_type ? this.props.route.params.Cat_type : null,
            StoreList: [],
            FavoriteAddlist: [],
            selectId: '',
            Store_id: this.props.route.params.Store_Cat ? this.props.route.params.Store_Cat.id : null,
            selectCatgoryList: [],
            Sub_Cat_List: [],
        };
        // alert(JSON.stringify(this.state.Categoryitem))
        // console.log('this.state.Cat_type',this.state.Cat_type + '=========',JSON.stringify(this.state.Categoryitem))
        AppHeader({
            ...this,
            logo: false,
            leftIcon: images.back,
            leftClick: () => { this.goBack() },
            title: this.state.Cat_type == 'StoreCatgory' ? this.state.Categoryitem.category : (this.state.Categoryitem ? this.state.Categoryitem.name : 'Product'),
            rightIcon: images.filter,
            rightClick: () => { this.menuClick() },
            search: true,
            notification:false,
            searchIcon: images.search,
            searchClick: () => { this.searchClick() }
        });
    }

    searchClick = () => {
        this.props.navigation.navigate('Search')
    }

    menuClick = () => {
        // alert(JSON.stringify(this.state.allindexitem))
        this.props.navigation.navigate("Filter", { catgory_id: this.state.Store_id, selectId: this.state.selectId, allitem: this.state.allindexitem, ordering: this.state.ordering, orderingBack: this.updateoRdering });
    };
    updateoRdering = (data) => {
        // if(data == 0){
        this.setState({ ordering: data })
        // }else{
        // this.setState({ordering:-1})
        // }
    }
    goBack = () => {
        this.props.navigation.goBack()
    }
    onSelectCatgory = (item) => {
        // alert(JSON.stringify(item))
        this.setState({ allindexitem: item, selectId: item.id, Page: 1, NotFound: false }, () => {
            this.Get_Sub_Category(this.state.selectId, false)
        });
    };

    onSelectStore = (item) => {
        this.setState({ Store_id: item.store.id, Page: 1, NotFound: false }, () => {
            this.Getstore_Category(item.store.id, '')
        });
    };


    onFavpurple = (item) => {
        var data = {
            sub_category: item.sub_category.id,
            like: item.like == true ? 0 : 1,
        }
        console.log(JSON.stringify(data))
        Helper.showLoader()
        Helper.makeRequest({ url: ApiUrl.store_like_Product, method: "POST", data: data }).then((respoanse) => {
            if (respoanse.status == true) {
                console.log('=====>', JSON.stringify(respoanse))
                Helper.hideLoader()
                item.like = respoanse.data.like;
                this.setState({})
            }
        });

    }

    selectViewList = ({ item }) => {
        return (
            <View style={styles.textListView}>
                <TouchableOpacity onPress={() => { this.onSelectStore(item); }}  >
                    <Text style={this.state.Store_id == item.store.id ? styles.actListText : styles.listText}  >
                        {item.store.name}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    selectCatgoryitem = ({ item }) => {
        return (
            <View style={styles.textListView}>
                <TouchableOpacity onPress={() => { this.onSelectCatgory(item); }}  >
                    <Text style={Number(this.state.selectId) == Number(item.id) ? styles.actListText : styles.listText}  >
                        {item.category}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    };

    ProductDetails = (item) => {
        this.props.navigation.navigate('SubCatDetails', { Product: item.sub_category.id, backtype: '', quentity: item.quntity })
    }

    addToShopping = (item) => {
        let tempdata = new FormData();
        tempdata.append('items', item.sub_category.id);
        tempdata.append('quantity', item.quntity);
        Helper.showLoader()
        Helper.makeRequest({ url: ApiUrl.shoppinglist_item_create, method: "POSTUPLOAD", data: tempdata }).then((respoanse) => {
            Helper.hideLoader()
            console.log('>>>====respoanse123', JSON.stringify(respoanse))
            if (respoanse.status) {
                DeviceEventEmitter.emit('AddToShopping', respoanse);
                this.props.navigation.navigate("ShoppingTab")
                //handleNavigation({ type: 'popToTop',  navigation: this.props.navigation })
                Helper.hideLoader()
            } else {
                Helper.hideLoader()
            }
        });
    }
    promotionsList = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => { this.ProductDetails(item) }} style={styles.boxView}  >
                <View style={{ marginVertical: 10, }}>
                    <LoadImage style={styles.listIcon} source={{ uri: Config.baseImgurl + item.sub_category.image }} resizeMode={'contain'} />
                </View>
                <View style={{ position: "absolute", top: 6, right: 10 }}>
                    {/* {item.already_added && */}
                    <TouchableOpacity onPress={() => { this.addToShopping(item) }}>
                        <Image style={styles.cardIcon} source={images.cart_purple} />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={() => { this.onFavpurple(item) }} >
                        <Image
                            style={[styles.cardIcon, { marginTop: 5 }]}
                            source={item.like ?images.fav_dark : images.fav_purple}
                        />
                    </TouchableOpacity> */}
                </View>
                <View style={{ flex: 1, }}>
                    <Text style={styles.wineText}>{item.sub_category.sub_category}</Text>
                </View>
                <View style={styles.ribbinView}>
                    <View style={{ flex: 1 }}>
                        <ImageBackground style={[styles.ribbinIcon, { transform: [{ rotate: '180deg' }] }]} source={images.ribbon_purple} >
                        </ImageBackground>
                        <Text style={[styles.dolorText, { position: 'absolute', left: 5 }]}>{
                            // item.sub_category.price ? (Number(item.sub_category.price) * Number(item.quntity)).toFixed(2) : 0}</Text>
                            item.sub_category.price ? item.sub_category.price : '0.00'} </Text>
                    </View>
                    {/* <View style={{ flex:1 ,alignItems:'center',justifyContent:'center' }}>
                    <Text style={styles.kgText}>500 g</Text>
                    </View> */}

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ flexDirection: "row", alignItems: "center", }}>
                            <TouchableOpacity onPress={() => { this.decrement(item, index) }}  >
                                <Image style={styles.touch2} source={images.minus} />
                            </TouchableOpacity>
                            {/* <TextInput
                                    style={styles.number2}
                                    // placeholder="0"
                                    placeholderTextColor={"#000000"}
                                    onChangeText={(text) => { this.directChange(item, index, text) }}
                                    maxLength={3}
                                    keyboardType={'number-pad'}
                                    value={item.quntity == "" ? '0' : item.quntity.toString()} /> */}
                            <Text style={styles.number2}>{item.quntity}</Text>
                            <TouchableOpacity onPress={() => { this.increment(item, index) }} >
                                <Image style={styles.touch2} source={images.plus} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* <View style={styles.positionView}>
                    </View> */}

                </View>
                {/* <View style={{ marginTop: 12, flexDirection: "row", justifyContent: "space-between", }}>
                    <View style={styles.walmartView}>
                        <Image style={styles.walmartIcon} source={images.wallmart_productdetail} />
                        <Text style={styles.walmartText}>WallMart </Text>
                    </View>
                    <View style={styles.pickerView}>
                        <Text style={styles.kgText}>500 g</Text>
                        <Image style={styles.downIcon} source={images.dropdown_purple} />
                    </View>
                </View> */}
            </TouchableOpacity>
            // <TouchableOpacity onPress={()=>{this.ProductDetails(item)}} style={styles.mainView}>
            //     <View style={{ flex: 0.3, alignItems: "center", backgroundColor: Colors.white, justifyContent: 'center' }} >
            //         <LoadImage style={styles.icon} source={{ uri: Config.baseImgurl + item.sub_category.image }} />
            //     </View>
            //     <View style={{ flex: 0.7, backgroundColor: "white" }}>
            //         <View style={{ flexDirection: 'row' }}>
            //             <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
            //                 <Text style={[styles.eplantTetx, {}]}>{item.sub_category.sub_category}</Text>
            //                 {/* <Text style={styles.kgText}>Seeds, : 2.20 Lbs</Text> */}
            //                 {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
            //                         <Image style={styles.img} source={images.wallmart_purple} />
            //                         <Text style={styles.wallmartText}>WallMart Store</Text>
            //                     </View> */}
            //                 {/* <Image style={styles.barcodeImg} source={images.barcode} /> */}
            //             </View>
            //             {/* <Text style={styles.kgText}>Seeds, : 2.20 Lbs</Text> */}
            //             <View style={{ flex: 0.7, }}>
            //                 <View style={{ alignItems: "center", justifyContent: "center" }}>
            //                     <Image style={styles.ribbin} source={images.ribbon_dark} />
            //                     <View style={{ position: "absolute", top: 10 }}>
            //                         <Text style={styles.cuText}>$ {item.sub_category.price}</Text>
            //                         {/* <Text style={styles.nonCutText}>$ 3.45</Text> */}
            //                     </View>
            //                 </View>

            //                 <View style={styles.lastViewL}>
            //                     <View style={{ marginLeft: 30, marginTop: 10, flexDirection: "row" }}>
            //                         <TouchableOpacity onPress={() => { this.onFavpurple(item) }}>
            //                             <Image
            //                                 style={styles.sameIcon}
            //                                 source={item.like ? images.Add_like : images.like} />
            //                         </TouchableOpacity>
            //                         <TouchableOpacity onPress={() => { }}>
            //                             <Image style={styles.sameIcon} source={images.cart_purple} />
            //                         </TouchableOpacity>
            //                     </View>
            //                 </View>
            //             </View>
            //         </View>
            //     </View>
            // </TouchableOpacity>
        );
    };
    _renderFooterItems = ({ item }) => {
        if (this.state.isNextLoading) {
            return (
                <View style={{ marginVertical: 20 }}>
                    <ActivityIndicator animating={true} size="large" color={'#000'} />
                </View>
            );
        } else {
            return (<View />);
        }
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, paddingBottom: 60, backgroundColor: Colors.white }}>
                {this.state.Categoryitem == null &&
                    <View style={{ marginTop: 0 }}>
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={this.state.StoreList}
                            renderItem={this.selectViewList}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>}

                <View style={{ marginTop: this.state.Categoryitem ? 0 : 10, backgroundColor: 'rgb(235, 215, 247)', }}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={this.state.selectCatgoryList}
                        renderItem={this.selectCatgoryitem}
                        ref={(ref) => { this.flatListRefcat = ref; }}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>

                {this.state.Sub_Cat_List != '' ?
                    <View style={{ marginTop: 5 }}>
                        <FlatList
                            numColumns={2}
                            data={this.state.Sub_Cat_List}
                            ref={(ref) => { this.flatListRef = ref; }}
                            showsVerticalScrollIndicator={false}
                            refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
                            renderItem={this.promotionsList}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                            ListFooterComponent={this._renderFooterItems}
                            onEndReached={this.onScroll}
                            onEndReachedThreshold={0.1}
                        />
                    </View>
                    :
                    <View style={{ height: '90%', justifyContent: 'center', alignItems: 'center' }}>
                        {this.state.NotFound &&
                            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16, }}>Item Not Found</Text>
                        }
                    </View>
                }

            </SafeAreaView>
        );
    }


    onScroll = () => {
        if (!this.state.isLoading && !this.state.isNextLoading && this.state.next_page_url) {
            this.Get_Sub_Category(this.state.selectId, true);
        }
    }

    componentDidMount = () => {
        if (this.state.Categoryitem) {
            this.state.Store_id = this.state.Cat_type == 'StoreCatgory' ? this.state.Categoryitem.store : this.state.Categoryitem.id
            this.setState({})
            this.Getstore_Category(this.state.Cat_type == 'StoreCatgory' ? this.state.Categoryitem.store : this.state.Categoryitem.id, '')
        } else {
            this.Getstore()
        }
        this.listener = DeviceEventEmitter.addListener('like', (value) => {
            this.setState({ Page: 1 }, () => { this.Get_Sub_Category(value.category, false) })
        });
        this.GetApi = DeviceEventEmitter.addListener('tabStateChange', (value) => {
            console.log('update=====nouer', value)
            this.state.Page = ''
            this.state.Sub_Cat_List = [];
            this.state.Store_id = ''
            this.setState({ allindexitem: value, updateStore: value, Store_id: value.store, Page: 1 }, () => {
                // alert(this.state.Store_id)
                this.Getstore_Category(this.state.Store_id, value.id)
            })
            // alert(JSON.stringify(this.state.updateStore))
        });

        // this.listener = DeviceEventEmitter.addListener('order', (value) => {
        //     if(value){
        //         this.setState({ ordering:value })
        //     }
        // });

    }

    onRefresh = () => {
        this.setState({ refreshing: false })
        this.componentDidMount()
    }
    Getstore = () => {
        Helper.showLoader()
        Helper.makeRequest({ url: ApiUrl.store, method: "GET", data: '' }).then((respoanse) => {
            console.log('------->>>>>', JSON.stringify(respoanse))
            Helper.hideLoader()
            if (respoanse.status) {
                this.state.Store_id = respoanse.data[0].store.id
                this.setState({ StoreList: respoanse.data }, () => {
                    this.Getstore_Category(this.state.Store_id, '')
                })
            }
            else {
            }

        });
    }

    Getstore_Category = (categoryId, type) => {
        Helper.showLoader()
        Helper.makeRequest({ url: ApiUrl.store_category + categoryId, method: "GET", data: '' }).then((respoanse) => {
            console.log('categorydttdfdfdfd', JSON.stringify(respoanse))
            if (respoanse.status) {
                if (respoanse.data.length > 0) {
                    if (type) {
                        this.setState({ selectId: type })
                    }
                    else {
                        this.setState({
                            allindexitem: respoanse.data[0],
                            selectId: this.state.Cat_type == 'StoreCatgory' ? this.state.Categoryitem.id : respoanse.data[0].id

                        }, () => {
                            // alert(JSON.stringify(this.state.allindexitem))
                        })

                    }
                    this.setState({ selectCatgoryList: respoanse.data }, () => {
                        this.scrollToIndexcat()
                        this.Get_Sub_Category(this.state.selectId, false)
                    })
                } else {
                    this.setState({ NotFound: true })
                    Helper.hideLoader()
                }

            }
            else {
                Helper.hideLoader()
            }
        });
    }

    Get_Sub_Category = (SubCatId, nextLoader) => {
        this.setState({ isNextLoading: nextLoader });
        if (this.state.Page == 1) {
            Helper.showLoader()
        }
        let temp = this.state.ordering == 0 ? 1 : -1
        Helper.makeRequest({ url: ApiUrl.Sub_category + this.state.Store_id + '&category=' + SubCatId + "&ordering=" + temp + '&page=' + this.state.Page, method: "GET", data: '' }).then((respoanse) => {
            console.log('============>>>>>', JSON.stringify(respoanse))
            if (respoanse.results.status) {
                if (this.state.Page == 1) {
                    this.state.Sub_Cat_List = [];
                }
                if (respoanse.results.data.length > 0) {
                    this.setState({
                        Sub_Cat_List: [...this.state.Sub_Cat_List, ...respoanse.results.data],
                        isNextLoading: false, next_page_url: respoanse.next,
                    }, () => {
                        Helper.hideLoader()
                        // this.scrollToIndex()
                    })
                    this.state.Page++;
                } else {
                    Helper.hideLoader()
                    this.setState({ isNextLoading: false, });
                    this.setState({ Sub_Cat_List: '', NotFound: true, })
                }
            }
            else {
                Helper.hideLoader()
                this.setState({ isNextLoading: false, });
            }
        });
    }
    scrollToIndex = () => {
        this.flatListRef.scrollToIndex({ animated: true, index: 0 });
    }
    scrollToIndexcat = () => {
        this.flatListRefcat.scrollToIndex({ animated: true, index: 0 });
    }


    // increment = () => {
    //     this.setState({ count: this.state.count + 1, });
    // };

    // decrement = () => {
    //     if (this.state.count <= 0) {
    //         return
    //     } else {
    //         this.setState({
    //             count: this.state.count - 1,
    //         });
    //     }
    // };
    increment = (item, index) => {
        var listData1 = this.state.Sub_Cat_List;
        listData1[index].quntity = Number(listData1[index].quntity) + 1;
        this.setState({ Sub_Cat_List: listData1 }, () => {
            this.Itemlist_update(item)
        });
    };

    decrement = (item, index) => {

        if (this.state.Sub_Cat_List[index].quntity <= 0) {
            return false
        } else {
            var listData1 = this.state.Sub_Cat_List;
            listData1[index].quntity = Number(listData1[index].quntity) - 1;
            this.setState({ Sub_Cat_List: listData1 }, () => {
                this.Itemlist_update(item)
            });
        }


    };

    directChange = (item, index, value) => {
        var listData1 = this.state.Sub_Cat_List;
        listData1[index].quntity = Number(value.replace(/[^0-9]/g, ''))
        this.setState({ Sub_Cat_List: listData1 }, () => {
            this.Itemlist_update(item)
        });
    }
    Itemlist_update = (ItemData) => {
        let tempdata = new FormData();
        tempdata.append('items', ItemData.sub_category.id);
        tempdata.append('quantity', ItemData.quntity);
        Helper.showLoader()
        Helper.makeRequest({ url: ApiUrl.shoppinglist_item_create, method: "POSTUPLOAD", data: tempdata }).then((respoanse) => {
            Helper.hideLoader()
            console.log('>>>====respoanse', JSON.stringify(respoanse))
            if (respoanse.status) {
                DeviceEventEmitter.emit('AddToShopping', respoanse);
                // handleNavigation({ type: 'pop', navigation: this.props.navigation })
                Helper.hideLoader()
            } else {
                Helper.hideLoader()
            }
        });
        // // var data = {
        // //   quantity:ItemData.quntity
        // // }
        // let tempdata = new FormData();
        // tempdata.append('quantity',ItemData.quntity);
        // console.log('ItemData',JSON.stringify(ItemData))

        // Helper.showLoader()
        // Helper.makeRequest({ url: ApiUrl.store_Itemlist_update+ItemData.sub_category.id+'/', method: "PATCH", data: tempdata }).then((respoanse) => {
        //   Helper.hideLoader()
        //   console.log('shoppinglist_item_details', respoanse)
        //   if (respoanse.active == true) {

        //   }
        //   else { }
        // });

    }

}
const styles = StyleSheet.create({
    btnText: { borderWidth: 0.5, borderColor: Colors.barney, paddingVertical: 10, borderRadius: 20, fontSize: 18, fontFamily: Fonts.Candarab, color: Colors.barney, paddingVertical: 10, paddingHorizontal: 40 },
    searchView: { marginHorizontal: 20, borderRadius: 30, top: 8, borderWidth: 0.5, height: '9%', borderColor: Colors.barney },
    actBtnTExt: { borderWidth: 0.5, borderColor: Colors.barney, paddingVertical: 10, borderRadius: 20, fontSize: 18, fontFamily: Fonts.Candarab, color: Colors.white, backgroundColor: Colors.barney, overflow: 'hidden', paddingVertical: 10, paddingHorizontal: 40 },
    listText: { fontSize: 14, paddingVertical: 10, paddingHorizontal: 12, fontFamily: Fonts.Candarab, color: Colors.greyishPurple, },
    actListText: { fontSize: 14, fontFamily: Fonts.Candarab, color: Colors.barney, paddingHorizontal: 12, backgroundColor: Colors.white, paddingVertical: 10, borderRadius: 10, overflow: 'hidden' },
    textListView: { backgroundColor: 'rgb(235, 215, 247)', justifyContent: "space-between", paddingHorizontal: 15, paddingVertical: 10, flexDirection: "row", alignItems: "center", },
    iconView: { alignItems: "center", justifyContent: "center", },
    icon: { height: 70, width: 70, resizeMode: "contain", },
    eplantTetx: { fontSize: 12, fontFamily: Fonts.Candarab, color: Colors.indigo, },
    kgText: { fontSize: 12, color: Colors.barney, marginTop: 2, },
    img: { height: 13, width: 13, resizeMode: "contain" },
    wallmartText: { fontSize: 10, color: Colors.barney, left: 5 },
    cuText: { fontSize: 12, color: Colors.neonYellow, textDecorationLine: "line-through", },
    ribbin: { height: 40, width: 79, resizeMode: "contain" },
    nonCutText: { fontSize: 14, color: Colors.white },
    nameView: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", },
    mainView: { marginTop: 10, marginHorizontal: 15, flexDirection: "row", paddingVertical: 10, borderWidth: 1, borderRadius: 10, borderColor: Colors.greyish, backgroundColor: Colors.white, },
    lastViewL: { flexDirection: "row", justifyContent: "space-between", marginTop: 7, },
    barcodeImg: { height: 31, width: 65, resizeMode: "contain" },
    sameIcon: { height: 25, width: 25, resizeMode: "contain", marginRight: 5 },
    boxView: { backgroundColor: Colors.white, width: (width - 32) / 2, paddingBottom: 10, marginTop: 12, elevation: 5, borderWidth: 0.5, borderRadius: 15, marginHorizontal: 8, marginVertical: 5, overflow: "hidden", },
    listIcon: { height: 110, width: (width - 32) / 2, },
    cardIcon: { height: 30, width: 30, resizeMode: "contain" },
    ribbinView: { marginVertical: 7, flexDirection: "row", justifyContent: 'center', alignItems: "center", },
    ribbinIcon: { height: 21, width: 55, resizeMode: "contain" },
    positionView: { position: "absolute", top: 0, right: 0, alignItems: "center", },
    dolorText: { right: 3, top: 2, fontSize: 12, color: Colors.white },
    wineText: { fontSize: 12, paddingHorizontal: 10, fontFamily: Fonts.Candarab, color: Colors.darkIndigo, },
    walmartView: { flexDirection: "row", marginLeft: 5, alignItems: "center" },
    walmartIcon: { height: 11, width: 11, resizeMode: "contain" },
    walmartText: { fontSize: 10, color: Colors.barney, left: 2 },
    pickerView: { flexDirection: "row", paddingHorizontal: 10, alignItems: "center", marginRight: 5, borderWidth: 0.5, borderRadius: 5, paddingVertical: 3, borderColor: Colors.barney, },
    // kgText: { marginRight: 19, fontSize: 11, color: Colors.barney, right: 5, textAlign: "center", },
    downIcon: { height: 5, width: 7, resizeMode: "contain" },
    touch2: { width: 20, height: 20, resizeMode: "contain" },
    number2: { paddingHorizontal: 8, backgroundColor: Colors.white, textAlign: 'center' },


});
