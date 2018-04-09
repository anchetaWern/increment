import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const AlertBox = (props) => {

  return (
    <View style={[styles[props.type], styles.box]}>
      <Text style={styles.text}>{props.text}</Text>
    </View>
  );

}

export default AlertBox;