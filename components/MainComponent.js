import React, { Component } from 'react'
import DishDetails from './DishdetailComponent'
import { View, Platform } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Constants from 'expo-constants'
//components
import Menu from './MenuComponent'
import Home from './HomeComponent'
import Contact from './ContactComponent'
import About from './AboutComponent'


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

// home

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
// contact us
const ContactNavigator = createStackNavigator({
  Contact: { screen: Contact }
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
//about us
const AboutNavigator = createStackNavigator({
  About: { screen: About }
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

// main drawer side navigator

const MainNavigator = createDrawerNavigator({
  Home:
  {
    screen: HomeNavigator,
    navigationOptions: {
      title: 'Home',
      drawerLabel: 'Home'
    }
  },
  About:
  {
    screen: AboutNavigator,
    navigationOptions: {
      title: 'About Us',
      drawerLabel: 'About Us'
    }
  },
  Menu:
  {
    screen: MenuNavigator,
    navigationOptions: {
      title: 'Menu',
      drawerLabel: 'Menu'
    },
  },
  Contact: {
    screen: ContactNavigator,
    navigationOptions: {
      title: 'Contact Us',
      drawerLabel: 'Contact Us'
    },
  }
}, {
  drawerBackgroundColor: '#D1C4E9'
})

class Main extends Component {

  render() {
    return (
      <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight }}>
        <MainNavigator />
      </View>

    )
  }
}

export default Main