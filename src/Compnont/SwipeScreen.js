import React, { Component } from 'react';
import { Animated, StyleSheet, View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Config from '../Lib/Config';
import Colors from './Colors';
import Fonts from './Fonts';
import images from './ImagePath';

export default class SwipeScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {


        }
    }

    renderLeftActions = (progress, dragX) => {
        return (
            <RectButton style={styles.leftAction} onPress={()=>this.props.onPressSubSittues}>
                <TouchableOpacity
                    onPress={() => {  this.props.showModalSelected();  }} style={styles.slideBttnviewLeft} >
                    <Image style={styles.removeIcon} source={images.subtitutes} />
                    <Text style={styles.removeText}>Substitutes</Text>
                </TouchableOpacity>
            </RectButton>
        );
    };
    renderRightActions = () => {
        return (
            <RectButton style={styles.rightAction} onPress={this.close}>
                <TouchableOpacity onPress={() => {this.props.Remove('ok') }} style={styles.slideBttnview}>
                    <Image style={styles.removeIcon} source={images.remove} />
                    <Text style={styles.removeText}>Remove {"\n"} Item</Text>
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
        const { item,index } = this.props
        console.log('neigboulist123',item)
        return (
            <View style={{flex:1,marginHorizontal:15}}>
                <Swipeable
                ref={this.updateRef}
                friction={1}
                renderLeftActions={this.renderLeftActions}

                renderRightActions={({item, index})=> <RectButton style={styles.rightAction} onPress={this.close}>
                <TouchableOpacity 
                // onPress={() =>  this.props.Remove(this.props.item)}
                 style={styles.slideBttnview}>
                    <Image style={styles.removeIcon} source={images.remove} />
                    <Text style={styles.removeText}>Remove {"\n"}   Item</Text>
                </TouchableOpacity>
                </RectButton>}

                overshootLeft={false}
                onSwipeableOpen={()=>{}}
                >
                <TouchableOpacity
                //  onPress={() => { this.props.Product(item, index); }}
                   style={[styles.mainView21, { marginLeft: !item.isOpeen ? 0 : 15, marginRight: !item.isOpeen ? 0 : 15,  }, ] } >
                    
                    <View>
                        <Image style={[styles.icon2, {marginRight:10}]} source={{ uri: Config.baseImgurl +item.items?.image}} />
                    </View>
                    <View style={{ flex: 1, marginLeft: 5 }}>
                        <Text style={[styles.textType1, {marginTop:5}]}>{item.items?.sub_category} </Text>

                        {/* <View style={{ flexDirection: "row", marginTop: 5 }}>
                            <Image style={styles.storeIcon} source={images.wallmart_purple} />
                            <Text style={styles.textStore}>{item. .sub_category}</Text>
                        </View> */}
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}>
                            <TouchableOpacity hitSlop={{top: 30, bottom: 30, left: 30, right: 30 }} 
                            // onPress={() => { this.props.decrement(item, index); }}
                              >
                                 <Image style={styles.touch2} source={images.minus} />
                            </TouchableOpacity>
                            <Text style={styles.number2}>{item?.quantity}</Text>
                            <TouchableOpacity hitSlop={{top: 30, bottom: 30, left: 30, right: 30 }}  
                            // onPress={() => { this.props.increment(item, index); }}
                             >
                                <Image style={styles.touch2} source={images.plus} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <ImageBackground style={styles.ImageBack} source={images.ribbon}>
                            <Text style={{ marginTop: 3, alignSelf: "center", fontSize: 16, lineHeight: 20,  color: Colors.white, }}  >
                                {item.items?.price ?  (Number(item?.quantity) * Number(item.items?.price)).toFixed(2):0 }
                            </Text>
                        </ImageBackground>
                        <TouchableOpacity hitSlop={{top: 30, bottom: 30, left: 30, right: 30 }} 
                        // onPress={() => { this.props.neighbour_private(item,index)}} 
                        >
                          <Image style={[styles.lockIcon,{tintColor:item.is_private? Colors.purple :Colors.pinkishGrey }]} source={images.lock} />
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Swipeable>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    leftAction: { flex: .2, },
    actionIcon: {  width: 30,  marginHorizontal: 10, },
    rightAction: {  flex: .2, },
    topView: { flexDirection: "row", justifyContent: "space-between",  alignItems: "center",  marginTop: 15,  paddingHorizontal: 17, },
    IconTop: { width: 20, height: 20, resizeMode: "contain" },
    mainView1: { flexDirection: "row",  backgroundColor: "rgb(255,255,255)", borderRadius: 10,  paddingHorizontal: 10,  paddingVertical: 5,   marginRight: 15,   },
    icon1: { width: 70, height: 80, resizeMode: "contain" },
    textType: {  fontSize: 10,  lineHeight: 10,  marginTop: 8,  color: "rgb(77,77,77)",  },
    textPrice: {  marginTop: 5, fontSize: 12, lineHeight: 10,  color: "rgb(77,77,77)",   fontFamily: Fonts.Candarab,  },
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
        marginTop: 10,
    },
    textPantry: {
        marginTop: 16,
        paddingHorizontal: 17,
        fontSize: 14,
        lineHeight: 17,
        color: Colors.barney,
        fontFamily: Fonts.Candarab,
    },
    FL1: {
        flexDirection: "row",
        marginTop: 20,
        backgroundColor: "rgb(248,248,248)",
        paddingHorizontal: 17,
        paddingVertical: 20,
    },
    textHouseHold: {
        fontSize: 12,
        lineHeight: 14,
        color: Colors.darkishPurple,
        fontFamily: Fonts.Candarab,
    },
    textNeighbour: {
        fontSize: 12,
        lineHeight: 14,
        color: "rgb(160,87,206)",
        fontFamily: Fonts.Candarab,
    },
    textType1: { fontSize: 12, lineHeight: 12, color: Colors.indigo },
    textStore: { fontSize: 12, lineHeight: 12, color: "rgb(88,88,88)" },
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
        marginHorizontal: 28,
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
    radioActiveTxt: {
        fontSize: 16,
        fontFamily: Fonts.Candara,
        color: Colors.barney,
        marginLeft: 12,
        paddingVertical: 12,
    },
    radioUnactiveTxt: {
        fontSize: 16,
        fontFamily: Fonts.Candara,
        color: Colors.greyishPurple,
        marginLeft: 12,
        paddingVertical: 12,
    },
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