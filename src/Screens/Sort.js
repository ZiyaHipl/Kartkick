import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Image } from 'react-native'

import Colors from '../Compnont/Colors'
import Fonts from '../Compnont/Fonts';
import images from '../Compnont/ImagePath'
import AppButton from '../Compnont/AppButton'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Sort extends Component {
    constructor(props) {
        super(props);
        this.state = {

            listOfCategoriesNew: [
                { id: 1, type: 'Bestselling' },
                { id: 2, type: 'New' },
                { id: 3, type: 'Price loe to high' },
                { id: 4, type: 'Price high to low' },
                { id: 5, type: 'Distance' },
            ],

            listOfFilter: [
                { id: 1, type: 'Store' },
                { id: 2, type: 'Categories' },

            ],
            listOfCategories: [
                { set: false, type: 'Cooking Essentials' },
                { set: false, type: 'Fruits & Vegetables' },
                { set: true, type: 'Cleaning & Households ' },
                { set: false, type: 'Beverages' },
                { set: false, type: 'Personal Care' },
                { set: false, type: 'Baby Products' },
            ],
            categorySort: '2',
            selectorOfSort: 'sortBy',
            opener: true,
        }
    }
    toOpen = () => {
        this.setState({ opener: !this.state.opener })
    }
    toSetTheBox = (value) => {
        this.setState({ selectorOfSort: value })
    }
    toSetTheCategoryOfSort = (item) => {
        this.setState({ categorySort: item.id })
    }
    toSetTheCategoryOfRefine = (index) => {
        let newVar = [...this.state.listOfCategories]
        newVar[index].set = !newVar[index].set
        this.setState({ listOfCategories: newVar })
    }
    renderFunctionOfSortBy = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => this.toSetTheCategoryOfSort(item)} style={styles.flView}>
                    <Text style={styles.textCat}>{item.type}</Text>
                    <Image style={styles.icon} source={(this.state.categorySort == item.id) ? images.radio_button_checked : images.sortby} />
                </TouchableOpacity>
                <View style={styles.lineH} />
            </View>
        )
    }
    renderFunctionRefine = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => { this.toSetTheCategoryOfRefine(index) }} style={styles.flView}>
                    <Text style={styles.textCat}>{this.state.opener ? item.type : null}</Text>
                    <Image style={styles.icon} source={this.state.opener ? (item.set) ? images.refinedby_checked : images.refinedby_unchecked : null} />
                </TouchableOpacity>
                <View style={this.state.opener ? styles.lineH : null} />
            </View>
        )
    }
    renderFunctionForType = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => this.toOpen()} style={styles.flView}>
                    <Text style={styles.textCat}>{item.type}</Text>
                    <Image style={{ height: 7, width: 12, resizeMode: 'contain' }} source={images.dropdown_purple} />
                </TouchableOpacity>
                <View style={{ width: '100%', height: 1, backgroundColor: Colors.warmGrayTwo, opacity: 0.16, }} />
            </View>
        )
    }
    render() {
        return (
            <View>
                <View style={styles.topView}>
                    <View>
                        <AppButton
                            onClick={() => { this.toSetTheBox('refineBy') }}
                            Background={(this.state.selectorOfSort == 'refineBy') ? Colors.barney : Colors.white}
                            borderRadius={30}
                            paddinghor={35}
                            paddingver={10}
                            borderColor={(this.state.selectorOfSort == 'refineBy') ? null : Colors.barney}
                            borderWidth={(this.state.selectorOfSort == 'refineBy') ? null : 1}
                            M_Ver={16}
                            title={'Refine By'}
                            fontSize={24}
                            textolor={(this.state.selectorOfSort == 'refineBy') ? Colors.white : Colors.barney}
                            fontFamily={Fonts.Candarab}
                        />
                    </View>
                    <View>
                        <AppButton
                            onClick={() => { this.toSetTheBox('sortBy') }}
                            Background={(this.state.selectorOfSort == 'sortBy') ? Colors.barney : Colors.white}
                            borderRadius={30}
                            paddinghor={45}
                            paddingver={10}
                            borderColor={(this.state.selectorOfSort == 'sortBy') ? null : Colors.barney}
                            borderWidth={(this.state.selectorOfSort == 'sortBy') ? null : 1}
                            M_Ver={16}
                            title={'Sort By'}
                            fontSize={24}
                            textolor={this.state.selectorOfSort == 'sortBy' ? Colors.white : Colors.barney}
                            fontFamily={Fonts.Candarab}
                        />
                    </View>
                </View>
                <View>
                    <FlatList
                        keyExtractor={(item) => item.id}
                        extraData={this.state}
                        data={(this.state.selectorOfSort == 'sortBy') ? null : this.state.listOfFilter}
                        renderItem={(this.state.selectorOfSort == 'sortBy') ? null : this.renderFunctionForType} />

                    <FlatList
                        extraData={this.state}
                        keyExtractor={(item) => item.id}
                        data={(this.state.selectorOfSort == 'sortBy') ? this.state.listOfCategoriesNew : this.state.listOfCategories}
                        renderItem={(this.state.selectorOfSort == 'sortBy') ? this.renderFunctionOfSortBy : this.renderFunctionRefine} />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    topView: { flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between', marginTop: 15 },
    img: { width: 150, height: 150, resizeMode: 'contain', marginVertical: 15, paddingTop: 15 },
    texttop: { fontSize: 35, lineHeight: 38, fontFamily: Fonts.Candarab, color: Colors.barney },
    icon: { width: 21, height: 20, resizeMode: 'contain' },
    flView: { flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 5, alignItems: 'center' },
    textCat: { flex: 0.98, fontSize: 16, lineHeight: 48, fontFamily: Fonts.Candarab, color: Colors.darkishPurple },
    lineH: { width: '100%', height: 1, backgroundColor: Colors.warmGrayTwo, opacity: 0.16, }
})