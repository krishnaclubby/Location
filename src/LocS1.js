import React from 'react';
import { View, StyleSheet, TextInput, Dimensions, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');
import MapView, { Marker } from 'react-native-maps';
export default class LocS1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            loader: false
        }


    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })
                // alert("value:" + JSON.stringify(this.state.longitude))
                // alert("value:" + JSON.stringify(position))
            },
            (error) => { console.log(error) },
            {
                enableHighAccuracy: true,
                timeout: 50000,
                maximumAge: 10000
            }
        )
    }

    render() {
        var { width, height } = Dimensions.get('window')
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
            }}>
                <View style={{ backgroundColor: 'green', width: '100%', alignItems: 'center' }}>
                    <Text style={{ padding: 10, color: '#fff' }}>GPS SIGNAL REQUIRED</Text>

                </View>
                <MapView
                    style={{
                        flex: 1,
                        width: width,
                        height: height,
                        }}
                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.009,
                        longitudeDelta: 0.009
                    }}

                >
                    <Marker
                        coordinate={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                        }}

                        title={'hi'}
                        description={'kkkk'}
                    />
                </MapView>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('LOCS2')}
                    style={{ padding: 10, borderRadius: 60, width: 60, height: 60, backgroundColor: '#058d99', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: '#fff' }}>Start</Text>
                </TouchableOpacity>
            </View>
        )
    }
}