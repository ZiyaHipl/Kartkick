import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import AppButton from "../Compnont/AppButton";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";

export default class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listHistory: [
        { date: "08 November 2020", boder: true },
        { date: "08 December 2021", boder: true },
        { date: "03 January 2020", boder: true },
        { date: "25 Fabruary 2020", boder: false },
      ],
      itemModal: [
        { label: "Sort by date", boderModal: true, id: 1 },
        { label: "Sort by store", boderModal: true, id: 2 },
        { label: "Sort by amount spent", boderModal: true, id: 3 },
        { label: "Sort by distance traveled", boderModal: true, id: 4 },
        { label: "Sort by amount saved", boderModal: false, id: 5 },
      ],
      modalVisible: false,
      iselect: 1,
    };
    AppHeader({
      ...this,
      logo: false,
      leftIcon: images.back,
      leftClick: () => {
        this.goBack();
      },
      title: "History",
      rightIcon: images.menu,
      rightClick: () => {
        this.menuClick();
      },
    });
  }

  menuClick = () => {
    this.props.navigation.navigate("MyAccount");
  };

  goBack = () => {
    this.props.navigation.goBack();
  };

  selectItem = (selectid) => {
    this.setState({ iselect: selectid });
  };

  showModal = () => {
    this.setState({ modalVisible: true });
  }

  heideModal = () => {
    this.setState({ modalVisible: false });
  }

  onClickView = () => {
    this.props.navigation.navigate('HistoryView')
  }

  renderHistory = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => { this.onClickView() }}>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 17,
            paddingLeft: 17,
            paddingRight: 23,
            alignItems: "center",
          }}
        >
          <Text style={styles.date}>{item.date}</Text>
          <Image style={styles.eyes} source={images.eye_purple} />
        </View>

        {item.boder == true && (
          <View style={{ backgroundColor: Colors.barney, height: 0.5 }}></View>
        )}
      </TouchableOpacity>
    );
  };

  renderModalList = ({ item }) => {
    return (
      <View style={{}}>
        <TouchableOpacity
          onPress={() => {
            this.selectItem(item.id);
          }}
          style={{
            marginHorizontal: 21,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Image
            style={styles.radioIcon}
            source={
              this.state.iselect == item.id
                ? images.radiobutton_checked
                : images.radio_button
            }
          />
          <Text
            style={
              this.state.iselect == item.id
                ? styles.radioActiveTxt
                : styles.radioUnactiveTxt
            }
          >
            {item.label}
          </Text>
        </TouchableOpacity>

        {item.boderModal == true && (
          <View
            style={{ backgroundColor: Colors.pinkishGreyTwo, height: 0.5 }}
          ></View>
        )}
      </View>
    );
  };

  renderModal() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}
      >
        <View style={styles.modalContainView}>
          <View style={styles.modalView}>
            <Text style={styles.txtSorting}>Sorting</Text>
            <FlatList
              style={{ marginTop: 10 }}
              data={this.state.itemModal}
              renderItem={this.renderModalList}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
            />

            <AppButton
              onClick={() => { this.heideModal() }}
              Background={Colors.barney}
              borderRadius={30}
              paddingver={15}
              M_Hor={80}
              M_Ver={14}
              title={"Apply"}
              fontSize={18}
              textolor={"white"}
              fontFamily={Fonts.Candara}
            />

            <TouchableOpacity
              style={styles.iconClose}
              onPress={() => {
                this.heideModal();
              }}
            >
              <Image style={styles.iconClose} source={images.close} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    return (
      <View style={styles.viewMain}>
        <View style={styles.haderView}>
          <Text style={styles.txtHaderView}>Purchase Report</Text>
          <TouchableOpacity
            onPress={() => {
              this.showModal();
            }}
          >
            <Image
              style={styles.iconPurchaseReport}
              source={images.purchase_report}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.cardView}>
          <FlatList
            data={this.state.listHistory}
            renderItem={this.renderHistory}
          />
        </View>
        {this.renderModal()}
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
    paddingHorizontal: 15,
    alignItems: "center",
  },
  txtHaderView: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: Fonts.Candara,
    flex: 1,
  },
  iconPurchaseReport: { width: 20, height: 15, resizeMode: "contain" },
  cardView: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    elevation: 3,
    marginTop: 22,
    marginHorizontal: 16,
    marginBottom: 20, elevation: 5, shadowOpacity: 0.25, shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  date: { color: Colors.barney, fontSize: 18, flex: 1 },
  eyes: { width: 22, height: 15, resizeMode: "contain" },
  modalContainView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ffffffe8",
  },
  modalView: {
    backgroundColor: "white",
    borderColor: Colors.barney,
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 6,
    marginHorizontal: 28,
  },
  iconClose: {
    width: 28,
    height: 28,
    resizeMode: "contain",
    position: "absolute",
    right: 6,
    marginTop: 6,
  },
  txtSorting: {
    fontFamily: Fonts.Candarab,
    fontSize: 24,
    color: Colors.barney,
    marginTop: 7,
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
});
