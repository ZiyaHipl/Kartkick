import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";
import ApiUrl from "../Lib/ApiUrl";
import Config from "../Lib/Config";
import Helper from "../Lib/Helper";
import NetInfo from "@react-native-community/netinfo";

export default class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ContactsList: [
        // { id: 1, img: images.addconnecion_3, name: "", active: false },
        // { id: 2, img: images.addconnecion_4, name: "", active: false },
        // { id: 3, img: images.addconnection_1, name: "", active: false },
        // { id: 4, img: images.family_1, name: "", active: false },
        // { id: 5, img: images.addconnection_1, name: "", active: false },
        // { id: 6, img: images.addconnecion_3, name: "Michele Harrison", active: false },
        // { id: 7, img: images.addconnecion_4, name: "Anne Moris", active: false },
        // { id: 8, img: images.addconnection_1, name: "Maggy Olson", active: false },
      ],
      temdata: '',
      noDataFound: true,
      invite: [],
      datalength: [],
      syncedContact: [],
      syncedContactTem: []
    };

    AppHeader({
      ...this, leftHeide: false, logo: false, leftIcon: images.back,
      leftClick: () => { this.goBack(); }, title: "Add Connection", rightHide: true,
    });
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  addMember = (type, index, item) => {
    let ContactsList = [...this.state.ContactsList];
    console.log('ContactsListContactsList', ContactsList)
    ContactsList[index].invite_as = type;
    this.setState({ ContactsList });
    this.sendInvitaion(item, type)
  }

  sendInvitaion(item, type) {
    Keyboard.dismiss()
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        Helper.showToast(AlertMsg.error.INTERNET_CONNECTION);
        return false;
      } else {
        Helper.showLoader()
        Helper.makeRequest({ url: ApiUrl.Invitation + item.id + '/', method: "PUTUPLOAD", data: '' }).then((response) => {
          console.log('===>loginApi', JSON.stringify(response))
          if (response.status) {
            Helper.hideLoader()
            this.add_connection(item, type);
            Helper.showToast(response.message)
          }
          else {
            Helper.hideLoader()
            Helper.showToast(response.error_message);
          }
        }).catch(err => {
          this.hideLoader()
          console.log('catchcatchcatchcatchcatch')
        })
      }
    })
  }

  add_connection(item, type) {
    console.log('type12', type)
    Helper.showLoader()
    var data = {
      relation: type,
      contact: item.id
    }
    console.log('bodybodybodybody', data,)
    Helper.makeRequest({ url: ApiUrl.Add_connection, method: "POST", data: data }).then((response) => {
      console.log('===>Add_connectionAdd_connectionAdd_connection12', JSON.stringify(response.data))
      if (response.status) {
        Helper.hideLoader()
        Helper.showToast(response.message)
      }
      else {
        Helper.hideLoader()
        Helper.showToast(response.error_message);
      }
    }).catch(err => {
      this.hideLoader()
      console.log('catchcatchcatchcatchcatch')
    })
  }

  inviteUser = (item) => {
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.inviteSend + item.id + '/', method: "PATCH",}).then((response) => {
      if (response.status) {
        Helper.hideLoader()
        Helper.showToast(response.message)
      }
      else {
        Helper.hideLoader()
        Helper.showToast(response.error_message);
      }
    }).catch(err => {
      this.hideLoader()
      console.log('catchcatchcatchcatchcatch')
    })
  }

  searchText = (e) => {
    let text = e.toLowerCase()
    let trucks = this.state.syncedContactTem
    let filteredName = trucks.filter((item) => {
      return item.name.toLowerCase().match(text)
    })
    if (!text || text === '') {
    } else if (Array.isArray(filteredName)) {
      this.setState({
        syncedContact: filteredName
      })
      this.state.noDataFound = true;
      if (filteredName.length == 0) {
        this.state.noDataFound = false;
      }

    }

  }
  renderFunctionForType = ({ item, index, }) => {
    return (
      <View style={styles.flView}>
        {/* <View>
          <Image style={styles.img} source={images.profile_gray} />
        </View> */}
        <View style={{ flex: 0.98, padding: 5, justifyContent: "center" }}>
          <Text style={styles.textCat}>{item.name}</Text>
        </View>
        <View style={{ marginTop: 5 }}>
          {item.invite.status == "REQUESTED" &&
            <Text style={{ paddingVertical: 7 }}>{item.invite.status}</Text>}
          {item.already_in_app == false &&
            <TouchableOpacity onPress={() => this.inviteUser(item)} style={{ borderWidth: 1, borderColor: Colors.barney, paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20 }}>
              <Text style={styles.textN}>Invite</Text>
            </TouchableOpacity>}
          {item.already_in_app == true && item.invite.status != "REQUESTED" &&
            <View>
              <Text style={styles.textInvite}>Invite as a</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  onPress={() => { this.addMember("Family", index, item) }}
                  style={[styles.touch1, { backgroundColor: (item.invite_as == "Family") ? 'rgb(142,33,209)' : '#fff' }]}>
                  <Text style={[styles.textF, { color: (item.invite_as == "Family") ? '#fff' : 'rgb(142,33,209)' }]}>Family</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => { this.addMember("Neighbour", index, item) }}
                  style={[styles.touch2, { backgroundColor: (item.invite_as == "Neighbour") ? 'rgb(142,33,209)' : '#fff' }]}>
                  <Text style={[styles.textN, { color: (item.invite_as == "Neighbour") ? '#fff' : 'rgb(142,33,209)' }]}>Neighbor</Text>
                </TouchableOpacity>
              </View>
            </View>}
          {/* } */}
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.searchView, { justifyContent: "center" }]}>
          <TextInput style={{ paddingLeft: 15, color: Colors.barney, fontSize: 14, }}
            placeholder="Search"
            placeholderTextColor={Colors.barney}
            onChangeText={this.searchText.bind(this)}
            // onChangeText={(text) => { this.setState({ search: text }) }}
            value={this.state.search}
          />
        </View>
        {this.state.noDataFound == false &&
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: Colors.barney, fontSize: 18, fontWeight: 'bold' }}>Not Found</Text>
          </View>}
        <View style={{ flex: 1, marginTop: 20 }}>
          <FlatList
            style={styles.view1}
            extraData={this.state}
            keyExtractor={(item) => item.id}
            data={this.state.syncedContact ? this.state.syncedContact : this.state.ContactsList}
            // data={this.state.ContactsList}
            renderItem={this.renderFunctionForType}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    );
  }

  componentDidMount = () => {
    this.getAllContacts()
  }
  getAllContacts = (data) => {
    Helper.checkContactsPremission((status) => {
      if (status) {
        console.log("statusstatusstatus", status)
        Helper.getAllContacts(data, (contacts) => {
          this.setState({ ContactsList: contacts }, () => {
            console.log('==>ContactsList', JSON.stringify(this.state.ContactsList))
          })
          this.contactSync(this.state.ContactsList)
          console.log('==>ContactsList123', JSON.stringify(this.state.ContactsList))

        });
      }
    });
  }

  // contact syncing Api 
  contactSync = (contact) => {
    let tempData = []
    contact.map((i) => {
      tempData.push([i.number, i.name])
    })
    let data = {
      number: tempData
    }
    console.log("data============================", data);
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.CONTACT_SYNC, method: "POST", data: data }).then((response) => {
      console.log("response contact syncing before success======>", response);
      if (response.status) {
        console.log('contactSync_response==>>>', JSON.stringify(response))
        this.setState({ syncedContact: response, syncedContactTem: response })
        this.syncedContact()
        Helper.hideLoader()
      } else {
        Helper.hideLoader()
      }
    }).catch((err) => {
      console.log("catch part Error in sync contact============", err);
    })
  }

  //synced contact list Api 
  syncedContact = () => {
    Helper.showLoader()
    Helper.makeRequest({ url: ApiUrl.CONTACT_SYNC_LIST, method: "GET", data: '' }).then((response) => {
      Helper.hideLoader()
      console.log(" before success syncedContact response=============", response);
      if (response.status) {
        console.log("success syncedContact response=============", response);
        let tempData = []
        response.data.map((i) => {
          console.log('...................before filter sync contact', i);
          // if(i.invite == 'send invite'){
          tempData.push(i)
          // }
        })
        // response.data.map((i)=>{
        //   console.log('...................before filterresponseresponse', i);
        //   if(i.invite == 'send invite'){
        //     tempData.push(i)
        //   }
        // })
        // console.log("syncedContactsyncedContactsyncedContact122",tempData.invite.status)
        this.setState({ syncedContact: tempData, syncedContactTem: tempData })
      } else {
        this.setState({ NotFound: true })
      }
    });
  }

}


