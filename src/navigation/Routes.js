import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LogIn from '../Screens/LogIn.js';
import AddPayment from '../Screens/AddPayment';
import Success from '../Screens/Success';
import ThankYou from '../Screens/ThankYou';
import OtpScreen from '../Screens/OtpScreen';
import Sort from '../Screens/Sort';
import Filter from '../Screens/Filter';
import SignUpScraan from '../Screens/SignUpScraan';
import AddStoreCards from '../Screens/AddStoreCards';
import RequestScreen from '../Screens/RequestScreen';
import Profile from '../Screens/Profile';
import MyAccount from '../Screens/MyAccount';
import Pantry from '../Screens/Pantry';
import Account from '../Screens/Account';
import ChangePassword from '../Screens/ChangePassword';
import HomeTabs from '../Screens/HomeTabs';
import Home from '../Screens/Home';
import ShoppingList from '../Screens/ShoppingList';
import Notification from '../Screens/Notification';
import AddMember from '../Screens/AddMember';
import Search from '../Screens/Search';
import HistoryView from '../Screens/HistoryView';
import History from '../Screens/History';
import ProductDetail from '../Screens/ProductDetail';
import Suscriptions from '../Screens/Suscriptions';
import FavoritesScreen from '../Screens/FavoritesScreen';
import CartFamily from '../Screens/CartFamily';
import FamilyNeighbor from '../Screens/FamilyNeigh/FamilyNeighbor';
import StoreItems from '../Screens/StoreItems';
import SearchResults from '../Screens/SearchResults';
import CreditsCard from '../Screens/CreditsCard';
import Address from '../Screens/Address';
import Complaint from '../Screens/Complaint';
import Coupons from '../Screens/Coupons';
import CouponsScreen from '../Screens/CouponsScreen';
import Splash from '../Screens/Splash.js';
import StoreCatList from '../Screens/StoreCatList.js';
import SubCatDetails from '../Screens/SubCatDetails.js';
import ShoppingListDetalis from '../Screens/ShoppingListDetalis.js';
import NotifyNeighborPopup from '../Compnont/NotifyNeighborPopup.js';

const LoginStack = createStackNavigator();
function BeforeLogin() {
    return (
        <LoginStack.Navigator
            initialRouteName="Splash">
            <LoginStack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <LoginStack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
            <LoginStack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }} />
            <LoginStack.Screen name="Success" component={Success} options={{ headerShown: false }} />
            <LoginStack.Screen name="SignUpScraan" component={SignUpScraan} />
        </LoginStack.Navigator>
    )
}

const LogoutStack = createStackNavigator();
function AfterLogout() {
    return (
        <LogoutStack.Navigator
            initialRouteName="LogIn">
            <LogoutStack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
            <LogoutStack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }} />
            <LogoutStack.Screen name="Success" component={Success} options={{ headerShown: false }} />
            <LogoutStack.Screen name="SignUpScraan" component={SignUpScraan} />
        </LogoutStack.Navigator>
    )
}

const Stack = createStackNavigator();
function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="BeforeLogin">
                <Stack.Screen name="BeforeLogin" component={BeforeLogin} options={{ headerShown: false }} />
                <Stack.Screen name="AfterLogout" component={AfterLogout} options={{ headerShown: false }} />
                <Stack.Screen name="HomeTabs" component={HomeTabs} options={{ headerShown: false }} />
                <Stack.Screen name="MyAccount" component={MyAccount} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Address" component={Address} />
                <Stack.Screen name="FamilyNeighbor" component={FamilyNeighbor} />
                <Stack.Screen name="AddMember" component={AddMember} />
                <Stack.Screen name="NotifyNeighborPopup" component={NotifyNeighborPopup} />
                <Stack.Screen name="CreditsCard" component={CreditsCard} />
                <Stack.Screen name="SearchResults" component={SearchResults} />
                <Stack.Screen name="StoreItems" component={StoreItems} />
                <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
                <Stack.Screen name="Notification" component={Notification}/>
                <Stack.Screen name="ShoppingList" component={ShoppingList} />
                <Stack.Screen name="ShoppingListDetalis" component={ShoppingListDetalis} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="RequestScreen" component={RequestScreen} />
                <Stack.Screen name="AddStoreCards" component={AddStoreCards} />
                <Stack.Screen name="AddPayment" component={AddPayment} />
                <Stack.Screen name="ThankYou" component={ThankYou} options={{ headerShown: false }} />
                <Stack.Screen name="Sort" component={Sort} options={{ headerShown: false }} />
                <Stack.Screen name="Filter" component={Filter} />
                <Stack.Screen name="Pantry" component={Pantry} />
                <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
                <Stack.Screen name="HistoryView" component={HistoryView} />
                <Stack.Screen name="History" component={History} />
                <Stack.Screen name="CartFamily" component={CartFamily} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} />
                <Stack.Screen name="Suscriptions" component={Suscriptions} />
                <Stack.Screen name="Complaint" component={Complaint} />
                <Stack.Screen name="StoreCatList" component={StoreCatList} />
                <Stack.Screen name="SubCatDetails" component={SubCatDetails} />
                <Stack.Screen name="Coupons" component={Coupons} options={{ headerShown: false }} />
                <Stack.Screen name="CouponsScreen" component={CouponsScreen} />
                <LogoutStack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export function handleNavigation(nav) {
    switch (nav.type) {
        case 'push':
            nav.navigation.navigate(nav.page, nav.passProps);
            break;
        case 'setRoot':
            nav.navigation.reset({ index: 0, routes: [{ name: nav.page }] })
            break;
        case 'pop':
            nav.navigation.goBack();
            break;
        case 'popToTop':
            nav.navigation.popToTop();
            break;
    }
  }
export default Routes;


