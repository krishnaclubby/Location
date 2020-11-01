import React from 'react';
import { View, Image, TouchableNativeFeedback, Alert } from 'react-native';
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';

import LocS1 from './src/LocS1';
import LocS2 from './src/LocS2';
import LocS3 from './src/LocS3';

import store  from './src/reducers/locReduser';
const ROOT = createStackNavigator({
  LOCS1: {
    screen: LocS1,
    navigationOptions: {
      headerShown: false
    }
  },
  LOCS2: {
    screen: LocS2,
    navigationOptions: {
      headerShown: false
    }
  },
  LOCS3: {
    screen: LocS3,
    navigationOptions: {
      headerShown: false
    }
  },
  
});


const Container = createAppContainer(ROOT);

export default class App extends React.Component {


  componentDidMount() {
    // this.state = store.getState();
    console.log("app mounted");
  }

  componentWillUnmount() {
    console.log("app unmounted");
  }

  render() {
    return (
      <Container>

      </Container>
    )
  }
};
