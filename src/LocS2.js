import React from 'react';
import { View, StyleSheet, TextInput, Dimensions, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');
import MapView, { Marker, Polyline } from 'react-native-maps';
import store from './reducers/locReduser';

export default class LocS2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            loader: false,
            coordinates: [],
            distanceTravelled: 0,
            timee: ''
        }


    }

    componentDidMount() {
        let date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        console.log(hours)
        console.log(minutes)
        console.log(seconds)

        // how to handle the cases where time is one digit
        function makeTwoDigits(time) {
            const timeString = time;
            if (timeString.length === 2) return time
            return time
        }

        // this.state = store.getState();
        this.timer = setInterval(() => this.getCoordinates(), 1000)

        store.subscribe(() => {
            // this.setState(store.getState());
            // alert("value:" + JSON.stringify(store.getState()))

        });

    }
    getCoordinates = () => {

        let date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        // how to handle the cases where time is one digit
        function makeTwoDigits(time) {
            const timeString = time;
            if (timeString.length === 2) return time
            else return time
        }
        let timee = makeTwoDigits(hours) + ':' + makeTwoDigits(minutes) + ':' + makeTwoDigits(seconds)
        this.setState({ timee: timee })

        let coordinates = this.state.coordinates;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                let coord = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                coordinates.push(coord);
                store.dispatch({
                    type: "LOCATION",
                    payload: { location: coordinates }
                });
                this.setState({
                    coordinates: coordinates,
                    distanceTravelled: this.state.distanceTravelled + this.calcDistance(coord),
                    prevLatLng: coord
                })
            },
            (error) => { console.log(error) },
            {
                enableHighAccuracy: true,
                timeout: 50000,
                maximumAge: 10000
            }
        )

    }
    check = () => {
        if (this.state.coordinates) {
            return this.state.coordinates;
        } else {
            return []
        }
    }
    calcDistance = () => {
        if (this.state.coordinates.length > 2) {
            return this.state.coordinates.map((host, i) => {
                if (this.state.coordinates[i + 1] != undefined && this.state.coordinates[i + 1] != undefined) {
                    return this.distance(this.state.coordinates[i].latitude, this.state.coordinates[i].longitude, this.state.coordinates[i + 1].latitude, this.state.coordinates[i + 1].longitude, 'K')
                } else {
                    return 1
                }
            })
        } else {
            return 0
        }
    };

    distance(lat1, lon1, lat2, lon2, unit) {

        if ((lat1 == lat2) && (lon1 == lon2)) {
            // console.log("unit if")
            return 0;
        }
        else {
            // console.log("unit elsse")
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == "K") { dist = dist * 1.609344 }
            if (unit == "N") { dist = dist * 0.8684 }
            //  return dist.toFixed(2);
            // return dist;
        }
    }

    render() {
        // console.log(JSON.stringify(this.state))
        var { width, height } = Dimensions.get('window')
        return (
            <View style={{
                flex: 1,

            }}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.pop()} style={{ padding: 10, }}>
                    <Text style={{}}>Back</Text>
                </TouchableOpacity>
                <View style={{ backgroundColor: 'green', width: '100%', alignItems: 'center' }}>
                    <Text style={{ padding: 10, color: '#fff' }}>GPS SIGNAL REQUIRED</Text>

                </View>

                <MapView
                    style={{
                        flex: 1,
                        width: width,
                        height: height,
                    }}
                >


                    {this.state.coordinates.map((host, i) => {
                        if (host.latitude && host.longitude) {

                            return (<Marker
                                key={i}
                                coordinate={host}

                                pinColor={"#ffd1dc"}
                            />)
                        }
                    })}
                </MapView>
                <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
                    <View>
                        <Text>Time</Text>
                        <Text style={{ fontWeight: 'bold' }}>{this.state.timee}</Text>
                    </View>
                    <View>
                        <Text>Distance(M)</Text>
                        <Text style={{ fontWeight: 'bold' }}>{this.calcDistance()}</Text>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={{ padding: 10, borderRadius: 60, width: 60, height: 60, borderWidth: .5, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{}}>Stop</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('LOCS3')}
                        style={{ padding: 10, borderRadius: 60, backgroundColor: '#058d99', width: 60, height: 60, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#fff' }}>Finish</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}