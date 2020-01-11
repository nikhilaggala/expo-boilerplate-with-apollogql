import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Home Screen</Text>
      </View>
    );
  }
}
