import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import Colors from '../Compnont/Colors'
import Fonts from '../Compnont/Fonts';
import images from '../Compnont/ImagePath'
import ApiUrl from '../Lib/ApiUrl';
import Helper from '../Lib/Helper';
import AppButton from './AppButton';
export default class NotifyNeighborPopup extends Component {
    constructor(props) {
        super(props);
        this.dataArray =[]
        this.state = {
            itemModal: [
                { imgNeighbor: images.neighbor_1, nameNeighbor: "Kate Mitchel", id: 1 },
                { imgNeighbor: images.neighbor_2, nameNeighbor: "Michele Harrison", id: 2 },
                { imgNeighbor: images.neighbor_3, nameNeighbor: "Anne Moris", id: 3 },
                { imgNeighbor: images.neighbor_4, nameNeighbor: "Maggy Olson", id: 4 },
            ],
            iselect: 1,
            array:[...this.dataArray],
            getList:this.props.route.params.datalist
        }
    }

    // componentDidMount(){
    //     if(this.state.getList ==""){
    //         alert('sdmnbfsm')
    //         return;
    //     }
    // }

    selectItem = (selectid) => {
        if (this.state.iselect == selectid){
            this.dataArray = this.state.array.slice(selectid)
            this.setState({iselect:'', array:this.dataArray});
        }
        else {
            this.state.array.push(selectid)
            this.setState({ iselect: selectid })
        }
    };

  sendRequest=()=>{
    // if(this.state.getList ==  ""){
    //     Helper.showToast('No Neighbor Available')
    //     return ; 
    // }
    if(this.state.array.length == 0){
        Helper.showToast('Select Neighbor First')
        return ;
  }
    Helper.showLoader()
    let data={
        Negibour_id :this.state.array
    }
    Helper.makeRequest({ url: ApiUrl.SendRequest, method: "POST", data: data }).then((response) => {
      Helper.hideLoader()
      console.log("GetneighbourList======================>>>>>>>>>>", response);
      if (response.status) {
        console.log("success=============", JSON.stringify(response)); 
        Helper.showToast(response.message)
        Helper.hideLoader()
      } else {
        Helper.hideLoader()
      }
    });
  }
    renderModalList = ({ item }) => {
        return (
            <View style={{}}>
                <TouchableOpacity
                    onPress={() => { this.selectItem(item.id); }}
                    style={{ alignItems: 'center', flexDirection: 'row', paddingVertical: 8 }} >

                    <Image
                        style={styles.imgNeighbor}
                        // source={item.imgNeighbor} 
                        source={images.Group_User}
                        />
                    <Text style={styles.txtNameNeighbor}>{item.first_name}</Text>
                    <Image
                        style={styles.radioIcon}
                        source={this.state.iselect == item.id ? images.mark_green : images.mark_purple} />
                </TouchableOpacity>

            </View>
        );
    };

    render() {
        return (
            <View style={styles.modalContainView}>
                <ScrollView style={{flex:1,marginTop:50,paddingBottom:30}}>
                    <View style={styles.modalView}>
                        <Text style={styles.txtNeighbor}>Which Neighbor do you{'\n'}wish to notify</Text>

                        <FlatList style={{ marginTop: 10 }}
                            data={this.state.getList}
                            renderItem={this.renderModalList}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />


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
                                    onClick={() => {this.sendRequest() }}
                                    Background={Colors.greenApple}
                                    borderRadius={30}
                                    paddingver={13}
                                    M_Hor={8}
                                    title={"Notify"}
                                    fontSize={18}
                                    textolor={"white"}
                                    fontFamily={Fonts.Candara}
                                />
                            </View>

                        </View>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modalContainView: { flex: 1, justifyContent: 'center', backgroundColor: '#ffffffe8' },
    modalView: { backgroundColor: 'white', elevation: 3, borderRadius: 20, padding: 22, marginHorizontal: 28,marginBottom:20 },
    txtNeighbor: { fontFamily: Fonts.Candarab, fontSize: 18, color: Colors.barney, textAlign: 'center' },
    imgNeighbor: { width: 56, height: 56, resizeMode: 'contain' },
    txtNameNeighbor: { flex: 1, fontFamily: Fonts.Candarab, fontSize: 14, color: Colors.bruise, marginLeft: 20 },
    radioIcon: { width: 18, height: 14, resizeMode: 'contain' }

})