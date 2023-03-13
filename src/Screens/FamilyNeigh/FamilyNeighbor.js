import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Colors from "../../Compnont/Colors";
import Fonts from "../../Compnont/Fonts";
import images from "../../Compnont/ImagePath";
import Swipeout from "react-native-swipeout";
import AppHeader from "../../Compnont/AppHeader";
import Family from "./Compnont/Family";
import Neighbor from "./Compnont/Neighbor";
import Helper from "../../Lib/Helper";
import ApiUrl from "../../Lib/ApiUrl";

export default class FamilyNeighbor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: true,
      noDataFound:false,
      listFamily: [
        // { id: 1, img: images.addconnecion_3, name: "Kate Mitchel", active: false },
        // { id: 2, img: images.addconnecion_4, name: "Michele Harrison", active: false },
        // { id: 3, img: images.addconnection_1, name: "Anne Moris", active: false },
        // { id: 4, img: images.family_1, name: "Maggy Olson", active: false },
        // { id: 5, img: images.addconnection_1, name: "Kate Mitchel", active: false },
        // { id: 6, img: images.addconnecion_3, name: "Michele Harrison", active: false },
        // { id: 7, img: images.addconnecion_4, name: "Anne Moris", active: false },
        // { id: 8, img: images.addconnection_1, name: "Maggy Olson", active: false },
      ],
      makeadmin:"",
      isChanged:false,
      listNeighbor: [
        // { id: 1, img: images.addconnecion_3, name: "Kate Mitchel" },
        // { id: 2, img: images.addconnecion_4, name: "Michele Harrison" },
        // { id: 3, img: images.addconnection_1, name: "Anne Moris" },
        // { id: 4, img: images.family_1, name: "Maggy Olson" },
        // { id: 5, img: images.addconnection_1, name: "Kate Mitchel" },
        // { id: 6, img: images.addconnecion_3, name: "Michele Harrison" },
        // { id: 7, img: images.addconnecion_4, name: "Anne Moris" },
        // { id: 8, img: images.addconnection_1, name: "Maggy Olson" },
      ],
      familyBtn: true
    };
    AppHeader({
      ...this,
      leftHeide: false,
      logo: false,
      leftIcon: images.back,
      leftClick: () => {
        this.goBack();
      },
      title: "Family & Neighbor",
      rightIcon: images.menu,
      rightClick: () => { this.goAccount() }
    });
  }

  componentDidMount(){
    this.GetFamilylist();
  }

  GetFamilylist = (item) => {
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.GetFamilyList, method: "GET", data: '' }).then((response) => {
      Helper.hideLoader()
      console.log("GetFamilyList======================>>>>>>>>>>", response);
      if (response.status) {
        Helper.hideLoader()
        this.setState({listFamily:response.data,noDataFound:true})
        console.log('listFamilylistFamilylistFamily',this.state.listFamily)
      } else {
        Helper.hideLoader()
      }
    });
  } 

  Getneighbourlist = () => {
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.GetneighbourList, method: "GET", data: '' }).then((response) => {
      Helper.hideLoader()
      console.log("GetneighbourList======================>>>>>>>>>>", response);
      if (response.status) {
        console.log("success syncedContact response=============", response); 
        Helper.hideLoader()
        this.setState({listNeighbor:response.data})
        console.log('GetneighbourListGetneighbourList',this.state.listNeighbor)
      } else {
        Helper.hideLoader()
      }
    });
  } 

  makeAdmin=(item,value)=>{
    console.log('makeadminmakeadmin',item)
    Helper.showLoader()
    let data={
      makeadmin :item.makeadmin,
    }
    Helper.makeRequest({ url: ApiUrl.updateAdmin+item.id+'/', method: "PATCH", data: data }).then((response) => {
      Helper.hideLoader()
      console.log("GetneighbourList======================>>>>>>>>>>", response);
      if (response.status) {
        console.log("success=============", response);
         Helper.showToast(response.message)
        Helper.hideLoader()
      } else {
        Helper.hideLoader()
      }
    });
  }


  connectUser=(item)=>{
    Helper.showLoader()
    let data={
      connect :item.connect ? 0:1
    }
    Helper.makeRequest({ url: ApiUrl.updateAdmin+item.id+'/', method: "PATCH", data: data }).then((response) => {
      Helper.hideLoader()
      console.log("GetneighbourList======================>>>>>>>>>>", response);
      if (response.status) {
        console.log("success=============", response); 
        Helper.showToast(response.message)
        Helper.hideLoader()
      } else {
        Helper.hideLoader()
      }
    });
  }

  familyDeactive = (ind, value) => {
    var listData = this.state.listFamily 
    var newArray = []
    listData.map((item, index) => {
      if (index == ind) {
        item.makeadmin = value
        newArray.push(item)
        this.makeAdmin(item,value)
      } else {
        newArray.push(item)
      }
    })

    this.setState({ listFamily: newArray }, () => {
    })
  }

  goAccount = () => {
    this.props.navigation.navigate('MyAccount')
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  onChange = (item,index) => {
      Helper.confirmPopUp(item.connect?"Are you sure you want to disconnect":'Are you sure you want to connect.', (index) => {
        if (index) {
          this.connectUser(item)
          item.connect = !item.connect;
          this.setState({isChanged: !this.state.isChanged})
        }
      });
  };



  DeleteFamilylistitem = (item) => {
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.deleteFamilylist+item.id+'/', method: "DELETE", data: '' }).then((response) => {
      Helper.hideLoader()
      console.log("GetneighbourList======================>>>>>>>>>>123", response);
      if (response.status) {
        this.Getneighbourlist()
        this.GetFamilylist()
        Helper.hideLoader()
      } else {
        Helper.hideLoader()
      }
    });
  } 

  viewFamily() {
    return (
      <View style={{ flex: 1 }}>
        { this.state.listFamily.length > 0 || this.state.noDataFound==false ?
          <FlatList
            style={{ marginTop: 24 }}
            showsVerticalScrollIndicator={false}
            data={this.state.listFamily}
            extraData={this.state}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => 
            <Family
              onPress={()=>{this.DeleteFamilylistitem(item)}}
              item={item}
              index={index}
              familyDeactive={this.familyDeactive}
            />}
          />:
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
            <Text style={{color:Colors.barney,fontFamily:Fonts.Candarab}}>No Data Found</Text>
          </View>}
      </View>
    );
  }


  viewNeighbor() {
    return (
      <View style={{ flex: 1, }}>
        { this.state.listNeighbor.length > 0 || this.state.noDataFound ==false?
        <FlatList
          style={{ marginTop: 24 }}
          showsVerticalScrollIndicator={false}
          data={this.state.listNeighbor}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) =>
           <Neighbor 
            onPress={()=>{this.DeleteFamilylistitem(item)}}
            item={item}
            index={index}
            onChange={()=>{this.onChange(item,index)}}
          />}
          />:
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}> 
            <Text style={{color:Colors.barney,fontFamily:Fonts.Candarab}}>No Data Found</Text>
          </View>}
      </View>
    );
  }

  addMamber = () => {
    this.props.navigation.navigate("AddMember");
  };

  onFamilylist=()=>{
    this.state.noDataFound = false;
    this.setState({activeTab:true})
    this.GetFamilylist()
  }

  onNeigbourlist=()=>{
    this.state.noDataFound = false;
    this.setState({activeTab:false})
    this.Getneighbourlist()
  }
  render() {
    return (
      <View style={styles.viewMain}>
        <TouchableOpacity
          onPress={() => {
            this.addMamber();
          }}
          style={styles.haderView}
        >
          <Image
            style={{ width: 25, height: 16, resizeMode: "contain" }}
            source={images.addmember}
          />
          <Text style={styles.txtHaderView}>Add Member</Text>
        </TouchableOpacity>

        <View
          style={{ alignSelf: "center", flexDirection: "row", marginTop: 15 }}
        >
          <TouchableOpacity
            onPress={() => this.onFamilylist()}
            style={
              this.state.activeTab == true
                ? styles.activeView
                : styles.unactiveView
            }
          >
            <Text
              style={
                this.state.activeTab == true
                  ? styles.activeText
                  : styles.unactiveText
              }
            >
              Family
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onNeigbourlist()}
            style={
              this.state.activeTab == false
                ? styles.activeView
                : styles.unactiveView
            }
          >
            <Text
              style={
                this.state.activeTab == false
                  ? styles.activeText
                  : styles.unactiveText
              }
            >
              Neighbor
            </Text>
          </TouchableOpacity>
        </View>
        {this.state.activeTab ? this.viewFamily() : this.viewNeighbor()}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  viewMain: { flex: 1, backgroundColor: Colors.white },
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
