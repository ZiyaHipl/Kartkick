import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'
import AppHeader from '../Compnont/AppHeader';
import Colors from '../Compnont/Colors'
import Fonts from '../Compnont/Fonts';
import images from '../Compnont/ImagePath'
import Helper from '../Lib/Helper'

export default class Pantry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfCategoriesNew: [
                { id: 1, img: images.searchresults_11, type: 'Organic Wine Tomatoes', demand: '4.40', avail: '2.20', availability: 'Available' },
                { id: 2, img: images.previouslyselected_1, type: 'Red Onions', demand: '8.80', notAvail: '0',  status:'Depleted'},
                { id: 3, img: images.previouslyselected_2, type: 'Dutch oven potatoes', demand: '2.20',  avail:'4.40',availability: 'Available' },
            ],
        }
        AppHeader({
            ...this,
            logo: false,
            leftIcon: images.back,
            leftClick: () => {
              this.goBack();
            },
            title: "Pantry",
            rightIcon: images.menu,
            rightClick: () => {this.onMenu()},
          });
    }

    onMenu=()=>{
        this.props.navigation.navigate('MyAccount')
    }

    goBack=()=>{
        this.props.navigation.goBack()
    }

    _adItem = () => {
        Helper.confirmPopUp("Added Item", (status) => {
            if (status) {
                this.props.navigation.navigate('ShoppingTab')
            }
        });
    }

    renderFunctionForType = ({ item }) => {
        return (
            <View style={styles.flView}>
                <View style={{alignItems:'center',justifyContent:'center'}} >
                    <Image style={styles.img} source={item.img} />
                    <TouchableOpacity onPress={()=>{this._adItem()}}  style={styles.addIcon}>
                        <Image style={{ width: 17, height: 17, resizeMode: 'contain',  }} source={images.add_square} />
                    </TouchableOpacity>
                </View>
                <View style={{flex:0.9,marginTop:15 ,marginLeft:10,}}>
                    <Text style={styles.textCat}>{item.type}</Text>
                    { item.availability ? <Text style={  styles.textCat2}>{item.availability}</Text> : null}
                    { item.status ? <Text style={styles.textCat3}>{item.status}</Text> : null}
                </View>
                <View style={{marginTop:15}}>
                    <Text style={styles.textCat}>{item.demand}Lbs</Text>
                    { item.avail ? <Text style={styles.textCat2}>{item.avail}Lbs</Text> : null}
                    {item.notAvail ? <Text  style={styles.textCat3}>{item.notAvail}Lbs</Text> : null}
                </View>
            </View>
        )
    }
    render() {
        return (
            <View style={styles.topView}>
                <View style={styles.view2}>
                    <Text style={styles.textPur} >Purchased</Text>
                    <Text style={styles.textTime}>Last purchased 10 Dec 2020</Text>
                </View>
                <FlatList style={styles.view1}
                    extraData={this.state}
                    keyExtractor={(item) => item.id}
                    data={this.state.listOfCategoriesNew}
                    renderItem={this.renderFunctionForType} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    img: { width: 80, height: 80, resizeMode: 'contain', borderRadius:10 },
    view1: { marginHorizontal: 16, marginTop: 15 },
    view2: { marginHorizontal: 18, marginTop: 20, },
    topView: { flex:1,backgroundColor:Colors.white },
    textPur: { fontSize: 18, lineHeight: 19, fontFamily: Fonts.Candarab, color: Colors.barney },
    textTime: { fontSize: 14, lineHeight: 19, fontFamily: Fonts.Candara, color: Colors.warmGreyThree },
    textCat: { fontSize:12, lineHeight:12, fontFamily: Fonts.Candarab, color: Colors.indigo },
    textCat2: { fontSize:12, lineHeight:12, fontFamily: Fonts.Candarab,marginTop:10,color:Colors.frogGreen },
    textCat3:{color:Colors.rustyRed,fontSize:12, lineHeight:12, fontFamily: Fonts.Candarab,marginTop:10 },
    flView: { flexDirection: 'row', borderWidth: 1, borderRadius: 14, borderColor: Colors.white2,marginBottom:10},
    textCat: { fontSize:12, lineHeight:12, fontFamily: Fonts.Candarab, color: Colors.darkishPurple },
    addIcon:{position:'absolute', top:20, right:12, }
})