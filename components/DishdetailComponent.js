import React, { Component } from 'react'
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button } from 'react-native'
import { Card, Icon, Rating, AirbnbRating, Input } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavorite, postComment } from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable'

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

function RenderDish(props) {
    const dish = props.dish
    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}
                >
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>
                    <View
                        style={{ justifyContent: 'center', flexDirection: 'row', flex: 1 }}>
                        <Icon
                            raised
                            reverse
                            name={props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favorite ? console.log('Already fav') : props.onPressFav()} />
                        <Icon
                            raised
                            reverse
                            name='pencil'
                            type='font-awesome'
                            color='#512DA8'
                            onPress={() => props.onPressCom()} />
                    </View>

                </Card>
            </Animatable.View>
        )

    } else {
        return (<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments
    const renderCommentItem = ({ item, index }) => {
        return (
            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>{item.comment}</Text>
                <Rating imageSize={14} readonly startingValue={item.rating} style={{ justifyContent: 'flex-start' }} />
                <Text style={{ fontSize: 12 }}>{' ' + item.author + ', ' + item.date}</Text>

            </View>
        )
    }

    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}>
                </FlatList>
            </Card>
        </Animatable.View>
    )
}

function RenderModal(props) {
    let res = {
        rating: 3,
        comment: "",
        author: ""
    }
    return (
        <Modal
            animationType={'slide'}
            transparent={false}
            visible={props.showModal}
            onDismiss={() => props.closeModal()}
            onRequestClose={() => props.closeModal()}
        >
            <View style={styles.modal}>
                <AirbnbRating
                    count={5}
                    reviews={["Rating: 1/5", "Rating: 2/5", "Rating: 3/5", "Rating: 4/5", "Rating: 5/5"]}
                    defaultRating={5}
                    size={20}
                    onFinishRating={(rating) => res.rating = rating}
                />
                <Input
                    placeholder='Author'
                    leftIcon={
                        <Icon
                            type='font-awesome'
                            name='user-o'
                            size={24}
                            color='black'

                        />
                    }
                    onChangeText={value => res.author = value}
                />
                <Input
                    placeholder='Comment'
                    leftIcon={
                        <Icon
                            type='font-awesome'
                            name='comment-o'
                            size={24}
                            color='black'

                        />
                    }
                    onChangeText={value => res.comment = value}
                />
                <Button
                    onPress={() => { props.submit(props.dish, res.rating, res.author, res.comment); props.closeModal() }}
                    color='#512DA8'
                    title='SUBMIT'
                    style={{ marginVertical: 8 }}
                />
                <Button
                    onPress={() => { props.closeModal() }}
                    color='#999999'
                    title='CANCEL'
                    style={{ marginVertical: 8 }}
                />
            </View>

        </Modal>
    )
}

class DishDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            rating: 3,
            author: '',
            comment: '',
            showModal: false,
            dish: undefined
        }
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    closeModal() {
        this.toggleModal()
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }

    comment(dishId) {
        this.setState({ dish: dishId })
        this.toggleModal()
    }

    addComment(dishId, rating, author, comment) {
        this.props.postComment(dishId, rating, author, comment)
    }

    static navigationOptions = {
        title: 'Dish Details'
    }

    render() {
        const dishId = this.props.navigation.getParam('dishId', '')
        return (
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPressFav={() => this.markFavorite(dishId)}
                    onPressCom={() => this.comment(dishId)}
                />
                <RenderComments
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <RenderModal
                    style={styles.modal}
                    showModal={this.state.showModal}
                    closeModal={this.closeModal.bind(this)}
                    dish={this.state.dish}
                    submit={this.addComment.bind(this)}
                />
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetails)