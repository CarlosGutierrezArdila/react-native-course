import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'

function Menu(props) {

    const renderMenuItem = (item) => {
        return (
            <ListItem 
            key={item.index}
            title={item.item.name}
            subtitle={item.item.description}
            hideChevron={true}
            leftAvatar={{source: require('./images/uthappizza.png')}} />
        )
    }

    return (
        <FlatList
            data={props.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()} />
    )
}

export default Menu