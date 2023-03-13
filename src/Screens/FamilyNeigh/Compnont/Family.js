import React, { Component } from 'react';
import { Animated, StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Colors from '../../../Compnont/Colors';
import Fonts from '../../../Compnont/Fonts';
import images from '../../../Compnont/ImagePath';

export default class Family extends Component {

    constructor(props) {
        super(props);
        this.state = {


        }
    }

    // renderLeftActions = (progress, dragX) => {
    //     return (
    //         <RectButton style={styles.leftAction} onPress={this.close}>
    //             <Text>00000</Text>
    //         </RectButton>
    //     );
    // };
    renderRightActions = (progress, dragX) => {

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
        console.log('makeadminmakeadminmakeadmin',item)
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
                        <View style={{ flexDirection: "row", alignSelf: "center" }}>
                            <TouchableOpacity onPress={() => { this.props.familyDeactive(index, true) }} style={[styles.touch1, { backgroundColor: (item.makeadmin) ? 'rgb(142,33,209)' : '#fff' }]}>
                                <Text style={(item.makeadmin) ? styles.textMakeAdmin : styles.textMakeAdminAct}>Make Admin</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { this.props.familyDeactive(index, false) }} style={[styles.touch2, { backgroundColor: (item.makeadmin) ? '#fff' : 'rgb(142,33,209)' }]}>
                                <Text style={(item.makeadmin) ? styles.textDeactivate : styles.textDeactivateAct}>Deactivate</Text>
                            </TouchableOpacity>
                        </View>
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
      textCat: {
        flex: 1,
        alignSelf: "center",
        fontSize: 14,
        fontFamily: Fonts.Candarab,
        color: Colors.bruise,
        marginLeft: 7,
      },
      touch1: {
        borderRadius: 17,
        borderColor: Colors.barney,
        borderWidth: 1,
        paddingVertical: 5,
        paddingHorizontal: 8,
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
      removeIcon: { height: 17, width: 15, resizeMode: "contain" },
      removeText: {
        fontSize: 10,
        fontFamily: Fonts.Candara,
        color: Colors.white,
        top: 3,
      },
});