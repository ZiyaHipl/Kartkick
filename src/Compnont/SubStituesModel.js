import React, { Component } from 'react'
import { Text,Modal, View, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native'
import Colors from './Colors'
import Fonts from './Fonts';
import images from './ImagePath'
import AppButton from './AppButton';
export default class SubStituesModel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    renderModalList = ({ item }) => {
        return (
          <View>
            <TouchableOpacity onPress={() => {  this.props.selectItem(item.store); }}  style={{ paddingHorizontal: 21,  alignItems: "center", flexDirection: "row",borderBottomColor:'grey',borderBottomWidth:0.5, }}  >
              <Image   style={styles.radioIcon} source={this.props.iselectStore == item.store.id ? images.radiobutton_checked: images.radio_button }  />
              <Text style={ this.props.iselectStore == item.store.id? styles.radioActiveTxt: styles.radioUnactiveTxt } > {item.store.name}  </Text>
            </TouchableOpacity>
            {/* {item.boderModal == false && ( <View style={{ backgroundColor: Colors.pinkishGreyTwo, height: 0.5 }} ></View>  )} */}
          </View>
        );
      };

    render() {
        return (
            <Modal
            animationType="slide"
            transparent={true}
            visible={this.props.modalVisible}
          >
            <View style={styles.modalContainView}>
              <View style={styles.modalView}>
                {/* <TouchableOpacity  style={{ alignSelf: "flex-end", marginRight: 10,marginTop:10, }} onPress={() => {  this.pr.heideModal();  }}   >
                  <Image style={styles.iconClose} source={images.close} />
                </TouchableOpacity> */}
    
                <Text style={[styles.txtSorting,{marginTop:10,}]}>{`Previously selected subsititues`}</Text>
    
                {/* <FlatList
                  showsVerticalScrollIndicator={false}
                  style={{ marginTop: 10 }}
                  data={this.props.item}
                  renderItem={this.renderModalList}
                  extraData={this.state}
                  keyExtractor={(item, index) => index.toString()}
                /> */}
                {this.props.itemModal==''&&
                <ActivityIndicator animating={true} size="large" color={'#000'} />}
    
    
                <View style={{ marginTop: 20 }}>
                  <AppButton
                    onClick={() => { this.props.onClick}}
                    Background={Colors.barney}
                    borderRadius={30}
                    paddingver={15}
                    // M_Hor={80}
                    M_Ver={0}
                    title={"Submit"}
                    fontSize={18}
                    textolor={"white"}
                    fontFamily={Fonts.Candara}
                  />
                </View>
              </View>
            </View>
          </Modal>
        )
    }
}

const styles = StyleSheet.create({
    modalContainView: { flex: 1, justifyContent: "center", backgroundColor: "#ffffffe0",  },
    modalView: { backgroundColor: "white",  borderColor: Colors.barney, borderWidth: 1,  borderRadius: 20,  paddingVertical: 6,  marginHorizontal: 30, },
    modalViewSubstitues: {  backgroundColor: "white",  borderColor: Colors.wormGray,  borderWidth: 1,  borderRadius: 24,  marginHorizontal: 16,  },
    iconClose: { width: 28, height: 28, resizeMode: "contain" },
    txtSorting: {  fontFamily: Fonts.Candarab,  fontSize: 15, color: Colors.barney,  marginTop: -10,  alignSelf: "center", },
    radioActiveTxt: { fontSize: 16,  fontFamily: Fonts.Candara, color: Colors.barney, marginLeft: 12,  paddingVertical: 12, },
    radioUnactiveTxt: {  fontSize: 16,  fontFamily: Fonts.Candara,  color: Colors.greyishPurple,  marginLeft: 12,  paddingVertical: 12, },
    radioIcon: { width: 22, height: 22, resizeMode: "contain" },
    

})