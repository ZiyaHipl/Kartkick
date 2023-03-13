import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Image, DeviceEventEmitter } from 'react-native'

import Colors from '../Compnont/Colors'
import Fonts from '../Compnont/Fonts';
import images from '../Compnont/ImagePath'
import AppButton from '../Compnont/AppButton'
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppHeader from '../Compnont/AppHeader';
import ApiUrl from '../Lib/ApiUrl';
import Helper from '../Lib/Helper';

export default class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfFilter: [
                { id: 1, type: 'Store' },

            ],
            listofCategories: [
                { id: 2, type: 'Categories' },
            ],
            storeitem: '',
            StoreList: [],
            ordering: this.props.route.params.ordering,
            categoryList: [],
            category: '2',
            selectorOfSort: 'sortBy',
            opener: false,
            storeOpen: false,
            filterSelect: true,
            Store_Name: '',
            tempid: '',
            tempCategory: '',
            storeSelect: this.props.route.params.catgory_id,
            selectId: this.props.route.params.selectId,
            selcetlist: this.props.route.params.allitem,
            sortByList: [
                // { label: "Bestselling" },
                // { label: "New" },
                { label: "Price low to high" },
                { label: "Price high to low " },
                // { label: "Distance" },
            ],
            sortSelect: false,

        }
        AppHeader({
            ...this,
            logo: false,
            leftIcon: images.back,
            leftClick: () => { this.goBack() },
            title: 'Filter',
            rightHide: true,
            search: false,
        });
    }

    goBack = () => {
        this.props.route.params.orderingBack(this.state.ordering);
        this.props.navigation.goBack()
    }

    // toOpen = (item) => {
    //     if(item.type == 'Store'){
    //         this.setState({storeOpen:true})
    //     }
    //     else{
    //         this.setState({ opener: true})
    //     }
    // }

    toStoreOpen = (item) => {
        this.setState({ storeOpen: !this.state.storeOpen, opener: false })
    }

    toCategouryOpen = (item) => {
        this.setState({ opener: !this.state.opener, storeOpen: false, })
    }

    toSetTheBox = (value) => {
        this.setState({ selectorOfSort: value })
    }
    toSetTheCategory = (item) => {
        this.setState({ category: item.id })
    }

    onSelect = (item) => {
        // let selected = [...this.state.StoreList]
        // selected[index].isSelect = !selected[index].isSelect
        this.setState({ storeitem: item.store, storeSelect: item.store.id, Store_Name: item.store.name, tempCategory: this.props.route.params.catgory_id }, () => {
            this.Getstore_Category('selectvalue')
        })
    }

    onSelectcat = (item) => {
        this.state.selcetlist = ''
        this.setState({ selectId: item.id, selcetlist: item, })
    }

    renderFunction = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => { this.onSelect(item, index) }} style={styles.flView}>
                    <Text style={styles.textCat}>{item.store?.name}</Text>
                    <Image style={styles.icon} source={this.state.storeSelect == item.store.id ? images.refinedby_checked : images.refinedby_unchecked} />
                </TouchableOpacity>
                <View style={this.state.opener ? styles.lineH : null} />
            </View>
        )
    }
    reFreshApiData = (isback = true) => {
        // alert(JSON.stringify(this.state.selcetlist))
        DeviceEventEmitter.emit('tabStateChange', this.state.selcetlist);
        //  if(this.state.storeitem!=''){
        //     DeviceEventEmitter.emit('Store_item', this.state.storeitem);
        //  }
        DeviceEventEmitter.emit('order', this.state.ordering == 0 ? 1 : -1);
        // this.props.navigation.goBack()
        if (isback) {
            this.goBack()
        }
    }
    renderFunctionCategory = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => { this.onSelectcat(item, index) }} style={styles.flView}>
                    <Text style={styles.textCat}>{item.category}</Text>
                    <Image style={styles.icon} source={Number(this.state.selectId) == Number(item.id) ? images.refinedby_checked : images.refinedby_unchecked} />
                </TouchableOpacity>
                <View style={this.state.opener ? styles.lineH : null} />
            </View>
        )
    }
    renderFunctionForType = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => this.toStoreOpen(item)} style={styles.flView}>
                    <Text style={styles.textCat}>{item.type}</Text>
                    {this.state.storeOpen ?
                        <Image style={{ height: 7, width: 12, resizeMode: 'contain', rotation: 180 }} source={images.dropdown_purple} /> :
                        <Image style={{ height: 7, width: 12, resizeMode: 'contain' }} source={images.dropdown_purple} />}
                </TouchableOpacity>
                <View style={{ width: '100%', height: 1, backgroundColor: Colors.warmGrayTwo, opacity: 0.16, }} />
            </View>
        )
    }

    renderCategoury = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => this.toCategouryOpen(item)} style={styles.flView}>
                    <Text style={styles.textCat}>{item.type}</Text>
                    {this.state.opener ?
                        <Image style={{ height: 7, width: 12, resizeMode: 'contain', rotation: 180 }} source={images.dropdown_purple} /> :
                        <Image style={{ height: 7, width: 12, resizeMode: 'contain' }} source={images.dropdown_purple} />}
                </TouchableOpacity>
                <View style={{ width: '100%', height: 1, backgroundColor: Colors.warmGrayTwo, opacity: 0.16, }} />
            </View>
        )
    }

    rendersortBy = ({ item, index }) => {
        return (
            <TouchableOpacity onPress={() => this.filterPrice(item, index)}
                style={styles.sortView}>
                <Text style={styles.sorttextCat}>{item.label}</Text>
                <Image style={{ height: 20, width: 20, resizeMode: 'contain' }}
                    source={this.state.ordering == index ? images.check : images.sortby} />
            </TouchableOpacity>
        )
    }

    componentDidMount = () => {
        this.Getstore()
        this.Getstore_Category('')
        this.listener = DeviceEventEmitter.addListener('order', (value) => {
            if (value) {
                this.setState({ ordering: value == 1 ? 0 : 1 })
            }
        });
    }
    Getstore = () => {
        Helper.showLoader()
        Helper.makeRequest({ url: ApiUrl.store, method: "GET", data: '' }).then((respoanse) => {
            console.log('fdgfddgdfg', JSON.stringify(respoanse))
            Helper.hideLoader()
            if (respoanse.status) {
                // this.state.Store_id = respoanse.data[0].store.id
                this.setState({ StoreList: respoanse.data }, () => {
                    // this.Getstore_Category(this.state.Store_id)
                })
                // this.setState({ tempCategory: respoanse.data[1]?.store.id })
            }
            else {
            }

        });
    }

    Getstore_Category = (value) => {
        Helper.makeRequest({ url: ApiUrl.store_category + this.state.storeSelect, method: "GET", data: '' }).then((respoanse) => {
            console.log('response123', JSON.stringify(respoanse))
            if (respoanse.status) {
                if (value == 'selectvalue') {
                    this.state.selectId = respoanse.data[0].id
                    this.state.selcetlist = respoanse.data[0]

                }
                
                else {
                    //  this.state.selcetlist=allindexitem
                }
                //  alert(JSON.stringify(this.state.selcetlist))
                this.setState({ tempid: respoanse.data[0]?.id })
                this.setState({ categoryList: respoanse.data }, () => {
                })
                //     if (respoanse.data.length > 0) {

                //         this.state.selectId =this.state.Cat_type=='StoreCatgory'?this.state.Categoryitem.id:respoanse.data[0].id
                //         this.setState({ selectCatgoryList: respoanse.data }, () => {
                //             this.scrollToIndexcat()
                //             this.Get_Sub_Category(this.state.selectId, false)
                //         })
                //     } else {
                //         this.setState({ NotFound: true })
                //         Helper.hideLoader()
                //     }

                // }
                // else {
                //     Helper.hideLoader()
            }
        });
    }

    filterPrice = (item, index) => {
        if (item.label == "Price low to high") {
            this.setState({ ordering: index, sortSelect: false })
        } else {
            this.setState({ ordering: index, sortSelect: true })
        }
        // let formdata = new FormData();
        // formdata.append('ordering', ordering)
        // formdata.append('store', this.state.storeSelect)
        // formdata.append('category', this.state.selectId)

        // var data = {
        //     store :this.state.storeSelect,
        //     category:this.state.selectId,
        //     ordering:ordering
        // }
        // Helper.makeRequest({ url: ApiUrl.get_productbyOrder, method: "GET", data: formdata }).then((respoanse) => {
        //     console.log('response123',JSON.stringify(respoanse))
        //      if (respoanse.status) {
        //         //  if(value=='selectvalue'){
        //         //      this.state.selectId=respoanse.data[0].id
        //         //      this.state.selcetlist=respoanse.data[0]

        //         //  }else{
        //         //      this.state.selcetlist=respoanse.data[0]
        //         //  }
        //         //  this.setState({categoryList:respoanse.data},()=>{
        //         //  })
        //     }
        // });
    }

    applyFilter = () => {
        let tempData = this.state.categoryList[0]
        this.setState({ ordering: null,selectId: tempData.id, selcetlist: tempData, },()=>{
            this.reFreshApiData()
         })
    }

    render() {
        return (
            <View style={{ backgroundColor: Colors.white, flex: 1 }}>
                <View style={styles.topView}>
                    <View style={{ marginHorizontal: 3 }}>
                        <AppButton
                            onClick={() => { this.setState({ filterSelect: true }) }}
                            Background={this.state.filterSelect == true ? Colors.barney : Colors.white}
                            borderRadius={30}
                            paddinghor={35}
                            paddingver={10}
                            borderColor={this.state.filterSelect == true ? null : Colors.barney}
                            borderWidth={this.state.filterSelect == true ? null : 1}
                            M_Ver={16}
                            title={'Refine By'}
                            fontSize={24}
                            textolor={this.state.filterSelect == true ? Colors.white : Colors.barney}
                            fontFamily={Fonts.Candarab}
                        />
                    </View>
                    <View style={{ marginHorizontal: 3 }}>
                        <AppButton
                            onClick={() => { this.setState({ filterSelect: false }) }}
                            Background={this.state.filterSelect == false ? Colors.barney : Colors.white}
                            borderRadius={30}
                            paddinghor={45}
                            paddingver={10}
                            borderColor={this.state.filterSelect == false ? null : Colors.barney}
                            borderWidth={this.state.filterSelect == false ? null : 1}
                            M_Ver={16}
                            title={'Sort By'}
                            fontSize={24}
                            textolor={this.state.filterSelect == false ? Colors.white : Colors.barney}
                            fontFamily={Fonts.Candarab}
                        />
                    </View>

                </View>
                <View style={{ flex: 1 }}>

                    {
                        this.state.filterSelect ?
                            <View>
                                <View>
                                    <FlatList
                                        extraData={this.state}
                                        data={this.state.listOfFilter}
                                        renderItem={this.renderFunctionForType} />
                                    {this.state.storeOpen &&
                                        <FlatList
                                            extraData={this.state}
                                            data={this.state.StoreList}
                                            renderItem={this.renderFunction} />}
                                    {/* 
                                    {this.state.opener && 
                                        <FlatList
                                            extraData={this.state}
                                            data={this.state.categoryList}
                                            renderItem={this.renderFunctionCategory} />} */}

                                </View>
                                <View>
                                    <FlatList
                                        extraData={this.state}
                                        data={this.state.listofCategories}
                                        renderItem={this.renderCategoury} />
                                    {this.state.opener &&
                                        <FlatList
                                            extraData={this.state}
                                            data={this.state.categoryList}
                                            renderItem={this.renderFunctionCategory} />}
                                    {/* 
                                 {this.state.opener && 
                                     <FlatList
                                         extraData={this.state}
                                         data={this.state.categoryList}
                                         renderItem={this.renderFunctionCategory} />} */}

                                </View>
                            </View>
                            :
                            <FlatList
                                style={{ marginTop: 10 }}
                                data={this.state.sortByList}
                                renderItem={this.rendersortBy}
                                extraData={this.state}
                                ItemSeparatorComponent={() => (<View style={{
                                    width: "100%", height: 1,
                                    opacity: 0.16, marginVertical: 14,
                                    backgroundColor: Colors.warmGrey,
                                }} />)}
                            />
                    }
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 1 }}>
                        <AppButton
                            onClick={() => { this.applyFilter() }}
                            paddingver={10}
                            Background={Colors.pissYellow}
                            title={'RESET'}
                            fontSize={18}
                            textolor={Colors.white}
                            fontFamily={Fonts.Candarab}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <AppButton
                            onClick={() => { this.reFreshApiData() }}
                            Background={Colors.purple}
                            paddingver={10}
                            title={'APPLY'}
                            fontSize={18}
                            textolor={Colors.white}
                            fontFamily={Fonts.Candarab}
                        />
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    topView: { flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between', marginTop: 15, alignItems: 'center' },
    img: { width: 150, height: 150, resizeMode: 'contain', marginVertical: 15, paddingTop: 15 },

    texttop: { fontSize: 35, lineHeight: 38, fontFamily: Fonts.Candarab, color: Colors.barney },
    icon: { width: 21, height: 20, resizeMode: 'contain' },
    flView: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 0, alignItems: 'center' },
    sortView: { flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between', alignItems: 'center' },
    textCat: { flex: 0.98, fontSize: 18, lineHeight: 48, fontFamily: Fonts.Candarab, color: Colors.darkishPurple, },
    sorttextCat: { fontSize: 16, fontFamily: Fonts.Candarab, color: Colors.darkishPurple, },
    lineH: { width: '100%', height: 1, backgroundColor: Colors.warmGrayTwo, opacity: 0.16, }
})