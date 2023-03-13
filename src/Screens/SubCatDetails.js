import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, DeviceEventEmitter, TextInput } from "react-native";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import ApiUrl from "../Lib/ApiUrl";
import Config from "../Lib/Config";
import Helper from "../Lib/Helper";
import LoadImage from "../Lib/LoadImage";
import { handleNavigation } from "../navigation/Routes";
export default class SubCatDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ProductList: '',
            Productitem: this.props.route.params.Product ? this.props.route.params.Product : null,
            like: false,
            NotFound: false,
            count: this.props.route.params ? this.props.route.params.quentity : 0,
        };
        AppHeader({
            ...this,
            logo: false,
            leftIcon: images.back,
            leftClick: () => { this.goBack() },
            title: 'Product Details',
            rightIcon: images.menu,
            rightClick: () => { this.menuClick() },
            search: true,
            notification:false,
            searchIcon: images.cart_purple_nav,
            searchClick: () => { this.onClickSearch() }
        });
        console.log('=====>>>Productitem', this.state.Productitem)
    }

    onClickSearch = () => {
        // this.props.navigation.navigate('ShoppingTab')
    }

    goBack = () => {
        this.props.navigation.goBack()
    }

    menuClick = () => {
        this.props.navigation.navigate('MyAccount')
    }

    increment = () => {
        this.setState({ count: this.state.count + 1, });
    };

    decrement = () => {
        if (this.state.count <= 0) {
            return
        } else {
            this.setState({
                count: this.state.count - 1,
            });
        }
    };
    directChange = (val) => {
        this.setState({ count: Number(val.replace(/[^0-9]/g, '')) });
    }

    onChangeLike = (Sub_id) => {
        var data = {
            sub_category: Sub_id.id,
            like: this.state.like == true ? 0 : 1,
        }
        Helper.showLoader()
        Helper.makeRequest({ url: ApiUrl.store_like_Product, method: "POST", data: data }).then((respoanse) => {
            if (respoanse.status == true) {
                Helper.hideLoader()
                this.state.like = respoanse.data.like;
                this.setState({})
                DeviceEventEmitter.emit('like', Sub_id);
            }
        });

    };


    shoppinglist_item_create = () => {
        let tempdata = new FormData();
        tempdata.append('items', this.props.route.params.Product);
        tempdata.append('quantity', this.state.count);
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

    };


    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#fff' }} >
                <View style={styles.viewMain}>
                    {this.state.ProductList != '' ?
                        <View>

                            <View style={styles.headView}>
                                <View style={{ flex: 1.5, }}>
                                    <Text style={styles.productName}>{this.state.ProductList ? this.state.ProductList.sub_category : ''}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', flex: 0.5, justifyContent: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => { this.onChangeLike(this.state.ProductList); }} style={{ marginRight: 6 }}  >
                                        <Image source={this.state.like ? images.fav_dark : images.fav_purple} style={styles.iconLike} />
                                    </TouchableOpacity>

                                    <TouchableOpacity>
                                        <Image source={images.cart_purple} style={styles.iconLike} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/* <View style={{ flexDirection: "row", marginLeft: 16, alignItems: "center", }}  >
                    <Image  style={styles.iconWallMart}  source={images.wallmart_productdetail} />
                    <Text style={styles.txtWallMart}>WallMart</Text>
                </View> */}

                            <View style={{ marginTop: 35, paddingHorizontal: 70 }}>
                                {this.state.ProductList ?
                                    <LoadImage source={{ uri: Config.baseImgurl + this.state.ProductList.image }} style={styles.productImg} />
                                    : null
                                }
                                {/*  <Image  style={styles.productImg} source={images.product_detail_img}  /> */}

                            </View>
                            {/* <View style={{ alignSelf: "flex-end", marginRight: 16, alignItems: "center", }}  >
                    <Text style={{ color: Colors.greyishTwo }}>$ 3.45</Text>
                    <View style={{ height: 1, width: 42, backgroundColor: Colors.greyishTwo, position: "absolute", marginTop: 10, }} ></View>
                     </View> */}

                            <View style={{ marginTop: 20, flexDirection: "row", marginHorizontal: 16, alignItems: "center", }}  >
                                {/* <View style={{ flex: 1, flexDirection: "row" }}>
                            <Image source={images.discount} style={styles.iconDiscount} />
                            <Text style={styles.txtOff}>$ 2 OFF</Text>
                        </View> */}
                                {/* <Text style={styles.txtProductWeight}>500 gm</Text> */}
                                {/* <Text style={styles.txtMoney}>$ {this.state.ProductList?(Number(this.state.count)*Number(this.state.ProductList.price)).toFixed(2):''}</Text> */}
                                <Text style={styles.txtMoney}>$ {this.state.ProductList ? Number(this.state.ProductList.price).toFixed(2) : ''}</Text>

                            </View>
                            <View style={styles.boder}></View>
                            {/* <Text style={styles.txtDescriptions}>Descriptions</Text>
                    <Text style={styles.txtDescriptionDetail}>You’ve been buying the same ol’ grocery store tomato sauce foryears, but have you ever thought of</Text> */}

                            <View style={{ flexDirection: "row", marginHorizontal: 16, marginTop: 22, alignItems: "center", }}  >
                                <Text style={styles.txtAddQuantity}>Add Quantity</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <TouchableOpacity onPress={() => { this.decrement(); }} style={styles.btnMinus} >
                                        <View style={styles.boderMinus}></View>
                                    </TouchableOpacity>
                                    {/* <TextInput
                                        style={{ marginHorizontal: 8, textAlign: 'center' }}
                                        // placeholder="0"
                                        placeholderTextColor={"#000000"}
                                        onChangeText={(text) => { this.directChange(text) }}
                                        maxLength={3}
                                        keyboardType={'number-pad'}
                                        value={this.state.count == "" || this.state.count == null ? '0' : this.state.count.toString()} /> */}
                                    <Text style={styles.txtCount}>{this.state.count}</Text>
                                    <TouchableOpacity onPress={() => { this.increment(); }} style={styles.btnPlus}  >
                                        <Image style={{ height: 30, width: 30, resizeMode: "contain" }} source={images.plus_color} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => { this.shoppinglist_item_create() }} style={styles.btnAddShopping}>
                                <Image style={{ width: 23, height: 23, resizeMode: "contain" }} source={images.cart_white} />
                                <Text style={styles.txtAddShopping}>ADD TO SHOPPING LIST</Text>
                            </TouchableOpacity>
                        </View> :
                        <View style={{ flex: 1, height: '100%', marginTop: 300, justifyContent: 'center', alignItems: 'center' }}>
                            {this.state.NotFound &&
                                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16, }}>Item Not Found</Text>
                            }
                        </View>
                    }
                </View>

            </ScrollView>
        );
    }
    componentDidMount = () => {
        this.GetProductDetails()
    }

    GetProductDetails = () => {
        Helper.showLoader()
        Helper.makeRequest({ url: ApiUrl.shoppinglist_item + this.state.Productitem + '/', method: "GET", data: '' }).then((respoanse) => {
            console.log('==>>>=====', JSON.stringify(respoanse.data.product))

            Helper.hideLoader()
            if (respoanse.status) {
                this.setState({ ProductList: respoanse.data.product.items, like: respoanse.data.like, NotFound: false, count: respoanse.data.product.quantity ? respoanse.data.product.quantity : this.state.count })
            } else {
                this.setState({ NotFound: true })
            }
        });
    }

}

const styles = StyleSheet.create({
    viewMain: { flex: 1, backgroundColor: Colors.white },
    productName: {

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
        justifyContent: 'center'

    },
});
