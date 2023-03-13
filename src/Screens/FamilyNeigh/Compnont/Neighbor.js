import React, { Component } from 'react';
import { Animated, StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Colors from '../../../Compnont/Colors';
import Fonts from '../../../Compnont/Fonts';
import images from '../../../Compnont/ImagePath';
import ApiUrl from '../../../Lib/ApiUrl';
import Helper from '../../../Lib/Helper';

export default class Neighbor extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    renderRightActions = (progress, dragX,item) => {

        return (
            <RectButton style={styles.rightAction} onPress={this.close}>
                <TouchableOpacity onPress={() => {this.props.onPress()}} style={styles.slideBttnview}>
                    <Image style={styles.removeIcon} source={images.remove} />
                    <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
            </RectButton>
        );
    };


    
    updateRef = ref => {
        this._swipeableRow = ref;
    };
    close = () => {
        this._swipeableRow.close();
    };

    render() {
        const { item, index } = this.props
        console.log('12312312121',item)
        return (
            <View style={{ flex: 1, marginHorizontal: 15 }}>
                <Swipeable
                    ref={this.updateRef}
                    friction={1}
                    // renderLeftActions={this.renderLeftActions}
                    renderRightActions={this.renderRightActions}>
                    <View
                        style={
                            [
                                styles.mainView21,
                                {
                                    marginLeft: !item.isOpeen ? 0 : 15,
                                    marginRight: !item.isOpeen ? 0 : 15,
                                },
                            ]
                        }
                    >
                        <Image style={styles.img} source={item?.contact?.profile_image!=null ?item?.contact?.profile_image:images.Group_User} />
                        <Text style={styles.textCat}>{item?.contact?.name}</Text>

                        <TouchableOpacity
                            onPress={() => {
                                this.props.onChange(index);
                            }}
                            style={{ alignSelf: "center" }}
                        >
                            <Image
                                style={{ height: 30, width: 80, resizeMode: "contain" }}
                                source={ item.connect  ? images.connect1 : images.disconnect1}
                            />
                        </TouchableOpacity>
                    </View>
                </Swipeable>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    leftAction: {
        flex: .2,
    },
    rightAction: {
        flex: .2,
    },
    haderView: {
        flexDirection: "row",
        backgroundColor: Colors.barney,
        paddingVertical: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    txtHaderView: {
        color: Colors.white,
        fontSize: 18,
        fontFamily: Fonts.Candara,
        marginLeft: 10,
    },
    activeView: {
        flex: 1,
        backgroundColor: Colors.barney,
        borderRadius: 20,
        alignItems: "center",
        paddingVertical: 9,
        marginHorizontal: 15,
    },
    unactiveView: {
        flex: 1,
        borderColor: Colors.barney,
        borderWidth: 1,
        borderRadius: 20,
        alignItems: "center",
        paddingVertical: 9,
        marginHorizontal: 15,
    },
    activeText: { color: Colors.white, fontSize: 18, fontFamily: Fonts.Candarab, textAlign: 'center' },
    unactiveText: {
        color: Colors.barney,
        fontSize: 18,
        fontFamily: Fonts.Candarab,
        textAlign: 'center'
    },

    removeText: {
        fontSize: 10,
        fontFamily: Fonts.Candara,
        color: Colors.white,
        top: 3,
    },
    removeIcon: { height: 17, width: 15, resizeMode: "contain" },
    slideBttnviewLeft: {
        backgroundColor: Colors.pissYellow,
        paddingVertical: 30,
        marginTop: 17,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    mainView2: {
        borderWidth: 1,
        borderColor: Colors.pinkishGreyTwo,
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginBottom: 15,
        paddingVertical: 15,
        marginHorizontal: 17,
        paddingHorizontal: 10,
        elevation: 5,
    },
    mainView21: {
        borderWidth: 1,
        borderColor: Colors.pinkishGreyTwo,
        flexDirection: "row",
        borderRadius: 10,
        backgroundColor: Colors.white,
        marginBottom: 15,
        paddingVertical: 15,
        marginHorizontal: 17,
        paddingHorizontal: 10,
        elevation: 5,
    },
    slideBttnview: {
        backgroundColor: Colors.barney,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: 17,
    },

    img: { width: 32, height: 32, resizeMode: "contain" },
    flView: {
        flexDirection: "row",
        borderWidth: 1,
        borderRadius: 14,
        borderColor: Colors.white2,
        padding: 5,
        marginTop: 5,
    },
    textCat: {
        flex: 1,
        alignSelf: "center",
        fontSize: 14,
        fontFamily: Fonts.Candarab,
        color: Colors.bruise,
        marginLeft: 7,
    },
    textInvite: {
        fontSize: 12,
        lineHeight: 12,
        fontFamily: Fonts.Candara,
        alignSelf: "center",
    },
    touch1: {
        borderRadius: 17,
        borderColor: Colors.barney,
        borderWidth: 1,

        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    touch1Act: {
        borderRadius: 17,
        borderColor: Colors.barney,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    touch2: {
        marginLeft: 5,
        backgroundColor: Colors.white,
        borderColor: Colors.barney,
        borderRadius: 17,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    touch2Act: {
        marginLeft: 5,
        backgroundColor: Colors.white,
        borderColor: Colors.barney,
        borderRadius: 17,
        backgroundColor: Colors.barney,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    textMakeAdmin: {
        fontSize: 12,
        color: Colors.white,
        fontFamily: Fonts.Candarab,
    },
    textMakeAdminAct: {
        fontSize: 12,
        color: Colors.barney,
        fontFamily: Fonts.Candarab,
    },
    textDeactivate: {
        fontSize: 12,
        color: Colors.barney,
        fontFamily: Fonts.Candarab,
    },
    textDeactivateAct: {
        fontSize: 12,
        color: Colors.white,
        fontFamily: Fonts.Candarab,
    },
});