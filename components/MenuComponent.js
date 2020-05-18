import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import { DISHES } from '../shared/dishes'

class Menu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dishes: DISHES
        }
    }

    static navigationOptions = {
        title: 'Menu'
    }



    render() {
        const renderMenuItem = (item) => {
            return (
                <ListItem
                    key={item.index}
                    title={item.item.name}
                    subtitle={item.item.description}
                    hideChevron={true}
                    onPress={() => navigate('DishDetails', {dishId: item.item.id})} //navigate and pass info
                    leftAvatar={{ source: require('./images/uthappizza.png') }} />
            )
        }

        const {navigate} = this.props.navigation

        return (
            <FlatList
                data={this.state.dishes}
                renderItem={renderMenuItem}
                keyExtractor={item => item.id.toString()} />
        )
    }


}

export default Menu