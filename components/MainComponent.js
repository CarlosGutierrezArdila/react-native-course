import React, { Component } from 'react'
import Menu from './MenuComponent'
import Home from './HomeComponent'
import DishDetails from './DishdetailComponent'
import { View, Platform } from 'react-native'
import { createStackNavigator , createDrawerNavigator} from 'react-navigation'
import Constants from 'expo-constants'
// stack navigacion
const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    DishDetails: { screen: DishDetails }
}, {
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    }
})
//drawer navigation

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  
    })
})

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home'
        }
      },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu'
        }, 
      }
}, {
  drawerBackgroundColor: '#D1C4E9'
})

class Main extends Component {

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight}}>
                <MainNavigator/>
            </View>

        )
    }
}

export default Main