import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Text, Picker, Switch, Button, Alert } from 'react-native'
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable'

class Reservation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guests: 1,
            smoking: false,
            date: ''
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    handleReservation() {
        Alert.alert(
            'Your reservation OK?',
            `Number of guests: ${this.state.guests} \nSmoking: ${this.state.smoking ? 'YES' : 'NO'} \nDate and time: ${this.state.date.toString()}`,
            [
                {
                    text: 'Cancel',
                    onPress: () => this.resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => this.resetForm()
                }
            ],
            { cancelable: false }
        )
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        })
    }

    render() {
        return (
            <ScrollView>
                <Animatable.View animation="zoomInUp" duration={1000} delay={500}>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel} >Number of guests</Text>
                        <Picker
                            style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel} >Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            onTintColor='#512DA8'
                            onValueChange={(value) => this.setState({ smoking: value })}></Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel} >Date and time</Text>
                        <DatePicker
                            style={{ flex: 2, marginRight: 20 }}
                            date={this.state.date}
                            mode='datetime'
                            placeholder='Select date and time'
                            mindate='2020-01-01'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={date => this.setState({ date: date })}
                        />

                    </View>
                    <View style={styles.formRow}>
                        <Button
                            title='Reserve'
                            color='#512DA8'
                            onPress={() => this.handleReservation()}
                            accessibilityLabel='Learn more about this button' />
                    </View>
                </Animatable.View>

               
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
    }
})

export default Reservation

