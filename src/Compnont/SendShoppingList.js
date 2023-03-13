import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import Colors from '../Compnont/Colors'
import Fonts from '../Compnont/Fonts';
import images from '../Compnont/ImagePath'
import AppButton from './AppButton';
export default class NotifyNeighborPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {
        return (
            <View style={styles.modalContainView}>
                <View style={styles.modalView}>
                    <Text style={styles.txtNeighbor}>Your Neighbor Kate Michael{'\n'}is going to the store{'\n'}send your shopping list ?</Text>

                    <Image style={{ width: 110, height: 110, resizeMode: 'contain', marginTop:30, alignSelf:'center'}} source={images.neighbor_1}/>

                    <Text style={{fontSize:18,fontFamily:Fonts.Candarab,color:Colors.barney,marginTop:14,alignSelf:'center'}}>Kate Mitchel</Text>

                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <View style={{ flex: 1 }}>
                            <AppButton
                                onClick={() => { }}
                                Background={Colors.barney}
                                borderRadius={30}
                                paddingver={15}
                                M_Hor={8}
                                title={"No"}
                                fontSize={18}
                                textolor={"white"}
                                fontFamily={Fonts.Candara}
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <AppButton
                                onClick={() => { }}
                                Background={Colors.greenApple}
                                borderRadius={30}
                                paddingver={13}
                                M_Hor={8}
                                title={"Yes"}
                                fontSize={18}
                                textolor={"white"}
                                fontFamily={Fonts.Candara}
                            />
                        </View>

                    </View>

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalContainView: { flex: 1, justifyContent: 'center', backgroundColor: '#ffffffe8' },
    modalView: { backgroundColor: 'white', elevation: 3, borderRadius: 20, padding: 22, marginHorizontal: 28, marginBottom: 20 },
    txtNeighbor: { fontFamily: Fonts.Candarab, fontSize: 18, color: Colors.barney, textAlign: 'center' },
    imgNeighbor: { width: 56, height: 56, resizeMode: 'contain' },
    txtNameNeighbor: { flex: 1, fontFamily: Fonts.Candarab, fontSize: 14, color: Colors.bruise, marginLeft: 20 },
    radioIcon: { width: 18, height: 14, resizeMode: 'contain' }

})