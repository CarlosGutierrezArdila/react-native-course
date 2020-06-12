import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Text, Picker, Switch, Button, Alert } from 'react-native'
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import * as Calendar from 'expo-calendar'

class Reservation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date()
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
                    onPress: () => {
                        // this.presentLocalNotification(this.state.date)
                        this.createReservationEvent(this.state.date)
                    }
                }
            ],
            { cancelable: false }
        )
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date()
        })
    }

    async obtainNotificationPermision() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)
        if (permission.status !== 'granted') {
            let permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications')
            }
            return permission
        }
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermision()
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: `reservation for ${date} requested`,
            ios: { sound: true },
            android: { sound: true, vibrate: true, color: '#512DA8' }
        })
    }

    async obtainCalendarPermision() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR)
        if (permission.status !== 'granted') {
            let permission = await Permissions.askAsync(Permissions.CALENDAR)
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to calendar')
            }
            return permission
        }
    }

    async getDefaultCalendarSource() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].source;
    }

    async createCalendar() {
        const defaultCalendarSource =
            Platform.OS === 'ios'
                ? await getDefaultCalendarSource()
                : { isLocalAccount: true, name: 'Expo Calendar' };
        const newCalendarID = await Calendar.createCalendarAsync({
            title: 'Expo Calendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        })
        return newCalendarID
    }

    async createReservationEvent(date) {
        await this.obtainCalendarPermision()
        let id = await this.createCalendar()
        let title= 'Con Fusion Table Reservation'
        try {
            await Calendar.createEventAsync(id, {
                title: title,
                startDate: new Date(Date.parse(date)),
                endDate: new Date((Date.parse(date) + (2 * 60 * 60 * 1000))),
                timeZone: 'Asia/Hong_Kong',
                location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
            })
            this.resetForm()
        } catch (error) {
            Alert.alert(error.message)
        }

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

