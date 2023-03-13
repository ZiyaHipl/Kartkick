import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Image, Dimensions, Platform, DeviceEventEmitter } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import CouponsScreen from './CouponsScreen'
import ShoppingList from './ShoppingList'
// import Notification from './Notification'
import StoreItems from './StoreItems'
import Purchase from './Purchase'
import Fonts from '../Compnont/Fonts';
import StoreCards from './StoreCards'
import Colors from '../Compnont/Colors';
import images from '../Compnont/ImagePath';
import History from './History';
import StoreCatList from './StoreCatList';
import ShoppingListDetalis from './ShoppingListDetalis';
import Helper from '../Lib/Helper';
import Notification from './Notification'

const ScreenWidth = Dimensions.get("window").width;

const RenderTabIcons = (props) => {
    const { icon, lable, isFocused, isType, count, notificationCount } = props;
    return (
        <View style={{ top: 10, alignItems: "center", justifyContent: "center", }}>
            <Image
                source={icon}
                style={[styles.addPostIcon,]}
            />
            {lable == 'ShoppingTab' &&
                <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', top: -13, backgroundColor: Colors.grassGreen, height: 18, width: 18, paddingHorizontal: 0, paddingVertical: 0, borderRadius: 18 / 2, }} >
                    <Text style={[styles.TabLableCss]}>{count}</Text>
                </View>}

            {lable == 'Notification' &&
                <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center', top: -10, backgroundColor: Colors.pissYellow, height: 16, width: 16, paddingHorizontal: 0, paddingVertical: 0, borderRadius: 18 / 2, }} >
                    <Text style={[styles.TabLableCss,]}>{notificationCount}</Text>
                </View>}

            {/* <Text style={[styles.TabLableCss, { color: isFocused ? Colors.tintappcolor : Colors.gray, marginVertical: 1 }]}>{lable}</Text> */}

        </View>
    );
}

const HomeNavigator = createStackNavigator();
function HomestackNavigator() {
    return (
        <HomeNavigator.Navigator >
            <HomeNavigator.Screen name="Home" component={Home} />
            <HomeNavigator.Screen name="StoreCards" component={StoreCards} />
            <HomeNavigator.Screen name="StoreCatList" component={StoreCatList} />

        </HomeNavigator.Navigator>
    )
}

const CouponsNavigator = createStackNavigator();
function CouponsStackNavigator() {
    return (
        <CouponsNavigator.Navigator >
            <CouponsNavigator.Screen name="CouponsScreen" component={CouponsScreen} />
        </CouponsNavigator.Navigator>
    )
}

const ShoppingListNavigator = createStackNavigator();
function ShoppingListStackNavigator() {
    return (
        <ShoppingListNavigator.Navigator >
            <ShoppingListNavigator.Screen name="ShoppingList" component={ShoppingList} />
            <ShoppingListNavigator.Screen name="ShoppingListDetalis" component={ShoppingListDetalis} />

            <ShoppingListNavigator.Screen name="StoreCards" component={StoreCards} />
            <ShoppingListNavigator.Screen name="Purchase" component={Purchase} />
            <ShoppingListNavigator.Screen name="History" component={History} />

        </ShoppingListNavigator.Navigator>
    )
}

// const NotificationNavigator = createStackNavigator();
// function NotificationStackNavigator() {
//     return (
//         <NotificationNavigator.Navigator >
//             <NotificationNavigator.Screen name="Notification" component={Notification} />
//         </NotificationNavigator.Navigator>
//     )
// }

const StoreItemsNavigator = createStackNavigator();
function StoreItemsStackNavigator() {
    return (
        <StoreItemsNavigator.Navigator >
            <StoreItemsNavigator.Screen name="StoreItems" component={StoreItems} />
        </StoreItemsNavigator.Navigator>
    )
}



const Tabs = createBottomTabNavigator();

export default class HomeTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartcount: 0,
            NotificationLength: 0
        }
    }
    componentDidMount(){
        Helper.getData('cartcount').then(async (value) => {
            this.setState({ cartcount: value })
        })
        this.listener = DeviceEventEmitter.addListener('cartcount', (value) => {
            this.setState({ cartcount: value })
        });
        Helper.getData('notificationCount').then(async (value) => {
            this.setState({ NotificationLength: value })
        })
        this.listener = DeviceEventEmitter.addListener('notificationCount', (value) => {
            this.setState({ NotificationLength: value })
        });
    }

    render() {
        return (
            <Tabs.Navigator
                initialRouteName={'HomeTabs'}
                backBehavior={'none'}
                tabBarOptions={{
                    keyboardHidesTabBar: true,
                    style: {
                        alignItems: 'center', justifyContent: 'center',
                        // height: Platform.OS == 'ios' && AppConstant.hasNotch ? 90 : 60, backgroundColor: '#fff',
                    }
                }}>
                <Tabs.Screen
                    name="Home"
                    component={HomestackNavigator}
                    options={{
                        tabBarLabel: "",
                        tabBarIcon: ({ focused }) => {
                            return (
                                <RenderTabIcons
                                    icon={focused ? images.home_purple : images.home}
                                    // lable={"Home"}
                                    isFocused={focused}
                                />
                            );
                        },
                    }}
                />

                <Tabs.Screen
                    name="CouponsScreen"
                    component={CouponsStackNavigator}
                    options={{
                        tabBarLabel: "",
                        tabBarIcon: ({ focused }) => {
                            return (
                                <RenderTabIcons
                                    icon={focused ? images.offer_purple : images.offer}
                                    // lable={"Chat"}
                                    isFocused={focused}
                                />
                            );
                        },

                    }}
                />

                <Tabs.Screen
                    name="ShoppingTab"
                    component={ShoppingListStackNavigator}
                    options={{
                        tabBarLabel: "",
                        tabBarIcon: ({ focused }) => {
                            return (
                                <RenderTabIcons
                                    icon={focused ? images.todolistActive : images.todolist}
                                    lable={"ShoppingTab"}
                                    count={this.state.cartcount}
                                    isFocused={focused}
                                />
                            );
                        }
                    }}
                />

                {/* <Tabs.Screen
                    name="Notification"
                    component={NotificationStackNavigator}
                    options={{
                        tabBarLabel: "",
                        tabBarIcon: ({ focused }) => {
                            return (
                                <RenderTabIcons
                                    icon={focused ? images.notifications : images.notifications1}
                                    lable={"Notification"}
                                    notificationCount={this.state.NotificationLength ? this.state.NotificationLength : 0}
                                    isFocused={focused}
                                />
                            );
                        }
                    }}
                /> */}

                <Tabs.Screen
                    name="MyAccount00"
                    component={StoreItemsStackNavigator}
                    options={{
                        tabBarLabel: "",
                        tabBarIcon: ({ focused }) => {
                            return (
                                <RenderTabIcons
                                    icon={focused ? images.search : images.search_grey}
                                    // lable={"My Account"}
                                    isFocused={focused}
                                />
                            );
                        }
                    }}
                />


            </Tabs.Navigator>
        )
    }
}
const styles = StyleSheet.create({
    addPostIcon: { height: 25, width: 25, resizeMode: 'contain' },
    TabLableCss: { fontSize: 10, fontFamily: Fonts.ProximaNovaFont, color: '#fff' },
    TabTextCss: {},
})