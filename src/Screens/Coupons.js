import React, { Component } from 'react'
import { Text, View, TouchableOpacity, FlatList, StyleSheet, Image, Modal } from 'react-native'

import Colors from '../Compnont/Colors'
import Fonts from '../Compnont/Fonts';
import images from '../Compnont/ImagePath'
import AppButton from '../Compnont/AppButton'
export default class Coupons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfAdderss: [
                { icon: images.couponscan, text: 'KFC', value: ' 10', dollor: '$', cop: ' Coupon', botm: 'Valid until  Dec31st 2020', selectCupns: false },
                { icon: images.couponscan, text: 'Starbucks', value: ' 15', dollor: '$', cop: ' Coupon', botm: 'Valid until  Dec14th 2021', selectCupns: false },
            ],
            modalVisible: false,
        }
    }

    onSelectCupns = (index) => {
        let selected = [...this.state.listOfAdderss]
        selected[index].selectCupns = !selected[index].selectCupns
        this.setState({ listOfAdderss: selected })
    }

    showModal() {
        this.setState({ modalVisible: true })
    }

    heideModal() {
        this.setState({ modalVisible: false })
    }

    renderModal() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}>

                <View style={styles.modalContainView}>
                    <View style={styles.modalView}>
                        <Text style={styles.txtQrCode}>Align the QR Code with in{'\n'}Frame to scan</Text>
                        <View style={styles.qrCodeBackground}>
                            <Image style={{ width: "100%", height: 220, resizeMode: 'contain' }} source={images.QR_code} />
                        </View>
                    </View>
                    <AppButton
                        onClick={() => { this.heideModal() }}
                        Background={Colors.barney}
                        borderRadius={30}
                        paddingver={18}
                        M_Hor={40}
                        M_Ver={14}
                        title={"Cancel Scanning"}
                        fontSize={12}
                        textolor={"white"}
                        fontFamily={Fonts.Candarab}
                    />
                </View>
            </Modal>
        )
    }


    itemToRender = ({ item, index }) => {
        return (
            <View style={styles.listView}>
                <TouchableOpacity onPress={() => { this.showModal() }} style={styles.view1}>
                    <Image style={styles.barCode} source={item.icon} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.textkfc}>{item.text}</Text>
                    <Text style={styles.textdol}>{item.dollor}<Text style={styles.textval}>{item.value}</Text > {item.cop} </Text>
                    <Text style={styles.textbot}>{item.botm}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                    <TouchableOpacity onPress={() => { this.onSelectCupns(index) }}>
                        <Image style={[styles.icons, { right: 10 }]} source={item.selectCupns ? images.fav_dark : images.fav_purple} />
                    </TouchableOpacity>
                    <Image style={styles.icons} source={images.cart_purple} />
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <View >
                    <FlatList
                        data={this.state.listOfAdderss}
                        renderItem={this.itemToRender} />
                </View>

                {this.renderModal()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: Colors.white
    },
    topView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 16,
    },
    listView: {
        flexDirection: "row",
        borderRadius: 14,
        marginHorizontal: 16,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 18,
        borderWidth: 0.5,
        borderColor: Colors.grayish, marginBottom: 1, justifyContent: 'space-between'
    },
    view1: {
        width: 75,
        height: 75,
        borderRadius: 13,
        borderWidth: 1,
        padding: 5,
        borderColor: Colors.pinkishGreyTwo
    },
    barCode: {
        width: 65,
        height: 65,
        resizeMode: 'contain'
    },
    textkfc: {
        fontSize: 18,
        color: Colors.purplishGreyTwo,
        fontFamily: Fonts.Candarab,
    },
    textdol: {
        fontSize: 18,
        color: Colors.purplishGreyTwo,
        fontWeight: 'bold',
        marginTop: -5
    },
    textval: {
        fontSize: 38,
        color: Colors.purplishGreyTwo,
        fontWeight: 'bold'
    },
    textbot: {
        fontSize: 12,
        color: Colors.purplishGreyTwo,
        fontFamily: Fonts.Candarab,
    },
    modalContainView: { flex: 1, justifyContent: 'center', backgroundColor: '#ffffffe8' },
    modalView: { backgroundColor: 'white', borderColor: Colors.barney, borderWidth: 1, borderRadius: 30, paddingVertical: 24, marginHorizontal: 40, },
    txtQrCode: { fontFamily: Fonts.Candarab, fontSize: 14, color: Colors.barney, textAlign: 'center' },
    qrCodeBackground: { backgroundColor: Colors.white, padding: 30, marginHorizontal: -1 },
    icons: { height: 25, width: 25, resizeMode: 'contain' }
})