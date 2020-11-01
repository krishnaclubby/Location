import React from 'react';
import { View, StyleSheet, Modal, Dimensions, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
navigator.geolocation = require('@react-native-community/geolocation');
import MapView, { Marker, Polyline } from 'react-native-maps';
import store from './reducers/locReduser';

export default class LocS3 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: 0,
            longitude: 0,
            loader: false,
            coordinates: [],
            distanceTravelled: 0, modalVisible: false
        }


    }

    componentDidMount() {

        store.subscribe(() => {
            this.setState(store.getState());
            // console.log("value:" + JSON.stringify(store.getState()))

        });
        let date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        // how to handle the cases where time is one digit
        function makeTwoDigits(time) {
            const timeString = time;
            if (timeString.length === 2) return time
            else return time

            // return '0' + time
        }
        let timee = makeTwoDigits(hours) + ':' + makeTwoDigits(minutes) + ':' + makeTwoDigits(seconds)
        this.setState({ timee: timee })

    }




    check = () => {
        if (this.state.email != undefined) {
            return this.state.email;
        } else {
            return []
        }
    }
    calcDistance = () => {
        // console.log("unit"+JSON.stringify(this.check()))
        if (this.check().length > 2) {
            // console.log("IF")
            this.check().map((host, i) => {
                // console.log("MAP")
                if (this.check()[i + 1] != undefined && this.check()[i + 1] != undefined) {
                    // console.log("MACHECKP")
                    return this.distance(this.check()[i].latitude, this.check()[i].longitude, this.check()[i + 1].latitude, this.check()[i + 1].longitude, 'K')
                } else {
                    return 1
                }
            })
        } else {
            return 0
        }
    };

    distance(lat1, lon1, lat2, lon2, unit) {
        // console.log("lon1"+lon1)
        if ((lat1 == lat2) && (lon1 == lon2)) {
            
            return 0;
        }
        else {
            console.log("unit elsse")
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
            
            // return dist;
        }
    }

    render() {
        // console.log(JSON.stringify(this.state.email)+'kkkkkkkkkkkkkk')
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
                    {/* <Polyline coordinates={this.check()} strokeWidth={5} /> */}
                    {this.check().map((host, i) => {
                        if (host.latitude && host.longitude) {
                            // console.log("TEST", host.latitude);
                            return (<Marker
                                key={i}
                                coordinate={host}
                                // coordinate={{
                                //     latitude: host.latitude,
                                //     longitude: host.longitude
                                // }}
                                pinColor={"#ffd1dc"}
                            />)
                        }
                    })}
                </MapView>
                <View style={{ justifyContent: 'space-around', flexDirection: 'row', marginBottom: 20 }}>
                    <View>
                        <Text>Time</Text>
                        <Text style={{ fontWeight: 'bold' }}>{this.state.timee}</Text>
                    </View>
                    <View>
                        <Text>Distance(M)</Text>
                        <Text style={{ fontWeight: 'bold' }}>{this.calcDistance()}</Text>
                    </View>

                </View>

                <View style={{}}>
                    <TouchableOpacity
                        onPress={() => this.setState({ modalVisible: true })}
                        style={{ padding: 10, backgroundColor: '#058d99', width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ color: '#fff' }}>SAVE ACTIVITY</Text>
                    </TouchableOpacity>
                </View>
                <View style={{}}>
                    <Modal
                        presentationStyle={'fullScreen'}
                        // style={{height:'100%',width:'100%'}}
                        animationType="slide"
                        // transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            // Alert.alert("Modal has been closed.");
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => this.setState({ modalVisible: false })}
                            style={{ padding: 10, }}>
                            <Text style={{ color: '#010101' }}>Close</Text>
                        </TouchableOpacity>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Activity Saved</Text>


                                <Text style={styles.textStyle}>Your activity has been saved and can be viewed in the activity tab</Text>

                            </View>
                        </View>
                    </Modal>


                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    centeredView: {
        // width:'100%',
        // height:'100%'
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {

        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});