const styles = StyleSheet.create({
  img: { width: 40, height: 40, resizeMode: "contain" },
  view1: { marginHorizontal: 16, },
  container: { paddingVertical: 15, flex: 1, backgroundColor: Colors.white },
  flView: {
    flexDirection: "row", alignItems: 'center', borderWidth: 1, borderRadius: 14, borderColor: Colors.white2, padding: 5, marginTop: 5,
  },
  searchView: { marginHorizontal: 20, borderRadius: 30, top: 8, borderWidth: 0.5, height: 45, borderColor: Colors.barney },
  textCat: { fontSize: 16, lineHeight: 17, fontFamily: Fonts.Candarab, color: Colors.bruise, },
  textInvite: { fontSize: 12, lineHeight: 12, fontFamily: Fonts.Candara, alignSelf: "center", },
  touch1: {
    borderRadius: 17, marginTop: 5, borderColor: Colors.barney, borderWidth: 1,
    paddingVertical: 10, paddingHorizontal: 25,
  },
  touch11: {
    borderRadius: 17,
    marginTop: 5,
    borderColor: Colors.barney,
    borderWidth: 1,
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  touch2: {
    marginLeft: 5,
    marginTop: 5,
    borderColor: Colors.barney,
    borderRadius: 17,
    borderWidth: 1,
    paddingTop: 10,
    paddingHorizontal: 13,
  },
  textF: { fontSize: 12, lineHeight: 14, color: Colors.white },
  textFAct: { fontSize: 12, lineHeight: 14, color: Colors.barney },
  textN: { fontSize: 12, lineHeight: 14, color: Colors.barney },
});
