import React, { Component } from 'react'
import { View, Button, StyleSheet, Alert } from 'react-native'
import { Card, Icon, Input, CheckBox } from 'react-native-elements'
import * as SecureStore from 'expo-secure-store';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata)
                if (userinfo) {
                    this.setState({ username: userinfo.username })
                    this.setState({ password: userinfo.password })
                    this.setState({ remember: true })
                }
            })
    }

    static navigationOptions = {
        title: 'Login'
    }

    handleLogin() {
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username: this.state.username, password: this.state.password
                }))
                .catch((err) => console.info('could not save user info', err))
        } else {
            SecureStore.deleteItemAsync('userinfo')
                .catch((err) => console.info('could not delete user info', err))
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <Input
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({ username: username })}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(pass) => this.setState({ password: pass })}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title='Remember me'
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({ remember: !this.state.remember })}
                    containerStyle={styles.formCheckBox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Login'
                        color='#512DA8'
                    />
                </View>
            </View>
        )
    }


}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formInput: {
        margin: 40
    },
    formCheckBox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
})

export default Login
