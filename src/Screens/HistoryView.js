import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import AppButton from "../Compnont/AppButton";
import AppHeader from "../Compnont/AppHeader";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import images from "../Compnont/ImagePath";

export default class HistoryView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listOfCategoriesNew: [
        {
          name: "Walmart",
          text: "Ice Cream",
          num: "2",
          price: "$3.26",
          price2: "$6.52",
        },
        {
          name: "Walmart",
          text: "Ice Cream",
          num: "2",
          price: "$3.26",
          price2: "$6.52",
        },
        {
          name: "Walmart",
          text: "Ice Cream",
          num: "2",
          price: "$3.26",
          price2: "$6.52",
        },
        {
          name: "Walmart",
          text: "Ice Cream",
          num: "2",
          price: "$3.26",
          price2: "$6.52",
        },
        {
          name: "Walmart",
          text: "Ice Cream",
          num: "2",
          price: "$3.26",
          price2: "$6.52",
        },
        {
          name: "Walmart",
          text: "Ice Cream",
          num: "2",
          price: "$3.26",
          price2: "$6.52",
        },
        {
          name: "Walmart",
          text: "Ice Cream",
          num: "2",
          price: "$3.26",
          price2: "$6.52",
        },
      ],
    };
    AppHeader({
      ...this,
      logo: false,
      leftIcon: images.back,
      leftClick: () => {
        this.goBack();
      },
      title: "08  November 2020",
      rightHide: true
    });
  }

  goBack = () => {
    this.props.navigation.goBack()
  }

  renderFunctionForType = ({ item }) => {
    return (
      <View
        style={{ flexDirection: "row", justifyContent: 'space-between' }}>
        <Text style={styles.textname}>{item.name}</Text>
        <Text style={styles.textIce}>{item.text}</Text>
        <Text style={styles.textNum}>{item.num}</Text>
        <Text style={styles.textPrice}>{item.price}</Text>
        <Text style={styles.textPrice2}>{item.price2}</Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.boxMainView}>
          <FlatList
            style={styles.view1}
            extraData={this.state}
            keyExtractor={(item) => item.id}
            data={this.state.listOfCategoriesNew}
            renderItem={this.renderFunctionForType}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: "100%",
                  height: 1,
                  opacity: 0.16, marginVertical: 12,
                  backgroundColor: Colors.barney,
                }}
              />
            )}
            showsVerticalScrollIndicator={false}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between", marginTop: 20
            }}
          >
            <Text style={styles.textTotal}>Total</Text>
            <View style={{ justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.totalAm}>$ </Text>
              <Text style={styles.total}>139.56</Text>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 15,position:'absolute',bottom:0 }}>
          <View style={{ flex: 0.5 }}>
            <AppButton
              onClick={() => { }}
              Background={Colors.barney}
              paddingver={18}
              title={"Buy It Again"}
              fontSize={20}
              textolor={Colors.white}
              fontFamily={Fonts.Candarab}
            />
          </View>
          <View style={{ flex: 0.5 }}>
            <AppButton
              onClick={() => { }}
              Background={Colors.greenApple}
              paddingver={15}
              title={"Download"}
              fontSize={25}
              textolor={Colors.white}
              fontFamily={Fonts.Candarab}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  textHead: {
    fontSize: 20,
    marginLeft: 30,
    lineHeight: 27,
    fontFamily: Fonts.Candarab,
    color: Colors.barney,
  },
  textname: {
    fontSize: 10,
    lineHeight: 14,
    color: Colors.darkishPurple,
    fontFamily: Fonts.Candarab,

  },
  textIce: {
    fontSize: 10,
    lineHeight: 14,
    color: Colors.darkishPurple,
    // fontFamily: Fonts.Candarab,

  },
  textNum: {
    fontSize: 10,
    lineHeight: 14,
    color: Colors.darkishPurple,
    fontFamily: Fonts.Candarab,

  },
  textPrice: {
    fontSize: 10,
    lineHeight: 14,
    color: Colors.darkishPurple,
    fontFamily: Fonts.Candarab,

  },
  textPrice2: {
    fontSize: 10,
    lineHeight: 14,
    color: Colors.darkishPurple,
    fontFamily: Fonts.Candarab,

  },
  textTotal: {
    fontSize: 15,
    lineHeight: 27,
    color: Colors.amethystTwo,
    fontFamily: Fonts.Candarab,
  },
  total: {
    fontSize: 18,
    lineHeight: 24,
    color: Colors.darkishPurple,
    fontFamily: Fonts.Candarab,
  },
  totalAm: {
    fontSize: 25,
    lineHeight: 24, marginTop: 8,
    color: Colors.darkishPurple,
    fontFamily: Fonts.Candarab,
  },
  boxMainView: {
    marginTop: 30,
    backgroundColor: Colors.white,
    marginHorizontal: 15,
    borderRadius: 20,
    elevation: 3, padding: 15, paddingTop: 20,
  },
});
