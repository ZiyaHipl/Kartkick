import React, { Component } from "react";
import { View, } from "react-native";
import SplashScreen from 'react-native-splash-screen';
import Helper from "../Lib/Helper";

export default class Splash extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("focus", () => {
            Helper.getData('userdata').then(async (responseData) => {
                // alert(JSON.stringify(responseData))
                if (responseData === null || responseData === 'undefined' || responseData === '') {
                    SplashScreen.hide()
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: "LogIn" }],
                    });
                } else {
                    if (responseData.first_name == '') {
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: "HomeTabs" }],
                        });
                    } else {
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: "HomeTabs" }],
                        });
                    }
                }
            })
        })
    }

    render() {
        return (
            <View />
        );
    }
}
