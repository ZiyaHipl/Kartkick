import React, { Component } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import images from "../Compnont/ImagePath";
import Colors from "../Compnont/Colors";
import Fonts from "../Compnont/Fonts";
import AppHeader from "../Compnont/AppHeader";
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
export default class FavoritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesData: [
        {
          name: "E-Plant Strawberry",
          icon: images.PromotionsCoupons_2,
          isOpeen: false,
          isSeleted: false
        },
        {
          name: "Case De Amor Organic",
          icon: images.PromotionsCoupons_1,
          isOpeen: false,
          isSeleted: false
        },
      ],
    };
    AppHeader({
      ...this, leftHeide: false, logo: false, leftIcon: images.back, leftClick: () => { this.goBack() },
      title: 'Favorites', rightIcon: images.menu, rightClick: () => { this.menuClick() }
    });
  }
  menuClick = () => {
    this.props.navigation.navigate("MyAccount");
  };

  onSelectFav = (index) => {
    let selected = [...this.state.favoritesData]
    selected[index].isSeleted = !selected[index].isSeleted
    this.setState({ favoritesData: selected })
  }

  renderRightActions = (progress, dragX) => {
    return (
      <RectButton style={styles.rightAction} onPress={this.close}>
        <TouchableOpacity onPress={() => { }} style={styles.slideBttnview}>
          <Image style={styles.removeIcon} source={images.remove} />
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </RectButton>
    );
  };


  goBack = () => {
    this.props.navigation.goBack()
  }

  onOpenHandle(item, index) {
    let favoritesData = [...this.state.favoritesData];
    favoritesData[index].isOpeen = true;
    this.setState({ favoritesData });
  }

  onCloseHandle(item, index) {
    let favoritesData = [...this.state.favoritesData];
    favoritesData[index].isOpeen = false;
    this.setState({ favoritesData });
  }

  favoritesList = ({ item, index }) => {
    return (
      <View style={{ flex: 1, marginHorizontal: 15 }}>
        <Swipeable
        ref={this.updateRef}
        friction={1}
        renderRightActions={this.renderRightActions}>
        <View
          style={[
            styles.mainView,
            {
              marginLeft: !item.isOpeen ? 0 : 0,
              marginRight: !item.isOpeen ? 0 : 0,
            },
          ]}
        >
          <View style={{ flex: 0.3, alignItems: "center" }}>
            <View style={styles.iconView}>
              <Image style={styles.listIcon} source={item.icon} />
            </View>
          </View>
          <View style={{ flex: 0.7 }}>
            <Text style={styles.nameText}>{item.name} </Text>
            <Text style={styles.kgText}>Seeds, : 2.20 Lbs</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image style={styles.walIcon} source={images.wallmart_purple} />
              <Text style={styles.wallText}>WallMart Store</Text>
            </View>
            <Text style={[styles.wallText,{left:0}]}>Beer</Text>
            <View style={styles.ribbinView}>
              <View style={{ flexDirection: "row", top: 7 }}>
                <TouchableOpacity onPress={() => { this.onSelectFav(index) }}>
                  <Image style={styles.sameIcon} source={item.isSeleted ? images.fav_purple : images.fav_dark} />
                </TouchableOpacity>
                <Image
                  style={[styles.sameIcon, { left: 7 }]}
                  source={images.cart_purple}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Image style={styles.ribbin} source={images.ribbon} />
                <View style={{ position: "absolute", top: 0 }}>
                  <Text style={styles.cutText}>$ 2.5</Text>
                  <Text style={styles.nonText}>$3.45</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
      </View>
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList style={{marginTop:15}}
          data={this.state.favoritesData}
          renderItem={this.favoritesList}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  iconView: {
    height: 80,
    width: 86,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  listIcon: { height: 80, width: 90, resizeMode: "contain" },
  nameText: { fontSize: 12, fontFamily: Fonts.Candarab, color: Colors.indigo },
  mainView: {
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
  kgText: { fontSize: 12, fontFamily: Fonts.Candarab, color: Colors.indigo },
  walIcon: { height: 10, width: 10, resizeMode: "contain" },
  wallText: { fontSize: 10, color: Colors.barney, left: 5 },
  sameIcon: { height: 25, width: 25, resizeMode: "contain" },
  ribbin: { height: 35, width: 80, resizeMode: "contain", left: 4 },
  ribbinView: { flexDirection: "row", justifyContent: "space-between" },
  cutText: {
    textDecorationLine: "line-through",
    fontSize: 12,
    color: Colors.neonYellow,
  },
  nonText: { fontSize: 14, fontWeight: "bold", color: Colors.white },
  slideBttnview: {
    backgroundColor: Colors.barney,
        alignItems: "center",
        justifyContent: "center",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingVertical: 38,
  },
  removeText: {
    fontSize: 12,
    fontFamily: Fonts.Candaral,
    color: Colors.white,
    top: 5,
  },
  removeIcon: { height: 20, width: 25, resizeMode: "contain" },
  rightAction: {
    flex: .2,
},
});
